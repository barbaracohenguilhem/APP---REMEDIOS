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
  Volume2,
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

export type SheetStep = 'choose' | 'scan' | 'voice' | 'search' | 'manual';

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
        setScanError(
          res.message || 'Conecte sua chave Gemini para ler fotos de receitas e caixas automaticamente.'
        );
        return;
      }

      if (res.error) {
        setScanError(res.message || 'Não foi possível ler a imagem.');
        return;
      }

      if (res.items.length === 0) {
        setScanError(
          'Não identifiquei o nome do remédio nessa foto. Tente tirar mais de perto ou falar o nome.'
        );
        return;
      }

      setScannedItems(res.items);
      onSpeak(
        'scan-done',
          `Encontrei ${res.items.map((i) => i.name).join(' e ')}. Toque no botão verde para salvar e criar o alarme.`
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
        `Encontrei ${items.map((i) => i.name).join(' e ')}. Toque no botão verde para salvar.`
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
          onSpeak('voice-found', `Ouvi ${transcript}. Encontrei ${matches[0].name}. Toque para abrir.`);
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

  const speakSheetHelp = () => {
    const text =
      step === 'choose'
        ? 'Como você quer adicionar seu remédio? Botão verde para tirar foto da receita ou da caixa, botão azul para falar o nome em voz alta, ou botão branco para procurar na lista.'
        : step === 'scan'
          ? 'Toque no botão verde para tirar foto da receita ou da caixa do remédio, ou no botão branco para escolher um print da galeria.'
          : step === 'voice'
            ? 'Toque no botão azul grande do microfone e diga o nome do remédio em voz alta.'
            : 'Digite o nome do remédio na caixa de busca ou toque em uma opção da lista.';
    onSpeak('add-sheet-help', text);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-sheet-title"
      className="fixed inset-0 z-50 bg-[#111827]/55 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[92dvh] overflow-y-auto bg-[#F7F6F2] rounded-t-[30px] sm:rounded-[30px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
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

        {/* High-Contrast Accessible Header */}
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {step !== 'choose' && (
                <button
                  type="button"
                  onClick={() => setStep('choose')}
                  aria-label="Voltar"
                  className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#111827] inline-flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}
                <h2 id="add-sheet-title" className="text-[22px] font-extrabold text-[#111827] truncate">
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

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={speakSheetHelp}
                aria-label="Ouvir explicação desta tela"
                className="w-11 h-11 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white inline-flex items-center justify-center cursor-pointer"
              >
                <Volume2 className="w-5 h-5 stroke-[2.4]" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#111827] inline-flex items-center justify-center cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* STEP 0: 3 GIANT HIGH-CONTRAST CHOICES */}
          {step === 'choose' && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setStep('scan')}
                className="w-full p-5 rounded-[24px] bg-[#0F766E] hover:bg-[#115E59] text-white flex items-center gap-4 text-left shadow-sm active:scale-[0.99] transition-all cursor-pointer"
              >
                  <span className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <Camera className="w-8 h-8 stroke-[2.2]" />
                  </span>
                  <div>
                      <p className="text-[18px] font-extrabold leading-tight">Foto da receita ou caixa</p>
                      <p className="text-[14.5px] text-white/90 font-medium mt-0.5">
                        Câmera, caixa do remédio ou print
                      </p>
                  </div>
              </button>

              <button
                type="button"
                onClick={() => setStep('voice')}
                className="w-full p-5 rounded-[24px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center gap-4 text-left shadow-sm active:scale-[0.99] transition-all cursor-pointer"
              >
                  <span className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mic className="w-8 h-8 stroke-[2.2]" />
                  </span>
                  <div>
                      <p className="text-[18px] font-extrabold leading-tight">Falar o nome em voz alta</p>
                      <p className="text-[14.5px] text-white/90 font-medium mt-0.5">
                        Sem precisar digitar nada
                      </p>
                  </div>
              </button>

              <button
                type="button"
                onClick={() => setStep('search')}
                className="w-full p-5 rounded-[24px] bg-white hover:bg-slate-50 border-2 border-slate-300 text-[#111827] flex items-center gap-4 text-left active:scale-[0.99] transition-all cursor-pointer"
              >
                  <span className="w-14 h-14 rounded-2xl bg-[#F3F4F6] text-[#111827] flex items-center justify-center shrink-0">
                    <Search className="w-7 h-7 stroke-[2.4]" />
                  </span>
                  <div>
                      <p className="text-[18px] font-extrabold leading-tight">Buscar ou cadastrar</p>
                      <p className="text-[14.5px] text-[#374151] font-medium mt-0.5">
                        Qualquer remédio do Brasil
                      </p>
                  </div>
              </button>
            </div>
          )}

          {/* STEP 1: FOTO / RECEITA / PRINT */}
          {step === 'scan' && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => cameraRef.current?.click()}
                    className="min-h-[64px] px-4 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-[16px] inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Tirar foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => galleryRef.current?.click()}
                    className="min-h-[64px] px-4 rounded-2xl bg-white border-2 border-slate-300 hover:bg-slate-50 text-[#111827] font-extrabold text-[16px] inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ImagePlus className="w-6 h-6 text-[#0F766E]" />
                    <span>Print / Foto</span>
                  </button>
                </div>

                {photoDataUrl && (
                    <div className="rounded-2xl overflow-hidden bg-white border-2 border-slate-200 max-h-48 flex items-center justify-center">
                      <img src={photoDataUrl} alt="Foto selecionada" className="max-h-48 object-contain" />
                    </div>
            )}

                    {scanning && (
                        <div className="bg-[#EFF6FF] border-2 border-[#BFDBFE] rounded-2xl p-5 flex items-center gap-3 text-[16px] font-extrabold text-[#1E40AF]">
                          <Loader2 className="w-6 h-6 animate-spin shrink-0" />
                          <span>Lendo sua receita...</span>
                        </div>
            )}

                        {scanError && (
                            <div className="bg-[#FEF2F2] border-2 border-[#FCA5A5] rounded-2xl p-4 space-y-3">
                              <p className="text-[15.5px] font-bold text-[#991B1B] leading-snug">{scanError}</p>
                              {!hasGeminiKey && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onOpenVoiceSettings();
                                  }}
                                  className="w-full min-h-[48px] px-4 rounded-xl bg-[#1D4ED8] text-white text-[15px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <Sparkles className="w-5 h-5" />
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
                                    className="bg-white rounded-[22px] p-4 border-2 border-[#059669]/40 space-y-3"
                                  >
                                    <div>
                                        <p className="text-[19px] font-extrabold text-[#111827]">{item.name}</p>
                                        <p className="text-[15px] font-semibold text-[#374151] mt-0.5">
                                          {item.dosage} · Horário: {item.times.join(', ')}
                                        </p>
                                    </div>
                                      <div className="grid grid-cols-1 gap-2">
                                        <button
                                          type="button"
                                          disabled={resolvingIdx === idx}
                                          onClick={() => void handleConfirmScannedItem(item, idx, true)}
                                          className="w-full min-h-[52px] px-4 rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white text-[16px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                          {resolvingIdx === idx ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                                          ) : (
                          <AlarmClock className="w-5 h-5" />
                                          )}
                                          <span>Salvar + Criar Alarme</span>
                                        </button>
                                        <button
                                          type="button"
                                          disabled={resolvingIdx === idx}
                                          onClick={() => void handleConfirmScannedItem(item, idx, false)}
                                          className="w-full min-h-[48px] px-4 rounded-2xl bg-[#F3F4F6] text-[#111827] text-[15px] font-extrabold cursor-pointer"
                                        >
                                          Só abrir a bula
                                        </button>
                                      </div>
                                    </div>
                ))}
                                  </div>
                                )}

                                {/* Paste WhatsApp text */}
                                    <div className="bg-white rounded-[22px] p-4 border border-slate-200 space-y-2.5">
                                      <label htmlFor="paste-rx" className="block text-[15px] font-extrabold text-[#111827]">
                                        Ou cole o texto de uma receita do WhatsApp
                                      </label>
                                      <textarea
                                        id="paste-rx"
                                        rows={2}
                                        value={pastedText}
                                        onChange={(e) => setPastedText(e.target.value)}
                                        placeholder="Ex: Iumi 1 comp às 21:00 e Dipirona 6/6h"
                                        className="w-full rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 px-3.5 py-2.5 text-[15.5px] text-[#111827] focus:border-[#0F766E] focus:outline-none"
                                      />
                                      {pastedText.trim() && (
                                        <button
                                          type="button"
                                          onClick={() => handleAnalyzeText(pastedText)}
                                          className="w-full min-h-[50px] rounded-2xl bg-[#111827] text-white text-[15.5px] font-extrabold cursor-pointer"
                                        >
                                          Ler receita colada
                                        </button>
                                      )}
                                    </div>

                                      {/* Easy demo recipes button */}
                                      <div className="space-y-2.5">
                                        <button
                                          type="button"
                                          onClick={() => setShowExamples((v) => !v)}
                                          className="w-full min-h-[48px] rounded-2xl bg-[#FEF3C7] text-[#92400E] text-[15px] font-extrabold cursor-pointer"
                                        >
                                          {showExamples ? 'Esconder exemplos' : 'Testar com receita de exemplo pronta'}
                                        </button>

                                        {showExamples && (
                                            <div className="space-y-2.5">
                                              {SAMPLE_PRESCRIPTIONS.map((s) => (
                                                <button
                                                  key={s.id}
                                                  type="button"
                                                  onClick={() => handleAnalyzeText(s.extractedText)}
                                                  className="w-full p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#0F766E] text-left cursor-pointer"
                                                >
                                                    <p className="text-[16px] font-extrabold text-[#111827]">{s.title}</p>
                                                    <p className="text-[14px] font-medium text-[#374151] mt-1">
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
                                            <div className="bg-white rounded-[26px] p-6 border-2 border-slate-200 flex flex-col items-center text-center space-y-5">
                                              <p className="text-[16.5px] font-bold text-[#111827] leading-snug">
                                                Toque no botão azul grande e fale o nome do remédio
                                              </p>
                                              <button
                                                type="button"
                                                onClick={handleStartVoice}
                                                aria-label={listening ? 'Ouvindo' : 'Falar nome do remédio'}
                                                        ? 'bg-[#B91C1C] ring-[12px] ring-[#FECACA] animate-pulse'
                                                        : 'bg-[#1D4ED8] hover:bg-[#1E40AF] ring-[12px] ring-[#DBEAFE]'
                                                    }`}
            >
              {listening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
            </button>
            <p className="text-[18px] font-extrabold text-[#111827]">
              {listening ? 'Estou ouvindo... pode falar!' : 'TOQUE PARA FALAR'}
            </p>
            {voiceHeard && (
              <p className="text-[15.5px] font-extrabold text-[#1D4ED8]">
                Ouvi: &ldquo;{voiceHeard}&rdquo;
              </p>
            )}
            {voiceError && (
              <p className="text-[15px] font-bold text-[#991B1B] bg-[#FEF2F2] rounded-2xl p-3.5 w-full">
                {voiceError}
              </p>
            )}
          </div>
        )}

        {/* STEP 3: SEARCH ANY BRAZILIAN MEDICATION */}
        {step === 'search' && (
          <div className="space-y-3.5">
            <div className="relative">
              <Search className="w-5 h-5 text-[#374151] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLookupError(null);
                }}
                placeholder="Digite o nome do remédio..."
                className="w-full min-h-[54px] pl-12 pr-4 rounded-2xl bg-white border-2 border-slate-300 text-[16.5px] font-semibold text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {query.trim().length >= 3 && (
              <button
                type="button"
                disabled={lookingUpAi}
                onClick={() => void handleAiLookupQuery(query)}
                className="w-full min-h-[54px] px-4 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-[15.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {lookingUpAi ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Buscando &ldquo;{query.trim()}&rdquo;...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Buscar &ldquo;{query.trim()}&rdquo; com IA</span>
                  </>
                )}
              </button>
            )}

            {lookupError && (
              <p className="text-[15px] font-bold text-[#991B1B] bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-3.5">
                {lookupError}
              </p>
            )}

            <div className="bg-white rounded-[22px] border-2 border-slate-200 divide-y divide-slate-200 overflow-hidden max-h-72 overflow-y-auto">
              {localResults.map((med) => (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => {
                    onAddExisting(med, { createAlarm: false, openAfter: true });
                    onClose();
                  }}
                  className="w-full px-4 py-3.5 flex items-center gap-3.5 text-left hover:bg-slate-50 cursor-pointer"
                >
                  <MedicationAvatar medication={med} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[17px] font-extrabold text-[#111827] truncate">{med.name}</p>
                    <p className="text-[14px] font-medium text-[#374151] truncate">
                      {med.activeIngredient}
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-[#047857] shrink-0" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setManualName(query);
                setStep('manual');
              }}
              className="w-full min-h-[52px] rounded-2xl bg-white border-2 border-slate-300 text-[#111827] text-[15.5px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
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
            className="bg-white rounded-[24px] p-5 border-2 border-slate-200 space-y-4"
          >
            <div>
              <label htmlFor="man-name" className="block text-[15px] font-extrabold text-[#111827] mb-1.5">
                Nome do remédio
              </label>
              <input
                id="man-name"
                type="text"
                required
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="Ex: Vitamina D 2000 UI"
                className="w-full min-h-[50px] px-4 rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 text-[16px] font-semibold text-[#111827] focus:border-[#0F766E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="man-dose" className="block text-[15px] font-extrabold text-[#111827] mb-1.5">
                  Dose
                </label>
                <input
                  id="man-dose"
                  type="text"
                  value={manualDosage}
                  onChange={(e) => setManualDosage(e.target.value)}
                  className="w-full min-h-[50px] px-4 rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 text-[15.5px] font-semibold text-[#111827] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="man-time" className="block text-[15px] font-extrabold text-[#111827] mb-1.5">
                  Horário
                </label>
                <input
                  id="man-time"
                  type="time"
                  value={manualTime}
                  onChange={(e) => setManualTime(e.target.value)}
                  className="w-full min-h-[50px] px-4 rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 text-[16px] font-extrabold text-[#111827] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="man-notes" className="block text-[15px] font-extrabold text-[#111827] mb-1.5">
                Como tomar (opcional)
              </label>
              <input
                id="man-notes"
                type="text"
                value={manualNotes}
                onChange={(e) => setManualNotes(e.target.value)}
                placeholder="Ex: Após o almoço"
                className="w-full min-h-[50px] px-4 rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 text-[15.5px] text-[#111827] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[56px] rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-extrabold text-[17px] cursor-pointer"
            >
              Salvar remédio e alarme
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
