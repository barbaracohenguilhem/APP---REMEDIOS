import type { BrazilianRegion } from '../types/medication';

export const BRAZILIAN_REGIONS: BrazilianRegion[] = [
  { uf: 'BR', name: 'Média Brasil', regionName: 'Nacional', icmsLabel: 'Média nacional', priceMultiplier: 1.0 },
  { uf: 'AC', name: 'Acre', regionName: 'Norte', icmsLabel: 'ICMS 19% + frete regional', priceMultiplier: 1.1 },
  { uf: 'AL', name: 'Alagoas', regionName: 'Nordeste', icmsLabel: 'ICMS 19% (com FECOEP)', priceMultiplier: 1.04 },
  { uf: 'AP', name: 'Amapá', regionName: 'Norte', icmsLabel: 'ICMS 18% + frete regional', priceMultiplier: 1.09 },
  { uf: 'AM', name: 'Amazonas', regionName: 'Norte', icmsLabel: 'ICMS 20% + frete regional', priceMultiplier: 1.11 },
  { uf: 'BA', name: 'Bahia', regionName: 'Nordeste', icmsLabel: 'ICMS 20,5%', priceMultiplier: 1.04 },
  { uf: 'CE', name: 'Ceará', regionName: 'Nordeste', icmsLabel: 'ICMS 20%', priceMultiplier: 1.03 },
  { uf: 'DF', name: 'Distrito Federal', regionName: 'Centro-Oeste', icmsLabel: 'ICMS 20%', priceMultiplier: 1.02 },
  { uf: 'ES', name: 'Espírito Santo', regionName: 'Sudeste', icmsLabel: 'ICMS 17%', priceMultiplier: 0.96 },
  { uf: 'GO', name: 'Goiás', regionName: 'Centro-Oeste', icmsLabel: 'ICMS 19%', priceMultiplier: 0.99 },
  { uf: 'MA', name: 'Maranhão', regionName: 'Nordeste', icmsLabel: 'ICMS 22%', priceMultiplier: 1.06 },
  { uf: 'MT', name: 'Mato Grosso', regionName: 'Centro-Oeste', icmsLabel: 'ICMS 17%', priceMultiplier: 1.02 },
  { uf: 'MS', name: 'Mato Grosso do Sul', regionName: 'Centro-Oeste', icmsLabel: 'ICMS 17%', priceMultiplier: 1.0 },
  { uf: 'MG', name: 'Minas Gerais', regionName: 'Sudeste', icmsLabel: 'ICMS 18%', priceMultiplier: 0.97 },
  { uf: 'PA', name: 'Pará', regionName: 'Norte', icmsLabel: 'ICMS 19% + frete regional', priceMultiplier: 1.08 },
  { uf: 'PB', name: 'Paraíba', regionName: 'Nordeste', icmsLabel: 'ICMS 20%', priceMultiplier: 1.03 },
  { uf: 'PR', name: 'Paraná', regionName: 'Sul', icmsLabel: 'ICMS 19,5%', priceMultiplier: 0.98 },
  { uf: 'PE', name: 'Pernambuco', regionName: 'Nordeste', icmsLabel: 'ICMS 20,5%', priceMultiplier: 1.04 },
  { uf: 'PI', name: 'Piauí', regionName: 'Nordeste', icmsLabel: 'ICMS 21%', priceMultiplier: 1.05 },
  { uf: 'RJ', name: 'Rio de Janeiro', regionName: 'Sudeste', icmsLabel: 'ICMS 22% (com FECP)', priceMultiplier: 1.08 },
  { uf: 'RN', name: 'Rio Grande do Norte', regionName: 'Nordeste', icmsLabel: 'ICMS 18%', priceMultiplier: 1.01 },
  { uf: 'RS', name: 'Rio Grande do Sul', regionName: 'Sul', icmsLabel: 'ICMS 17%', priceMultiplier: 0.97 },
  { uf: 'RO', name: 'Rondônia', regionName: 'Norte', icmsLabel: 'ICMS 19,5% + frete regional', priceMultiplier: 1.07 },
  { uf: 'RR', name: 'Roraima', regionName: 'Norte', icmsLabel: 'ICMS 20% + frete regional', priceMultiplier: 1.11 },
  { uf: 'SC', name: 'Santa Catarina', regionName: 'Sul', icmsLabel: 'ICMS 17%', priceMultiplier: 0.95 },
  { uf: 'SP', name: 'São Paulo', regionName: 'Sudeste', icmsLabel: 'ICMS 18% · Alta concorrência', priceMultiplier: 0.94 },
  { uf: 'SE', name: 'Sergipe', regionName: 'Nordeste', icmsLabel: 'ICMS 19%', priceMultiplier: 1.03 },
  { uf: 'TO', name: 'Tocantins', regionName: 'Norte', icmsLabel: 'ICMS 20%', priceMultiplier: 1.05 },
];

export function getRegionByUf(uf: string): BrazilianRegion {
  return BRAZILIAN_REGIONS.find((r) => r.uf === uf) ?? BRAZILIAN_REGIONS[0];
}
