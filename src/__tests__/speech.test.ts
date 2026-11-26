import { describe, expect, it, vi } from 'vitest';
import { speechService } from '../services/speech';

describe('speechService', () => {
  it('returns false gracefully when Web Speech Synthesis is unavailable', () => {
    const origSynth = Object.getOwnPropertyDescriptor(window, 'speechSynthesis');
    const origUtt = Object.getOwnPropertyDescriptor(window, 'SpeechSynthesisUtterance');

    try {
      Object.defineProperty(window, 'speechSynthesis', {
        value: undefined,
        configurable: true,
        writable: true,
      });
      Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        value: undefined,
        configurable: true,
        writable: true,
      });

      const onEnd = vi.fn();
      expect(speechService.isSynthesisSupported()).toBe(false);
      expect(speechService.speak('Teste', { onEnd })).toBe(false);
      expect(onEnd).toHaveBeenCalledTimes(1);
    } finally {
      if (origSynth) Object.defineProperty(window, 'speechSynthesis', origSynth);
      if (origUtt) Object.defineProperty(window, 'SpeechSynthesisUtterance', origUtt);
    }
  });

  it('speaks sequences step-by-step and stops cleanly mid-sequence', () => {
    const spoken: Array<{ text: string; rate: number; onend: (() => void) | null }> = [];
    const cancelMock = vi.fn();

    class FakeUtterance {
      text: string;
      lang = '';
      rate = 1;
      pitch = 1;
      voice: SpeechSynthesisVoice | null = null;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }

    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      value: FakeUtterance,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        speak: (u: FakeUtterance) => {
          spoken.push(u);
          u.onstart?.();
        },
        cancel: cancelMock,
        getVoices: () => [{ lang: 'pt-BR', name: 'Luciana' }],
      },
      configurable: true,
      writable: true,
    });

    const states: Array<string | null> = [];
    const unsub = speechService.subscribe((id) => states.push(id));

    const started = speechService.speakSequence(
      [
        { sectionId: 's1', text: 'Primeira parte' },
        { sectionId: 's2', text: 'Segunda parte' },
      ],
      { rate: 'slow' }
    );

    expect(started).toBe(true);
    expect(spoken).toHaveLength(1);
    expect(spoken[0].rate).toBe(0.8);
    expect(speechService.getCurrentSpeakingId()).toBe('s1');

    // Finish first chunk -> automatically advances to second chunk
    spoken[0].onend?.();
    expect(spoken).toHaveLength(2);
    expect(spoken[1].text).toBe('Segunda parte');
    expect(speechService.getCurrentSpeakingId()).toBe('s2');

    // Stop mid-sequence clears active state
    speechService.stop();
    expect(cancelMock).toHaveBeenCalled();
    expect(speechService.getCurrentSpeakingId()).toBeNull();

    unsub();
  });

  it('reports friendly Portuguese error when SpeechRecognition is unsupported', () => {
    const onError = vi.fn();
    const stopFn = speechService.startVoiceSearch({
      onResult: vi.fn(),
      onError,
    });

    expect(stopFn).toBeNull();
    expect(onError).toHaveBeenCalledWith(
      expect.stringContaining('microfone')
    );
  });

  it('ignores stale async onerror/onend from an interrupted utterance and restarts cleanly on updateRate', () => {
    const spoken: Array<{
      text: string;
      rate: number;
      onstart: (() => void) | null;
      onend: (() => void) | null;
      onerror: (() => void) | null;
    }> = [];

    class FakeUtterance {
      text: string;
      lang = '';
      rate = 1;
      pitch = 1;
      voice: SpeechSynthesisVoice | null = null;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }

    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      value: FakeUtterance,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        speak: (u: FakeUtterance) => {
          spoken.push(u);
          u.onstart?.();
        },
        cancel: vi.fn(),
        getVoices: () => [{ lang: 'pt-BR', name: 'Luciana' }],
      },
      configurable: true,
      writable: true,
    });

    // Start speech A, then immediately interrupt with speech B
    speechService.speak('Primeira fala', { sectionId: 'sec-a', rate: 'normal' });
    const uttA = spoken[0];
    speechService.speak('Segunda fala', { sectionId: 'sec-b', rate: 'normal' });
    const uttB = spoken[1];

    // Simulate Chrome firing async onerror/onend on canceled uttA AFTER uttB started
    uttA.onerror?.();
    uttA.onend?.();

    // Active section MUST remain sec-b (not wiped to null!)
    expect(speechService.getCurrentSpeakingId()).toBe('sec-b');
    expect(uttB.rate).toBe(0.98);

    // Toggle speed mid-speech -> immediately restarts active utterance at slow rate 0.8
    speechService.updateRate('slow');
    expect(spoken).toHaveLength(3);
    expect(spoken[2].text).toBe('Segunda fala');
    expect(spoken[2].rate).toBe(0.8);
    expect(speechService.getCurrentSpeakingId()).toBe('sec-b');

    speechService.stop();
  });
});
