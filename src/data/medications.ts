import type { Medication } from '../types/medication';

export const MEDICATIONS_CATALOG: Medication[] = [
  {
    id: 'iumi',
    name: 'Iumi',
    activeIngredient: 'Drospirenona 3 mg + Etinilestradiol 0,02 mg',
    strength: '3 mg + 0,02 mg',
    manufacturer: 'Libbs',
    category: 'anticoncepcional',
    categoryLabel: 'Anticoncepcional',
    aliases: [
      'iumi',
      'yumi',
      'lumi',
      'drospirenona',
      'etinilestradiol',
      'yaz',
      'elani',
      'dalyne',
      'anticoncepcional',
      'pilula',
    ],
    pack: {
      style: 'blister-box',
      primaryColor: '#F3D1E2',
      secondaryColor: '#E8B4CF',
      accentColor: '#9D174D',
      labelText: 'IUMI',
      pillColor: '#F9A8D4',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Anticoncepcional diário para evitar gravidez e regular o ciclo.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 por dia',
          spokenDetail: 'Tome um comprimido por dia, sem mastigar, com um copo de água.',
        },
        {
          icon: 'clock',
          shortLabel: 'Mesma hora',
          spokenDetail: 'Escolha um horário fácil e tome sempre no mesmo horário todos os dias.',
        },
        {
          icon: 'calendar',
          shortLabel: '24d + 4 pausa',
          spokenDetail: 'Tome por 24 dias seguidos e faça 4 dias de pausa antes da próxima cartela.',
        },
      ],
      summary: '1 comprimido todo dia, com água.',
      spokenScript:
        'Como tomar o Iumi: tome 1 comprimido por dia, sempre no mesmo horário, com água. Tome os 24 comprimidos da cartela e faça 4 dias de pausa antes de começar a próxima.',
      defaultDosage: '1 comprimido',
      defaultTimes: ['21:00'],
      cycleNote: '24 dias tomando + 4 dias de pausa',
    },
    whatNotToDo: {
      items: [
        {
          icon: 'no-smoking',
          shortLabel: 'Não fumar',
          spokenDetail: 'Fumar usando anticoncepcional aumenta o risco de trombose, principalmente acima dos 35 anos.',
        },
        {
          icon: 'cuts-effect',
          shortLabel: 'Corta o efeito',
          spokenDetail: 'Alguns antibióticos, remédios de convulsão e chá de erva-de-são-joão podem cortar o efeito.',
        },
        {
          icon: 'vomit-warning',
          shortLabel: 'Vômito até 4h',
          spokenDetail: 'Se vomitar ou tiver diarreia forte até 4 horas depois de tomar, o corpo pode não ter absorvido o comprimido.',
        },
      ],
      summary: 'Alguns antibióticos e chás cortam o efeito.',
      spokenScript:
        'Atenção ao que não pode com o Iumi: não fume, pois aumenta o risco de trombose. Cuidado com alguns antibióticos e chá de erva-de-são-joão, que podem cortar o efeito. Se você vomitar em até 4 horas depois de tomar, pode precisar de outro comprimido.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'food',
          shortLabel: 'Com ou sem comida',
          spokenDetail: 'Pode tomar de estômago cheio ou vazio. Se der leve enjoo, tome junto com o jantar.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Pode dirigir',
          spokenDetail: 'Não dá sono nem atrapalha para dirigir ou trabalhar.',
        },
        {
          icon: 'shield-check',
          shortLabel: 'Proteção contínua',
          spokenDetail: 'Mesmo nos 4 dias de pausa você continua protegida, se tomou a cartela certinho.',
        },
      ],
      missedDoseTip:
        'Esqueceu até 12 horas? Tome assim que lembrar e siga normal. Passou de 12 horas? Tome o esquecido, use camisinha por 7 dias e confira a bula ou fale com a farmácia.',
      onsetTime: 'Se começar no 1º dia da menstruação, protege desde o 1º dia.',
      spokenScript:
        'O que pode fazer com o Iumi: pode tomar com ou sem comida e pode dirigir normalmente. Se esquecer por menos de 12 horas, tome assim que lembrar. Se passar de 12 horas, tome e use preservativo nos próximos 7 dias.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesma proteção',
      switchWarningShort: 'Atenção na troca: revestimento diferente pode dar inchaço',
      spokenScript:
        'Sobre genéricos do Iumi: eles têm a mesma proteção contra gravidez e custam bem menos. Porém, atenção na troca: o revestimento do comprimido e os excipientes podem ser diferentes, mudando a velocidade de absorção. Em algumas mulheres isso causa mais inchaço, dor de cabeça ou sensibilidade nos seios que não tinham com o original.',
    },
    equivalents: [
      {
        id: 'iumi-ref',
        name: 'Iumi (Original / Referência)',
        lab: 'Libbs',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 66,
        basePriceMax: 84,
        coatingOrTech: 'Película revestida fina de liberação padrão Libbs',
        excipients: {
          hasLactose: true,
          hasDyes: true,
          keyNotes: 'Contém lactose monoidratada e revestimento polimérico específico (álcool polivinílico/macrogol).',
        },
        absorptionNote: 'Curva de absorção de referência usada como padrão para o corpo que já está adaptado ao Iumi.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Sua referência atual',
          explanation: 'Se você já se adaptou bem ao Iumi sem inchaço, este é o padrão de revestimento que seu corpo conhece.',
        },
        spokenSummary:
          'Iumi da Libbs é o medicamento de referência. É o padrão de comparação para os genéricos e similares.',
      },
      {
        id: 'iumi-gen-ems',
        name: 'Drospirenona + Etinilestradiol (Genérico)',
        lab: 'EMS',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 30,
        basePriceMax: 42,
        coatingOrTech: 'Revestimento polimérico alternativo (película diferente da Libbs)',
        excipients: {
          hasLactose: true,
          hasDyes: true,
          keyNotes: 'Contém lactose e excipientes aglutinantes/revestimento diferentes do Iumi original.',
        },
        absorptionNote:
          'Bioequivalente pela ANVISA (mesma eficácia contraceptiva), mas o pico de absorção pode variar levemente dentro da faixa permitida (80% a 125%).',
        switchingEffects: [
          {
            symptom: 'Inchaço e retenção de líquido',
            why: 'O revestimento diferente muda o ritmo de absorção da drospirenona e do estrogênio, o que pode gerar retenção de líquido em mulheres sensíveis que não inchavam com o Iumi.',
            likelihood: 'comum',
            icon: 'bloating',
          },
          {
            symptom: 'Sensibilidade nos seios ou dor de cabeça na adaptação',
            why: 'Oscilação leve no pico hormonal nas primeiras 1 a 3 cartelas após trocar de fabricante.',
            likelihood: 'ocasional',
            icon: 'headache',
          },
        ],
        switchVerdict: {
          level: 'atencao',
          headline: 'Mesma proteção, mas observe inchaço na troca',
          explanation:
            'Protege igual contra gravidez e economiza bastante. Porém, por ter revestimento e excipientes diferentes, algumas mulheres sentem inchaço ou dor de cabeça que não tinham com o Iumi.',
        },
        spokenSummary:
          'Genérico da EMS: tem a mesma proteção contra gravidez e preço bem menor. Mas atenção: o revestimento do comprimido é diferente do Iumi, o que muda um pouco a absorção e pode causar inchaço ou dor de cabeça em quem troca.',
      },
      {
        id: 'iumi-gen-medley',
        name: 'Drospirenona + Etinilestradiol (Genérico)',
        lab: 'Medley',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 34,
        basePriceMax: 48,
        coatingOrTech: 'Comprimido revestido com película à base de hipromelose',
        excipients: {
          hasLactose: true,
          hasDyes: true,
          keyNotes: 'Excipientes e corantes próprios da linha Medley; contém lactose.',
        },
        absorptionNote:
          'Bioequivalente comprovado pela ANVISA. Costuma ter liberação um pouco mais gradual, mas ainda diferente da película do Iumi.',
        switchingEffects: [
          {
            symptom: 'Inchaço leve nas pernas ou barriga',
            why: 'Diferença de excipientes e velocidade de desintegração no estômago em comparação ao original.',
            likelihood: 'ocasional',
            icon: 'bloating',
          },
          {
            symptom: 'Leve enjoo se tomado em jejum',
            why: 'A película diferente dissolve em tempo distinto no estômago vazio.',
            likelihood: 'ocasional',
            icon: 'stomach-ache',
          },
        ],
        switchVerdict: {
          level: 'atencao',
          headline: 'Boa economia, atenção aos primeiros ciclos',
          explanation:
            'Mesma eficácia contraceptiva. Se notar inchaço persistente após trocar, vale avisar sua ginecologista ou manter sempre a mesma marca que seu corpo tolera melhor.',
        },
        spokenSummary:
          'Genérico da Medley: mesma proteção contra gravidez. A película de revestimento é diferente do Iumi original, podendo causar leve inchaço ou enjoo em jejum durante a troca.',
      },
      {
        id: 'iumi-sim-yaz',
        name: 'Yaz (Referência internacional)',
        lab: 'Bayer',
        type: 'similar',
        bioequivalent: true,
        basePriceMin: 78,
        basePriceMax: 98,
        coatingOrTech: 'Tecnologia original Bayer com película de dissolução rápida',
        excipients: {
          hasLactose: true,
          hasDyes: true,
          keyNotes: 'Contém lactose e óxido de ferro rosa. Possui exatamente a mesma dosagem 3 mg + 0,02 mg em 24 comprimidos.',
        },
        absorptionNote: 'Perfil de absorção muito consistente e próximo ao Iumi.',
        switchingEffects: [
          {
            symptom: 'Quase sem diferenças na troca',
            why: 'Ambas são marcas consolidadas com controle rígido de dissolução; raramente provoca alteração perceptível.',
            likelihood: 'raro',
            icon: 'shield-check',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Troca muito bem tolerada, porém mais cara',
          explanation:
            'Costuma causar menos diferenças de inchaço na troca, mas o preço é mais alto que o próprio Iumi.',
        },
        spokenSummary:
          'Yaz da Bayer tem a mesma fórmula do Iumi e troca muito bem tolerada, mas costuma ser mais caro.',
      },
    ],
  },

  {
    id: 'glifage-xr',
    name: 'Glifage XR',
    activeIngredient: 'Cloridrato de Metformina 500 mg (Liberação Prolongada)',
    strength: '500 mg XR',
    manufacturer: 'Merck',
    category: 'diabetes',
    categoryLabel: 'Diabetes',
    aliases: [
      'glifage',
      'glifage xr',
      'glifaji',
      'metformina',
      'metformina xr',
      'diabetes',
      'acucar no sangue',
      'glicemia',
    ],
    pack: {
      style: 'blister-box',
      primaryColor: '#DBEAFE',
      secondaryColor: '#93C5FD',
      accentColor: '#1E40AF',
      labelText: 'GLIFAGE XR',
      pillColor: '#FFFFFF',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Controla o açúcar no sangue (diabetes tipo 2) liberando o remédio devagar.',
    howToTake: {
      items: [
        {
          icon: 'food',
          shortLabel: 'Com o jantar',
          spokenDetail: 'Tome junto com a refeição da noite para proteger o estômago.',
        },
        {
          icon: 'no-crush',
          shortLabel: 'Não partir',
          spokenDetail: 'Engula inteiro. Nunca parta, amasse ou mastigue o comprimido XR.',
        },
        {
          icon: 'water',
          shortLabel: 'Com água',
          spokenDetail: 'Engula com um copo cheio de água.',
        },
      ],
      summary: 'Engula inteiro, junto com o jantar, com água.',
      spokenScript:
        'Como tomar o Glifage XR: engula o comprimido inteiro junto com o jantar, com água. Nunca parta nem mastigue o comprimido, porque ele tem uma camada especial para liberar devagar.',
      defaultDosage: '1 comprimido (500 mg XR)',
      defaultTimes: ['20:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'no-alcohol',
          shortLabel: 'Sem álcool',
          spokenDetail: 'Evite bebidas alcoólicas em excesso, pois podem causar queda perigosa de açúcar ou mal-estar grave.',
        },
        {
          icon: 'no-crush',
          shortLabel: 'Não mastigar',
          spokenDetail: 'Se quebrar o comprimido XR, ele libera tudo de uma vez e dá muita diarreia.',
        },
        {
          icon: 'doctor',
          shortLabel: 'Exame c/ contraste',
          spokenDetail: 'Avise o médico antes de fazer tomografia ou exame com contraste na veia.',
        },
      ],
      summary: 'Não parta o comprimido e evite álcool.',
      spokenScript:
        'O que não pode com Glifage XR: não parta nem mastigue o comprimido. Evite bebidas alcoólicas e avise o médico antes de qualquer exame com contraste.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'stomach-ok',
          shortLabel: 'Mais suave',
          spokenDetail: 'A versão XR agride bem menos o intestino do que a metformina comum.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Pode dirigir',
          spokenDetail: 'Usado sozinho, raramente causa queda brusca de açúcar.',
        },
        {
          icon: 'heart-check',
          shortLabel: 'Uso contínuo',
          spokenDetail: 'Não pare por conta própria mesmo se a glicemia melhorar.',
        },
      ],
      missedDoseTip:
        'Se esqueceu no jantar, tome se ainda estiver perto do horário. Se já for no dia seguinte, pule e tome normal à noite. Nunca tome dois de uma vez.',
      onsetTime: 'Começa a agir no 1º dia, com controle completo em cerca de 2 semanas.',
      spokenScript:
        'O que pode com Glifage XR: pode dirigir e manter sua rotina normal. Se esquecer uma dose e já estiver perto da próxima, não dobre a quantidade.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesmo controle',
      switchWarningShort: 'Atenção na troca: matriz XR diferente pode dar diarreia e gases',
      spokenScript:
        'Sobre genéricos do Glifage XR: existe metformina grátis na Farmácia Popular, mas atenção! Se você usa o XR e trocar pela metformina comum ou por um XR de matriz diferente, pode sentir diarreia, gases e dor de barriga que não tinha no original.',
    },
    equivalents: [
      {
        id: 'glifage-ref',
        name: 'Glifage XR (Original / Referência)',
        lab: 'Merck',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 24,
        basePriceMax: 38,
        coatingOrTech: 'Matriz patenteada GelShield XR (liberação bem lenta e uniforme)',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Sem lactose e sem corantes. Forma um gel no estômago que solta o remédio aos poucos.',
        },
        absorptionNote: 'Liberação lenta controlada que evita picos no intestino — por isso dá muito menos diarreia.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Padrão de conforto intestinal',
          explanation: 'A tecnologia GelShield XR da Merck costuma ser a mais bem tolerada pelo estômago e intestino.',
        },
        spokenSummary: 'Glifage XR da Merck usa tecnologia especial de gel que libera devagar e protege o intestino.',
      },
      {
        id: 'glifage-gen-xr',
        name: 'Metformina 500 mg XR (Genérico Prolongado)',
        lab: 'EMS / Medley',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 12,
        basePriceMax: 21,
        coatingOrTech: 'Matriz polimérica alternativa de liberação prolongada',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Usa outro tipo de polímero para segurar a liberação do remédio.',
        },
        absorptionNote:
          'Bioequivalente na quantidade absorvida, mas o ritmo de liberação no intestino pode ser um pouco mais rápido em algumas pessoas.',
        switchingEffects: [
          {
            symptom: 'Gases, cólica ou fezes mais moles',
            why: 'A matriz polimérica diferente pode liberar parte da metformina antes do previsto no intestino.',
            likelihood: 'ocasional',
            icon: 'stomach-ache',
          },
          {
            symptom: 'Gosto metálico na boca',
            why: 'Pequena variação no pico plasmático logo após o jantar.',
            likelihood: 'raro',
            icon: 'taste',
          },
        ],
        switchVerdict: {
          level: 'atencao',
          headline: 'Confira sempre se a caixa diz XR',
          explanation:
            'Boa economia e funciona igual no açúcar. Apenas observe se o intestino fica mais solto na primeira semana.',
        },
        spokenSummary:
          'Genérico Metformina XR: controla o açúcar igual e é mais barato. Como o material de liberação lenta é diferente do Glifage XR, algumas pessoas sentem gases ou dor de barriga leve ao trocar.',
      },
      {
        id: 'glifage-sus-comum',
        name: 'Metformina 500 mg Comum (NÃO é XR)',
        lab: 'Farmácia Popular / SUS',
        type: 'generico',
        bioequivalent: false,
        farmaciaPopularFree: true,
        basePriceMin: 0,
        basePriceMax: 10,
        coatingOrTech: 'Liberação IMEDIATA (sem camada prolongada)',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'ATENÇÃO: Não é intercambiável automaticamente com o XR sem falar com o médico.',
        },
        absorptionNote: 'Solta todo o remédio de uma vez no estômago e intestino (pico rápido).',
        switchingEffects: [
          {
            symptom: 'Diarreia forte, enjoo e dor de barriga',
            why: 'Por não ter a tecnologia XR de liberação lenta, irrita muito mais o intestino em quem estava acostumado ao Glifage XR.',
            likelihood: 'comum',
            icon: 'stomach-ache',
          },
        ],
        switchVerdict: {
          level: 'cuidado_medico',
          headline: 'Grátis na Farmácia Popular, mas NÃO é XR',
          explanation:
            'É a mesma molécula e sai de graça pelo SUS/Farmácia Popular, mas libera rápido e costuma dar muita diarreia se trocar sem ajustar com o médico.',
        },
        spokenSummary:
          'Atenção: a Metformina comum gratuita na Farmácia Popular não é XR. Ela libera tudo de uma vez e costuma causar diarreia e enjoo em quem estava usando Glifage XR. Converse com o médico antes de trocar.',
      },
    ],
  },

  {
    id: 'losartana',
    name: 'Aradois / Losartana',
    activeIngredient: 'Losartana Potássica 50 mg',
    strength: '50 mg',
    manufacturer: 'Biolab / MSD (Cozaar)',
    category: 'pressao',
    categoryLabel: 'Pressão Alta',
    aliases: [
      'losartana',
      'losartan',
      'aradois',
      'cozaar',
      'pressao',
      'pressao alta',
      'hipertensao',
    ],
    pack: {
      style: 'blister-box',
      primaryColor: '#DCFCE7',
      secondaryColor: '#86EFAC',
      accentColor: '#166534',
      labelText: 'LOSARTANA',
      pillColor: '#FFFFFF',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Baixa e controla a pressão alta, protegendo o coração e os rins.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 por dia',
          spokenDetail: 'Tome a dose receitada pelo médico, geralmente 1 vez ao dia.',
        },
        {
          icon: 'clock',
          shortLabel: 'Mesma hora',
          spokenDetail: 'Tome sempre no mesmo horário, de preferência pela manhã.',
        },
        {
          icon: 'heart-check',
          shortLabel: 'Todos os dias',
          spokenDetail: 'Mesmo se a pressão estiver boa hoje, continue tomando todos os dias.',
        },
      ],
      summary: '1 comprimido todo dia, mesmo sem sentir nada.',
      spokenScript:
        'Como tomar Losartana: tome todos os dias no mesmo horário, com água, mesmo que você esteja se sentindo bem e com a pressão boa.',
      defaultDosage: '1 comprimido (50 mg)',
      defaultTimes: ['08:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'pregnant-no',
          shortLabel: 'Proibido grávida',
          spokenDetail: 'Nunca use se estiver grávida ou suspeitar de gravidez. Avise o médico imediatamente.',
        },
        {
          icon: 'cuts-effect',
          shortLabel: 'Evitar anti-infl.',
          spokenDetail: 'Anti-inflamatórios como ibuprofeno e diclofenaco podem atrapalhar o controle da pressão e forçar os rins.',
        },
        {
          icon: 'no-alcohol',
          shortLabel: 'Cuidado álcool',
          spokenDetail: 'Bebida alcoólica pode baixar demais a pressão e dar tontura ao levantar.',
        },
      ],
      summary: 'Proibido na gravidez. Evite anti-inflamatórios sem receita.',
      spokenScript:
        'O que não pode com Losartana: é proibida na gravidez. Evite tomar anti-inflamatórios por conta própria porque cortam o efeito na pressão, e cuidado com bebidas alcoólicas que podem causar tontura.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'food',
          shortLabel: 'Com ou sem comida',
          spokenDetail: 'Pode tomar antes ou depois do café da manhã.',
        },
        {
          icon: 'water',
          shortLabel: 'Beber água',
          spokenDetail: 'Manter boa hidratação ajuda os rins e evita tontura.',
        },
        {
          icon: 'shield-check',
          shortLabel: 'Grátis no SUS',
          spokenDetail: 'Disponível gratuitamente na Farmácia Popular com receita e CPF.',
        },
      ],
      missedDoseTip: 'Esqueceu de manhã? Tome assim que lembrar no mesmo dia. Se já for quase a hora do dia seguinte, pule. Nunca tome 2 juntos.',
      onsetTime: 'Começa a baixar em horas, mas o efeito máximo leva de 3 a 6 semanas.',
      spokenScript:
        'O que pode com Losartana: pode tomar com ou sem café da manhã. Esse remédio está disponível de graça na Farmácia Popular.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Grátis na Farmácia Popular',
      switchWarningShort: 'Troca segura: diferença costuma ser só amargor ou lactose',
      spokenScript:
        'Sobre genéricos da Losartana: a troca é muito segura e existem opções gratuitas na Farmácia Popular. A principal diferença entre marcas é o revestimento mais fino que deixa gosto amargo e a presença de lactose em alguns laboratórios.',
    },
    equivalents: [
      {
        id: 'losartana-ref',
        name: 'Cozaar / Aradois (Referência)',
        lab: 'Organon / Biolab',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 34,
        basePriceMax: 52,
        coatingOrTech: 'Comprimido revestido liso (mascara bem o gosto amargo)',
        excipients: {
          hasLactose: true,
          hasDyes: false,
          keyNotes: 'Contém lactose; revestimento firme fácil de engolir.',
        },
        absorptionNote: 'Absorção regular de referência para controle de 24 horas.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência de mercado',
          explanation: 'Comprimido liso, fácil de engolir e sem gosto amargo imediato.',
        },
        spokenSummary: 'Cozaar e Aradois são as marcas de referência de Losartana.',
      },
      {
        id: 'losartana-gen-medley',
        name: 'Losartana Potássica 50 mg (Genérico)',
        lab: 'Medley / EMS',
        type: 'generico',
        bioequivalent: true,
        farmaciaPopularFree: true,
        basePriceMin: 0,
        basePriceMax: 12,
        coatingOrTech: 'Película mais fina; alguns lotes são mais quebradiços',
        excipients: {
          hasLactose: true,
          hasDyes: false,
          keyNotes: 'Contém lactose. Disponível de graça na Farmácia Popular com receita válida.',
        },
        absorptionNote: 'Bioequivalente ANVISA com excelente equivalência clínica no controle da pressão.',
        switchingEffects: [
          {
            symptom: 'Gosto amargo na boca se demorar a engolir',
            why: 'O revestimento mais fino dissolve mais rápido na língua.',
            likelihood: 'ocasional',
            icon: 'taste',
          },
          {
            symptom: 'Leve tontura ao levantar nos primeiros dias',
            why: 'Pequena variação no pico inicial de absorção ao trocar de fabricante.',
            likelihood: 'raro',
            icon: 'dizziness',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Troca segura e grátis na Farmácia Popular',
          explanation:
            'Protege o coração igual ao original. A única diferença comum é um leve gosto amargo se não engolir rápido com água.',
        },
        spokenSummary:
          'Genérico da Losartana: troca muito segura, protege a pressão igual e sai de graça na Farmácia Popular. A única diferença comum é um gosto um pouco mais amargo se demorar para engolir.',
      },
      {
        id: 'losartana-gen-neo',
        name: 'Losartana Potássica 50 mg (Genérico)',
        lab: 'Neo Química',
        type: 'generico',
        bioequivalent: true,
        farmaciaPopularFree: true,
        basePriceMin: 0,
        basePriceMax: 10,
        coatingOrTech: 'Revestimento simples com dióxido de titânio',
        excipients: {
          hasLactose: true,
          hasDyes: false,
          keyNotes: 'Contém lactose e amido. Grátis pelo programa Farmácia Popular.',
        },
        absorptionNote: 'Mesma eficácia na pressão arterial. Meça a pressão nos primeiros dias se mudar de marca.',
        switchingEffects: [
          {
            symptom: 'Comprimido mais áspero ao engolir',
            why: 'Revestimento menos polido em comparação ao Cozaar.',
            likelihood: 'ocasional',
            icon: 'taste',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Opção econômica e bioequivalente',
          explanation: 'Funciona igual. Tome com bastante água para descer facilmente.',
        },
        spokenSummary:
          'Losartana Neo Química: gratuita na Farmácia Popular e funciona igual ao original. Tome com bastante água porque o comprimido pode ser um pouco mais áspero.',
      },
    ],
  },

  {
    id: 'losec-mups',
    name: 'Losec MUPS',
    activeIngredient: 'Omeprazol Magnésico 20 mg',
    strength: '20 mg',
    manufacturer: 'AstraZeneca',
    category: 'estomago',
    categoryLabel: 'Estômago',
    aliases: [
      'losec',
      'losec mups',
      'omeprazol',
      'peprazol',
      'gastrite',
      'azia',
      'refluxo',
      'estomago',
    ],
    pack: {
      style: 'capsule-box',
      primaryColor: '#EDE9FE',
      secondaryColor: '#C4B5FD',
      accentColor: '#5B21B6',
      labelText: 'LOSEC MUPS',
      pillColor: '#F472B6',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Diminui o ácido do estômago para tratar azia, refluxo e gastrite.',
    howToTake: {
      items: [
        {
          icon: 'fasting',
          shortLabel: 'Em jejum',
          spokenDetail: 'Tome em jejum, de 30 a 60 minutos antes do café da manhã.',
        },
        {
          icon: 'no-crush',
          shortLabel: 'Não mastigar',
          spokenDetail: 'Engula inteiro sem mastigar as bolinhas de dentro.',
        },
        {
          icon: 'water',
          shortLabel: 'Com água',
          spokenDetail: 'Tome com meio copo de água pura, nunca com leite.',
        },
      ],
      summary: 'Em jejum, 30 minutos antes do café da manhã.',
      spokenScript:
        'Como tomar Losec MUPS ou Omeprazol: tome em jejum, meia hora antes do café da manhã, com água pura e sem mastigar.',
      defaultDosage: '1 comprimido (20 mg)',
      defaultTimes: ['07:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'no-crush',
          shortLabel: 'Não mastigar',
          spokenDetail: 'Se mastigar, o ácido do estômago destrói o remédio antes de funcionar.',
        },
        {
          icon: 'cuts-effect',
          shortLabel: 'Misturar c/ remédio',
          spokenDetail: 'Pode atrapalhar alguns remédios do coração (como clopidogrel) e de tireoide. Dê intervalo.',
        },
        {
          icon: 'calendar',
          shortLabel: 'Não usar anos sem médico',
          spokenDetail: 'Uso por muitos meses sem acompanhamento pode baixar vitamina B12 e magnésio.',
        },
      ],
      summary: 'Não mastigue e não tome junto com o café da manhã.',
      spokenScript:
        'O que não pode: não mastigue o comprimido ou as bolinhas da cápsula. Não tome sem acompanhamento médico por muitos meses seguidos.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'stomach-ok',
          shortLabel: 'Protege o estômago',
          spokenDetail: 'Alivia queimação e ajuda a cicatrizar a gastrite.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Pode dirigir',
          spokenDetail: 'Normalmente não dá sono.',
        },
        {
          icon: 'water',
          shortLabel: 'MUPS dissolve na água',
          spokenDetail: 'Diferente da cápsula, o Losec MUPS pode ser disperso em 1 colher de água se você tiver dificuldade para engolir (sem mastigar os grânulos).',
        },
      ],
      missedDoseTip: 'Esqueceu antes do café? Pode tomar antes do almoço ou jantar em jejum. Não tome 2 juntos.',
      onsetTime: 'Alívio inicial no 1º dia; efeito máximo em 3 a 5 dias.',
      spokenScript:
        'O que pode com Losec MUPS: se tiver dificuldade para engolir, o Losec MUPS pode ser colocado em uma colher de água sem mastigar os grânulos.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesmo princípio ativo',
      switchWarningShort: 'Atenção na troca: cápsula genérica pode abrir diferente e deixar azia',
      spokenScript:
        'Sobre genéricos do Losec MUPS: o Omeprazol genérico em cápsula é bem mais barato, mas usa microgrânulos diferentes dos microcomprimidos do Losec MUPS. Algumas pessoas que trocam sentem azia voltando no fim do dia ou peso no estômago.',
    },
    equivalents: [
      {
        id: 'losec-ref',
        name: 'Losec MUPS (Original / Referência)',
        lab: 'AstraZeneca',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 72,
        basePriceMax: 95,
        coatingOrTech: 'Tecnologia MUPS (milhares de microcomprimidos revestidos de liberação super uniforme)',
        excipients: {
          hasLactose: false,
          hasDyes: true,
          keyNotes: 'Sem lactose; esvazia de forma uniforme do estômago para o intestino.',
        },
        absorptionNote: 'Proteção ácida muito estável por quase 24 horas mesmo em estômagos sensíveis.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Maior estabilidade na proteção ácida',
          explanation: 'A tecnologia MUPS protege os microgrânulos melhor contra o ácido do estômago.',
        },
        spokenSummary: 'Losec MUPS usa microcomprimidos especiais que protegem melhor o remédio do ácido do estômago.',
      },
      {
        id: 'omeprazol-gen-medley',
        name: 'Omeprazol 20 mg Cápsula (Genérico)',
        lab: 'Medley / EMS / Teuto',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 11,
        basePriceMax: 22,
        coatingOrTech: 'Cápsula de gelatina com pellets gastrorresistentes comuns',
        excipients: {
          hasLactose: true,
          hasDyes: true,
          keyNotes: 'Muitos genéricos contêm sacarose, lactose e corantes na cápsula de gelatina.',
        },
        absorptionNote:
          'Bioequivalente, porém o revestimento dos pellets varia entre fabricantes e pode se romper antes ou depois no estômago.',
        switchingEffects: [
          {
            symptom: 'Azia voltando à noite ou efeito mais curto',
            why: 'Se parte dos pellets abrir cedo demais no estômago, o ácido destrói um pouco da dose.',
            likelihood: 'comum',
            icon: 'stomach-ache',
          },
          {
            symptom: 'Sensação de cápsula parada ou gosto amargo',
            why: 'A cápsula de gelatina é maior que o comprimido MUPS e gruda se tomar com pouca água.',
            likelihood: 'ocasional',
            icon: 'taste',
          },
        ],
        switchVerdict: {
          level: 'atencao',
          headline: 'Economia enorme, observe se a azia volta à noite',
          explanation:
            'Funciona muito bem para a maioria e custa até 80% menos. Se sentir a azia voltar após trocar do Losec MUPS, vale testar outro laboratório de genérico ou conversar com o médico.',
        },
        spokenSummary:
          'Omeprazol genérico em cápsula custa até 80 por cento menos. Mas como a cápsula usa bolinhas com revestimento diferente do Losec MUPS, algumas pessoas sentem azia voltar no fim do dia ao trocar.',
      },
    ],
  },

  {
    id: 'puran-t4',
    name: 'Puran T4',
    activeIngredient: 'Levotiroxina Sódica 50 mcg',
    strength: '50 mcg',
    manufacturer: 'Sanofi',
    category: 'tireoide',
    categoryLabel: 'Tireoide',
    aliases: [
      'puran',
      'puran t4',
      'puro t4',
      'levotiroxina',
      'euthyrox',
      'levoid',
      'tireoide',
      'hipotireoidismo',
      'tsh',
    ],
    pack: {
      style: 'blister-box',
      primaryColor: '#E0F2FE',
      secondaryColor: '#7DD3FC',
      accentColor: '#0369A1',
      labelText: 'PURAN T4',
      pillColor: '#FFFFFF',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Repõe o hormônio da tireoide para dar energia e regular o metabolismo.',
    howToTake: {
      items: [
        {
          icon: 'fasting',
          shortLabel: 'Jejum rigoroso',
          spokenDetail: 'Tome logo ao acordar, de barriga vazia, esperando 30 a 60 minutos antes do café.',
        },
        {
          icon: 'water',
          shortLabel: 'Só com água',
          spokenDetail: 'Tome apenas com água pura. Café, leite ou suco atrapalham a absorção.',
        },
        {
          icon: 'clock',
          shortLabel: 'Mesma marca',
          spokenDetail: 'Tome todos os dias e evite ficar trocando de marca toda hora.',
        },
      ],
      summary: 'Ao acordar, só com água, 30 a 60 min antes do café.',
      spokenScript:
        'Como tomar Puran T4: tome logo ao acordar, em jejum, apenas com água pura. Espere de 30 a 60 minutos antes de tomar café ou comer.',
      defaultDosage: '1 comprimido (50 mcg)',
      defaultTimes: ['06:30'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'cuts-effect',
          shortLabel: 'Sem café/leite',
          spokenDetail: 'Café, leite, soja, cálcio, ferro e omeprazol bloqueiam a absorção se tomados juntos.',
        },
        {
          icon: 'alert-triangle',
          shortLabel: 'Não trocar à toa',
          spokenDetail: 'Trocar de marca sem avisar o médico pode desregular seu exame de tireoide.',
        },
        {
          icon: 'calendar',
          shortLabel: 'Não parar só',
          spokenDetail: 'Não interrompa o uso sem orientação médica.',
        },
      ],
      summary: 'Não misture com café, leite, cálcio, ferro ou omeprazol.',
      spokenScript:
        'O que não pode com Puran T4: não tome junto com café, leite, cálcio, ferro ou omeprazol. E muito importante: não fique trocando de marca na farmácia sem avisar seu médico.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'clock',
          shortLabel: 'Espera de 4h p/ ferro',
          spokenDetail: 'Vitaminas com ferro ou cálcio podem ser tomadas, mas espere 4 horas depois do Puran T4.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Rotina normal',
          spokenDetail: 'Depois de esperar o café da manhã, vida totalmente normal.',
        },
        {
          icon: 'doctor',
          shortLabel: 'Exame TSH',
          spokenDetail: 'Se precisar mudar de marca, refaça o exame TSH após 6 a 8 semanas.',
        },
      ],
      missedDoseTip: 'Esqueceu de manhã? Se lembrar no mesmo dia longe de refeição (2h após comer), tome. Se só lembrar no outro dia, tome normal.',
      onsetTime: 'Níveis estabilizam no sangue em cerca de 4 a 6 semanas.',
      spokenScript:
        'O que pode com Puran T4: pode tomar vitaminas com ferro ou cálcio, desde que espere 4 horas depois do remédio da tireoide.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Atenção redobrada na troca',
      switchWarningShort: 'Cuidado na troca: pequena mudança de excipiente desregula o TSH',
      spokenScript:
        'Atenção especial sobre genéricos do Puran T4: a levotiroxina é um remédio muito sensível. Pequenas diferenças nos excipientes entre marcas mudam quanto seu intestino absorve, podendo dar cansaço, coração acelerado ou mudança no exame TSH. Se trocar de marca, avise o médico!',
    },
    equivalents: [
      {
        id: 'puran-ref',
        name: 'Puran T4 (Referência)',
        lab: 'Sanofi',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 16,
        basePriceMax: 26,
        coatingOrTech: 'Comprimido simples com manitol (nova fórmula sem lactose)',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Fórmula à base de manitol e amido, sem lactose.',
        },
        absorptionNote: 'Remédio de índice terapêutico estreito — a constância da marca é essencial.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Mantenha sempre a mesma marca se o TSH está bom',
          explanation: 'O Puran T4 já tem preço acessível; manter a marca evita desregular a tireoide.',
        },
        spokenSummary: 'Puran T4 da Sanofi é a referência e já tem preço acessível. Se seu exame está controlado com ele, o ideal é manter.',
      },
      {
        id: 'euthyrox-sim',
        name: 'Euthyrox 50 mcg (Similar Intercambiável)',
        lab: 'Merck',
        type: 'similar',
        bioequivalent: true,
        basePriceMin: 15,
        basePriceMax: 24,
        coatingOrTech: 'Fórmula reformulada com manitol e ácido cítrico (sem lactose)',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Excipientes diferentes do Puran T4, o que pode alterar levemente a absorção intestinal.',
        },
        absorptionNote:
          'Excelente marca, mas como a levotiroxina é muito sensível a excipientes, a troca pode alterar o TSH em alguns pacientes.',
        switchingEffects: [
          {
            symptom: 'Cansaço, sono ou coração acelerado após semanas',
            why: 'Pequena variação na absorção (microgramas!) por causa de excipientes diferentes altera o equilíbrio do TSH.',
            likelihood: 'ocasional',
            icon: 'fatigue',
          },
          {
            symptom: 'Mudança no intestino ou humor',
            why: 'Sinal de que a dose efetivamente absorvida ficou um pouco maior ou menor após a troca.',
            likelihood: 'ocasional',
            icon: 'alert-triangle',
          },
        ],
        switchVerdict: {
          level: 'cuidado_medico',
          headline: 'Só troque com aviso ao médico e novo exame TSH',
          explanation:
            'Euthyrox é ótimo, mas para tireoide não se recomenda ficar alternando entre Puran T4, Euthyrox e genéricos sem repetir o exame de sangue em 6 semanas.',
        },
        spokenSummary:
          'Euthyrox da Merck é um ótimo remédio, mas atenção: para tireoide, trocar de marca muda um pouco a absorção e pode dar cansaço ou palpitação. Só troque avisando o médico para repetir o exame de sangue.',
      },
      {
        id: 'levo-gen-merck',
        name: 'Levotiroxina Sódica 50 mcg (Genérico)',
        lab: 'Merck / EMS',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 10,
        basePriceMax: 18,
        coatingOrTech: 'Excipientes variam conforme o laboratório do genérico',
        excipients: {
          hasLactose: true,
          hasDyes: false,
          keyNotes: 'Alguns genéricos ainda contêm lactose, diferente do Puran T4 atual.',
        },
        absorptionNote:
          'A economia costuma ser pequena (poucos reais), enquanto ficar mudando de laboratório todo mês pode descompensar a tireoide.',
        switchingEffects: [
          {
            symptom: 'Desequilíbrio da tireoide (cansaço ou palpitação)',
            why: 'Diferença de lactose e compressão do comprimido muda a absorção de microgramas no intestino.',
            likelihood: 'ocasional',
            icon: 'fatigue',
          },
        ],
        switchVerdict: {
          level: 'cuidado_medico',
          headline: 'Se escolher genérico, compre sempre do MESMO laboratório',
          explanation:
            'Não misture laboratórios diferentes a cada mês e peça ao médico para checar o TSH após a mudança.',
        },
        spokenSummary:
          'Genérico de Levotiroxina: pode conter lactose e alterar a absorção. Se precisar usar genérico, compre sempre do mesmo laboratório e avise o médico.',
      },
    ],
  },

  {
    id: 'novalgina',
    name: 'Novalgina',
    activeIngredient: 'Dipirona Monoidratada 1 g',
    strength: '1 g (ou 500 mg)',
    manufacturer: 'Sanofi',
    category: 'dor_febre',
    categoryLabel: 'Dor e Febre',
    aliases: ['novalgina', 'dipirona', 'dor', 'febre', 'dor de cabeca', 'analgesico', 'gotas'],
    pack: {
      style: 'blister-box',
      primaryColor: '#FEF3C7',
      secondaryColor: '#FDE68A',
      accentColor: '#B45309',
      labelText: 'NOVALGINA',
      pillColor: '#FFFFFF',
      stripeType: 'sem_tarja',
    },
    purposeSimple: 'Alivia dores fortes e abaixa a febre rapidamente.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 comp. se dor',
          spokenDetail: 'Tome 1 comprimido quando tiver dor ou febre, com bastante água.',
        },
        {
          icon: 'clock',
          shortLabel: 'De 6 em 6h',
          spokenDetail: 'Respeite o intervalo mínimo de 6 horas entre as doses. Máximo de 4 comprimidos ao dia.',
        },
        {
          icon: 'water',
          shortLabel: 'Com água',
          spokenDetail: 'Engula inteiro sem mastigar, pois é muito amargo.',
        },
      ],
      summary: 'A cada 6 horas, se tiver dor ou febre. Máximo 4 por dia.',
      spokenScript:
        'Como tomar Novalgina ou Dipirona: tome 1 comprimido quando tiver dor ou febre, respeitando pelo menos 6 horas de intervalo e no máximo 4 por dia.',
      defaultDosage: '1 comprimido (1 g)',
      defaultTimes: ['08:00', '14:00', '20:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'alert-triangle',
          shortLabel: 'Alergia antes?',
          spokenDetail: 'Nunca tome se já teve alergia, inchaço nos olhos ou falta de ar com dipirona.',
        },
        {
          icon: 'pregnant-no',
          shortLabel: 'Evitar gravidez',
          spokenDetail: 'Não use nos 3 primeiros nem nos 3 últimos meses de gravidez sem médico.',
        },
        {
          icon: 'no-alcohol',
          shortLabel: 'Sem álcool',
          spokenDetail: 'Evite misturar com bebida alcoólica porque potencializa o efeito e pode baixar a pressão.',
        },
      ],
      summary: 'Não tome se já teve alergia a dipirona.',
      spokenScript:
        'O que não pode com Dipirona: nunca tome se já teve alergia a dipirona antes. Evite na gravidez sem orientação médica e não misture com álcool.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'time-fast',
          shortLabel: 'Age em 30 min',
          spokenDetail: 'Começa a aliviar a dor e a febre entre 30 e 60 minutos.',
        },
        {
          icon: 'food',
          shortLabel: 'Com ou sem comida',
          spokenDetail: 'Pode tomar a qualquer hora, com ou sem alimento.',
        },
        {
          icon: 'stomach-ok',
          shortLabel: 'Não irrita estômago',
          spokenDetail: 'Costuma agredir menos o estômago do que anti-inflamatórios.',
        },
      ],
      missedDoseTip: 'Como costuma ser usada só quando há dor ou febre, não precisa repor se estiver se sentindo bem.',
      onsetTime: '30 a 60 minutos.',
      spokenScript:
        'O que pode com Dipirona: começa a fazer efeito em cerca de 30 minutos e pode ser tomada com ou sem comida.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesmo alívio',
      switchWarningShort: 'Diferença principal: velocidade de dissolução e sabor (nas gotas)',
      spokenScript:
        'Sobre genéricos da Novalgina: a Dipirona genérica alivia dor e febre igual e custa muito menos. A diferença principal é o tempo para dissolver e o gosto bem mais amargo em alguns genéricos ou aromatizante diferente nas gotas.',
    },
    equivalents: [
      {
        id: 'novalgina-ref',
        name: 'Novalgina 1 g (Original / Referência)',
        lab: 'Sanofi',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 22,
        basePriceMax: 34,
        coatingOrTech: 'Comprimido de desintegração rápida e acabamento liso',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Sem lactose; dissolve rápido no estômago.',
        },
        absorptionNote: 'Início de ação rápido e consistente (cerca de 25 a 35 minutos).',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência tradicional',
          explanation: 'Dissolve rápido e deixa menos gosto residual na boca.',
        },
        spokenSummary: 'Novalgina da Sanofi é a referência e dissolve rapidamente.',
      },
      {
        id: 'dipirona-gen-medley',
        name: 'Dipirona Monoidratada 1 g (Genérico)',
        lab: 'Medley / EMS / Prati-Donaduzzi',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 7,
        basePriceMax: 14,
        coatingOrTech: 'Comprimido simples sem película grossa (esfarela mais fácil na boca)',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Nas versões em gotas, o corante/conservante e saborizante variam bastante entre marcas.',
        },
        absorptionNote: 'Bioequivalente ANVISA; alguns comprimidos podem demorar 10 a 15 minutos a mais para dissolver.',
        switchingEffects: [
          {
            symptom: 'Gosto bem mais amargo na hora de engolir',
            why: 'Sem película protetora lisa, o comprimido começa a soltar o sabor amargo assim que encosta na língua.',
            likelihood: 'comum',
            icon: 'taste',
          },
          {
            symptom: 'Enjoo leve na versão em gotas',
            why: 'O aromatizante e o conservante das gotas genéricas mudam muito de marca para marca.',
            likelihood: 'ocasional',
            icon: 'stomach-ache',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Troca super segura e até 70% mais barata',
          explanation:
            'Alivia a dor e a febre exatamente igual. Só engula rápido com bastante água para não sentir o gosto amargo.',
        },
        spokenSummary:
          'Dipirona genérica alivia dor e febre igual à Novalgina e é até 70 por cento mais barata. A única diferença comum é o gosto mais amargo se demorar para engolir.',
      },
    ],
  },

  {
    id: 'amoxicilina',
    name: 'Amoxil / Amoxicilina',
    activeIngredient: 'Amoxicilina Tri-hidratada 500 mg',
    strength: '500 mg',
    manufacturer: 'GSK',
    category: 'antibiotico',
    categoryLabel: 'Antibiótico',
    aliases: ['amoxil', 'amoxicilina', 'antibiotico', 'garganta', 'infeccao', 'amox'],
    pack: {
      style: 'capsule-box',
      primaryColor: '#FEE2E2',
      secondaryColor: '#FCA5A5',
      accentColor: '#991B1B',
      labelText: 'AMOXICILINA',
      pillColor: '#EF4444',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Antibiótico que mata bactérias em infecções de garganta, ouvido, dente e pulmão.',
    howToTake: {
      items: [
        {
          icon: 'clock',
          shortLabel: 'De 8 em 8h',
          spokenDetail: 'Tome exatamente de 8 em 8 horas para manter o antibiótico ativo no sangue.',
        },
        {
          icon: 'calendar',
          shortLabel: 'Até o fim',
          spokenDetail: 'Tome todos os dias receitados (7 a 10 dias), mesmo se melhorar no 3º dia.',
        },
        {
          icon: 'water',
          shortLabel: 'Com água',
          spokenDetail: 'Engula a cápsula inteira com bastante água.',
        },
      ],
      summary: 'De 8 em 8 horas até terminar todos os dias da receita.',
      spokenScript:
        'Como tomar Amoxicilina: tome de 8 em 8 horas certinho, até terminar todos os dias da receita, mesmo que a dor já tenha passado.',
      defaultDosage: '1 cápsula (500 mg)',
      defaultTimes: ['07:00', '15:00', '23:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'alert-triangle',
          shortLabel: 'Alergia penicilina',
          spokenDetail: 'Nunca tome se tiver alergia à penicilina ou amoxicilina.',
        },
        {
          icon: 'calendar',
          shortLabel: 'Não parar antes',
          spokenDetail: 'Se parar antes do fim, a bactéria volta mais forte e resistente.',
        },
        {
          icon: 'cuts-effect',
          shortLabel: 'Cuidado pílula',
          spokenDetail: 'Se tiver diarreia ou vômito pelo antibiótico, o anticoncepcional pode perder efeito.',
        },
      ],
      summary: 'Nunca pare antes do fim do tratamento e cheque alergia à penicilina.',
      spokenScript:
        'O que não pode com Amoxicilina: não tome se tiver alergia à penicilina. Nunca pare antes do fim dos dias da receita porque a infecção pode voltar mais forte.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'food',
          shortLabel: 'Com comida ajuda',
          spokenDetail: 'Tomar junto com uma refeição ajuda a evitar dor de estômago.',
        },
        {
          icon: 'water',
          shortLabel: 'Bastante água',
          spokenDetail: 'Beber água durante o tratamento ajuda o corpo a se recuperar.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Pode dirigir',
          spokenDetail: 'Não costuma dar sono.',
        },
      ],
      missedDoseTip: 'Esqueceu uma cápsula? Tome assim que lembrar e reajuste o intervalo de 8h. Nunca tome duas cápsulas de uma vez.',
      onsetTime: 'Melhora dos sintomas em 48 a 72 horas.',
      spokenScript:
        'O que pode com Amoxicilina: tomar junto com comida ajuda a proteger o estômago. A melhora costuma aparecer em 2 a 3 dias.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesma cura',
      switchWarningShort: 'Diferença: tamanho/corante da cápsula e sabor no xarope infantil',
      spokenScript:
        'Sobre genéricos da Amoxicilina: o genérico combate a bactéria exatamente igual e é bem mais barato. A diferença é apenas o tamanho e os corantes da cápsula — ou o sabor no xarope para crianças.',
    },
    equivalents: [
      {
        id: 'amoxil-ref',
        name: 'Amoxil 500 mg (Referência)',
        lab: 'GSK',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 36,
        basePriceMax: 52,
        coatingOrTech: 'Cápsula gelatinosa dura padrão GSK',
        excipients: {
          hasLactose: false,
          hasDyes: true,
          keyNotes: 'Sem lactose; cápsula bicolor de fácil deglutição.',
        },
        absorptionNote: 'Absorção completa no trato digestivo.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência clássica',
          explanation: 'Excelente qualidade, mas bem mais cara que o genérico.',
        },
        spokenSummary: 'Amoxil da GSK é a referência, mas o genérico tem a mesma eficácia.',
      },
      {
        id: 'amox-gen-medley',
        name: 'Amoxicilina 500 mg (Genérico)',
        lab: 'Medley / EMS / Eurofarma',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 14,
        basePriceMax: 24,
        coatingOrTech: 'Cápsula de gelatina com corantes próprios do laboratório',
        excipients: {
          hasLactose: false,
          hasDyes: true,
          keyNotes: 'Algumas marcas usam corante amarelo tartrazina/vermelho 40 na casca da cápsula — verifique se tiver alergia a corantes.',
        },
        absorptionNote: 'Bioequivalência excelente; cura a infecção no mesmo prazo.',
        switchingEffects: [
          {
            symptom: 'Refluxo com gosto do remédio ou cápsula maior',
            why: 'Espessura da gelatina da cápsula muda entre fabricantes; tomar com 1 copo cheio de água evita.',
            likelihood: 'ocasional',
            icon: 'taste',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Troca muito segura e econômica',
          explanation:
            'Cura a infecção igual ao Amoxil. Em crianças (suspensão líquida), o sabor muda entre marcas e pode afetar a aceitação.',
        },
        spokenSummary:
          'Amoxicilina genérica combate a infecção igual ao Amoxil e custa metade do preço. Apenas observe se há alergia a corantes na cápsula e tome com bastante água.',
      },
    ],
  },

  {
    id: 'rivotril',
    name: 'Rivotril',
    activeIngredient: 'Clonazepam 2,5 mg/mL (Gotas) ou 2 mg',
    strength: '2,5 mg/mL',
    manufacturer: 'Biopas / Roche',
    category: 'ansiedade_sono',
    categoryLabel: 'Ansiedade e Sono',
    aliases: ['rivotril', 'clonazepam', 'ansiedade', 'sono', 'insonia', 'gotas', 'tarja preta'],
    pack: {
      style: 'drops-bottle',
      primaryColor: '#E2E8F0',
      secondaryColor: '#CBD5E1',
      accentColor: '#0F172A',
      labelText: 'RIVOTRIL',
      pillColor: '#94A3B8',
      stripeType: 'preta',
    },
    purposeSimple: 'Acalma crises de ansiedade, pânico ou convulsões — remédio controlado (tarja preta).',
    howToTake: {
      items: [
        {
          icon: 'drops',
          shortLabel: 'Conte as gotas',
          spokenDetail: 'Segure o frasco totalmente em pé, na vertical, para cada gota sair do tamanho certo.',
        },
        {
          icon: 'water',
          shortLabel: 'Na água',
          spokenDetail: 'Pingue em uma colher ou copo com um pouco de água, nunca direto na boca.',
        },
        {
          icon: 'sleep',
          shortLabel: 'Horário certo',
          spokenDetail: 'Tome exatamente a quantidade e o horário que o médico receitou.',
        },
      ],
      summary: 'Frasco em pé na vertical. Nunca pingue direto na boca.',
      spokenScript:
        'Como tomar Rivotril: segure o frasco totalmente em pé na vertical, conte as gotas em um pouco de água e nunca pingue direto na boca. Tome apenas a dose receitada.',
      defaultDosage: 'Conforme receita (gotas)',
      defaultTimes: ['22:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'no-alcohol',
          shortLabel: 'Zero álcool',
          spokenDetail: 'Misturar com bebida alcoólica é muito perigoso e pode causar sedação grave e falta de ar.',
        },
        {
          icon: 'no-driving',
          shortLabel: 'Não dirigir',
          spokenDetail: 'Causa sono e reduz reflexos. Não dirija nem opere máquinas perigosas.',
        },
        {
          icon: 'alert-triangle',
          shortLabel: 'Não parar de vez',
          spokenDetail: 'Parar de repente após uso contínuo causa rebote forte de ansiedade e tremores. Reduza só com médico.',
        },
      ],
      summary: 'Zero bebida alcoólica, não dirija e não pare de repente.',
      spokenScript:
        'Atenção máxima com Rivotril: nunca misture com álcool. Não dirija porque dá sono e tira reflexos. Nunca pare de tomar de uma vez sem falar com o médico.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'sleep',
          shortLabel: 'Tomar à noite',
          spokenDetail: 'Se o médico receitou 1 vez ao dia, tomar antes de dormir reduz sono durante o dia.',
        },
        {
          icon: 'doctor',
          shortLabel: 'Receita azul',
          spokenDetail: 'Guarde em local seguro, longe de crianças, e renove a receita azul antes de acabar.',
        },
        {
          icon: 'shield-check',
          shortLabel: 'Acompanhamento',
          spokenDetail: 'Converse com o médico se sentir necessidade de aumentar gotas.',
        },
      ],
      missedDoseTip: 'Esqueceu? Não dobre as gotas nem tome dose extra para compensar. Siga no próximo horário normal.',
      onsetTime: '30 a 60 minutos.',
      spokenScript:
        'O que pode com Rivotril: mantenha o frasco guardado longe de crianças e nunca dobre as gotas se esquecer uma dose.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesma molécula',
      switchWarningShort: 'Atenção na troca: bico conta-gotas e solvente mudam a sensação',
      spokenScript:
        'Atenção na troca do Rivotril para genérico: nas gotas, o bico conta-gotas e o líquido solvente mudam entre marcas. Isso pode alterar o tamanho da gota e a velocidade do sono ou dar mais sonolência no dia seguinte.',
    },
    equivalents: [
      {
        id: 'rivotril-ref',
        name: 'Rivotril (Original / Referência)',
        lab: 'Biopas / Roche',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 26,
        basePriceMax: 38,
        coatingOrTech: 'Conta-gotas padronizado (25 gotas = 1 mL) e solvente propilenoglicol/aroma pêssego',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Veículo líquido com aroma suave de pêssego e gotejador calibrado.',
        },
        absorptionNote: 'Gotejamento e início de ação bem previsíveis.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Padrão de gotejamento',
          explanation: 'Como a diferença de preço costuma ser moderada, muitos médicos preferem manter a mesma marca em gotas.',
        },
        spokenSummary: 'Rivotril original tem conta-gotas calibrado e ação previsível.',
      },
      {
        id: 'clonazepam-gen-medley',
        name: 'Clonazepam 2,5 mg/mL (Genérico)',
        lab: 'Medley / EMS / Germed',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 11,
        basePriceMax: 19,
        coatingOrTech: 'Bico conta-gotas e veículo aromatizante próprios do laboratório',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Sabor mais forte/ardido em algumas marcas; segure o frasco sempre 100% na vertical.',
        },
        absorptionNote:
          'Bioequivalente, porém variações no conta-gotas ou na curva de absorção podem ser percebidas em pessoas muito sensíveis.',
        switchingEffects: [
          {
            symptom: 'Mais sono no dia seguinte ou efeito que demora mais',
            why: 'Pequena variação no volume da gota e nos excipientes do veículo líquido/comprimido.',
            likelihood: 'ocasional',
            icon: 'sleep',
          },
          {
            symptom: 'Sabor ardido ou diferente na boca',
            why: 'Aromatizante e proporção de propilenoglicol diferentes do Rivotril.',
            likelihood: 'comum',
            icon: 'taste',
          },
        ],
        switchVerdict: {
          level: 'atencao',
          headline: 'Observe o conta-gotas e o sono nos primeiros dias',
          explanation:
            'É bioequivalente e mais econômico, mas atenção: sempre confira quantas gotas equivalem a 1 mL na caixinha e evite trocar de laboratório todo mês.',
        },
        spokenSummary:
          'Clonazepam genérico tem a mesma molécula e custa menos, mas atenção ao bico conta-gotas e ao sabor diferente. Observe se dá mais sono no dia seguinte ao trocar.',
      },
    ],
  },

  {
    id: 'lipitor',
    name: 'Lipitor / Citalor',
    activeIngredient: 'Atorvastatina Cálcica 20 mg',
    strength: '20 mg',
    manufacturer: 'Viatris / Pfizer',
    category: 'colesterol',
    categoryLabel: 'Colesterol',
    aliases: ['lipitor', 'citalor', 'atorvastatina', 'colesterol', 'gordura no sangue', 'estatina'],
    pack: {
      style: 'blister-box',
      primaryColor: '#FEF9C3',
      secondaryColor: '#FDE047',
      accentColor: '#854D0E',
      labelText: 'LIPITOR',
      pillColor: '#FFFFFF',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Baixa o colesterol ruim (LDL) e protege as artérias do coração.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 por dia',
          spokenDetail: 'Tome 1 comprimido por dia, de preferência à noite ou no horário que você nunca esquece.',
        },
        {
          icon: 'clock',
          shortLabel: 'Mesma hora',
          spokenDetail: 'Qualquer hora do dia funciona, mas manter o mesmo horário ajuda a lembrar.',
        },
        {
          icon: 'heart-check',
          shortLabel: 'Uso contínuo',
          spokenDetail: 'Continue tomando mesmo depois que o exame de colesterol melhorar.',
        },
      ],
      summary: '1 comprimido todo dia, com ou sem comida.',
      spokenScript:
        'Como tomar Lipitor ou Atorvastatina: tome 1 comprimido por dia, sempre no mesmo horário, com ou sem comida.',
      defaultDosage: '1 comprimido (20 mg)',
      defaultTimes: ['21:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'pregnant-no',
          shortLabel: 'Proibido grávida',
          spokenDetail: 'Não pode ser usado na gravidez nem na amamentação.',
        },
        {
          icon: 'no-alcohol',
          shortLabel: 'Evitar excesso',
          spokenDetail: 'Excesso de bebida alcoólica sobrecarrega o fígado junto com este remédio.',
        },
        {
          icon: 'alert-triangle',
          shortLabel: 'Dor muscular forte',
          spokenDetail: 'Se sentir dor forte nos músculos sem motivo ou urina muito escura, avise o médico.',
        },
      ],
      summary: 'Proibido na gravidez. Avise o médico se sentir dor muscular forte.',
      spokenScript:
        'O que não pode com Atorvastatina: é proibida na gravidez. Evite excesso de álcool e avise o médico se sentir dores musculares fortes sem motivo.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'food',
          shortLabel: 'Com ou sem comida',
          spokenDetail: 'Pode tomar de estômago cheio ou vazio.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Pode dirigir',
          spokenDetail: 'Não causa sono nem tontura na maioria das pessoas.',
        },
        {
          icon: 'heart-check',
          shortLabel: 'Ajuda c/ dieta',
          spokenDetail: 'Combinar com caminhada e menos fritura potencializa a proteção do coração.',
        },
      ],
      missedDoseTip: 'Esqueceu? Tome se ainda faltarem mais de 12 horas para a próxima dose. Caso contrário, pule e siga normal.',
      onsetTime: 'Redução no exame de colesterol aparece em 2 a 4 semanas.',
      spokenScript:
        'O que pode com Atorvastatina: pode tomar com ou sem comida e dirigir normalmente.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesmo efeito no colesterol',
      switchWarningShort: 'Diferença: tamanho do comprimido, lactose e leve desconforto gástrico',
      spokenScript:
        'Sobre genéricos do Lipitor: a Atorvastatina genérica baixa o colesterol igual e custa uma fração do preço. As diferenças mais comuns na troca são o tamanho do comprimido, presença de lactose e leve peso no estômago em pessoas sensíveis.',
    },
    equivalents: [
      {
        id: 'lipitor-ref',
        name: 'Lipitor / Citalor 20 mg (Referência)',
        lab: 'Viatris / Pfizer',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 82,
        basePriceMax: 112,
        coatingOrTech: 'Comprimido oval pequeno com revestimento ceroso liso',
        excipients: {
          hasLactose: true,
          hasDyes: false,
          keyNotes: 'Contém lactose e carbonato de cálcio estabilizante; muito fácil de engolir.',
        },
        absorptionNote: 'Dissolução e estabilização padrão de referência.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência original',
          explanation: 'Comprimido pequeno e liso, porém com custo bem mais elevado.',
        },
        spokenSummary: 'Lipitor é a referência de Atorvastatina, com comprimido pequeno e preço mais alto.',
      },
      {
        id: 'atorva-gen-ems',
        name: 'Atorvastatina Cálcica 20 mg (Genérico)',
        lab: 'EMS / Medley / Eurofarma',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 18,
        basePriceMax: 32,
        coatingOrTech: 'Revestimento polimérico diferente e comprimido um pouco maior',
        excipients: {
          hasLactose: true,
          hasDyes: false,
          keyNotes: 'Contém lactose e estabilizantes diferentes para proteger a atorvastatina da acidez.',
        },
        absorptionNote: 'Bioequivalente ANVISA; baixa o colesterol LDL igualmente bem.',
        switchingEffects: [
          {
            symptom: 'Leve azia ou peso no estômago',
            why: 'Diferença no estabilizante (carbonato) e na película de revestimento.',
            likelihood: 'ocasional',
            icon: 'stomach-ache',
          },
          {
            symptom: 'Comprimido maior para engolir',
            why: 'Alguns laboratórios usam formato redondo maior que o Lipitor oval.',
            likelihood: 'comum',
            icon: 'pill',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Economia de até 75% com mesmo resultado',
          explanation:
            'Excelente custo-benefício. Se der leve peso no estômago ao trocar, passe a tomar logo após o jantar.',
        },
        spokenSummary:
          'Atorvastatina genérica baixa o colesterol igual ao Lipitor com economia de até 75 por cento. O comprimido costuma ser um pouco maior e em poucas pessoas dá leve peso no estômago.',
      },
    ],
  },

  {
    id: 'allegra',
    name: 'Allegra',
    activeIngredient: 'Cloridrato de Fexofenadina 120 mg',
    strength: '120 mg',
    manufacturer: 'Sanofi',
    category: 'alergia',
    categoryLabel: 'Alergia e Rinite',
    aliases: ['allegra', 'alegra', 'fexofenadina', 'alergia', 'rinite', 'coceira', 'antialergico', 'espirro'],
    pack: {
      style: 'blister-box',
      primaryColor: '#FCE7F3',
      secondaryColor: '#F9A8D4',
      accentColor: '#7E22CE',
      labelText: 'ALLEGRA',
      pillColor: '#FDBA74',
      stripeType: 'sem_tarja',
    },
    purposeSimple: 'Alivia espirros, coriza, coceira no nariz e placas na pele sem dar sono.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 por dia',
          spokenDetail: 'Tome 1 comprimido por dia para rinite alérgica.',
        },
        {
          icon: 'water',
          shortLabel: 'Só com água',
          spokenDetail: 'Tome com água pura, nunca com suco de laranja, maçã ou toranja.',
        },
        {
          icon: 'clock',
          shortLabel: 'Antes de comer',
          spokenDetail: 'De preferência antes de uma refeição.',
        },
      ],
      summary: '1 comprimido por dia, SEMPRE com água (nunca com suco!).',
      spokenScript:
        'Como tomar Allegra ou Fexofenadina: tome 1 comprimido por dia com água pura. Nunca tome com suco de laranja ou maçã porque o suco corta o efeito.',
      defaultDosage: '1 comprimido (120 mg)',
      defaultTimes: ['08:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'no-juice',
          shortLabel: 'Sem suco fruta',
          spokenDetail: 'Suco de laranja, maçã ou grapefruit bloqueia a entrada do remédio no sangue e corta o efeito!',
        },
        {
          icon: 'cuts-effect',
          shortLabel: 'Sem antiácido junto',
          spokenDetail: 'Antiácidos com alumínio ou magnésio atrapalham; dê 2 horas de intervalo.',
        },
        {
          icon: 'pregnant-no',
          shortLabel: 'Falar c/ médico',
          spokenDetail: 'Gestantes e lactantes devem confirmar com o médico antes de usar.',
        },
      ],
      summary: 'Suco de laranja ou maçã corta o efeito deste remédio!',
      spokenScript:
        'Atenção ao que não pode com Allegra: não tome com suco de laranja nem suco de maçã porque corta o efeito! Também dê 2 horas de intervalo para antiácidos.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'car-ok',
          shortLabel: 'Não dá sono',
          spokenDetail: 'Pode dirigir e trabalhar normalmente — não dá sono como antialérgicos antigos.',
        },
        {
          icon: 'time-fast',
          shortLabel: 'Age em 1 hora',
          spokenDetail: 'Começa a aliviar espirros e coceira em cerca de 1 hora e dura 24 horas.',
        },
        {
          icon: 'shield-check',
          shortLabel: 'Dura 24 horas',
          spokenDetail: 'Um único comprimido protege o dia inteiro.',
        },
      ],
      missedDoseTip: 'Esqueceu? Tome assim que lembrar. Se estiver perto da próxima dose, pule.',
      onsetTime: 'Cerca de 1 hora.',
      spokenScript:
        'O que pode com Allegra: não dá sono, então você pode dirigir e trabalhar normalmente. Um comprimido dura o dia inteiro.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesmo alívio sem sono',
      switchWarningShort: 'Troca segura: diferença costuma ser só tamanho do comprimido',
      spokenScript:
        'Sobre genéricos do Allegra: a Fexofenadina genérica alivia a alergia igual, também não dá sono e custa bem menos. A diferença costuma ser apenas o tamanho e a cor do revestimento.',
    },
    equivalents: [
      {
        id: 'allegra-ref',
        name: 'Allegra 120 mg (Referência)',
        lab: 'Sanofi',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 46,
        basePriceMax: 65,
        coatingOrTech: 'Comprimido oblongo revestido cor pêssego (óxido de ferro)',
        excipients: {
          hasLactose: false,
          hasDyes: true,
          keyNotes: 'Sem lactose; película bem lisa fácil de engolir.',
        },
        absorptionNote: 'Absorção rápida se tomado com água pura.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência original',
          explanation: 'Muito bem tolerado e não dá sono.',
        },
        spokenSummary: 'Allegra da Sanofi é a referência sem lactose.',
      },
      {
        id: 'fexo-gen-ems',
        name: 'Cloridrato de Fexofenadina 120 mg (Genérico)',
        lab: 'EMS / Medley / Eurofarma',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 18,
        basePriceMax: 30,
        coatingOrTech: 'Revestimento diferente e comprimido levemente maior',
        excipients: {
          hasLactose: false,
          hasDyes: true,
          keyNotes: 'Sem lactose na maioria das marcas; corante de revestimento varia.',
        },
        absorptionNote: 'Bioequivalente ANVISA; igualmente sensível a suco de frutas (tome sempre só com água).',
        switchingEffects: [
          {
            symptom: 'Demora leve a engolir por tamanho do comprimido',
            why: 'Alguns genéricos têm comprimido mais espesso que o Allegra.',
            likelihood: 'ocasional',
            icon: 'pill',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Troca muito tranquila e econômica',
          explanation:
            'Alivia rinite e alergia igual sem dar sono, economizando mais da metade. Só lembre de tomar com água pura!',
        },
        spokenSummary:
          'Fexofenadina genérica funciona igual ao Allegra, não dá sono e custa menos da metade. A troca é muito tranquila.',
      },
    ],
  },

  {
    id: 'lexapro',
    name: 'Lexapro',
    activeIngredient: 'Oxalato de Escitalopram 10 mg',
    strength: '10 mg',
    manufacturer: 'Lundbeck',
    category: 'ansiedade_sono',
    categoryLabel: 'Ansiedade e Humor',
    aliases: [
      'lexapro',
      'escitalopram',
      'exodus',
      'reconter',
      'depressao',
      'ansiedade',
      'panico',
    ],
    pack: {
      style: 'blister-box',
      primaryColor: '#E0E7FF',
      secondaryColor: '#A5B4FC',
      accentColor: '#3730A3',
      labelText: 'LEXAPRO',
      pillColor: '#FFFFFF',
      stripeType: 'vermelha',
    },
    purposeSimple: 'Trata ansiedade e depressão equilibrando a serotonina no cérebro.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 por dia',
          spokenDetail: 'Tome 1 comprimido por dia, de manhã ou à noite, conforme orientado.',
        },
        {
          icon: 'clock',
          shortLabel: 'Mesma hora',
          spokenDetail: 'Tome sempre no mesmo horário todos os dias para manter o nível estável.',
        },
        {
          icon: 'calendar',
          shortLabel: 'Uso contínuo',
          spokenDetail: 'O efeito completo leva de 2 a 4 semanas. Não desista na primeira semana.',
        },
      ],
      summary: '1 comprimido todo dia, no mesmo horário, com ou sem comida.',
      spokenScript:
        'Como tomar Lexapro ou Escitalopram: tome 1 comprimido por dia, sempre no mesmo horário. O efeito completo aparece entre 2 e 4 semanas.',
      defaultDosage: '1 comprimido (10 mg)',
      defaultTimes: ['08:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'alert-triangle',
          shortLabel: 'Não parar de vez',
          spokenDetail: 'Parar de repente dá tontura, choque na cabeça e enjoo. Só reduza aos poucos com médico.',
        },
        {
          icon: 'no-alcohol',
          shortLabel: 'Evitar álcool',
          spokenDetail: 'Bebida alcoólica piora a ansiedade, aumenta o sono e atrapalha o tratamento.',
        },
        {
          icon: 'cuts-effect',
          shortLabel: 'Chá erva-são-joão',
          spokenDetail: 'Não misture com erva-de-são-joão ou outros antidepressivos sem avisar o médico.',
        },
      ],
      summary: 'Nunca pare de uma vez e evite bebidas alcoólicas.',
      spokenScript:
        'O que não pode com Escitalopram: nunca pare de tomar de repente porque dá tontura forte. Evite álcool e não misture com chá de erva-de-são-joão.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'food',
          shortLabel: 'Com comida ajuda',
          spokenDetail: 'Se der leve enjoo no começo, tome logo após o café da manhã.',
        },
        {
          icon: 'sleep',
          shortLabel: 'Ajustar horário',
          spokenDetail: 'Se der sono, pergunte ao médico se pode passar para a noite; se tirar o sono, tome de manhã.',
        },
        {
          icon: 'doctor',
          shortLabel: 'Acompanhamento',
          spokenDetail: 'Converse com o médico se trocar de marca e sentir diferença.',
        },
      ],
      missedDoseTip: 'Esqueceu de manhã? Tome no mesmo dia se lembrar cedo. Se só lembrar à noite ou no outro dia, pule e siga normal.',
      onsetTime: 'Melhora gradual entre 2 e 4 semanas.',
      spokenScript:
        'O que pode com Escitalopram: pode tomar após o café para evitar enjoo. Se esquecer uma dose, nunca tome duas juntas.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesma molécula',
      switchWarningShort: 'Atenção na troca: sensíveis relatam enjoo ou dor de cabeça por alguns dias',
      spokenScript:
        'Sobre genéricos do Lexapro: o Escitalopram genérico tem a mesma molécula e custa bem menos. Porém, algumas pessoas sensíveis notam enjoo leve, dor de cabeça ou alteração no sono durante 1 a 2 semanas ao trocar de marca.',
    },
    equivalents: [
      {
        id: 'lexapro-ref',
        name: 'Lexapro 10 mg (Original / Referência)',
        lab: 'Lundbeck',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 118,
        basePriceMax: 155,
        coatingOrTech: 'Comprimido revestido sulcado padrão dinamarquês Lundbeck',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Sem lactose e sem corantes; celulose microcristalina e película fina de hipromelose.',
        },
        absorptionNote: 'Perfil de absorção de referência bem suave no estômago.',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência original',
          explanation: 'Excelente tolerabilidade, mas tem o maior custo mensal.',
        },
        spokenSummary: 'Lexapro da Lundbeck é o original, sem lactose, porém bem mais caro.',
      },
      {
        id: 'escit-gen-euro',
        name: 'Oxalato de Escitalopram 10 mg (Genérico)',
        lab: 'Eurofarma / Medley / EMS',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 24,
        basePriceMax: 42,
        coatingOrTech: 'Película revestida e aglutinantes próprios do laboratório nacional',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Geralmente sem lactose, mas a velocidade de desintegração varia entre fabricantes.',
        },
        absorptionNote:
          'Bioequivalente ANVISA; pequenas diferenças na curva de pico podem ser percebidas por quem já usa Lexapro há meses.',
        switchingEffects: [
          {
            symptom: 'Enjoo leve ou dor de cabeça na 1ª semana',
            why: 'Variação leve no pico de absorção ao mudar do revestimento do Lexapro para o genérico.',
            likelihood: 'ocasional',
            icon: 'headache',
          },
          {
            symptom: 'Leve tontura ou alteração no sono na troca',
            why: 'O cérebro percebe pequenas oscilações de concentração quando muda de laboratório; costuma estabilizar mantendo o mesmo genérico.',
            likelihood: 'ocasional',
            icon: 'dizziness',
          },
        ],
        switchVerdict: {
          level: 'atencao',
          headline: 'Economia de até 75% — escolha um laboratório e mantenha',
          explanation:
            'Funciona igual para ansiedade e depressão. Para evitar oscilações, tente comprar sempre o genérico do mesmo laboratório.',
        },
        spokenSummary:
          'Escitalopram genérico economiza até 75 por cento e tem a mesma eficácia. Na troca, algumas pessoas sentem leve enjoo ou dor de cabeça por poucos dias; a dica é manter sempre o mesmo laboratório.',
      },
    ],
  },

  {
    id: 'tylenol',
    name: 'Tylenol / Paracetamol',
    activeIngredient: 'Paracetamol 750 mg',
    strength: '750 mg',
    manufacturer: 'Kenvue / Janssen',
    category: 'dor_febre',
    categoryLabel: 'Dor e Febre',
    aliases: ['tylenol', 'tilenol', 'paracetamol', 'dor', 'febre', 'gripe', 'resfriado'],
    pack: {
      style: 'blister-box',
      primaryColor: '#FEE2E2',
      secondaryColor: '#FECACA',
      accentColor: '#B91C1C',
      labelText: 'TYLENOL',
      pillColor: '#FFFFFF',
      stripeType: 'sem_tarja',
    },
    purposeSimple: 'Alivia dores leves a moderadas e abaixa a febre sem irritar o estômago.',
    howToTake: {
      items: [
        {
          icon: 'pill',
          shortLabel: '1 comp. se dor',
          spokenDetail: 'Tome 1 comprimido de 750 mg quando tiver dor ou febre.',
        },
        {
          icon: 'clock',
          shortLabel: 'De 6 em 6h',
          spokenDetail: 'Espere pelo menos 4 a 6 horas. Nunca passe de 5 comprimidos de 750 mg em 24 horas.',
        },
        {
          icon: 'water',
          shortLabel: 'Com água',
          spokenDetail: 'Engula com água, com ou sem comida.',
        },
      ],
      summary: 'A cada 6 horas se precisar. Nunca passe da dose máxima (protege o fígado).',
      spokenScript:
        'Como tomar Tylenol ou Paracetamol 750 miligramas: tome 1 comprimido a cada 6 horas se tiver dor ou febre, nunca passando de 5 comprimidos no dia inteiro.',
      defaultDosage: '1 comprimido (750 mg)',
      defaultTimes: ['08:00', '14:00', '20:00'],
    },
    whatNotToDo: {
      items: [
        {
          icon: 'no-alcohol',
          shortLabel: 'Sem álcool',
          spokenDetail: 'Misturar paracetamol com bebida alcoólica faz muito mal para o fígado.',
        },
        {
          icon: 'alert-triangle',
          shortLabel: 'Não somar remédios',
          spokenDetail: 'Cuidado com antigripais (como Benegrip ou Cimegripe) que JÁ têm paracetamol — somar doses sobrecarrega o fígado!',
        },
        {
          icon: 'doctor',
          shortLabel: 'Doença do fígado',
          spokenDetail: 'Quem tem problema grave no fígado deve perguntar ao médico antes de usar.',
        },
      ],
      summary: 'Não misture com álcool nem com antigripais que já contêm paracetamol.',
      spokenScript:
        'O que não pode com Paracetamol: não misture com álcool e cuidado ao tomar junto com remédios de gripe, porque muitos já têm paracetamol e a soma faz mal ao fígado.',
    },
    whatYouCanDo: {
      items: [
        {
          icon: 'stomach-ok',
          shortLabel: 'Suave p/ estômago',
          spokenDetail: 'Boa opção para quem tem gastrite e não pode usar anti-inflamatório.',
        },
        {
          icon: 'time-fast',
          shortLabel: 'Age em 30 min',
          spokenDetail: 'Começa a aliviar dor e febre entre 15 e 30 minutos.',
        },
        {
          icon: 'car-ok',
          shortLabel: 'Não dá sono',
          spokenDetail: 'Pode dirigir e trabalhar normalmente.',
        },
      ],
      missedDoseTip: 'Use apenas enquanto tiver dor ou febre; não precisa repor dose se estiver sem sintomas.',
      onsetTime: '15 a 30 minutos.',
      spokenScript:
        'O que pode com Paracetamol: é suave para o estômago, não dá sono e começa a agir em 15 a 30 minutos.',
    },
    genericsHighlight: {
      sameEffectBadge: 'Mesmo alívio',
      switchWarningShort: 'Diferença: revestimento liso para engolir e velocidade inicial',
      spokenScript:
        'Sobre genéricos do Tylenol: o Paracetamol genérico funciona igual e custa muito menos. A diferença principal é o revestimento liso do Tylenol que facilita engolir sem grudar na garganta.',
    },
    equivalents: [
      {
        id: 'tylenol-ref',
        name: 'Tylenol 750 mg (Original / Referência)',
        lab: 'Kenvue / Janssen',
        type: 'referencia',
        bioequivalent: true,
        basePriceMin: 26,
        basePriceMax: 38,
        coatingOrTech: 'Comprimido oblongo com revestimento liso de deslizamento rápido',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Sem lactose; superfície polida não deixa gosto amargo.',
        },
        absorptionNote: 'Desintegração rápida (15 a 30 minutos).',
        switchingEffects: [],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Referência muito fácil de engolir',
          explanation: 'Comprimido bem liso, mas mais caro que o genérico.',
        },
        spokenSummary: 'Tylenol original tem comprimido bem liso e fácil de engolir.',
      },
      {
        id: 'paracetamol-gen',
        name: 'Paracetamol 750 mg (Genérico)',
        lab: 'Medley / EMS / Prati-Donaduzzi',
        type: 'generico',
        bioequivalent: true,
        basePriceMin: 6,
        basePriceMax: 13,
        coatingOrTech: 'Comprimido branco sem revestimento polido (mais poroso)',
        excipients: {
          hasLactose: false,
          hasDyes: false,
          keyNotes: 'Sem lactose; mais seco na boca se tomar com pouca água.',
        },
        absorptionNote: 'Bioequivalente ANVISA; mesma eficácia na dor e febre.',
        switchingEffects: [
          {
            symptom: 'Comprimido gruda ou deixa pó amargo se beber pouca água',
            why: 'Sem a película polida do Tylenol, o comprimido é mais áspero ao passar pela garganta.',
            likelihood: 'comum',
            icon: 'taste',
          },
        ],
        switchVerdict: {
          level: 'tranquila',
          headline: 'Troca totalmente segura e até 75% mais barata',
          explanation: 'Alivia dor e febre exatamente igual. Basta engolir com um bom gole de água.',
        },
        spokenSummary:
          'Paracetamol genérico alivia dor e febre igual ao Tylenol e custa até 75 por cento menos. Apenas tome com bastante água porque o comprimido é mais áspero.',
      },
    ],
  },
];

