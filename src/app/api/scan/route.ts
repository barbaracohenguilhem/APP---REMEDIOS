import { NextRequest, NextResponse } from 'next/server';
import { MEDICATIONS_CATALOG } from '@/data/medications';
import { parsePrescriptionText } from '@/services/medicationSearch';
import { extractJsonObject, resolveAiKeys } from '@/lib/serverAi';

interface ScanBody {
  imageBase64?: string;
  mimeType?: string;
  textFallback?: string;
}

interface GeminiScanItem {
  name: string;
  activeIngredient?: string;
  dosage?: string;
  times?: string[];
  cycleMode?: 'daily' | '24_4' | '21_7';
  notes?: string;
}

export async function POST(req: NextRequest) {
  let body: ScanBody;
  try {
    body = (await req.json()) as ScanBody;
  } catch {
    return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
  }

  const keys = resolveAiKeys(req);

  // Text-only fallback (e.g., pasted WhatsApp prescription)
  if (!body.imageBase64 && body.textFallback) {
    const localMatches = parsePrescriptionText(body.textFallback, MEDICATIONS_CATALOG);
    return NextResponse.json({
      provider: 'local-parser',
      rawText: body.textFallback,
      items: localMatches.map((m) => ({
        catalogId: m.medication.id,
        name: m.medication.name,
        activeIngredient: m.medication.activeIngredient,
        dosage: m.detectedDosage,
        times: m.detectedTimes,
        cycleMode: m.medication.category === 'anticoncepcional' ? '24_4' : 'daily',
        notes: m.medication.howToTake.summary,
      })),
    });
  }

  if (!body.imageBase64) {
    return NextResponse.json({ error: 'IMAGE_REQUIRED' }, { status: 400 });
  }

  if (!keys.geminiKey) {
    return NextResponse.json(
      {
        error: 'NO_GEMINI_KEY',
        message:
          'Configure sua chave Gemini em "Voz & IA" para ler fotos de receitas manuscritas, caixas e prints automaticamente.',
      },
      { status: 501 }
    );
  }

  const cleanBase64 = body.imageBase64.replace(/^data:[^;]+;base64,/, '');
  const mimeType = body.mimeType || 'image/jpeg';

  const prompt = `Você é um farmacêutico brasileiro especialista em ler receitas médicas (inclusive letra de médico cursiva), fotos de caixas de remédios, cartelas e prints de WhatsApp.
Analise a imagem enviada e extraia TODOS os medicamentos visíveis.
Responda APENAS com um objeto JSON válido neste formato exato:
{
  "rawText": "transcrição fiel e curta do que aparece na imagem",
  "medications": [
    {
      "name": "Nome comercial ou genérico principal (ex: Iumi, Losartana 50 mg, Glifage XR)",
      "activeIngredient": "princípio ativo e dosagem se visível",
      "dosage": "ex: 1 comprimido",
      "times": ["08:00"],
      "cycleMode": "daily",
      "notes": "instrução curta em português simples (ex: Tomar após o jantar)"
    }
  ]
}
Regras:
- Converta intervalos em horários práticos (ex: 12/12h -> ["08:00","20:00"], 8/8h -> ["07:00","15:00","23:00"], noite -> ["21:00"], manhã/jejum -> ["07:00"]).
- Se for anticoncepcional 24+4 use cycleMode "24_4"; se for 21+7 use "21_7"; senão "daily".
- Se não houver remédio identificável na imagem, retorne medications: [].`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(keys.geminiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: cleanBase64 } },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        }),
      }
    );

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'GEMINI_VISION_ERROR',
          message: 'Erro ao analisar a imagem com o Gemini. Verifique sua chave de API.',
          detail: detail.slice(0, 200),
        },
        { status: resp.status === 401 || resp.status === 403 ? 401 : 502 }
      );
    }

    const data = (await resp.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
    const parsed = extractJsonObject(rawJsonText) as {
      rawText?: string;
      medications?: GeminiScanItem[];
    };

    const rawMeds = Array.isArray(parsed.medications) ? parsed.medications : [];
    const items = rawMeds.map((item) => {
      const searchStr = `${item.name ?? ''} ${item.activeIngredient ?? ''}`;
      const matched = parsePrescriptionText(searchStr, MEDICATIONS_CATALOG)[0];
      const validTimes = Array.isArray(item.times)
        ? item.times.filter((t) => typeof t === 'string' && /^\d{2}:\d{2}$/.test(t))
        : [];
      return {
        catalogId: matched?.medication.id ?? null,
        name: item.name || matched?.medication.name || 'Medicamento',
        activeIngredient: item.activeIngredient || matched?.medication.activeIngredient || '',
        dosage: item.dosage || matched?.medication.howToTake.defaultDosage || '1 comprimido',
        times:
          validTimes.length > 0
            ? validTimes
            : matched?.medication.howToTake.defaultTimes ?? ['08:00'],
        cycleMode:
          item.cycleMode === '24_4' || item.cycleMode === '21_7'
            ? item.cycleMode
            : matched?.medication.category === 'anticoncepcional'
              ? '24_4'
              : 'daily',
        notes: item.notes || matched?.medication.howToTake.summary || 'Seguir orientação da receita',
      };
    });

    return NextResponse.json({
      provider: 'gemini-vision',
      rawText: parsed.rawText ?? '',
      items,
    });
  } catch {
    return NextResponse.json(
      { error: 'SCAN_PARSE_ERROR', message: 'Não consegui interpretar a foto agora. Tente outra foto mais nítida.' },
      { status: 500 }
    );
  }
}
