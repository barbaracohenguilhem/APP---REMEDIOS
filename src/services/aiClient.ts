import type { ClientAiKeys, Medication } from '@/types/medication';
import { loadClientAiKeys } from './storage';

export interface AiBackendStatus {
  elevenLabsConnected: boolean;
  elevenLabsSource: 'env' | 'header' | 'none';
  geminiConnected: boolean;
  geminiSource: 'env' | 'header' | 'none';
  naturalVoiceProvider: 'elevenlabs' | 'gemini' | 'none';
}

export interface ScannedPrescriptionItem {
  catalogId: string | null;
  name: string;
  activeIngredient: string;
  dosage: string;
  times: string[];
  cycleMode: 'daily' | '24_4' | '21_7';
  notes: string;
}

export interface ScanApiResponse {
  provider: string;
  rawText: string;
  items: ScannedPrescriptionItem[];
  error?: string;
  message?: string;
}

function buildAiHeaders(override?: ClientAiKeys): Record<string, string> {
  const keys = override ?? loadClientAiKeys();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (keys.elevenLabsKey) headers['x-elevenlabs-key'] = keys.elevenLabsKey;
  if (keys.elevenLabsVoiceId) headers['x-elevenlabs-voice-id'] = keys.elevenLabsVoiceId;
  if (keys.geminiKey) headers['x-gemini-key'] = keys.geminiKey;
  return headers;
}

export async function fetchAiStatus(override?: ClientAiKeys): Promise<AiBackendStatus> {
  const resp = await fetch('/api/status', {
    method: 'GET',
    headers: buildAiHeaders(override),
  });
  if (!resp.ok) {
    return {
      elevenLabsConnected: false,
      elevenLabsSource: 'none',
      geminiConnected: false,
      geminiSource: 'none',
      naturalVoiceProvider: 'none',
    };
  }
  return (await resp.json()) as AiBackendStatus;
}

export async function scanPrescriptionImage(payload: {
  imageBase64?: string;
  mimeType?: string;
  textFallback?: string;
}): Promise<ScanApiResponse> {
  const resp = await fetch('/api/scan', {
    method: 'POST',
    headers: buildAiHeaders(),
    body: JSON.stringify(payload),
  });
  const data = (await resp.json()) as ScanApiResponse;
  if (!resp.ok) {
    return {
      provider: 'error',
      rawText: '',
      items: [],
      error: data.error || 'SCAN_ERROR',
      message: data.message || 'Não foi possível ler a imagem agora.',
    };
  }
  return data;
}

export async function lookupAnyBrazilianMedication(query: string): Promise<{
  medication?: Medication;
  provider?: string;
  error?: string;
  message?: string;
}> {
  const resp = await fetch('/api/medication', {
    method: 'POST',
    headers: buildAiHeaders(),
    body: JSON.stringify({ query }),
  });
  const data = (await resp.json()) as {
    medication?: Medication;
    provider?: string;
    error?: string;
    message?: string;
  };
  if (!resp.ok) {
    return {
      error: data.error || 'LOOKUP_ERROR',
      message: data.message || 'Não foi possível consultar este medicamento.',
    };
  }
  return data;
}

export async function askPharmacistAi(payload: {
  question: string;
  medicationName?: string;
  activeIngredient?: string;
  contextNotes?: string;
}): Promise<{ answer: string; provider: string; needsKey?: boolean }> {
  const resp = await fetch('/api/ask', {
    method: 'POST',
    headers: buildAiHeaders(),
    body: JSON.stringify(payload),
  });
  const data = (await resp.json()) as {
    answer?: string;
    provider?: string;
    needsKey?: boolean;
    message?: string;
  };
  if (!resp.ok) {
    return {
      answer: data.message || 'Não consegui responder agora. Tente novamente em instantes.',
      provider: 'error',
    };
  }
  return {
    answer: data.answer || '',
    provider: data.provider || 'gemini',
    needsKey: data.needsKey,
  };
}
