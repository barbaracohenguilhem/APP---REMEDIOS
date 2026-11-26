import { describe, expect, it, vi } from 'vitest';
import { MEDICATIONS_CATALOG } from '../data/medications';
import { scanImageForMedications } from '../services/ocrScanner';

vi.mock('tesseract.js', () => ({
  recognize: vi.fn(),
}));

describe('ocrScanner service', () => {
  it('identifies medications from OCR recognized text and reports progress', async () => {
    const tesseract = await import('tesseract.js');
    vi.mocked(tesseract.recognize).mockResolvedValueOnce({
      data: { text: 'Receita Medica\nIumi 3mg - tomar 1 comprimido as 21:00\nLosartana 50mg as 08:00' },
    } as never);

    const file = new File(['dummy'], 'receita.jpg', { type: 'image/jpeg' });
    const progressCalls: number[] = [];

    const result = await scanImageForMedications(file, MEDICATIONS_CATALOG, (pct) => {
      progressCalls.push(pct);
    });

    expect(result.usedOcr).toBe(true);
    expect(result.ocrFailedReason).toBeUndefined();
    expect(result.matches.map((m) => m.medication.id)).toEqual(
      expect.arrayContaining(['iumi', 'losartana'])
    );
    expect(progressCalls[progressCalls.length - 1]).toBe(100);
  });

  it('falls back gracefully to filename matching when OCR throws an error', async () => {
    const tesseract = await import('tesseract.js');
    vi.mocked(tesseract.recognize).mockRejectedValueOnce(new Error('Network offline'));

    const file = new File(['dummy'], 'foto_caixa_glifage_xr.png', { type: 'image/png' });
    const result = await scanImageForMedications(file, MEDICATIONS_CATALOG);

    expect(result.usedOcr).toBe(false);
    expect(result.ocrFailedReason).toBe('Network offline');
    expect(result.matches[0]?.medication.id).toBe('glifage-xr');
  });

  it('does not let noisy filenames pollute OCR-extracted medication schedules', async () => {
    const tesseract = await import('tesseract.js');
    vi.mocked(tesseract.recognize).mockResolvedValueOnce({
      data: { text: 'Iumi 3mg - tomar 1 comprimido as 21:00' },
    } as never);

    const file = new File(['dummy'], 'foto_losartana_10h.jpg', { type: 'image/jpeg' });
    const result = await scanImageForMedications(file, MEDICATIONS_CATALOG);

    expect(result.matches).toHaveLength(1);
    expect(result.matches[0].medication.id).toBe('iumi');
    expect(result.matches[0].detectedTimes).toEqual(['21:00']);
  });
});
