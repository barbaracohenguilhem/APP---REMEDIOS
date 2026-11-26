import { describe, expect, it } from 'vitest';
import { extractJsonObject, getCachedAudio, pcmToWav, setCachedAudio } from '@/lib/serverAi';

describe('serverAi helpers', () => {
  it('wraps raw PCM into a valid RIFF/WAVE header', () => {
    const pcm = Buffer.alloc(100, 1);
    const wav = pcmToWav(pcm, 24000, 1, 16);
    expect(wav.toString('ascii', 0, 4)).toBe('RIFF');
    expect(wav.toString('ascii', 8, 12)).toBe('WAVE');
    expect(wav.readUInt32LE(24)).toBe(24000);
    expect(wav.readUInt32LE(40)).toBe(100);
    expect(wav.length).toBe(144);
  });

  it('extracts JSON from markdown code fences or prose', () => {
    expect(extractJsonObject('```json\n{"ok":true,"count":2}\n```')).toEqual({
      ok: true,
      count: 2,
    });
    expect(extractJsonObject('Aqui está: {"name":"Iumi"} pronto.')).toEqual({ name: 'Iumi' });
  });

  it('caches and retrieves generated TTS audio entries', () => {
    const entry = {
      buffer: Buffer.from('mp3-bytes'),
      contentType: 'audio/mpeg',
      provider: 'elevenlabs' as const,
    };
    setCachedAudio('test-key', entry);
    expect(getCachedAudio('test-key')).toEqual(entry);
  });
});
