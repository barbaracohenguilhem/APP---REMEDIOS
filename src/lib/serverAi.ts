import type { NextRequest } from 'next/server';

export interface ResolvedAiKeys {
  elevenLabsKey: string;
  elevenLabsVoiceId: string;
  geminiKey: string;
  source: {
    elevenLabs: 'env' | 'header' | 'none';
    gemini: 'env' | 'header' | 'none';
  };
}

export const ELEVENLABS_VOICE_MAP: Record<string, string> = {
  acolhedora: 'EXAVITQu4vr4xnSDxMaL', // Sarah - warm, calm, reassuring multilingual
  clara: 'pFZP5JQG7iQjIQuC4Bku', // Lily - crisp, articulate multilingual
  calma: 'Xb7hH8MSUJpSbSDYk0k2', // Alice - gentle, steady multilingual
};

export const GEMINI_VOICE_MAP: Record<string, string> = {
  acolhedora: 'Aoede',
  clara: 'Kore',
  calma: 'Leda',
};

export function resolveAiKeys(req: NextRequest): ResolvedAiKeys {
  const headerEleven = req.headers.get('x-elevenlabs-key')?.trim() || '';
  const envEleven = process.env.ELEVENLABS_API_KEY?.trim() || '';
  const elevenLabsKey = headerEleven || envEleven;

  const headerVoiceId = req.headers.get('x-elevenlabs-voice-id')?.trim() || '';
  const envVoiceId = process.env.ELEVENLABS_VOICE_ID?.trim() || '';
  const elevenLabsVoiceId = headerVoiceId || envVoiceId;

  const headerGemini = req.headers.get('x-gemini-key')?.trim() || '';
  const envGemini = process.env.GEMINI_API_KEY?.trim() || '';
  const geminiKey = headerGemini || envGemini;

  return {
    elevenLabsKey,
    elevenLabsVoiceId,
    geminiKey,
    source: {
      elevenLabs: headerEleven ? 'header' : envEleven ? 'env' : 'none',
      gemini: headerGemini ? 'header' : envGemini ? 'env' : 'none',
    },
  };
}

/**
 * Wraps raw signed 16-bit little-endian PCM (default 24kHz mono from Gemini TTS) into a valid WAV Buffer.
 */
export function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM chunk size
  header.writeUInt16LE(1, 20); // AudioFormat = PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmBuffer.length, 40);

  return Buffer.concat([header, pcmBuffer]);
}

interface CachedAudioEntry {
  buffer: Buffer;
  contentType: string;
  provider: 'elevenlabs' | 'gemini';
}

const audioCache = new Map<string, CachedAudioEntry>();
const MAX_CACHE_ENTRIES = 80;

export function getCachedAudio(cacheKey: string): CachedAudioEntry | undefined {
  const hit = audioCache.get(cacheKey);
  if (!hit) return undefined;
  // Refresh LRU order
  audioCache.delete(cacheKey);
  audioCache.set(cacheKey, hit);
  return hit;
}

export function setCachedAudio(cacheKey: string, entry: CachedAudioEntry): void {
  if (audioCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = audioCache.keys().next().value;
    if (oldestKey) audioCache.delete(oldestKey);
  }
  audioCache.set(cacheKey, entry);
}

export function extractJsonObject(raw: string): unknown {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  try {
    return JSON.parse(candidate);
  } catch {
    const firstBrace = candidate.indexOf('{');
    const lastBrace = candidate.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      return JSON.parse(candidate.slice(firstBrace, lastBrace + 1));
    }
    throw new Error('Could not parse JSON from Gemini response');
  }
}
