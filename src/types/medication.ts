export type ActiveTab = 'hoje' | 'remedios' | 'comparar';

export type MedicationDetailTab = 'bula' | 'genericos' | 'alarmes';

export type BulaIconType =
  | 'pill'
  | 'clock'
  | 'calendar'
  | 'water'
  | 'food'
  | 'fasting'
  | 'no-smoking'
  | 'no-alcohol'
  | 'cuts-effect'
  | 'vomit-warning'
  | 'pregnant-no'
  | 'no-driving'
  | 'sun-warning'
  | 'no-crush'
  | 'no-juice'
  | 'heart-check'
  | 'stomach-ok'
  | 'car-ok'
  | 'sleep'
  | 'bloating'
  | 'stomach-ache'
  | 'headache'
  | 'dizziness'
  | 'fatigue'
  | 'taste'
  | 'drops'
  | 'shield-check'
  | 'alert-triangle'
  | 'doctor'
  | 'time-fast';

export type PackStyle = 'blister-box' | 'capsule-box' | 'drops-bottle' | 'pill-bottle';

export type StripeType = 'vermelha' | 'preta' | 'amarela' | 'sem_tarja';

export type MedicationCategory =
  | 'anticoncepcional'
  | 'diabetes'
  | 'estomago'
  | 'tireoide'
  | 'pressao'
  | 'dor_febre'
  | 'antibiotico'
  | 'ansiedade_sono'
  | 'colesterol'
  | 'alergia'
  | 'outro';

export interface BulaVisualItem {
  icon: BulaIconType;
  shortLabel: string;
  spokenDetail: string;
}

export interface SwitchingDifferenceEffect {
  symptom: string;
  why: string;
  likelihood: 'comum' | 'ocasional' | 'raro';
  icon: BulaIconType;
}

export interface EquivalentProduct {
  id: string;
  name: string;
  lab: string;
  type: 'referencia' | 'generico' | 'similar';
  bioequivalent: boolean;
  farmaciaPopularFree?: boolean;
  basePriceMin: number;
  basePriceMax: number;
  coatingOrTech: string;
  excipients: {
    hasLactose: boolean;
    hasDyes: boolean;
    keyNotes: string;
  };
  absorptionNote: string;
  switchingEffects: SwitchingDifferenceEffect[];
  switchVerdict: {
    level: 'tranquila' | 'atencao' | 'cuidado_medico';
    headline: string;
    explanation: string;
  };
  spokenSummary: string;
}

export interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  strength: string;
  manufacturer: string;
  category: MedicationCategory;
  categoryLabel: string;
  aliases: string[];
  pack: {
    style: PackStyle;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    labelText: string;
    pillColor: string;
    stripeType: StripeType;
  };
  purposeSimple: string;
  howToTake: {
    items: BulaVisualItem[];
    summary: string;
    spokenScript: string;
    defaultDosage: string;
    defaultTimes: string[];
    cycleNote?: string;
  };
  whatNotToDo: {
    items: BulaVisualItem[];
    summary: string;
    spokenScript: string;
  };
  whatYouCanDo: {
    items: BulaVisualItem[];
    missedDoseTip: string;
    onsetTime: string;
    spokenScript: string;
  };
  genericsHighlight: {
    sameEffectBadge: string;
    switchWarningShort: string;
    spokenScript: string;
  };
  equivalents: EquivalentProduct[];
  isCustom?: boolean;
  aiGenerated?: boolean;
  userPhotoUrl?: string;
}

export interface BrazilianRegion {
  uf: string;
  name: string;
  regionName: string;
  icmsLabel: string;
  priceMultiplier: number;
}

export interface MedicationSchedule {
  id: string;
  medicationId: string;
  dosage: string;
  times: string[]; // "HH:MM"
  daysOfWeek: number[]; // 0=Dom .. 6=Sab
  cycleMode: 'daily' | '24_4' | '21_7';
  enabled: boolean;
  notes?: string;
  createdAt: string;
}

export interface DoseLog {
  id: string;
  scheduleId: string;
  medicationId: string;
  dateStr: string; // YYYY-MM-DD local date
  scheduledTime: string; // HH:MM
  status: 'taken' | 'skipped';
  actionTimestamp: string; // ISO string
  takenTimeDisplay: string; // HH:MM
  delayMinutes: number; // positive = late, negative = early
}

export type VoiceProfile = 'acolhedora' | 'clara' | 'calma';

export interface VoicePreferences {
  enabled: boolean;
  rate: 'normal' | 'slow';
  guidedMode?: boolean;
  voiceProfile?: VoiceProfile;
}

export interface ClientAiKeys {
  elevenLabsKey?: string;
  elevenLabsVoiceId?: string;
  geminiKey?: string;
}

export interface AppPersistedState {
  version: number;
  selectedUf: string;
  voice: VoicePreferences;
  myMedicationIds: string[];
  activeMedicationId: string;
  customMedications: Medication[];
  medicationPhotos?: Record<string, string>;
  schedules: MedicationSchedule[];
  doseLogs: DoseLog[];
}
