export interface SamplePrescription {
  id: string;
  title: string;
  sourceType: 'foto_receita' | 'print_whatsapp' | 'foto_caixa';
  badge: string;
  doctorOrSender: string;
  extractedText: string;
  previewLines: string[];
}

export const SAMPLE_PRESCRIPTIONS: SamplePrescription[] = [
  {
    id: 'sample-receita-clinico',
    title: 'Receita Médica (Foto)',
    sourceType: 'foto_receita',
    badge: 'Foto de receita',
    doctorOrSender: 'Dra. Mariana Silva · CRM-SP 184.220',
    extractedText:
      'USO ORAL\n1) Losartana Potássica 50 mg - Tomar 1 comprimido às 08:00 todos os dias.\n2) Glifage XR 500 mg - Tomar 1 comprimido junto com o jantar às 20:00.\nUso contínuo.',
    previewLines: [
      'USO ORAL — RECEITA SIMPLES',
      '1. Losartana 50 mg — 1 comp às 08:00',
      '2. Glifage XR 500 mg — 1 comp às 20:00',
    ],
  },
  {
    id: 'sample-print-whatsapp',
    title: 'Print de WhatsApp (Telemedicina)',
    sourceType: 'print_whatsapp',
    badge: 'Print de tela',
    doctorOrSender: 'WhatsApp · Dra. Camila (Gineco)',
    extractedText:
      'Oi Maria! Pode manter o Iumi (drospirenona 3mg + etinilestradiol) 1 comprimido às 21:00 (24 dias + 4 de pausa). Se tiver dor de cabeça pode tomar Dipirona 1g de 6 em 6h.',
    previewLines: [
      '💬 Dra. Camila (Gineco):',
      '"Manter Iumi 1 comp às 21:00"',
      '"Se dor de cabeça: Dipirona 1g 6/6h"',
    ],
  },
  {
    id: 'sample-foto-caixa',
    title: 'Foto da Caixa (Tireoide + Estômago)',
    sourceType: 'foto_caixa',
    badge: 'Foto da caixa',
    doctorOrSender: 'Caixa fotografada na farmácia',
    extractedText:
      'Puran T4 Levotiroxina Sódica 50 mcg Sanofi - 06:30 em jejum. Losec MUPS Omeprazol 20 mg - 07:00 antes do café.',
    previewLines: [
      '📦 PURAN T4 50 mcg (Sanofi)',
      '📦 LOSEC MUPS 20 mg (AstraZeneca)',
      'Jejum pela manhã: 06:30 e 07:00',
    ],
  },
];
