import type { ClientAiKeys, VoiceProfile } from '@/types/medication';
import { loadClientAiKeys } from './storage';

export type VoiceProvider = 'elevenlabs' | 'gemini' | 'browser' | null;

export interface VoicePlaybackState {
  status: 'idle' | 'loading' | 'playing';
  sectionId: string | null;
  provider: VoiceProvider;
  needsNaturalKeyNotice: boolean;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}
interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternativeLike;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

class NaturalVoiceEngine {
  private state: VoicePlaybackState = {
    status: 'idle',
    sectionId: null,
    provider: null,
    needsNaturalKeyNotice: false,
  };
  private listeners = new Set<(state: VoicePlaybackState) => void>();
  private runId = 0;
  private audioEl: HTMLAudioElement | null = null;
  private abortController: AbortController | null = null;
  private blobCache = new Map<string, { url: string; provider: 'elevenlabs' | 'gemini' }>();
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  public subscribe(listener: (state: VoicePlaybackState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): VoicePlaybackState {
    return this.state;
  }

  private emit(partial: Partial<VoicePlaybackState>) {
    this.state = { ...this.state, ...partial };
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  public stop(): void {
    this.runId += 1;
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    if (this.audioEl) {
      this.audioEl.onended = null;
      this.audioEl.onerror = null;
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
      this.audioEl = null;
    }
    if (this.activeUtterance) {
      this.activeUtterance.onend = null;
      this.activeUtterance.onerror = null;
      this.activeUtterance = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore browser cancel errors
      }
    }
    this.emit({ status: 'idle', sectionId: null });
  }

  public clearCache(): void {
    for (const entry of this.blobCache.values()) {
      URL.revokeObjectURL(entry.url);
    }
    this.blobCache.clear();
  }

  public async speak(
    text: string,
    options: {
      sectionId: string;
      rate?: 'normal' | 'slow';
      voiceProfile?: VoiceProfile;
      keysOverride?: ClientAiKeys;
      onEnd?: () => void;
    }
  ): Promise<void> {
    const cleanText = text.trim();
    if (!cleanText) return;

    this.stop();
    const myRunId = this.runId;
    const rate = options.rate ?? 'normal';
    const voiceProfile = options.voiceProfile ?? 'acolhedora';
    const keys = options.keysOverride ?? loadClientAiKeys();
    const cacheKey = `${voiceProfile}:${rate}:${keys.elevenLabsVoiceId || ''}:${cleanText}`;

    // Instant replay from client blob cache
    const cached = this.blobCache.get(cacheKey);
    if (cached) {
      this.playAudioUrl(cached.url, cached.provider, options.sectionId, myRunId, options.onEnd);
      return;
    }

    this.emit({ status: 'loading', sectionId: options.sectionId });

    const controller = new AbortController();
    this.abortController = controller;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (keys.elevenLabsKey) headers['x-elevenlabs-key'] = keys.elevenLabsKey;
      if (keys.elevenLabsVoiceId) headers['x-elevenlabs-voice-id'] = keys.elevenLabsVoiceId;
      if (keys.geminiKey) headers['x-gemini-key'] = keys.geminiKey;

      const resp = await fetch('/api/tts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: cleanText, rate, voiceProfile }),
        signal: controller.signal,
      });

      if (this.runId !== myRunId) return;

      if (resp.ok) {
        const providerHeader = resp.headers.get('X-TTS-Provider');
        const provider: 'elevenlabs' | 'gemini' =
          providerHeader === 'gemini' ? 'gemini' : 'elevenlabs';
        const blob = await resp.blob();
        if (this.runId !== myRunId) return;
        const url = URL.createObjectURL(blob);
        if (this.blobCache.size > 40) {
          const oldest = this.blobCache.keys().next().value;
          if (oldest) {
            const oldEntry = this.blobCache.get(oldest);
            if (oldEntry) URL.revokeObjectURL(oldEntry.url);
            this.blobCache.delete(oldest);
          }
        }
        this.blobCache.set(cacheKey, { url, provider });
        this.emit({ needsNaturalKeyNotice: false });
        this.playAudioUrl(url, provider, options.sectionId, myRunId, options.onEnd);
        return;
      }

      // 501 = no natural TTS key yet; fallback gracefully and let UI offer 1-tap setup
      this.emit({ needsNaturalKeyNotice: true });
      this.speakBrowserFallback(cleanText, options.sectionId, rate, myRunId, options.onEnd);
    } catch (err) {
      if ((err as Error)?.name === 'AbortError' || this.runId !== myRunId) return;
      this.emit({ needsNaturalKeyNotice: true });
      this.speakBrowserFallback(cleanText, options.sectionId, rate, myRunId, options.onEnd);
    }
  }

  private playAudioUrl(
    url: string,
    provider: 'elevenlabs' | 'gemini',
    sectionId: string,
    myRunId: number,
    onEnd?: () => void
  ) {
    if (this.runId !== myRunId) return;
    const audio = new Audio(url);
    this.audioEl = audio;
    this.emit({ status: 'playing', sectionId, provider, needsNaturalKeyNotice: false });

    audio.onended = () => {
      if (this.runId === myRunId) {
        this.audioEl = null;
        this.emit({ status: 'idle', sectionId: null });
        onEnd?.();
      }
    };
    audio.onerror = () => {
      if (this.runId === myRunId) {
        this.audioEl = null;
        this.emit({ status: 'idle', sectionId: null });
      }
    };

    audio.play().catch(() => {
      if (this.runId === myRunId) {
        this.audioEl = null;
        this.emit({ status: 'idle', sectionId: null });
      }
    });
  }

  private speakBrowserFallback(
    text: string,
    sectionId: string,
    rate: 'normal' | 'slow',
    myRunId: number,
    onEnd?: () => void
  ) {
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      typeof window.SpeechSynthesisUtterance === 'undefined'
    ) {
      this.emit({ status: 'idle', sectionId: null, provider: null });
      onEnd?.();
      return;
    }

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = rate === 'slow' ? 0.82 : 0.96;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const bestVoice =
      voices.find(
        (v) =>
          v.lang.toLowerCase() === 'pt-br' &&
          /google|enhanced|premium|natural|francisca|thalita|fernanda/i.test(v.name)
      ) ??
      voices.find((v) => v.lang.toLowerCase() === 'pt-br') ??
      voices.find((v) => v.lang.toLowerCase().startsWith('pt'));
    if (bestVoice) utterance.voice = bestVoice;

    utterance.onend = () => {
      if (this.runId === myRunId) {
        this.activeUtterance = null;
        this.emit({ status: 'idle', sectionId: null });
        onEnd?.();
      }
    };
    utterance.onerror = () => {
      if (this.runId === myRunId) {
        this.activeUtterance = null;
        this.emit({ status: 'idle', sectionId: null });
      }
    };

    this.activeUtterance = utterance;
    this.emit({ status: 'playing', sectionId, provider: 'browser' });
    window.speechSynthesis.speak(utterance);
  }

  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const w = window as unknown as Record<string, unknown>;
    return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
  }

  public startListening(callbacks: {
    onResult: (transcript: string) => void;
    onError: (message: string) => void;
    onEnd?: () => void;
  }): (() => void) | null {
    if (!this.isRecognitionSupported()) {
      callbacks.onError('Seu navegador não liberou o microfone. Você pode digitar ou tirar uma foto.');
      return null;
    }

    this.stop();

    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return null;

    const recognition = new Ctor();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() ?? '';
      if (transcript) {
        callbacks.onResult(transcript);
      } else {
        callbacks.onError('Não consegui ouvir com clareza. Tente falar mais perto.');
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        callbacks.onError('Permita o uso do microfone no navegador para falar com o app.');
      } else if (event.error === 'no-speech') {
        callbacks.onError('Não ouvi nenhuma fala. Toque novamente e fale o nome do remédio.');
      } else {
        callbacks.onError('Não consegui captar o áudio agora. Tente novamente.');
      }
    };

    recognition.onend = () => {
      callbacks.onEnd?.();
    };

    try {
      recognition.start();
    } catch {
      callbacks.onError('Não foi possível abrir o microfone.');
      return null;
    }

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore
      }
    };
  }

  /**
   * Soft, warm spa-like double chime (Headspace/Apple Health feel instead of harsh beep)
   */
  public playGentleChime(): void {
    if (typeof window === 'undefined') return;
    try {
      const w = window as unknown as {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Ctx = w.AudioContext ?? w.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5 -> E5 -> G5 soft major triad

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.16);
        gain.gain.setValueAtTime(0.001, now + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.11, now + idx * 0.16 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.16);
        osc.stop(now + idx * 0.16 + 0.58);
      });
    } catch {
      // Ignore autoplay restrictions
    }
  }
}

export const voiceEngine = new NaturalVoiceEngine();