export const MEDICATION_CATEGORIES: {
  id: Medication['category'] | 'todos';
  label: string;
  emoji: string;
  color: string;
}[] = [
  { id: 'todos', label: 'Todos', emoji: '💊', color: '#0D9488' },
  { id: 'anticoncepcional', label: 'Anticoncepcional', emoji: '🌸', color: '#DB2777' },
  { id: 'pressao', label: 'Pressão', emoji: '❤️', color: '#16A34A' },
  { id: 'diabetes', label: 'Diabetes', emoji: '🩸', color: '#2563EB' },
  { id: 'estomago', label: 'Estômago', emoji: '🫁', color: '#7C3AED' },
  { id: 'tireoide', label: 'Tireoide', emoji: '🦋', color: '#0284C7' },
  { id: 'dor_febre', label: 'Dor e Febre', emoji: '🌡️', color: '#D97706' },
  { id: 'antibiotico', label: 'Infecção', emoji: '🛡️', color: '#DC2626' },
  { id: 'ansiedade_sono', label: 'Ansiedade/Sono', emoji: '🌙', color: '#475569' },
  { id: 'colesterol', label: 'Colesterol', emoji: '💛', color: '#CA8A04' },
  { id: 'alergia', label: 'Alergia', emoji: '🤧', color: '#9333EA' },
];
