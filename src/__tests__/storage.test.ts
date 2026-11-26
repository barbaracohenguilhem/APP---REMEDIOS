import { beforeEach, describe, expect, it } from 'vitest';
import {
  STORAGE_KEY,
  createDefaultState,
  loadPersistedState,
  savePersistedState,
} from '../services/storage';

describe('storage service', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates sensible defaults matching Iumi + SP + Voz ON', () => {
    const state = createDefaultState();
    expect(state.activeMedicationId).toBe('iumi');
    expect(state.selectedUf).toBe('SP');
    expect(state.voice.enabled).toBe(true);
    expect(state.schedules.length).toBeGreaterThanOrEqual(2);
  });

  it('persists and reloads state cleanly', () => {
    const initial = createDefaultState();
    const modified = {
      ...initial,
      selectedUf: 'BA',
      voice: { enabled: false, rate: 'slow' as const },
    };
    savePersistedState(modified);

    const loaded = loadPersistedState();
    expect(loaded.selectedUf).toBe('BA');
    expect(loaded.voice.enabled).toBe(false);
    expect(loaded.voice.rate).toBe('slow');
  });

  it('recovers cleanly from corrupted JSON in localStorage', () => {
    window.localStorage.setItem(STORAGE_KEY, '{corrupted json!!!');
    const loaded = loadPersistedState();
    expect(loaded.activeMedicationId).toBe('iumi');
    expect(loaded.selectedUf).toBe('SP');
  });
});
