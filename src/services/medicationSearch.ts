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

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PRESCRIPTION_ABBREVIATIONS = new Set([
  'comp',
  'cp',
  'caps',
  'gts',
  'dr',
  'dra',
  'mg',
  'ml',
  'mcg',
  'cx',
  'fr',
  'un',
  'amp',
  'env',
  'obs',
  'ex',
  'lab',
]);

const NON_DRUG_STOPWORDS = new Set([
  'dor',
  'sono',
  'gotas',
  'febre',
  'gripe',
  'pressao',
  'estomago',
  'alergia',
  'diabetes',
  'tireoide',
  'infeccao',
  'ansiedade',
  'colesterol',
  'anticoncepcional',
  'antibiotico',
  // Pharmaceutical salt / generic descriptor prefixes that are not unique active ingredients
  'cloridrato',
  'oxalato',
  'maleato',
  'sulfato',
  'tartarato',
  'fosfato',
  'mesilato',
  'besilato',
  'sodio',
  'sodico',
  'sodica',
  'potassica',
  'calcica',
  'medicamento',
]);

function splitPrescriptionLines(rawText: string): string[] {
  const result: string[] = [];
  // First split on hard delimiters (newlines, semicolons, and numbered list items like "1) " / "2. ")
  const blocks = rawText
    .split(/\n|;|(?=(?:^|\s)\d+\s*[).]\s+)/)
    .map((b) => b.trim())
    .filter(Boolean);

  for (const block of blocks) {
    let start = 0;
    const sentenceBreakRegex = /([.!?])\s+/g;
    let m: RegExpExecArray | null;
    while ((m = sentenceBreakRegex.exec(block)) !== null) {
      const punct = m[1];
      if (punct === '.') {
        const beforeDot = block.slice(start, m.index);
        const lastTokenMatch = /([A-Za-zÀ-ÿ0-9]+)$/.exec(beforeDot);
        const lastTokenNorm = lastTokenMatch
          ? lastTokenMatch[1]
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          : '';
        // Do not split after list numbers ("1. Losartana") or Portuguese prescription abbreviations ("1 comp. 6/6h")
        if (
          PRESCRIPTION_ABBREVIATIONS.has(lastTokenNorm) ||
          (/^\d+$/.test(lastTokenNorm) && beforeDot.trim() === lastTokenNorm)
        ) {
          continue;
        }
      }

      const piece = block.slice(start, m.index + 1).trim();
      if (piece) result.push(piece);
      start = m.index + m[0].length;
    }

    const tail = block.slice(start).trim();
    if (tail) result.push(tail);
  }

  return result;
}

function findClauseSplitOffset(between: string): number | null {
  // Find candidate clause separators between two medications on the same line:
  // commas, standalone conjunctions ("e", "ou"), pipes/pluses, spaced dashes, or non-interval slashes
  const sepRegex = /,|\||\+|\s+[-–—]\s+|\s+(?:e|ou)\s+|\s*\/\s*/gi;
  let lastSplit: number | null = null;
  let match: RegExpExecArray | null;

  while ((match = sepRegex.exec(between)) !== null) {
    const token = match[0];
    const startIdx = match.index;
    const endIdx = startIdx + token.length;
    const left = between.slice(0, startIdx);
    const right = between.slice(endIdx);

    if (token.includes('/')) {
      // Never split inside slash intervals like "6/6h", "8 / 8h", "8h / 8h" or dates like "8/8/2026"
      const leftEndsIntervalNum = /\b(?:4|6|8|12|24)\s*(?:h|hs|horas?)?$/i.test(left.trimEnd());
      const rightStartsIntervalNum = /^(?:4|6|8|12|24)(?:\s*(?:h|hs|horas?)\b|\b)/i.test(
        right.trimStart()
      );
      const betweenDigits = /\d$/.test(left.trimEnd()) && /^\d/.test(right.trimStart());
      if ((leftEndsIntervalNum && rightStartsIntervalNum) || (betweenDigits && !right.trimStart().includes(':'))) {
        continue;
      }
    }

    if (/^\s+(?:e|ou)\s+$/i.test(token)) {
      // Do not split a paired clock time belonging to the left medication (e.g., "08:00 e 20:00 Amoxicilina 8/8h")
      const leftEndsClockTime = /\b(?:[01]?\d|2[0-3])\s*(?::[0-5]\d|h(?:[0-5]\d)?)\s*$/i.test(left);
      const rightIsBareClockTimeOnly =
        /^(?:[01]?\d|2[0-3])\s*(?::[0-5]\d|h(?:[0-5]\d)?)\s*$/i.test(right.trim());
      if (leftEndsClockTime && rightIsBareClockTimeOnly) {
        continue;
      }
    }

    lastSplit = endIdx;
  }

  return lastSplit;
}

