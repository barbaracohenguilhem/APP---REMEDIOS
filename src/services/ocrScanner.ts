import type { Medication } from '../types/medication';
import { parsePrescriptionText, type ParsedMedicationMatch } from './medicationSearch';

export interface ScanResult {
  extractedText: string;
  matches: ParsedMedicationMatch[];
  usedOcr: boolean;
  ocrFailedReason?: string;
}

/**
 * Scans an uploaded image (photo of prescription, medicine box, or screenshot/print).
 * Dynamically loads tesseract.js so initial bundle stays small.
 * Uses a timeout guard so poor connections or offline environments never hang the UI.
 */
export async function scanImageForMedications(
  file: File,
  catalog: Medication[],
  onProgress?: (percent: number, stageLabel: string) => void
): Promise<ScanResult> {
  const filenameText = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
  onProgress?.(10, 'Preparando imagem...');

  let ocrText = '';
  let usedOcr = false;
  let ocrFailedReason: string | undefined;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    onProgress?.(20, 'Lendo texto da foto (OCR)...');
    const tesseract = await import('tesseract.js');

    const ocrPromise = tesseract.recognize(file, 'por', {
      logger: (info: { status?: string; progress?: number }) => {
        if (typeof info.progress === 'number') {
          const pct = Math.min(92, Math.max(25, Math.round(25 + info.progress * 65)));
          onProgress?.(pct, 'Lendo receita na imagem...');
        }
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('OCR timeout')), 22000);
    });

    const result = await Promise.race([ocrPromise, timeoutPromise]);
    ocrText = result?.data?.text?.trim() ?? '';
    usedOcr = true;
  } catch (err) {
    ocrFailedReason =
      err instanceof Error
        ? err.message
        : 'Não foi possível ler automaticamente o texto da imagem.';
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }

  onProgress?.(96, 'Identificando remédios...');
  // Prefer OCR text alone first so filenames like "IMG_2026_10h.jpg" never pollute parsed schedules
  const ocrMatches = ocrText ? parsePrescriptionText(ocrText, catalog) : [];
  const matches =
    ocrMatches.length > 0 ? ocrMatches : parsePrescriptionText(filenameText, catalog);
  onProgress?.(100, 'Pronto!');

  return {
    extractedText: ocrText || filenameText,
    matches,
    usedOcr,
    ocrFailedReason,
  };
}
