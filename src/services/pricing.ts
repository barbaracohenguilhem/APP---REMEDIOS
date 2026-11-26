import { getRegionByUf } from '../data/regions';
import type { EquivalentProduct, Medication } from '../types/medication';

export interface RegionalPriceRange {
  min: number;
  max: number;
  isFreeSus: boolean;
  formattedMin: string;
  formattedRange: string;
}

export function calculateRegionalPrice(
  product: EquivalentProduct,
  uf: string
): RegionalPriceRange {
  const region = getRegionByUf(uf);
  const isFreeSus = Boolean(product.farmaciaPopularFree && product.basePriceMin === 0);

  if (!isFreeSus && product.basePriceMin <= 0 && product.basePriceMax <= 0) {
    return {
      min: 0,
      max: 0,
      isFreeSus: false,
      formattedMin: 'Consulte farmácia',
      formattedRange: 'Consulte na farmácia',
    };
  }

  const min = isFreeSus ? 0 : Math.max(1, Math.round(product.basePriceMin * region.priceMultiplier));
  const max = Math.max(min, Math.round(product.basePriceMax * region.priceMultiplier));

  const formattedMin = isFreeSus ? 'Grátis (SUS)' : formatBRL(min);
  const formattedRange = isFreeSus
    ? `Grátis no SUS · ou até ${formatBRL(max)}`
    : min === max
      ? formatBRL(min)
      : `${formatBRL(min)} – ${formatBRL(max)}`;

  return {
    min,
    max,
    isFreeSus,
    formattedMin,
    formattedRange,
  };
}

export function formatBRL(value: number): string {
  if (!Number.isFinite(value) || value < 0) return 'R$ 0';
  const rounded = Math.round(value);
  return `R$ ${rounded.toLocaleString('pt-BR')}`;
}

export function getLowestGenericPrice(medication: Medication, uf: string): {
  priceText: string;
  isFreeSus: boolean;
  minPrice: number;
  cheapestProduct: EquivalentProduct | null;
} {
  const alternatives = medication.equivalents.filter((eq) => eq.type !== 'referencia');
  const pool = alternatives.length > 0 ? alternatives : medication.equivalents;

  if (pool.length === 0) {
    return {
      priceText: 'Consulte farmácia',
      isFreeSus: false,
      minPrice: 0,
      cheapestProduct: null,
    };
  }

  let bestProduct = pool[0];
  let bestRange = calculateRegionalPrice(pool[0], uf);

  for (const eq of pool.slice(1)) {
    const range = calculateRegionalPrice(eq, uf);
    if (range.min < bestRange.min) {
      bestProduct = eq;
      bestRange = range;
    }
  }

  const region = getRegionByUf(uf);
  const ufSuffix = region.uf === 'BR' ? 'Brasil' : region.uf;
  if (bestRange.isFreeSus) {
    return {
      priceText: `Grátis no SUS (${ufSuffix})`,
      isFreeSus: true,
      minPrice: 0,
      cheapestProduct: bestProduct,
    };
  }

  if (bestRange.min <= 0 && bestRange.max <= 0) {
    return {
      priceText: `Consulte farmácia (${ufSuffix})`,
      isFreeSus: false,
      minPrice: 0,
      cheapestProduct: bestProduct,
    };
  }

  return {
    priceText: `A partir de ${bestRange.formattedMin} (${ufSuffix})`,
    isFreeSus: false,
    minPrice: bestRange.min,
    cheapestProduct: bestProduct,
  };
}

export function calculateSavingsPercent(
  reference: EquivalentProduct | undefined,
  alternative: EquivalentProduct,
  uf: string
): number | null {
  if (!reference || reference.id === alternative.id) return null;
  const refPrice = calculateRegionalPrice(reference, uf);
  const altPrice = calculateRegionalPrice(alternative, uf);

  const refAvg = (refPrice.min + refPrice.max) / 2;
  if (refAvg <= 0) return null;

  if (altPrice.isFreeSus) return 100;

  const altAvg = (altPrice.min + altPrice.max) / 2;
  const pct = Math.round(((refAvg - altAvg) / refAvg) * 100);
  return pct > 0 ? pct : 0;
}