function stripLeadingPrescriptionHeader(prefix: string): string {
  // Remove leading metadata headers like "Receita 14:00 - " before the first drug so header timestamps
  // aren't misread as medication times, while keeping true pre-drug schedules like "Às 09:00 " or "08:00 - ".
  const dashIdx = prefix.search(/\s+[-–—]\s+/);
  if (dashIdx >= 0) {
    const beforeDash = normalizeText(prefix.slice(0, dashIdx));
    if (/\b(?:receita|prescricao|data|emitida|emitido|consulta|paciente|crm)\b/.test(beforeDash)) {
      return prefix.slice(dashIdx).replace(/^\s+[-–—]\s+/, '');
    }
  }
  return prefix;
}

function buildNormalizedWithIndexMap(raw: string): { norm: string; indexMap: number[] } {
  let norm = '';
  const indexMap: number[] = [];
  let prevWasSpace = true;

  for (let i = 0; i < raw.length; i++) {
    const base = raw[i]
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (!base) continue;

    for (let j = 0; j < base.length; j++) {
      const ch = base[j];
      if (/[a-z0-9:]/.test(ch)) {
        norm += ch;
        indexMap.push(i);
        prevWasSpace = false;
      } else if (!prevWasSpace) {
        norm += ' ';
        indexMap.push(i);
        prevWasSpace = true;
      }
    }
  }

  if (norm.endsWith(' ')) {
    norm = norm.slice(0, -1);
    indexMap.pop();
  }

  return { norm, indexMap };
}

