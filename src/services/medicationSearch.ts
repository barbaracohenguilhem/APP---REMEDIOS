import type { Medication, MedicationCategory } from '../types/medication';

export interface ParsedMedicationMatch {
  medication: Medication;
  matchedTerm: string;
  detectedTimes: string[];
  detectedDosage: string;
  confidence: 'alta' | 'media';
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

export function searchMedications(
  catalog: Medication[],
  query: string,
  category: MedicationCategory | 'todos' = 'todos'
): Medication[] {
  const filteredByCategory =
    category === 'todos' ? catalog : catalog.filter((m) => m.category === category);

  const q = normalizeText(query);
  if (!q) return filteredByCategory;

  const tokens = q.split(' ').filter((t) => t.length >= 2);
  if (tokens.length === 0) return filteredByCategory;

  const scored: { med: Medication; score: number }[] = [];

  for (const med of filteredByCategory) {
    const searchableFields = [
      normalizeText(med.name),
      normalizeText(med.activeIngredient),
      normalizeText(med.categoryLabel),
      normalizeText(med.purposeSimple),
      ...med.aliases.map(normalizeText),
      ...med.equivalents.map((e) => normalizeText(e.name)),
    ];

    let score = 0;
    const fullName = searchableFields[0];

    if (fullName === q) score += 100;
    else if (fullName.startsWith(q)) score += 70;
    else if (fullName.includes(q)) score += 50;

    for (const alias of med.aliases.map(normalizeText)) {
      if (alias === q) score += 80;
      else if (alias.includes(q) || q.includes(alias)) score += 35;
    }

    for (const token of tokens) {
      let tokenMatched = false;
      for (const field of searchableFields) {
        if (field.includes(token)) {
          score += 20;
          tokenMatched = true;
          break;
        }
      }
      // Fuzzy tolerance for phonetic / low-literacy spelling mistakes (e.g. "yumi", "losartan", "paracetamo")
      if (!tokenMatched && token.length >= 4) {
        const candidateWords = searchableFields
          .join(' ')
          .split(' ')
          .filter((w) => w.length >= 4);
        for (const word of candidateWords) {
          const maxDist = token.length >= 6 ? 2 : 1;
          if (levenshtein(token, word) <= maxDist) {
            score += 12;
            break;
          }
        }
      }
    }

    if (score > 0) {
      scored.push({ med, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).map((s) => s.med);
}

/**
 * Extracts HH:MM times from a Portuguese prescription snippet.
 * Supports formats like "08:00", "8h", "21h30", "às 20 horas", "de 8 em 8h", "6/6h", "manhã", "noite".
 */
export function extractTimesFromSnippet(text: string): string[] {
  const times = new Set<string>();

  // Match explicit HH:MM or HHhMM or HHh
  const explicitRegex = /\b([01]?\d|2[0-3])\s*(?::|h|hs|horas?)\s*([0-5]\d)?\b/gi;
  let match: RegExpExecArray | null;
  while ((match = explicitRegex.exec(text)) !== null) {
    // Avoid capturing intervals/durations like "8 em 8h", "6/6h", "até 4h", "por 4h", "após 2h"
    const rawPrefix = text.slice(Math.max(0, match.index - 12), match.index);
    const normPrefix = rawPrefix
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (/(?:em\s*|\/|cada\s*|ate\s*|por\s*|apos\s*|depois\s*de\s*)$/.test(normPrefix)) continue;

    // Also skip "de 6 em 6h", "6/6h", and relative durations without ":" like "2h antes" or "4h depois"
    // (Keep explicit clock times with ":" like "07:00 antes do café"!)
    const normSuffix = text
      .slice(match.index + match[0].length, match.index + match[0].length + 14)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const hasColon = match[0].includes(':');
    if (/^\s*(?:em\s+\d|\/\s*\d)/.test(normSuffix)) continue;
    if (!hasColon && /^\s*(?:antes\b|depois\b|apos\b|atras\b)/.test(normSuffix)) continue;

    const hour = Number(match[1]);
    const min = match[2] ? Number(match[2]) : 0;
    const formatted = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    times.add(formatted);
  }

  if (times.size === 0) {
    const lowerNoAccents = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (/\b(?:4\s*h?\s*(?:em|\/)\s*4|cada\s+4)\s*(?:h|hs|horas?)?\b/.test(lowerNoAccents)) {
      return ['06:00', '10:00', '14:00', '18:00', '22:00'];
    }
    if (/\b(?:6\s*h?\s*(?:em|\/)\s*6|cada\s+6)\s*(?:h|hs|horas?)?\b/.test(lowerNoAccents)) {
      return ['06:00', '12:00', '18:00', '00:00'];
    }
    if (/\b(?:8\s*h?\s*(?:em|\/)\s*8|cada\s+8)\s*(?:h|hs|horas?)?\b/.test(lowerNoAccents)) {
      return ['07:00', '15:00', '23:00'];
    }
    if (/\b(?:12\s*h?\s*(?:em|\/)\s*12|cada\s+12)\s*(?:h|hs|horas?)?\b/.test(lowerNoAccents)) {
      return ['08:00', '20:00'];
    }

    const norm = normalizeText(text);
    if (/\b(?:jejum|acordar)\b/.test(norm)) {
      times.add('07:00');
    } else if (/\b(?:manha|cafe)\b/.test(norm)) {
      times.add('08:00');
    }
    if (/\b(?:almoco)\b/.test(norm)) {
      times.add('12:00');
    }
    if (/\b(?:jantar)\b/.test(norm)) {
      times.add('20:00');
    }
    if (/\b(?:dormir|noite)\b/.test(norm)) {
      times.add('22:00');
    }
  }

  return Array.from(times).sort();
}

/**
 * Parses free text (from OCR, pasted WhatsApp prescription, photo filename, or voice dictation)
 * and identifies all matching medications from the catalog along with suggested schedule times.
 */
export function parsePrescriptionText(
  rawText: string,
  catalog: Medication[]
): ParsedMedicationMatch[] {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText
    .split(/\n|;|(?<=[.!?])\s+|(?=\d+\s*[).]\s+)/)
    .map((l) => l.trim())
    .filter(Boolean);

  const normalizedFull = normalizeText(rawText);
  const rawMatches: Array<{
    medication: Medication;
    matchedTerm: string;
    confidence: 'alta' | 'media';
  }> = [];

  for (const med of catalog) {
    const terms = Array.from(
      new Set([
        normalizeText(med.name),
        ...med.name.split('/').map((s) => normalizeText(s)),
        ...med.aliases.map(normalizeText),
        normalizeText(med.activeIngredient.split(' ')[0] ?? ''),
      ])
    ).filter((t) => t.length >= 4 && !['dor', 'sono', 'gotas', 'febre', 'gripe', 'pressao', 'estomago', 'alergia', 'diabetes', 'tireoide', 'infeccao', 'ansiedade', 'colesterol', 'anticoncepcional', 'antibiotico'].includes(t));

    let bestMatchedTerm: string | null = null;
    let confidence: 'alta' | 'media' = 'media';

    for (const term of terms) {
      const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalizedFull)) {
        bestMatchedTerm = term;
        confidence = 'alta';
        break;
      }
    }

    // Fallback fuzzy token check against words in text (helps noisy OCR like "Ium1", "Losartanna")
    if (!bestMatchedTerm) {
      const textWords = normalizedFull.split(' ').filter((w) => w.length >= 4);
      const primaryKey = normalizeText(med.name.split('/')[0] ?? med.name).split(' ')[0] ?? '';
      if (primaryKey.length >= 4) {
        for (const word of textWords) {
          const maxDist = primaryKey.length >= 7 ? 2 : 1;
          if (levenshtein(primaryKey, word) <= maxDist) {
            bestMatchedTerm = word;
            confidence = 'media';
            break;
          }
        }
      }
    }

    if (bestMatchedTerm && !rawMatches.some((r) => r.medication.id === med.id)) {
      rawMatches.push({
        medication: med,
        matchedTerm: bestMatchedTerm,
        confidence,
      });
    }
  }

  const normalizedLines = lines.map((l) => normalizeText(l));
  const results: ParsedMedicationMatch[] = [];

  for (const item of rawMatches) {
    const lineIdx = normalizedLines.findIndex((nl) => nl.includes(item.matchedTerm));
    let snippet = lineIdx >= 0 ? lines[lineIdx] : rawText;

    // If multiple matched medications share the same sentence/line, isolate this medication's clause
    if (lineIdx >= 0) {
      const normLine = normalizedLines[lineIdx];
      const siblingsOnLine = rawMatches
        .map((m) => ({ id: m.medication.id, pos: normLine.indexOf(m.matchedTerm) }))
        .filter((s) => s.pos >= 0)
        .sort((a, b) => a.pos - b.pos);

      if (siblingsOnLine.length > 1) {
        const myIdx = siblingsOnLine.findIndex((s) => s.id === item.medication.id);
        if (myIdx >= 0) {
          const startPos = siblingsOnLine[myIdx].pos;
          const endPos =
            myIdx + 1 < siblingsOnLine.length ? siblingsOnLine[myIdx + 1].pos : normLine.length;
          snippet = normLine.slice(startPos, endPos);
        }
      }
    }

    let lineTimes = extractTimesFromSnippet(snippet);

    // Classic Brazilian 2-line prescription: drug name on line N, dosage/time on line N+1
    if (lineTimes.length === 0 && lineIdx >= 0 && lineIdx + 1 < lines.length) {
      const nextNormLine = normalizedLines[lineIdx + 1];
      const nextLineMentionsOtherMed = rawMatches.some(
        (other) => other.medication.id !== item.medication.id && nextNormLine.includes(other.matchedTerm)
      );
      if (!nextLineMentionsOtherMed) {
        lineTimes = extractTimesFromSnippet(lines[lineIdx + 1]);
      }
    }

    results.push({
      medication: item.medication,
      matchedTerm: item.matchedTerm,
      detectedTimes: lineTimes.length > 0 ? lineTimes : item.medication.howToTake.defaultTimes,
      detectedDosage: item.medication.howToTake.defaultDosage,
      confidence: item.confidence,
    });
  }

  return results;
}

/**
 * Creates a user-owned custom medication when the person adds a medicine not yet in the pre-loaded catalog.
 */
export function createCustomMedication(input: {
  name: string;
  activeIngredient?: string;
  dosage?: string;
  notes?: string;
  colorTheme?: 'teal' | 'pink' | 'blue' | 'amber' | 'purple';
}): Medication {
  const cleanName = input.name.trim() || 'Meu Remédio';
  const slug = normalizeText(cleanName).replace(/\s+/g, '-').slice(0, 24) || 'custom';
  const id = `custom-${slug}-${Date.now()}`;

  const themes = {
    teal: { primaryColor: '#CCFBF1', secondaryColor: '#5EEAD4', accentColor: '#0F766E', pillColor: '#14B8A6' },
    pink: { primaryColor: '#FCE7F3', secondaryColor: '#F9A8D4', accentColor: '#9D174D', pillColor: '#F472B6' },
    blue: { primaryColor: '#DBEAFE', secondaryColor: '#93C5FD', accentColor: '#1E40AF', pillColor: '#3B82F6' },
    amber: { primaryColor: '#FEF3C7', secondaryColor: '#FDE68A', accentColor: '#B45309', pillColor: '#F59E0B' },
    purple: { primaryColor: '#EDE9FE', secondaryColor: '#C4B5FD', accentColor: '#5B21B6', pillColor: '#8B5CF6' },
  };
  const palette = themes[input.colorTheme ?? 'teal'];
  const dosage = input.dosage?.trim() || '1 comprimido';
  const notes = input.notes?.trim() || 'Siga a receita do seu médico e tome com água.';

  return {
    id,
    name: cleanName,
    activeIngredient: input.activeIngredient?.trim() || 'Medicamento cadastrado por você',
    strength: dosage,
    manufacturer: 'Receita pessoal',
    category: 'outro',
    categoryLabel: 'Meu Cadastro',
    aliases: [cleanName.toLowerCase()],
    pack: {
      style: 'blister-box',
      ...palette,
      labelText: cleanName.toUpperCase().slice(0, 11),
      stripeType: 'vermelha',
    },
    purposeSimple: notes,
    howToTake: {
      items: [
        { icon: 'pill', shortLabel: dosage.slice(0, 14), spokenDetail: `Dose cadastrada: ${dosage}.` },
        { icon: 'clock', shortLabel: 'No horário', spokenDetail: 'Tome sempre no horário marcado no seu alarme.' },
        { icon: 'water', shortLabel: 'Com água', spokenDetail: 'Tome com um copo de água, salvo orientação diferente.' },
      ],
      summary: notes,
      spokenScript: `Como tomar ${cleanName}: ${dosage}. ${notes}`,
      defaultDosage: dosage,
      defaultTimes: ['08:00'],
    },
    whatNotToDo: {
      items: [
        { icon: 'no-alcohol', shortLabel: 'Evite álcool', spokenDetail: 'Evite bebidas alcoólicas sem perguntar ao médico ou farmacêutico.' },
        { icon: 'alert-triangle', shortLabel: 'Não dobre dose', spokenDetail: 'Se esquecer, não tome duas doses de uma vez sem orientação.' },
        { icon: 'doctor', shortLabel: 'Confirme bula', spokenDetail: 'Em caso de dúvida ou reação estranha, consulte o médico ou farmacêutico.' },
      ],
      summary: 'Nunca dobre a dose se esquecer e evite misturar com álcool.',
      spokenScript: `Cuidados com ${cleanName}: evite álcool, não dobre a dose se esquecer e tire dúvidas com seu médico ou farmacêutico.`,
    },
    whatYouCanDo: {
      items: [
        { icon: 'shield-check', shortLabel: 'Use o alarme', spokenDetail: 'Ative o lembrete na aba Horários para não esquecer.' },
        { icon: 'doctor', shortLabel: 'Peça o genérico', spokenDetail: 'Na farmácia, pergunte ao farmacêutico se existe genérico bioequivalente e se há diferenças de excipientes.' },
      ],
      missedDoseTip: 'Se esquecer uma dose, confira a receita ou pergunte ao farmacêutico. Não dobre a quantidade.',
      onsetTime: 'Conforme orientação da sua receita médica.',
      spokenScript: `Você pode configurar alarmes para ${cleanName} na aba Horários e conferir opções genéricas com seu farmacêutico.`,
    },
    genericsHighlight: {
      sameEffectBadge: 'Pergunte na farmácia',
      switchWarningShort: 'Ao trocar de marca, observe excipientes, lactose e revestimento',
      spokenScript: `Para ${cleanName}, pergunte ao farmacêutico se há genérico bioequivalente com a tarja amarela G e fique atento a diferenças de revestimento ou lactose na troca.`,
    },
    equivalents: [
      {
        id: `${id}-ref`,
        name: `${cleanName} (Cadastrado)`,
        lab: 'Conforme sua receita',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 0,
        basePriceMax: 0,
        coatingOrTech: 'Confira a caixa do seu medicamento',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Verifique na embalagem se contém lactose, açúcar ou corantes caso tenha alergia.',
        },
        absorptionNote: 'Se trocar de marca ou laboratório, observe nos primeiros dias se nota qualquer sintoma novo (como inchaço ou dor de estômago).',
        switchingEffects: [],
        switchVerdict: {
          level: 'atencao',
          headline: 'Medicamento cadastrado manualmente',
          explanation: 'Peça ao farmacêutico a lista de genéricos intercambiáveis registrados na ANVISA para esta molécula.',
        },
        spokenSummary: `${cleanName} foi cadastrado manualmente por você. Pergunte ao farmacêutico sobre genéricos registrados na ANVISA.`,
      },
    ],
    isCustom: true,
  };
}
