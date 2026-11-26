import { NextRequest, NextResponse } from 'next/server';
import { resolveAiKeys } from '@/lib/serverAi';

interface AskBody {
  question?: string;
  medicationName?: string;
  activeIngredient?: string;
  contextNotes?: string;
}

export async function POST(req: NextRequest) {
  let body: AskBody;
  try {
    body = (await req.json()) as AskBody;
  } catch {
    return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
  }

  const question = (body.question ?? '').trim();
  if (!question) {
    return NextResponse.json({ error: 'EMPTY_QUESTION' }, { status: 400 });
  }

  const keys = resolveAiKeys(req);
  if (!keys.geminiKey) {
    // Helpful, safe local fallback response when Gemini key is not yet entered
    const medRef = body.medicationName ? ` sobre ${body.medicationName}` : '';
    return NextResponse.json({
      provider: 'fallback',
      answer: `Para eu responder perguntas livres${medRef} com toda precisão de um farmacêutico, basta adicionar sua chave da API do Gemini tocando em Voz e IA no topo da tela. Enquanto isso, você pode ouvir toda a bula fácil e as diferenças entre os genéricos aqui mesmo.`,
      needsKey: true,
    });
  }

  const medContext = body.medicationName
    ? `O usuário está consultando o medicamento: ${body.medicationName} (${body.activeIngredient ?? ''}). Contexto: ${body.contextNotes ?? ''}.`
    : 'O usuário está fazendo uma dúvida geral sobre medicamentos no Brasil.';

  const prompt = `Você é uma farmacêutica brasileira acolhedora, calma e muito clara conversando com um paciente (que pode ter baixa escolaridade ou dificuldade de leitura).
${medContext}

Pergunta do usuário: "${question}"

Regras obrigatórias:
- Responda em português do Brasil natural, caloroso e direto, em NO MÁXIMO 3 ou 4 frases curtas.
- NÃO use markdown, asteriscos, listas com traços nem jargão médico difícil — seu texto será LIDO EM VOZ ALTA por uma voz humana.
- Se a pergunta for sobre troca entre original e genérico (ex: inchaço, dor de estômago), explique de forma clara a diferença de revestimento, excipientes ou ritmo de absorção entre fabricantes.
- Nunca mande o paciente suspender um remédio contínuo por conta própria; quando houver sinal de alerta ou reação forte, oriente conversar com o médico ou farmacêutico.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(keys.geminiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 280,
          },
        }),
      }
    );

    if (!resp.ok) {
      return NextResponse.json(
        { error: 'GEMINI_ASK_ERROR', message: 'Não consegui responder agora. Verifique sua chave Gemini.' },
        { status: resp.status === 401 || resp.status === 403 ? 401 : 502 }
      );
    }

    const data = (await resp.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/[*#_`]/g, '')
        .trim() ||
      'Desculpe, não consegui formular uma resposta agora. Vale confirmar essa dúvida com seu médico ou farmacêutico.';

    return NextResponse.json({
      provider: 'gemini',
      answer,
    });
  } catch {
    return NextResponse.json(
      { error: 'NETWORK_ERROR', message: 'Erro de conexão ao consultar a IA.' },
      { status: 502 }
    );
  }
}
