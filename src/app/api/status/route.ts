import { NextRequest, NextResponse } from 'next/server';
import { resolveAiKeys } from '@/lib/serverAi';

export async function GET(req: NextRequest) {
  const resolved = resolveAiKeys(req);
  return NextResponse.json({
    elevenLabsConnected: Boolean(resolved.elevenLabsKey),
    elevenLabsSource: resolved.source.elevenLabs,
    geminiConnected: Boolean(resolved.geminiKey),
    geminiSource: resolved.source.gemini,
    naturalVoiceProvider: resolved.elevenLabsKey
      ? 'elevenlabs'
      : resolved.geminiKey
        ? 'gemini'
        : 'none',
  });
}
