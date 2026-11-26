import type { AppPersistedState, ClientAiKeys } from '../types/medication';
import { formatLocalDateStr } from './scheduleEngine';

export const STORAGE_KEY = 'meu_remedio_state_v1';
export const AI_KEYS_STORAGE_KEY = 'meu_remedio_ai_keys_v2';

export function createDefaultState(now: Date = new Date()): AppPersistedState {
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const yesterdayStr = formatLocalDateStr(yesterday);

  return {
    version: 1,
    selectedUf: 'SP',
    voice: {
      enabled: true,
      rate: 'normal',
      guidedMode: false,
      voiceProfile: 'acolhedora',
    },
    myMedicationIds: ['iumi', 'losartana', 'glifage-xr'],
    activeMedicationId: 'iumi',
    customMedications: [],
    medicationPhotos: {},
    schedules: [
      {
        id: 'sched-losartana-default',
        medicationId: 'losartana',
        dosage: '1 comprimido (50 mg)',
        times: ['08:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: 'daily',
        enabled: true,
        notes: 'Com água pela manhã',
        createdAt: yesterday.toISOString(),
      },
      {
        id: 'sched-iumi-default',
        medicationId: 'iumi',
        dosage: '1 comprimido',
        times: ['21:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: '24_4',
        enabled: true,
        notes: '24 dias + 4 dias de pausa, sempre no mesmo horário',
        createdAt: yesterday.toISOString(),
      },
    ],
    doseLogs: [
      {
        id: 'log-seed-1',
        scheduleId: 'sched-losartana-default',
        medicationId: 'losartana',
        dateStr: yesterdayStr,
        scheduledTime: '08:00',
        status: 'taken',
        actionTimestamp: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate(),
          8,
          3
        ).toISOString(),
        takenTimeDisplay: '08:03',
        delayMinutes: 3,
      },
      {
        id: 'log-seed-2',
        scheduleId: 'sched-iumi-default',
        medicationId: 'iumi',
        dateStr: yesterdayStr,
        scheduledTime: '21:00',
        status: 'taken',
        actionTimestamp: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate(),
          21,
          2
        ).toISOString(),
        takenTimeDisplay: '21:02',
        delayMinutes: 2,
      },
    ],
  };
}

function getSafeLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    const ls = window.localStorage;
    if (ls && typeof ls.getItem === 'function' && typeof ls.setItem === 'function') {
      return ls;
    }
  } catch {
    return null;
  }
  return null;
}

export function loadPersistedState(): AppPersistedState {
  const storage = getSafeLocalStorage();
  if (!storage) {
    return createDefaultState();
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as Partial<AppPersistedState>;
    const defaults = createDefaultState();

    return {
      version: 1,
      selectedUf: typeof parsed.selectedUf === 'string' ? parsed.selectedUf : defaults.selectedUf,
      voice: {
        enabled:
          typeof parsed.voice?.enabled === 'boolean'
            ? parsed.voice.enabled
            : defaults.voice.enabled,
        rate: parsed.voice?.rate === 'slow' ? 'slow' : 'normal',
        guidedMode: Boolean(parsed.voice?.guidedMode),
        voiceProfile:
          parsed.voice?.voiceProfile === 'clara' || parsed.voice?.voiceProfile === 'calma'
            ? parsed.voice.voiceProfile
            : 'acolhedora',
      },
      myMedicationIds:
        Array.isArray(parsed.myMedicationIds) && parsed.myMedicationIds.length > 0
          ? parsed.myMedicationIds
          : defaults.myMedicationIds,
      activeMedicationId:
        typeof parsed.activeMedicationId === 'string' && parsed.activeMedicationId
          ? parsed.activeMedicationId
          : defaults.activeMedicationId,
      customMedications: Array.isArray(parsed.customMedications) ? parsed.customMedications : [],
      medicationPhotos:
        parsed.medicationPhotos && typeof parsed.medicationPhotos === 'object'
          ? parsed.medicationPhotos
          : {},
      schedules: Array.isArray(parsed.schedules) ? parsed.schedules : defaults.schedules,
      doseLogs: Array.isArray(parsed.doseLogs) ? parsed.doseLogs : defaults.doseLogs,
    };
  } catch {
    return createDefaultState();
  }
}

export function savePersistedState(state: AppPersistedState): void {
  const storage = getSafeLocalStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadClientAiKeys(): ClientAiKeys {
  const storage = getSafeLocalStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(AI_KEYS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ClientAiKeys;
    return {
      elevenLabsKey: typeof parsed.elevenLabsKey === 'string' ? parsed.elevenLabsKey.trim() : '',
      elevenLabsVoiceId:
        typeof parsed.elevenLabsVoiceId === 'string' ? parsed.elevenLabsVoiceId.trim() : '',
      geminiKey: typeof parsed.geminiKey === 'string' ? parsed.geminiKey.trim() : '',
    };
  } catch {
    return {};
  }
}

export function saveClientAiKeys(keys: ClientAiKeys): void {
  const storage = getSafeLocalStorage();
  if (!storage) return;
  try {
    storage.setItem(
      AI_KEYS_STORAGE_KEY,
      JSON.stringify({
        elevenLabsKey: keys.elevenLabsKey?.trim() || '',
        elevenLabsVoiceId: keys.elevenLabsVoiceId?.trim() || '',
        geminiKey: keys.geminiKey?.trim() || '',
      })
    );
  } catch {
    // Ignore storage quota errors
  }
}
