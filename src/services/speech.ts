export interface SpeechChunk {
  sectionId: string;
  text: string;
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

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type ActivePlayback =
  | {
      kind: 'single';
      sectionId: string;
      text: string;
      onEnd?: () => void;
    }
  | {
      kind: 'sequence';
      chunks: SpeechChunk[];
      currentIndex: number;
      onDone?: () => void;
    };

class BrazilianSpeechService {
  private currentId: string | null = null;
  private listeners = new Set<(speakingId: string | null) => void>();
  private runId = 0;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private activePlayback: ActivePlayback | null = null;

  public isSynthesisSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof window.SpeechSynthesisUtterance !== 'undefined'
    );
  }

  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const w = window as unknown as Record<string, unknown>;
    return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
  }

  public subscribe(listener: (speakingId: string | null) => void): () => void {
    this.listeners.add(listener);
    listener(this.currentId);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getCurrentSpeakingId(): string | null {
    return this.currentId;
  }

  private notify(id: string | null) {
    this.currentId = id;
    for (const listener of this.listeners) {
      listener(id);
    }
  }

  private pickPortugueseVoice(): SpeechSynthesisVoice | null {
    if (!this.isSynthesisSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    return (
      voices.find((v) => v.lang.toLowerCase() === 'pt-br' && /google|luciana|maria|francisca|fernanda/i.test(v.name)) ??
      voices.find((v) => v.lang.toLowerCase() === 'pt-br') ??
      voices.find((v) => v.lang.toLowerCase().startsWith('pt')) ??
      null
    );
  }

  public stop(): void {
    this.runId += 1;
    this.activePlayback = null;
    if (this.activeUtterance) {
      this.activeUtterance.onstart = null;
      this.activeUtterance.onend = null;
      this.activeUtterance.onerror = null;
      this.activeUtterance = null;
    }
    if (this.isSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore browser cancel errors
      }
    }
    this.notify(null);
  }

  public updateRate(rate: 'normal' | 'slow'): void {
    const playback = this.activePlayback;
    if (!playback || this.currentId === null) return;

    if (playback.kind === 'single') {
      this.speak(playback.text, {
        sectionId: playback.sectionId,
        rate,
        onEnd: playback.onEnd,
      });
    } else {
      const remaining = playback.chunks.slice(playback.currentIndex);
      if (remaining.length > 0) {
        this.speakSequence(remaining, { rate, onDone: playback.onDone });
      }
    }
  }

  public speak(
    text: string,
    options: {
      sectionId?: string;
      rate?: 'normal' | 'slow';
      onEnd?: () => void;
    } = {}
  ): boolean {
    const cleanText = text.trim();
    if (!cleanText) return false;

    this.stop();
    const myRunId = this.runId;
    const sectionId = options.sectionId ?? 'single';

    if (!this.isSynthesisSupported()) {
      this.notify(null);
      options.onEnd?.();
      return false;
    }

    this.activePlayback = {
      kind: 'single',
      sectionId,
      text: cleanText,
      onEnd: options.onEnd,
    };

    const utterance = new window.SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = options.rate === 'slow' ? 0.8 : 0.98;
    utterance.pitch = 1.0;

    const voice = this.pickPortugueseVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      if (this.runId === myRunId) this.notify(sectionId);
    };
    utterance.onend = () => {
      if (this.runId === myRunId) {
        this.activePlayback = null;
        this.activeUtterance = null;
        this.notify(null);
        options.onEnd?.();
      }
    };
    utterance.onerror = () => {
      if (this.runId === myRunId) {
        this.activePlayback = null;
        this.activeUtterance = null;
        this.notify(null);
      }
    };

    this.activeUtterance = utterance;
    this.notify(sectionId);
    window.speechSynthesis.speak(utterance);
    return true;
  }

  /**
   * Speaks multiple sections sequentially, notifying UI which card is actively being read.
   */
  public speakSequence(
    chunks: SpeechChunk[],
    options: { rate?: 'normal' | 'slow'; onDone?: () => void } = {}
  ): boolean {
    if (chunks.length === 0) return false;

    this.stop();
    const myRunId = this.runId;

    if (!this.isSynthesisSupported()) {
      this.notify(null);
      options.onDone?.();
      return false;
    }

    const speakIndex = (idx: number) => {
      if (this.runId !== myRunId) return;
      if (idx >= chunks.length) {
        this.activePlayback = null;
        this.activeUtterance = null;
        this.notify(null);
        options.onDone?.();
        return;
      }

      const chunk = chunks[idx];
      this.activePlayback = {
        kind: 'sequence',
        chunks,
        currentIndex: idx,
        onDone: options.onDone,
      };

      const utterance = new window.SpeechSynthesisUtterance(chunk.text);
      utterance.lang = 'pt-BR';
      utterance.rate = options.rate === 'slow' ? 0.8 : 0.98;
      const voice = this.pickPortugueseVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
        if (this.runId === myRunId) this.notify(chunk.sectionId);
      };
      utterance.onend = () => {
        if (this.runId === myRunId) speakIndex(idx + 1);
      };
      utterance.onerror = () => {
        if (this.runId === myRunId) {
          this.activePlayback = null;
          this.activeUtterance = null;
          this.notify(null);
        }
      };

      this.activeUtterance = utterance;
      this.notify(chunk.sectionId);
      window.speechSynthesis.speak(utterance);
    };

    speakIndex(0);
    return true;
  }

  /**
   * Starts Portuguese voice recognition for hands-free / low-literacy medication search.
   */
  public startVoiceSearch(callbacks: {
    onResult: (transcript: string) => void;
    onError: (message: string) => void;
    onEnd?: () => void;
  }): (() => void) | null {
    if (!this.isRecognitionSupported()) {
      callbacks.onError(
        'Seu navegador não suporta busca por microfone. Você pode tocar nas caixinhas ou digitar.'
      );
      return null;
    }

    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
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
        callbacks.onError('Não consegui ouvir o nome do remédio. Tente falar mais perto.');
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        callbacks.onError('Permissão de microfone bloqueada. Ative o microfone ou escolha pelas fotos.');
      } else if (event.error === 'no-speech') {
        callbacks.onError('Não ouvi nenhum som. Toque no microfone e fale o nome do remédio.');
      } else {
        callbacks.onError('Não foi possível usar o microfone agora. Tente novamente.');
      }
    };

    recognition.onend = () => {
      callbacks.onEnd?.();
    };

    try {
      recognition.start();
    } catch {
      callbacks.onError('Não foi possível iniciar o microfone.');
      return null;
    }

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore stop errors
      }
    };
  }

  /**
   * Plays a gentle, pleasant 3-note medication reminder chime using Web Audio API.
   */
  public playAlarmChime(): void {
    if (typeof window === 'undefined') return;
    const w = window as unknown as {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
    };
    const AudioCtx = w.AudioContext ?? w.webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99]; // C5 -> E5 -> G5 warm chime
      const now = ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.22);

        gain.gain.setValueAtTime(0.0001, now + i * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.22 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.22 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.22);
        osc.stop(now + i * 0.22 + 0.48);
      });

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 1500);
    } catch {
      // AudioContext may be blocked until user interaction
    }
  }
}

export const speechService = new BrazilianSpeechService();
