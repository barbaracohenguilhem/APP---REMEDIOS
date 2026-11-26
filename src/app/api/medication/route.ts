import { NextRequest, NextResponse } from 'next/server';
import { MEDICATIONS_CATALOG } from '@/data/medications';
import { searchMedications } from '@/services/medicationSearch';
import { extractJsonObject, resolveAiKeys } from '@/lib/serverAi';
import type { Medication } from '@/types/medication';

interface LookupBody {
  query?: string;
}

export async function POST(req: NextRequest) {
  let body: LookupBody;
  try {
    body = (await req.json()) as LookupBody;
  } catch {
    return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
  }

  const query = (body.query ?? '').trim();
  if (!query) {
    return NextResponse.json({ error: 'EMPTY_QUERY' }, { status: 400 });
  }

  // 1. Instant match from curated Brazilian pharmacology catalog
  const localHits = searchMedications(MEDICATIONS_CATALOG, query);
  const exactHit = localHits.find(
    (m) =>
      m.name.toLowerCase() === query.toLowerCase() ||
      m.aliases.some((a) => a.toLowerCase() === query.toLowerCase())
  );
  if (exactHit) {
    return NextResponse.json({ provider: 'catalog', medication: exactHit });
  }

  const keys = resolveAiKeys(req);
  if (!keys.geminiKey) {
    if (localHits.length > 0) {
      return NextResponse.json({ provider: 'catalog', medication: localHits[0] });
    }
    return NextResponse.json(
      {
        error: 'NO_GEMINI_KEY',
        message:
          'Este remédio não está na base offline. Adicione sua chave Gemini em "Voz & IA" para consultar qualquer medicamento vendido no Brasil.',
      },
      { status: 501 }
    );
  }

  const prompt = `Você é um farmacêutico clínico brasileiro especialista em bulas da ANVISA, bioequivalência e excipientes.
O usuário buscou o medicamento: "${query}".
Gere um objeto JSON completo, rigoroso, em português do Brasil MUITO simples e acolhedor (compreensível até para quem tem pouca escolaridade).

IMPORTANTE sobre "equivalents" e "switchingEffects":
- Liste o medicamento de Referência (original no Brasil) + 2 a 3 opções bioequivalentes reais vendidas no Brasil (Genéricos como EMS, Medley, Eurofarma, Cimed e/ou Similares intercambiáveis, e marque "farmaciaPopularFree": true se for gratuito no SUS/Farmácia Popular).
- Em "switchingEffects", NÃO liste efeitos colaterais genéricos da molécula! Foque EXCLUSIVAMENTE nas diferenças práticas AO TROCAR do original para aquele equivalente específico: revestimento/película, excipientes (lactose, corantes, sódio, sabor amargo), matriz de liberação (ex: XR vs comum, entérico), formato da cartela ou pequenas variações de velocidade de absorção dentro da faixa de 80% a 125% da ANVISA e o sintoma prático que ESSA troca pode causar (ex: inchaço, estufamento, desconforto gástrico, oscilação de efeito).

Retorne APENAS JSON válido seguindo exatamente esta estrutura:
{
  "name": "Nome comercial principal (ex: Selozok)",
  "activeIngredient": "Princípio ativo + dosagem padrão (ex: Succinato de Metoprolol 50 mg)",
  "strength": "50 mg",
  "manufacturer": "Laboratório de referência",
  "category": "anticoncepcional | diabetes | estomago | tireoide | pressao | dor_febre | antibiotico | ansiedade_sono | colesterol | alergia | outro",
  "categoryLabel": "Rótulo curto (ex: Coração e Pressão)",
  "purposeSimple": "1 frase curta e muito clara explicando para que serve",
  "packStyle": "blister-box | capsule-box | drops-bottle | pill-bottle",
  "stripeType": "vermelha | preta | amarela | sem_tarja",
  "accentHex": "#146356",
  "howToTake": {
    "items": [
      { "icon": "pill", "shortLabel": "1 por dia", "spokenDetail": "Frase curta falada" },
      { "icon": "clock", "shortLabel": "Mesma hora", "spokenDetail": "Frase curta falada" },
      { "icon": "water", "shortLabel": "Com água", "spokenDetail": "Frase curta falada" }
    ],
    "summary": "1 frase direta de como tomar",
    "spokenScript": "Texto calmo e natural para leitura em voz alta explicando como tomar",
    "defaultDosage": "1 comprimido",
    "defaultTimes": ["08:00"]
  },
  "whatNotToDo": {
    "items": [
      { "icon": "no-alcohol", "shortLabel": "Sem álcool", "spokenDetail": "Frase curta" },
      { "icon": "cuts-effect", "shortLabel": "Interações", "spokenDetail": "Frase curta" },
      { "icon": "alert-triangle", "shortLabel": "Sinal de alerta", "spokenDetail": "Frase curta" }
    ],
    "summary": "1 frase direta do principal cuidado",
    "spokenScript": "Texto claro para leitura em voz alta sobre o que não pode fazer"
  },
  "whatYouCanDo": {
    "items": [
      { "icon": "food", "shortLabel": "Com comida", "spokenDetail": "Frase curta" },
      { "icon": "car-ok", "shortLabel": "Rotina normal", "spokenDetail": "Frase curta" },
      { "icon": "shield-check", "shortLabel": "Uso seguro", "spokenDetail": "Frase curta" }
    ],
    "missedDoseTip": "Explicação simples do que fazer se esquecer uma dose",
    "onsetTime": "Quando começa a fazer efeito",
    "spokenScript": "Texto calmo explicando o que pode fazer e o que fazer se esquecer"
  },
  "genericsHighlight": {
    "sameEffectBadge": "Mesmo efeito",
    "switchWarningShort": "Frase curta sobre o principal cuidado na troca entre marcas",
    "spokenScript": "Explicação falada sobre os genéricos disponíveis e cuidados na troca"
  },
  "equivalents": [
    {
      "id": "ref-1",
      "name": "Nome do Referência",
      "lab": "Laboratório",
      "type": "referencia",
      "bioequivalent": true,
      "farmaciaPopularFree": false,
      "basePriceMin": 40,
      "basePriceMax": 58,
      "coatingOrTech": "Descrição simples do revestimento ou tecnologia",
      "excipients": { "hasLactose": false, "hasDyes": false, "keyNotes": "Nota simples dos excipientes" },
      "absorptionNote": "Como se comporta a absorção",
      "switchingEffects": [],
      "switchVerdict": { "level": "tranquila", "headline": "Referência original", "explanation": "Padrão de comparação." },
      "spokenSummary": "Resumo curto falado"
    },
    {
      "id": "gen-1",
      "name": "Princípio Ativo (Genérico)",
      "lab": "EMS",
      "type": "generico",
      "bioequivalent": true,
      "farmaciaPopularFree": false,
      "basePriceMin": 18,
      "basePriceMax": 28,
      "coatingOrTech": "Revestimento / base do genérico",
      "excipients": { "hasLactose": true, "hasDyes": false, "keyNotes": "Diferença real nos excipientes" },
      "absorptionNote": "Diferença possível na velocidade de absorção dentro da faixa ANVISA",
      "switchingEffects": [
        { "symptom": "Sintoma específico da troca", "why": "Por que a diferença de revestimento/excipiente pode causar isso na troca", "likelihood": "ocasional", "icon": "bloating" }
      ],
      "switchVerdict": { "level": "atencao", "headline": "Mesmo efeito, observe a adaptação", "explanation": "Explicação direta" },
      "spokenSummary": "Resumo curto falado explicando o que muda na troca"
    }
  ]
}`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(keys.geminiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        }),
      }
    );

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'GEMINI_LOOKUP_ERROR',
          message: 'Não foi possível consultar este medicamento pelo Gemini.',
          detail: detail.slice(0, 200),
        },
        { status: resp.status === 401 || resp.status === 403 ? 401 : 502 }
      );
    }

    const json = (await resp.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
    const raw = extractJsonObject(rawText) as Record<string, unknown>;

    const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : query;
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const accent = typeof raw.accentHex === 'string' && /^#[0-9a-f]{6}$/i.test(raw.accentHex) ? raw.accentHex : '#146356';

    const medication: Medication = {
      id: `ai-${slug || Date.now()}`,
      name,
      activeIngredient: String(raw.activeIngredient ?? name),
      strength: String(raw.strength ?? ''),
      manufacturer: String(raw.manufacturer ?? 'Referência'),
      category: (raw.category as Medication['category']) || 'outro',
      categoryLabel: String(raw.categoryLabel ?? 'Medicamento'),
      aliases: [name.toLowerCase(), query.toLowerCase()],
      pack: {
        style: (raw.packStyle as Medication['pack']['style']) || 'blister-box',
        primaryColor: '#E6F2EF',
        secondaryColor: '#B8DDD4',
        accentColor: accent,
        labelText: name.toUpperCase().slice(0, 12),
        pillColor: accent,
        stripeType: (raw.stripeType as Medication['pack']['stripeType']) || 'vermelha',
      },
      purposeSimple: String(raw.purposeSimple ?? 'Medicamento receitado pelo médico.'),
      howToTake: raw.howToTake as Medication['howToTake'],
      whatNotToDo: raw.whatNotToDo as Medication['whatNotToDo'],
      whatYouCanDo: raw.whatYouCanDo as Medication['whatYouCanDo'],
      genericsHighlight: raw.genericsHighlight as Medication['genericsHighlight'],
      equivalents: Array.isArray(raw.equivalents) ? (raw.equivalents as Medication['equivalents']) : [],
      aiGenerated: true,
    };

    return NextResponse.json({ provider: 'gemini', medication });
  } catch {
    return NextResponse.json(
      { error: 'LOOKUP_FAILED', message: 'Não consegui montar a ficha desse medicamento agora.' },
      { status: 500 }
    );
  }
}
