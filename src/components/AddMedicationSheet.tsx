'use client';

import { useRef, useState } from 'react';
import {
  AlarmClock,
  ArrowLeft,
  Camera,
  Check,
  ImagePlus,
  Loader2,
  Mic,
  MicOff,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type { Medication } from '@/types/medication';
import { SAMPLE_PRESCRIPTIONS } from '@/data/samplePrescriptions';
import {
  createCustomMedication,
  parsePrescriptionText,
  searchMedications,
} from '@/services/medicationSearch';
import {
  lookupAnyBrazilianMedication,
  scanPrescriptionImage,
  type ScannedPrescriptionItem,
} from '@/services/aiClient';
import { voiceEngine } from '@/services/voiceEngine';
import { MedicationAvatar } from './MedicationAvatar';

interface AddMedicationSheetProps {
  catalog: Medication[];
  hasGeminiKey: boolean;
  initialStep?: SheetStep;
  onClose: () => void;
  onOpenVoiceSettings: () => void;
  onAddExisting: (
    med: Medication,
    options: {
      createAlarm?: boolean;
      alarmTimes?: string[];
      photoDataUrl?: string;
      openAfter?: boolean;
    }
  ) => void;
  onAddNewMedication: (med: Medication, alarmTimes?: string[], photoDataUrl?: string) => void;
  onSpeak: (sectionId: string, text: string) => void;
}

export type SheetStep = 'choose' | 'scan' | 'voice' | 'search' | 'manual';

async function fileToCompressedDataUrl(file: File): Promise<{ dataUrl: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
    reader.onload = () => {
      const rawUrl = String(reader.result || '');
      const img = new Image();
      img.onload = () => {
        const maxDim = 1024;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl: rawUrl, mimeType: file.type || 'image/jpeg' });
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        resolve({ dataUrl: compressed, mimeType: 'image/jpeg' });
      };
      img.onerror = () => resolve({ dataUrl: rawUrl, mimeType: file.type || 'image/jpeg' });
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
  });
}

