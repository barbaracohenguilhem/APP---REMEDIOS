import { NextRequest, NextResponse } from 'next/server';
import {
  ELEVENLABS_VOICE_MAP,
  GEMINI_VOICE_MAP,
  getCachedAudio,
  pcmToWav,
  resolveAiKeys,
  setCachedAudio,
} from '@/lib/serverAi';

interface TtsBody {
  text?: string;
  rate?: 'normal' | 'slow';
  voiceProfile?: 'acolhedora' | 'clara' | 'calma';
}

export async function POST(req: NextRequest) {
  let body: TtsBody;
  try {
    body = (await req.json()) as TtsBody;
  } catch {
    return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
  }

  const text = (body.text ?? '').trim().slice(0, 1200);
  if (!text) {
    return NextResponse.json({ error: 'EMPTY_TEXT' }, { status: 400 });
  }

  const rate = body.rate === 'slow' ? 'slow' : 'normal';
  const voiceProfile =
    body.voiceProfile === 'clara' || body.voiceProfile === 'calma'
      ? body.voiceProfile
      : 'acolhedora';

  const keys = resolveAiKeys(req);

  if (!keys.elevenLabsKey && !keys.geminiKey) {
    return NextResponse.json(
      {
        error: 'NO_TTS_KEY',
        message: 'Configure sua chave da ElevenLabs ou Gemini para ativar a voz humana brasileira.',
      },
      { status: 501 }
    );
  }

  // 1. Try ElevenLabs first (highest warmth & realism in pt-BR)
  if (keys.elevenLabsKey) {
    const voiceId = keys.elevenLabsVoiceId || ELEVENLABS_VOICE_MAP[voiceProfile];
    const cacheKey = `el:${voiceId}:${rate}:${text}`;
    const cached = getCachedAudio(cacheKey);
    if (cached) {
      return new NextResponse(new Uint8Array(cached.buffer), {
        status: 200,
        headers: {
          'Content-Type': cached.contentType,
          'X-TTS-Provider': 'elevenlabs',
          'X-TTS-Cache': 'HIT',
          'Cache-Control': 'private, max-age=3600',
        },
      });
    }

    try {
      const elResp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': keys.elevenLabsKey,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.56,
              similarity_boost: 0.78,
              style: 0.16,
              use_speaker_boost: true,
              speed: rate === 'slow' ? 0.84 : 1.0,
            },
          }),
        }
      );

      if (elResp.ok) {
        const arrayBuf = await elResp.arrayBuffer();
        const buffer = Buffer.from(arrayBuf);
        setCachedAudio(cacheKey, {
          buffer,
          contentType: 'audio/mpeg',
          provider: 'elevenlabs',
        });
        return new NextResponse(new Uint8Array(buffer), {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'X-TTS-Provider': 'elevenlabs',
            'X-TTS-Cache': 'MISS',
            'Cache-Control': 'private, max-age=3600',
          },
        });
      }

      const errDetail = await elResp.text().catch(() => '');
      if (!keys.geminiKey) {
        return NextResponse.json(
          {
            error: 'ELEVENLABS_ERROR',
            message: 'Não foi possível gerar voz pela ElevenLabs. Verifique sua chave ou créditos.',
            detail: errDetail.slice(0, 200),
          },
          { status: elResp.status === 401 ? 401 : 502 }
        );
      }
    } catch {
      if (!keys.geminiKey) {
        return NextResponse.json(
          { error: 'ELEVENLABS_NETWORK_ERROR', message: 'Erro de conexão com a ElevenLabs.' },
          { status: 502 }
        );
      }
    }
  }

  // 2. Fallback / Direct Gemini 2.5 Flash Neural TTS
  if (keys.geminiKey) {
    const geminiVoice = GEMINI_VOICE_MAP[voiceProfile] || 'Aoede';
    const cacheKey = `gm:${geminiVoice}:${rate}:${text}`;
    const cached = getCachedAudio(cacheKey);
    if (cached) {
      return new NextResponse(new Uint8Array(cached.buffer), {
        status: 200,
        headers: {
          'Content-Type': cached.contentType,
          'X-TTS-Provider': 'gemini',
          'X-TTS-Cache': 'HIT',
          'Cache-Control': 'private, max-age=3600',
        },
      });
    }

    const paceInstruction =
      rate === 'slow'
        ? 'Fale em português do Brasil de forma bem pausada, acolhedora, calma e humana, como uma farmacêutica paciente explicando para alguém querido: '
        : 'Fale em português do Brasil de forma acolhedora, clara, natural e humana, como uma farmacêutica gentil conversando: ';

    try {
      const gmResp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${encodeURIComponent(keys.geminiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${paceInstruction}${text}` }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: geminiVoice },
                },
              },
            },
          }),
        }
      );

      if (gmResp.ok) {
        const json = (await gmResp.json()) as {
          candidates?: Array<{
            content?: {
              parts?: Array<{
                inlineData?: { data?: string; mimeType?: string };
              }>;
            };
          }>;
        };

        const inline = json.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (inline?.data) {
          const rawAudio = Buffer.from(inline.data, 'base64');
          const mime = inline.mimeType || 'audio/L16;rate=24000';
          const isRawPcm = mime.includes('L16') || mime.includes('pcm');
          const rateMatch = mime.match(/rate=(\d+)/);
          const sampleRate = rateMatch ? Number(rateMatch[1]) : 24000;
          const outBuffer = isRawPcm ? pcmToWav(rawAudio, sampleRate) : rawAudio;
          const contentType = isRawPcm ? 'audio/wav' : mime;

          setCachedAudio(cacheKey, { buffer: outBuffer, contentType, provider: 'gemini' });

          return new NextResponse(new Uint8Array(outBuffer), {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'X-TTS-Provider': 'gemini',
              'X-TTS-Cache': 'MISS',
              'Cache-Control': 'private, max-age=3600',
            },
          });
        }
      }

      const detail = await gmResp.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'GEMINI_TTS_ERROR',
          message: 'Não foi possível gerar voz pelo Gemini. Verifique sua chave Gemini.',
          detail: detail.slice(0, 200),
        },
        { status: gmResp.status === 401 || gmResp.status === 403 ? 401 : 502 }
      );
    } catch {
      return NextResponse.json(
        { error: 'GEMINI_NETWORK_ERROR', message: 'Erro de conexão com o Gemini.' },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ error: 'NO_TTS_KEY' }, { status: 501 });
}