function findNormalizedTermPos(normText: string, term: string): number {
  if (!term) return -1;
  const escaped = escapeRegExp(term);
  const wordBoundaryMatch = new RegExp(`\\b${escaped}\\b`).exec(normText);
  if (wordBoundaryMatch) return wordBoundaryMatch.index;

  const tokenBoundaryMatch = new RegExp(`(?:^|[^a-z0-9])(${escaped})(?=$|[^a-z0-9])`).exec(
    normText
  );
  if (tokenBoundaryMatch) {
    return tokenBoundaryMatch.index + tokenBoundaryMatch[0].indexOf(tokenBoundaryMatch[1]);
  }

  return -1;
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
    // Avoid capturing intervals/durations like "8 em 8h", "6/6h", "até 4h", "por 4h", "durante 4h", "após 2h"
    const rawPrefix = text.slice(Math.max(0, match.index - 14), match.index);
    const normPrefix = rawPrefix
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (/(?:em\s*|\/\s*|cada\s*|ate\s*|por\s*|durante\s*|apos\s*|depois\s*de\s*)$/.test(normPrefix)) {
      continue;
    }

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

    const hasInterval = (n: number): boolean => {
      const unit = '(?:h|hs|horas?)';
      // Explicit unit form: "6/6h", "6h/6h", "6hs/6hs", "6 horas / 6 horas", "6 em 6h", "cada 6h"
      const withUnit = new RegExp(
        `\\b(?:${n}\\s*${unit}?\\s*(?:em|\\/)\\s*${n}|cada\\s+${n})\\s*${unit}\\b`
      );
      if (withUnit.test(lowerNoAccents)) return true;

      // Unitless form: "6/6", "6 em 6", "cada 6" — guard against calendar dates like "8/8/2026"
      const withoutUnit = new RegExp(
        `(?<!\\d\\s*\\/)\\b(?:${n}\\s*(?:em|\\/)\\s*${n}|cada\\s+${n})\\b(?!\\s*\\/\\s*\\d)`
      );
      return withoutUnit.test(lowerNoAccents);
    };

    if (hasInterval(4)) {
      return ['06:00', '10:00', '14:00', '18:00', '22:00'];
    }
    if (hasInterval(6)) {
      return ['06:00', '12:00', '18:00', '00:00'];
    }
    if (hasInterval(8)) {
      return ['07:00', '15:00', '23:00'];
    }
    if (hasInterval(12)) {
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

  const lines = splitPrescriptionLines(rawText);

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
    ).filter((t) => t.length >= 4 && !NON_DRUG_STOPWORDS.has(t));

    let bestMatchedTerm: string | null = null;
    let confidence: 'alta' | 'media' = 'media';

    for (const term of terms) {
      const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i');
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

  const indexedLines = lines.map((rawLine) => ({
    rawLine,
    ...buildNormalizedWithIndexMap(rawLine),
  }));
  const results: ParsedMedicationMatch[] = [];

  for (const item of rawMatches) {
    const lineIdx = indexedLines.findIndex(
      ({ norm }) => findNormalizedTermPos(norm, item.matchedTerm) >= 0
    );

    let lineTimes: string[] = [];

    if (lineIdx >= 0) {
      const { rawLine, norm: normLine, indexMap } = indexedLines[lineIdx];
      const siblingsOnLine = rawMatches
        .map((m) => {
          const normStart = findNormalizedTermPos(normLine, m.matchedTerm);
          if (normStart < 0) return { id: m.medication.id, rawStart: -1, rawEnd: -1 };
          const rawStart = indexMap[normStart];
          const normEndIdx = Math.min(indexMap.length - 1, normStart + m.matchedTerm.length - 1);
          let rawEnd = (indexMap[normEndIdx] ?? rawStart) + 1;
          while (rawEnd < rawLine.length && /[\u0300-\u036f]/.test(rawLine[rawEnd])) {
            rawEnd += 1;
          }
          return { id: m.medication.id, rawStart, rawEnd };
        })
        .filter((s) => s.rawStart >= 0)
        .sort((a, b) => a.rawStart - b.rawStart);

      if (siblingsOnLine.length > 1) {
        const myIdx = siblingsOnLine.findIndex((s) => s.id === item.medication.id);
        if (myIdx >= 0) {
          // Compute raw clause boundaries between adjacent medications so both post-drug
          // ("Dipirona 6/6h e Amoxicilina 8/8h") and pre-drug ("Às 09:00 Losartana e às 18:00 Amoxicilina")
          // schedules stay scoped to the right medication while preserving raw punctuation like "/".
          const boundaries: number[] = [0];
          for (let k = 0; k < siblingsOnLine.length - 1; k++) {
            const leftEnd = Math.min(siblingsOnLine[k].rawEnd, siblingsOnLine[k + 1].rawStart);
            const rightStart = siblingsOnLine[k + 1].rawStart;
            const between = rawLine.slice(leftEnd, rightStart);
            const splitOffset = findClauseSplitOffset(between);
            boundaries.push(splitOffset !== null ? leftEnd + splitOffset : rightStart);
          }
          boundaries.push(rawLine.length);

          const my = siblingsOnLine[myIdx];
          const clauseStart = boundaries[myIdx];
          const clauseEnd = boundaries[myIdx + 1];

          // Prefer times written after the drug name within its clause; if none, check its pre-drug prefix.
          const afterDrug = rawLine.slice(my.rawStart, Math.max(my.rawStart, clauseEnd));
          lineTimes = extractTimesFromSnippet(afterDrug);

          if (lineTimes.length === 0 && my.rawStart > clauseStart) {
            const rawPrefix = rawLine.slice(clauseStart, my.rawStart);
            const cleanPrefix =
              myIdx === 0 ? stripLeadingPrescriptionHeader(rawPrefix) : rawPrefix;
            lineTimes = extractTimesFromSnippet(cleanPrefix);
          }
        }
      } else {
        lineTimes = extractTimesFromSnippet(stripLeadingPrescriptionHeader(rawLine));
      }
    } else {
      lineTimes = extractTimesFromSnippet(rawText);
    }

    // Classic Brazilian 2-line prescription: drug name on line N, dosage/time on line N+1
    if (lineTimes.length === 0 && lineIdx >= 0 && lineIdx + 1 < indexedLines.length) {
      const nextLine = indexedLines[lineIdx + 1];
      const nextLineMentionsOtherMed = rawMatches.some(
        (other) =>
          other.medication.id !== item.medication.id &&
          findNormalizedTermPos(nextLine.norm, other.matchedTerm) >= 0
      );
      if (!nextLineMentionsOtherMed) {
        lineTimes = extractTimesFromSnippet(nextLine.rawLine);
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