export function AddMedicationSheet({
  catalog,
  hasGeminiKey,
  initialStep = 'choose',
  onClose,
  onOpenVoiceSettings,
  onAddExisting,
  onAddNewMedication,
  onSpeak,
}: AddMedicationSheetProps) {
  const [step, setStep] = useState<SheetStep>(initialStep);
  const cameraRef = useRef<HTMLInputElement | null>(null);
  const galleryRef = useRef<HTMLInputElement | null>(null);

  // Scan / Print state
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<ScannedPrescriptionItem[]>([]);
  const [showExamples, setShowExamples] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [resolvingIdx, setResolvingIdx] = useState<number | null>(null);

  // Voice state
  const [listening, setListening] = useState(false);
  const [voiceHeard, setVoiceHeard] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Search / AI Lookup state
  const [query, setQuery] = useState('');
  const [lookingUpAi, setLookingUpAi] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Manual form
  const [manualName, setManualName] = useState('');
  const [manualDosage, setManualDosage] = useState('1 comprimido');
  const [manualTime, setManualTime] = useState('08:00');
  const [manualNotes, setManualNotes] = useState('');

  const handleImagePicked = async (file: File) => {
    setStep('scan');
    setScanning(true);
    setScanError(null);
    setScannedItems([]);

    try {
      const { dataUrl, mimeType } = await fileToCompressedDataUrl(file);
      setPhotoDataUrl(dataUrl);

      const res = await scanPrescriptionImage({ imageBase64: dataUrl, mimeType });
      setScanning(false);

      if (res.error === 'NO_GEMINI_KEY') {
        // Graceful filename fallback if user hasn't added Gemini key yet
        const fallbackMatches = parsePrescriptionText(
          file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
          catalog
        );
        if (fallbackMatches.length > 0) {
          setScannedItems(
            fallbackMatches.map((m) => ({
              catalogId: m.medication.id,
              name: m.medication.name,
              activeIngredient: m.medication.activeIngredient,
              dosage: m.detectedDosage,
              times: m.detectedTimes,
              cycleMode: m.medication.category === 'anticoncepcional' ? '24_4' : 'daily',
              notes: m.medication.howToTake.summary,
            }))
          );
          return;
        }
        setScanError(res.message || 'Configure a chave Gemini para ler receitas por foto.');
        return;
      }

      if (res.error) {
        setScanError(res.message || 'Não foi possível ler a imagem.');
        return;
      }

      if (res.items.length === 0) {
        setScanError('Não identifiquei o nome do remédio nessa imagem. Tente outra foto ou busque pelo nome.');
        return;
      }

      setScannedItems(res.items);
      onSpeak(
        'scan-done',
        `Encontrei ${res.items.map((i) => i.name).join(' e ')}. Toque para salvar e ouvir a bula fácil.`
      );
    } catch {
      setScanning(false);
      setScanError('Não consegui processar a imagem. Tente novamente.');
    }
  };

  const handleAnalyzeText = (text: string) => {
    setStep('scan');
    setPhotoDataUrl(null);
    setScanError(null);
    const local = parsePrescriptionText(text, catalog);
    if (local.length === 0) {
      setScannedItems([]);
      setScanError('Não encontrei nenhum remédio nesse texto. Tente buscar pelo nome.');
      return;
    }
    const items: ScannedPrescriptionItem[] = local.map((m) => ({
      catalogId: m.medication.id,
      name: m.medication.name,
      activeIngredient: m.medication.activeIngredient,
      dosage: m.detectedDosage,
      times: m.detectedTimes,
      cycleMode: m.medication.category === 'anticoncepcional' ? '24_4' : 'daily',
      notes: m.medication.howToTake.summary,
    }));
    setScannedItems(items);
    onSpeak(
      'scan-text-done',
      `Encontrei ${items.map((i) => i.name).join(' e ')}. Toque para abrir.`
    );
  };

  const handleConfirmScannedItem = async (
    item: ScannedPrescriptionItem,
    idx: number,
    withAlarm: boolean
  ) => {
    const existing = item.catalogId ? catalog.find((m) => m.id === item.catalogId) : undefined;
    if (existing) {
      onAddExisting(existing, {
        createAlarm: withAlarm,
        alarmTimes: item.times,
        photoDataUrl: photoDataUrl || undefined,
        openAfter: true,
      });
      onClose();
      return;
    }

    // Not in local catalog — fetch complete Brazilian bula & bioequivalent differences via Gemini!
    setResolvingIdx(idx);
    const lookup = await lookupAnyBrazilianMedication(item.name);
    setResolvingIdx(null);

    if (lookup.medication) {
      onAddNewMedication(
        lookup.medication,
        withAlarm ? item.times : undefined,
        photoDataUrl || undefined
      );
      onClose();
      return;
    }

    const custom = createCustomMedication({
      name: item.name,
      activeIngredient: item.activeIngredient,
      dosage: item.dosage,
      notes: item.notes,
      colorTheme: 'teal',
    });
    onAddNewMedication(custom, withAlarm ? item.times : undefined, photoDataUrl || undefined);
    onClose();
  };

  const handleAiLookupQuery = async (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setLookingUpAi(true);
    setLookupError(null);

    const res = await lookupAnyBrazilianMedication(clean);
    setLookingUpAi(false);

    if (res.medication) {
      const existing = catalog.find((m) => m.id === res.medication!.id);
      if (existing) {
        onAddExisting(existing, { createAlarm: false, openAfter: true });
      } else {
        onAddNewMedication(res.medication);
      }
      onClose();
      return;
    }

    setLookupError(
      res.message || 'Não encontrei esse remédio. Você pode cadastrar manualmente abaixo.'
    );
  };

  const handleStartVoice = () => {
    setVoiceError(null);
    setListening(true);
    const stop = voiceEngine.startListening({
      onResult: (transcript) => {
        setListening(false);
        setVoiceHeard(transcript);
        const matches = searchMedications(catalog, transcript);
        if (matches.length > 0 && transcript.length >= 3) {
          setQuery(transcript);
          setStep('search');
        } else if (hasGeminiKey) {
          void handleAiLookupQuery(transcript);
        } else {
          setQuery(transcript);
          setStep('search');
        }
      },
      onError: (msg) => {
        setListening(false);
        setVoiceError(msg);
      },
      onEnd: () => {
        setListening(false);
      },
    });
    if (!stop) setListening(false);
  };

  const localResults = searchMedications(catalog, query);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-sheet-title"
      className="fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-5"
      >
        {/* Hidden file inputs */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleImagePicked(f);
            e.target.value = '';
          }}
        />
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleImagePicked(f);
            e.target.value = '';
          }}
        />

        {/* Sheet Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {step !== 'choose' && (
              <button
                type="button"
                onClick={() => setStep('choose')}
                aria-label="Voltar"
                className="w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
            )}
            <h2 id="add-sheet-title" className="text-[20px] font-bold text-[#1C1917]">
              {step === 'choose'
                ? 'Adicionar remédio'
                : step === 'scan'
                  ? 'Foto ou receita'
                  : step === 'voice'
                    ? 'Falar o nome'
                    : step === 'manual'
                      ? 'Cadastro manual'
                      : 'Buscar remédio'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 0: 3 SERENE, SPACIOUS CHOICES */}
        {step === 'choose' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setStep('scan')}
              className="w-full p-5 rounded-[24px] bg-white hover:bg-[#FCFBF9] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.04)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#E6F2EF] text-[#146356] flex items-center justify-center shrink-0">
                <Camera className="w-6 h-6 stroke-[2]" />
              </span>
              <div>
                <p className="text-[16px] font-bold text-[#1C1917]">Foto da receita ou caixa</p>
                <p className="text-[13.5px] text-[#6B6560] mt-0.5">
                  Lê receita médica, caixinha ou print de WhatsApp
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStep('voice')}
              className="w-full p-5 rounded-[24px] bg-white hover:bg-[#FCFBF9] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.04)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#FEF3DD] text-[#B45309] flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6 stroke-[2]" />
              </span>
              <div>
                <p className="text-[16px] font-bold text-[#1C1917]">Falar o nome do remédio</p>
                <p className="text-[13.5px] text-[#6B6560] mt-0.5">
                  Sem precisar digitar — só falar em voz alta
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStep('search')}
              className="w-full p-5 rounded-[24px] bg-white hover:bg-[#FCFBF9] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.04)] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#EFECE6] text-[#44403C] flex items-center justify-center shrink-0">
                <Search className="w-6 h-6 stroke-[2]" />
              </span>
              <div>
                <p className="text-[16px] font-bold text-[#1C1917]">Buscar qualquer remédio</p>
                <p className="text-[13.5px] text-[#6B6560] mt-0.5">
                  Catálogo brasileiro completo ou cadastro manual
                </p>
              </div>
            </button>
          </div>
        )}

        {/* STEP 1: FOTO / RECEITA / PRINT */}
        {step === 'scan' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="py-4 px-4 rounded-[20px] bg-[#146356] hover:bg-[#0F4F45] text-white font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>Tirar foto</span>
              </button>
              <button
                type="button"
                onClick={() => galleryRef.current?.click()}
                className="py-4 px-4 rounded-[20px] bg-white border border-black/10 hover:bg-[#F3EFE8] text-[#1C1917] font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <ImagePlus className="w-5 h-5 text-[#146356]" />
                <span>Print / Galeria</span>
              </button>
            </div>

            {photoDataUrl && (
              <div className="rounded-[20px] overflow-hidden bg-white border border-black/[0.06] max-h-44 flex items-center justify-center">
                <img src={photoDataUrl} alt="Foto selecionada" className="max-h-44 object-contain" />
              </div>
            )}

            {scanning && (
              <div className="bg-white rounded-[20px] p-5 flex items-center gap-3 text-[14px] font-semibold text-[#146356]">
                <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                <span>Lendo receita com visão por IA...</span>
              </div>
            )}

            {scanError && (
              <div className="bg-[#FFF6F7] border border-[#BE123C]/15 rounded-[20px] p-4 space-y-2.5">
                <p className="text-[13.5px] text-[#9F1239] leading-relaxed">{scanError}</p>
                {!hasGeminiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenVoiceSettings();
                    }}
                    className="py-2 px-4 rounded-full bg-[#146356] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Conectar chave Gemini agora</span>
                  </button>
                )}
              </div>
            )}

            {scannedItems.length > 0 && (
              <div className="space-y-3">
                {scannedItems.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="bg-white rounded-[22px] p-4 border border-black/[0.06] space-y-3"
                  >
                    <div>
                      <p className="text-[16px] font-bold text-[#1C1917]">{item.name}</p>
                      <p className="text-[13px] text-[#6B6560]">
                        {item.dosage} · Horário sugerido: {item.times.join(', ')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={resolvingIdx === idx}
                        onClick={() => void handleConfirmScannedItem(item, idx, true)}
                        className="flex-1 py-3 px-3 rounded-full bg-[#146356] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {resolvingIdx === idx ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <AlarmClock className="w-4 h-4" />
                        )}
                        <span>Salvar + Alarme</span>
                      </button>
                      <button
                        type="button"
                        disabled={resolvingIdx === idx}
                        onClick={() => void handleConfirmScannedItem(item, idx, false)}
                        className="py-3 px-4 rounded-full bg-[#F3EFE8] text-[#1C1917] text-[13px] font-semibold cursor-pointer"
                      >
                        Só abrir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paste WhatsApp text */}
            <div className="bg-white rounded-[22px] p-4 border border-black/[0.05] space-y-2.5">
              <label htmlFor="paste-rx" className="text-[13px] font-semibold text-[#57534E]">
                Ou cole o texto de uma receita do WhatsApp
              </label>
              <textarea
                id="paste-rx"
                rows={2}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Ex: Iumi 1 comp às 21:00 e Dipirona 6/6h"
                className="w-full rounded-2xl bg-[#F6F4EF] px-3.5 py-2.5 text-[14px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
              />
              {pastedText.trim() && (
                <button
                  type="button"
                  onClick={() => handleAnalyzeText(pastedText)}
                  className="w-full py-2.5 rounded-full bg-[#1C1917] text-white text-[13px] font-semibold cursor-pointer"
                >
                  Ler receita colada
                </button>
              )}
            </div>

            {/* Quiet collapsible demo prescriptions */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowExamples((v) => !v)}
                className="text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer"
              >
                {showExamples ? 'Esconder exemplos' : 'Testar com um exemplo de receita pronto'}
              </button>

              {showExamples && (
                <div className="mt-3 space-y-2 text-left">
                  {SAMPLE_PRESCRIPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleAnalyzeText(s.extractedText)}
                      className="w-full p-3.5 rounded-2xl bg-white border border-black/[0.05] hover:bg-[#FAF9F6] cursor-pointer"
                    >
                      <p className="text-[14px] font-bold text-[#1C1917]">{s.title}</p>
                      <p className="text-[12.5px] text-[#78716C] mt-0.5 truncate">
                        {s.previewLines.slice(1).join(' · ')}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: VOICE SEARCH */}
        {step === 'voice' && (
          <div className="bg-white rounded-[26px] p-6 border border-black/[0.05] flex flex-col items-center text-center space-y-4">
            <p className="text-[14.5px] text-[#57534E]">
              Toque no botão e diga o nome do remédio (ex.: &ldquo;Iumi&rdquo;, &ldquo;Losartana&rdquo;, &ldquo;Ozempic&rdquo;)
            </p>
            <button
              type="button"
              onClick={handleStartVoice}
              aria-label={listening ? 'Ouvindo' : 'Falar nome do remédio'}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all cursor-pointer ${
                listening
                  ? 'bg-[#BE123C] ring-[10px] ring-[#BE123C]/20 animate-pulse'
                  : 'bg-[#146356] animate-calm-breathe'
              }`}
            >
              {listening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>
            <p className="text-[16px] font-bold text-[#1C1917]">
              {listening ? 'Estou ouvindo...' : 'Toque para falar'}
            </p>
            {voiceHeard && (
              <p className="text-[13.5px] text-[#146356] font-medium">
                Ouvi: &ldquo;{voiceHeard}&rdquo;
              </p>
            )}
            {voiceError && <p className="text-[13px] text-[#BE123C]">{voiceError}</p>}
          </div>
        )}

        {/* STEP 3: SEARCH ANY BRAZILIAN MEDICATION */}
        {step === 'search' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4.5 h-4.5 text-[#78716C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLookupError(null);
                }}
                placeholder="Digite qualquer remédio do Brasil..."
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-black/[0.08] text-[15px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#146356]"
              />
            </div>

            {/* AI lookup button for ANY medication not in local list */}
            {query.trim().length >= 3 && (
              <button
                type="button"
                disabled={lookingUpAi}
                onClick={() => void handleAiLookupQuery(query)}
                className="w-full py-3.5 px-4 rounded-[20px] bg-[#E6F2EF] hover:bg-[#D5EBE5] text-[#0F4F45] font-semibold text-[14px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {lookingUpAi ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Montando bula e genéricos de &ldquo;{query.trim()}&rdquo;...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Consultar &ldquo;{query.trim()}&rdquo; com IA (qualquer remédio BR)</span>
                  </>
                )}
              </button>
            )}

            {lookupError && (
              <p className="text-[13px] text-[#9F1239] bg-[#FFF6F7] rounded-2xl p-3.5">
                {lookupError}
              </p>
            )}

            <div className="bg-white rounded-[24px] border border-black/[0.05] divide-y divide-black/[0.05] overflow-hidden max-h-72 overflow-y-auto">
              {localResults.map((med) => (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => {
                    onAddExisting(med, { createAlarm: false, openAfter: true });
                    onClose();
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#FAF9F6] cursor-pointer"
                >
                  <MedicationAvatar medication={med} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-[#1C1917] truncate">{med.name}</p>
                    <p className="text-[12.5px] text-[#78716C] truncate">{med.activeIngredient}</p>
                  </div>
                  <Check className="w-4 h-4 text-[#146356] opacity-70" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setManualName(query);
                setStep('manual');
              }}
              className="w-full py-3 rounded-full bg-white border border-black/10 text-[#57534E] text-[13.5px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar manualmente</span>
            </button>
          </div>
        )}

        {/* STEP 4: SIMPLE MANUAL FORM */}
        {step === 'manual' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!manualName.trim()) return;
              const med = createCustomMedication({
                name: manualName,
                dosage: manualDosage,
                notes: manualNotes,
                colorTheme: 'teal',
              });
              onAddNewMedication(med, manualTime ? [manualTime] : undefined);
              onClose();
            }}
            className="bg-white rounded-[24px] p-5 border border-black/[0.05] space-y-4"
          >
            <div>
              <label htmlFor="man-name" className="block text-[13px] font-semibold text-[#57534E] mb-1.5">
                Nome do remédio
              </label>
              <input
                id="man-name"
                type="text"
                required
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="Ex: Vitamina D 2000 UI"
                className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[15px] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="man-dose" className="block text-[13px] font-semibold text-[#57534E] mb-1.5">
                  Dose
                </label>
                <input
                  id="man-dose"
                  type="text"
                  value={manualDosage}
                  onChange={(e) => setManualDosage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[14px] text-[#1C1917] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="man-time" className="block text-[13px] font-semibold text-[#57534E] mb-1.5">
                  Horário
                </label>
                <input
                  id="man-time"
                  type="time"
                  value={manualTime}
                  onChange={(e) => setManualTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[14px] font-semibold text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="man-notes" className="block text-[13px] font-semibold text-[#57534E] mb-1.5">
                Como tomar (opcional)
              </label>
              <input
                id="man-notes"
                type="text"
                value={manualNotes}
                onChange={(e) => setManualNotes(e.target.value)}
                placeholder="Ex: Após o almoço"
                className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EF] text-[14px] text-[#1C1917] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-semibold text-[15px] cursor-pointer"
            >
              Salvar remédio
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
