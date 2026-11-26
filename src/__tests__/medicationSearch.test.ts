import { describe, expect, it } from 'vitest';
import { MEDICATIONS_CATALOG } from '../data/medications';
import { SAMPLE_PRESCRIPTIONS } from '../data/samplePrescriptions';
import {
  createCustomMedication,
  extractTimesFromSnippet,
  parsePrescriptionText,
  searchMedications,
} from '../services/medicationSearch';

describe('medicationSearch service', () => {
  it('supports accent-insensitive and fuzzy low-literacy searches', () => {
    expect(searchMedications(MEDICATIONS_CATALOG, 'yumi')[0]?.id).toBe('iumi');
    expect(searchMedications(MEDICATIONS_CATALOG, 'glifaji')[0]?.id).toBe('glifage-xr');
    expect(searchMedications(MEDICATIONS_CATALOG, 'pressao')[0]?.id).toBe('losartana');
    expect(searchMedications(MEDICATIONS_CATALOG, 'estomago')[0]?.id).toBe('losec-mups');
    expect(searchMedications(MEDICATIONS_CATALOG, 'losartanna')[0]?.id).toBe('losartana');
  });

  it('filters by category accurately', () => {
    const diabetesMeds = searchMedications(MEDICATIONS_CATALOG, '', 'diabetes');
    expect(diabetesMeds.length).toBeGreaterThan(0);
    expect(diabetesMeds.every((m) => m.category === 'diabetes')).toBe(true);
  });

  it('extracts clock times and intervals without misreading warnings like "até 4h"', () => {
    expect(extractTimesFromSnippet('Tomar 1 comprimido às 08:00 e 20:00')).toEqual([
      '08:00',
      '20:00',
    ]);
    expect(extractTimesFromSnippet('Tomar às 21h30')).toEqual(['21:30']);
    expect(extractTimesFromSnippet('Dipirona 1g de 6 em 6h')).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(extractTimesFromSnippet('Amoxicilina 8/8h')).toEqual(['07:00', '15:00', '23:00']);
    expect(extractTimesFromSnippet('Vômito até 4h depois de tomar')).toEqual([]);
    expect(extractTimesFromSnippet('Tomar em jejum ao acordar')).toEqual(['07:00']);
  });

  it('parses all sample Brazilian prescriptions with accurate per-medicine schedules', () => {
    // Sample 1: Losartana 08:00 + Glifage XR 20:00
    const s1 = parsePrescriptionText(SAMPLE_PRESCRIPTIONS[0].extractedText, MEDICATIONS_CATALOG);
    const losartanaMatch = s1.find((m) => m.medication.id === 'losartana');
    const glifageMatch = s1.find((m) => m.medication.id === 'glifage-xr');
    expect(losartanaMatch?.detectedTimes).toEqual(['08:00']);
    expect(glifageMatch?.detectedTimes).toEqual(['20:00']);

    // Sample 2: WhatsApp multi-sentence with Iumi 21:00 and Dipirona 6 em 6h
    const s2 = parsePrescriptionText(SAMPLE_PRESCRIPTIONS[1].extractedText, MEDICATIONS_CATALOG);
    const iumiMatch = s2.find((m) => m.medication.id === 'iumi');
    const dipironaMatch = s2.find((m) => m.medication.id === 'novalgina');
    expect(iumiMatch?.detectedTimes).toEqual(['21:00']);
    expect(dipironaMatch?.detectedTimes).toEqual(['06:00', '12:00', '18:00', '00:00']);

    // Sample 3: Puran T4 06:30 + Losec MUPS 07:00
    const s3 = parsePrescriptionText(SAMPLE_PRESCRIPTIONS[2].extractedText, MEDICATIONS_CATALOG);
    const puranMatch = s3.find((m) => m.medication.id === 'puran-t4');
    const losecMatch = s3.find((m) => m.medication.id === 'losec-mups');
    expect(puranMatch?.detectedTimes).toEqual(['06:30']);
    expect(losecMatch?.detectedTimes).toEqual(['07:00']);
  });

  it('handles empty or noisy text safely', () => {
    expect(parsePrescriptionText('', MEDICATIONS_CATALOG)).toEqual([]);
    expect(parsePrescriptionText('   \n  ', MEDICATIONS_CATALOG)).toEqual([]);
    const noisy = parsePrescriptionText('Receita: Ium1 1 comp as 22:00', MEDICATIONS_CATALOG);
    expect(noisy[0]?.medication.id).toBe('iumi');
    expect(noisy[0]?.detectedTimes).toEqual(['22:00']);
  });

  it('creates valid custom medications even with minimal fields', () => {
    const med = createCustomMedication({ name: '   ' });
    expect(med.name).toBe('Meu Remédio');
    expect(med.isCustom).toBe(true);
    expect(med.howToTake.items.length).toBeGreaterThan(0);
    expect(med.equivalents.length).toBe(1);
  });

  it('avoids misparsing relative durations ("2h antes") as 02:00 and supports "a cada Xh" / 2-line prescriptions / same-line multi-meds', () => {
    // Relative duration should NOT produce 02:00
    expect(extractTimesFromSnippet('Tomar 1 comp 2h antes do almoço')).not.toContain('02:00');
    expect(extractTimesFromSnippet('Tomar 1 comp a cada 12h')).toEqual(['08:00', '20:00']);
    expect(extractTimesFromSnippet('Tomar 1 comp a cada 8 horas')).toEqual(['07:00', '15:00', '23:00']);
    expect(extractTimesFromSnippet('Tomar de 4 em 4h')).toEqual([
      '06:00',
      '10:00',
      '14:00',
      '18:00',
      '22:00',
    ]);

    // Standard 2-line Brazilian prescription (name on line 1, dosage + custom time on line 2)
    const twoLineRx = parsePrescriptionText(
      'Losartana 50 mg\nTomar 1 comprimido às 19:00\nGlifage XR 500 mg\nTomar 1 comprimido às 12:00',
      MEDICATIONS_CATALOG
    );
    expect(twoLineRx.find((m) => m.medication.id === 'losartana')?.detectedTimes).toEqual(['19:00']);
    expect(twoLineRx.find((m) => m.medication.id === 'glifage-xr')?.detectedTimes).toEqual(['12:00']);

    // Single sentence mentioning two different medications with distinct periods
    const sameLineRx = parsePrescriptionText(
      'Tomar Escitalopram 10mg pela manhã e Atorvastatina 20mg à noite',
      MEDICATIONS_CATALOG
    );
    expect(sameLineRx.find((m) => m.medication.id === 'lexapro')?.detectedTimes).toEqual(['08:00']);
    expect(sameLineRx.find((m) => m.medication.id === 'lipitor')?.detectedTimes).toEqual(['22:00']);
  });

  it('preserves slash intervals (4/4h, 6/6h, 8/8h, 12/12h) when multiple medications share the same line', () => {
    const multiSlash = parsePrescriptionText(
      'Dipirona 1g 6/6h e Amoxicilina 500mg 8/8h',
      MEDICATIONS_CATALOG
    );
    expect(multiSlash.find((m) => m.medication.id === 'novalgina')?.detectedTimes).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(multiSlash.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);

    const tripleSlash = parsePrescriptionText(
      'Dipirona 500mg 4/4h, Amoxicilina 500mg 8/8h e Glifage XR 12/12h',
      MEDICATIONS_CATALOG
    );
    expect(tripleSlash.find((m) => m.medication.id === 'novalgina')?.detectedTimes).toEqual([
      '06:00',
      '10:00',
      '14:00',
      '18:00',
      '22:00',
    ]);
    expect(tripleSlash.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);
    expect(tripleSlash.find((m) => m.medication.id === 'glifage-xr')?.detectedTimes).toEqual([
      '08:00',
      '20:00',
    ]);

    // Reversed order, spaced slashes, leading unrelated clock time, and hyphenated/accented names
    const complexLine = parsePrescriptionText(
      'Receita 14:00 - AMOXICILINA 500mg 8 / 8h e Dipirona 1g 6/6h',
      MEDICATIONS_CATALOG
    );
    expect(complexLine.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);
    expect(complexLine.find((m) => m.medication.id === 'novalgina')?.detectedTimes).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);

    const mixedHyphenAndSlash = parsePrescriptionText(
      'Puran-T4 50mcg às 06:30 e Novalgina 1g 6/6h',
      MEDICATIONS_CATALOG
    );
    expect(mixedHyphenAndSlash.find((m) => m.medication.id === 'puran-t4')?.detectedTimes).toEqual([
      '06:30',
    ]);
    expect(
      mixedHyphenAndSlash.find((m) => m.medication.id === 'novalgina')?.detectedTimes
    ).toEqual(['06:00', '12:00', '18:00', '00:00']);

    // Direct extractTimesFromSnippet edge cases with spaced slashes & "6h/6h"
    expect(extractTimesFromSnippet('Dipirona 6 / 6h')).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(extractTimesFromSnippet('Tomar 12 / 12 horas')).toEqual(['08:00', '20:00']);
    expect(extractTimesFromSnippet('Dipirona 6h/6h')).toEqual(['06:00', '12:00', '18:00', '00:00']);
  });

  it('handles pre-drug times, mixed schedules, comp./caps. abbreviations, slash variants, dates, and salt prefixes accurately', () => {
    // Pre-positioned clock times on shared line must not steal the next medication's time
    const preClock = parsePrescriptionText(
      'Às 09:00 Losartana 50mg e às 18:00 Amoxicilina 500mg',
      MEDICATIONS_CATALOG
    );
    expect(preClock.find((m) => m.medication.id === 'losartana')?.detectedTimes).toEqual(['09:00']);
    expect(preClock.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '18:00',
    ]);

    // Pre-positioned times with spaced dashes ("08:00 - Drug e 20:00 - Drug")
    const preDash = parsePrescriptionText(
      '08:00 - Losartana 50mg e 20:00 - Glifage XR 500mg',
      MEDICATIONS_CATALOG
    );
    expect(preDash.find((m) => m.medication.id === 'losartana')?.detectedTimes).toEqual(['08:00']);
    expect(preDash.find((m) => m.medication.id === 'glifage-xr')?.detectedTimes).toEqual(['20:00']);

    // Pre-positioned slash intervals on shared line
    const preSlash = parsePrescriptionText(
      '6/6h Dipirona 1g e 8/8h Amoxicilina 500mg',
      MEDICATIONS_CATALOG
    );
    expect(preSlash.find((m) => m.medication.id === 'novalgina')?.detectedTimes).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(preSlash.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);

    // Mixed post-drug slash interval + pre-drug explicit time
    const mixed = parsePrescriptionText('Dipirona 1g 6/6h, às 21:00 Iumi', MEDICATIONS_CATALOG);
    expect(mixed.find((m) => m.medication.id === 'novalgina')?.detectedTimes).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(mixed.find((m) => m.medication.id === 'iumi')?.detectedTimes).toEqual(['21:00']);

    // Pre-positioned period labels ("Manhã: ... e Noite: ...")
    const prePeriod = parsePrescriptionText(
      'Manhã: Losartana 50mg e Noite: Atorvastatina 20mg',
      MEDICATIONS_CATALOG
    );
    expect(prePeriod.find((m) => m.medication.id === 'losartana')?.detectedTimes).toEqual(['08:00']);
    expect(prePeriod.find((m) => m.medication.id === 'lipitor')?.detectedTimes).toEqual(['22:00']);

    // Paired clock times without comma before next medication
    const pairedNoComma = parsePrescriptionText(
      'Losartana 50mg às 08:00 e 20:00 Amoxicilina 500mg 8/8h',
      MEDICATIONS_CATALOG
    );
    expect(pairedNoComma.find((m) => m.medication.id === 'losartana')?.detectedTimes).toEqual([
      '08:00',
      '20:00',
    ]);
    expect(pairedNoComma.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);

    // Common Portuguese abbreviations (comp., caps.) must not split sentence prematurely
    const withAbbrev = parsePrescriptionText(
      'Dipirona 500mg 1 comp. 6/6h e Amoxicilina 500mg 1 caps. 8/8h',
      MEDICATIONS_CATALOG
    );
    expect(withAbbrev.find((m) => m.medication.id === 'novalgina')?.detectedTimes).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(withAbbrev.find((m) => m.medication.id === 'amoxicilina')?.detectedTimes).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);

    // Extended slash/hour unit variants and calendar-date non-false-positive
    expect(extractTimesFromSnippet('Dipirona 1g 6hs/6hs')).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(extractTimesFromSnippet('Amoxicilina 8 horas / 8 horas')).toEqual([
      '07:00',
      '15:00',
      '23:00',
    ]);
    expect(extractTimesFromSnippet('Dipirona de 6 horas em 6 horas')).toEqual([
      '06:00',
      '12:00',
      '18:00',
      '00:00',
    ]);
    expect(extractTimesFromSnippet('Dipirona 6/6')).toEqual(['06:00', '12:00', '18:00', '00:00']);
    expect(extractTimesFromSnippet('Receita 8/8/2026 - Losartana 50mg')).toEqual([]);
    expect(extractTimesFromSnippet('Data 6/6/26')).toEqual([]);

    const dateRx = parsePrescriptionText('Receita 8/8/2026 - Losartana 50mg', MEDICATIONS_CATALOG);
    expect(dateRx.find((m) => m.medication.id === 'losartana')?.detectedTimes).toEqual(['08:00']);

    // Salt prefix ("Cloridrato") must not cross-match diabetes medicine Glifage XR on Allegra prescription
    const saltRx = parsePrescriptionText(
      'Cloridrato de Fexofenadina 120mg 12/12h',
      MEDICATIONS_CATALOG
    );
    expect(saltRx.map((m) => m.medication.id)).toEqual(['allegra']);
    expect(saltRx[0]?.detectedTimes).toEqual(['08:00', '20:00']);

    // Custom medication without activeIngredient must not falsely match generic word "medicamento"
    const customMed = createCustomMedication({ name: 'Vitamina D 2000UI' });
    const withCustom = parsePrescriptionText('Tomar medicamento Losartana 50mg às 08:00', [
      ...MEDICATIONS_CATALOG,
      customMed,
    ]);
    expect(withCustom.map((m) => m.medication.id)).toEqual(['losartana']);
  });
});
