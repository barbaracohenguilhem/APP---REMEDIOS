import { describe, expect, it } from 'vitest';
import { MEDICATIONS_CATALOG } from '../data/medications';
import { BRAZILIAN_REGIONS } from '../data/regions';
import {
  calculateRegionalPrice,
  calculateSavingsPercent,
  formatBRL,
  getLowestGenericPrice,
} from '../services/pricing';
import { createCustomMedication } from '../services/medicationSearch';

describe('pricing service', () => {
  const iumi = MEDICATIONS_CATALOG.find((m) => m.id === 'iumi')!;
  const losartana = MEDICATIONS_CATALOG.find((m) => m.id === 'losartana')!;

  it('computes Iumi lowest generic in SP as R$ 28 (matching approved mockup)', () => {
    const lowest = getLowestGenericPrice(iumi, 'SP');
    expect(lowest.minPrice).toBe(28);
    expect(lowest.priceText).toBe('A partir de R$ 28 (SP)');
    expect(lowest.isFreeSus).toBe(false);
  });

  it('adjusts prices by Brazilian state (AM and RJ higher than SP)', () => {
    const emsGeneric = iumi.equivalents.find((e) => e.id === 'iumi-gen-ems')!;
    const sp = calculateRegionalPrice(emsGeneric, 'SP');
    const rj = calculateRegionalPrice(emsGeneric, 'RJ');
    const am = calculateRegionalPrice(emsGeneric, 'AM');

    expect(sp.min).toBeLessThan(rj.min);
    expect(rj.min).toBeLessThan(am.min);
  });

  it('falls back gracefully to Brasil when UF is unknown', () => {
    const lowest = getLowestGenericPrice(iumi, 'INVALID_UF');
    expect(lowest.priceText).toContain('(Brasil)');
    expect(lowest.priceText).not.toContain('INVALID_UF');
  });

  it('identifies Farmácia Popular free medications with 100% savings', () => {
    const lowest = getLowestGenericPrice(losartana, 'SP');
    expect(lowest.isFreeSus).toBe(true);
    expect(lowest.priceText).toBe('Grátis no SUS (SP)');

    const ref = losartana.equivalents[0];
    const freeGen = losartana.equivalents[1];
    expect(calculateSavingsPercent(ref, freeGen, 'SP')).toBe(100);
  });

  it('returns "Consulte farmácia" for custom medications with unknown 0 price', () => {
    const custom = createCustomMedication({ name: 'Vitamina D 2000UI' });
    const lowest = getLowestGenericPrice(custom, 'SP');
    expect(lowest.priceText).toBe('Consulte farmácia (SP)');
    expect(lowest.priceText).not.toContain('R$ 1');

    const range = calculateRegionalPrice(custom.equivalents[0], 'SP');
    expect(range.formattedRange).toBe('Consulte na farmácia');
  });

  it('formats edge-case BRL numbers safely', () => {
    expect(formatBRL(0)).toBe('R$ 0');
    expect(formatBRL(-15)).toBe('R$ 0');
    expect(formatBRL(Number.NaN)).toBe('R$ 0');
    expect(formatBRL(28.4)).toBe('R$ 28');
  });

  it('covers all 27 Brazilian states + BR national average', () => {
    const ufs = new Set(BRAZILIAN_REGIONS.map((r) => r.uf));
    expect(BRAZILIAN_REGIONS).toHaveLength(28);
    for (const uf of ['BR', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']) {
      expect(ufs.has(uf)).toBe(true);
      const lowest = getLowestGenericPrice(iumi, uf);
      expect(lowest.minPrice).toBeGreaterThan(0);
    }
  });
});
