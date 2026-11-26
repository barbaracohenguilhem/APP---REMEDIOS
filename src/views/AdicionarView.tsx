import { useEffect, useRef, useState } from 'react';
import {
  AlarmClock,
  Camera,
  CheckCircle2,
  ClipboardPaste,
  ImagePlus,
  Loader2,
  Mic,
  MicOff,
  PlusCircle,
  Search,
  Sparkles,
} from 'lucide-react';
import type { Medication, MedicationCategory } from '../types/medication';
import { MEDICATION_CATEGORIES } from '../data/medications';
import { SAMPLE_PRESCRIPTIONS, type SamplePrescription } from '../data/samplePrescriptions';
import {
  createCustomMedication,
  parsePrescriptionText,
  searchMedications,
  type ParsedMedicationMatch,
} from '../services/medicationSearch';
import { scanImageForMedications } from '../services/ocrScanner';
import { speechService } from '../services/speech';
import { MedicinePackArt } from '../components/MedicinePackArt';
import { SpeakButton } from '../components/SpeakButton';

interface AdicionarViewProps {
  catalog: Medication[];
  myMedicationIds: string[];
  speakingId: string | null;
  onSpeakSection: (id: string, text: string) => void;
  onStopSpeaking: () => void;
  onAddMedication: (
    med: Medication,
    options: { createAlarm?: boolean; alarmTimes?: string[]; openAfter?: boolean }
  ) => void;
  onAddCustomMedication: (med: Medication, alarmTime?: string) => void;
}

type AddMode = 'foto' | 'print' | 'voz' | 'catalogo';

export function AdicionarView({
  catalog,
  myMedicationIds,
  speakingId,
  onSpeakSection,
  onStopSpeaking,
  onAddMedication,
  onAddCustomMedication,
}: AdicionarViewProps) {
  const [mode, setMode] = useState<AddMode>('foto');

  // Photo / OCR state
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [scanMatches, setScanMatches] = useState<ParsedMedicationMatch[]>([]);
  const [scanNotice, setScanNotice] = useState<string | null>(null);
  const [addedFeedbackIds, setAddedFeedbackIds] = useState<string[]>([]);

  // Print / Paste text state
  const [pastedText, setPastedText] = useState('');

  // Voice search state
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const stopVoiceRef = useRef<(() => void) | null>(null);

  // Visual catalog + Manual custom med state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MedicationCategory | 'todos'>('todos');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customActive, setCustomActive] = useState('');
  const [customDosage, setCustomDosage] = useState('1 comprimido');
  const [customAlarmTime, setCustomAlarmTime] = useState('08:00');
  const [customNotes, setCustomNotes] = useState('');
  const [customColor, setCustomColor] = useState<'teal' | 'pink' | 'blue' | 'amber' | 'purple'>('teal');

  const resultsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      stopVoiceRef.current?.();
    };
  }, []);

  const scrollResultsIntoView = () => {
    requestAnimationFrame(() => {
      resultsSectionRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const processImageFile = async (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setScanning(true);
    setScanProgress(10);
    setScanStage('Preparando imagem...');
    setScanNotice(null);
    setScanMatches([]);
    setAddedFeedbackIds([]);
    scrollResultsIntoView();

    const result = await scanImageForMedications(file, catalog, (pct, stage) => {
      setScanProgress(pct);
      setScanStage(stage);
    });

    setScanning(false);
    setExtractedText(result.extractedText);
    setScanMatches(result.matches);

    if (result.matches.length > 0) {
      const names = result.matches.map((m) => m.medication.name).join(' e ');
      setScanNotice(`Encontramos ${result.matches.length} remédio(s) na imagem!`);
      onSpeakSection(
        'scan-result',
        `Pronto! Encontrei na imagem: ${names}. Toque no botão verde para salvar e ver a bula fácil.`
      );
    } else {
      setScanNotice(
        result.ocrFailedReason
          ? 'Não deu para ler a foto automaticamente. Você pode digitar ou escolher a caixinha abaixo.'
          : 'A letra da receita estava difícil de ler automaticamente. Tente colar o texto, falar o nome ou escolher pela caixinha abaixo.'
      );
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void processImageFile(file);
    }
    e.target.value = '';
  };

  const handlePasteEvent = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            setMode('print');
            void processImageFile(file);
            return;
          }
        }
      }
    }
  };

  const handleAnalyzePastedText = (textToParse: string) => {
    setExtractedText(textToParse);
    const matches = parsePrescriptionText(textToParse, catalog);
    setScanMatches(matches);
    setAddedFeedbackIds([]);
    scrollResultsIntoView();
    if (matches.length > 0) {
      setScanNotice(`Identificamos ${matches.length} remédio(s) no texto da receita!`);
      onSpeakSection(
        'paste-result',
        `Encontrei ${matches.map((m) => m.medication.name).join(' e ')}. Toque no botão verde para adicionar.`
      );
    } else {
      setScanNotice(
        'Nenhum remédio do catálogo foi reconhecido nesse texto. Você pode cadastrar manualmente abaixo!'
      );
    }
  };

  const handleUseSample = (sample: SamplePrescription) => {
    setPreviewUrl(null);
    setPastedText(sample.extractedText);
    handleAnalyzePastedText(sample.extractedText);
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopVoiceRef.current?.();
      setIsListening(false);
      return;
    }

    setVoiceError(null);
    setIsListening(true);
    const stopFn = speechService.startVoiceSearch({
      onResult: (transcript) => {
        setVoiceTranscript(transcript);
        setSearchQuery(transcript);
        const matches = parsePrescriptionText(transcript, catalog);
        const fallbackList = searchMedications(catalog, transcript);
        if (matches.length > 0) {
          setScanMatches(matches);
          onSpeakSection(
            'voice-match',
            `Ouvi ${transcript}. Encontrei ${matches[0].medication.name}. Toque para abrir.`
          );
        } else if (fallbackList.length > 0) {
          setScanMatches([
            {
              medication: fallbackList[0],
              matchedTerm: transcript,
              detectedTimes: fallbackList[0].howToTake.defaultTimes,
              detectedDosage: fallbackList[0].howToTake.defaultDosage,
              confidence: 'media',
            },
          ]);
          onSpeakSection(
            'voice-match',
            `Ouvi ${transcript}. Encontrei ${fallbackList[0].name}. Toque para abrir.`
          );
        } else {
          setScanMatches([]);
          setVoiceError(`Ouvi "${transcript}", mas não achei no catálogo. Você pode cadastrar abaixo.`);
        }
      },
      onError: (msg) => {
        setVoiceError(msg);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    stopVoiceRef.current = stopFn;
    if (!stopFn) setIsListening(false);
  };

  const handleCreateCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const med = createCustomMedication({
      name: customName,
      activeIngredient: customActive,
      dosage: customDosage,
      notes: customNotes,
      colorTheme: customColor,
    });
    onAddCustomMedication(med, customAlarmTime || undefined);
    setCustomName('');
    setCustomActive('');
    setCustomNotes('');
    setShowCustomForm(false);
  };

  const filteredCatalog = searchMedications(catalog, searchQuery, selectedCategory);

  const handleSpeakGuide = () => {
    if (speakingId === 'add-guide') {
      onStopSpeaking();
    } else {
      onSpeakSection(
        'add-guide',
        'Para adicionar um remédio, você não precisa saber ler nem escrever. Você pode tirar uma foto da receita ou da caixa, enviar um print da tela, tocar no microfone para falar o nome do remédio, ou escolher tocando na foto da caixinha.'
      );
    }
  };

  return (
    <div className="px-4 py-3.5 space-y-4 pb-12" onPaste={handlePasteEvent}>
      {/* Hidden native file inputs for Camera and Gallery */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelected}
        className="hidden"
        aria-label="Tirar foto da receita ou caixa"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        className="hidden"
        aria-label="Escolher foto ou print da galeria"
      />

      {/* Friendly Voice-guided Banner */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Como quer adicionar seu remédio?
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Por foto da receita, print de WhatsApp, falando no microfone ou escolhendo pela caixinha.
          </p>
        </div>
        <SpeakButton
          isSpeaking={speakingId === 'add-guide'}
          onClick={handleSpeakGuide}
          ariaLabel="Ouvir instruções de como adicionar um remédio"
        />
      </section>

      {/* 4 Big Intuitive Mode Tiles */}
      <div className="grid grid-cols-2 gap-2.5" role="tablist" aria-label="Formas de adicionar">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'foto'}
          onClick={() => setMode('foto')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
            mode === 'foto'
              ? 'border-[#0D9488] bg-teal-50/80 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <span className="w-11 h-11 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shrink-0">
            <Camera className="w-6 h-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-slate-900 leading-tight">Foto da Receita</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Ou foto da caixa</p>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'print'}
          onClick={() => setMode('print')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
            mode === 'print'
              ? 'border-[#0D9488] bg-teal-50/80 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <span className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <ImagePlus className="w-6 h-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-slate-900 leading-tight">Print / WhatsApp</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Imagem ou texto</p>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'voz'}
          onClick={() => setMode('voz')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
            mode === 'voz'
              ? 'border-[#0D9488] bg-teal-50/80 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <span className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Mic className="w-6 h-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-slate-900 leading-tight">Falar o Nome</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Sem precisar escrever</p>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'catalogo'}
          onClick={() => setMode('catalogo')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
            mode === 'catalogo'
              ? 'border-[#0D9488] bg-teal-50/80 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <span className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Search className="w-6 h-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-slate-900 leading-tight">Ver Caixinhas</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Buscar ou manual</p>
          </div>
        </button>
      </div>

      {/* SCANNER PREVIEW & DETECTED RESULTS (placed above examples so mobile users see results immediately!) */}
      {(previewUrl || scanning || scanMatches.length > 0 || scanNotice) && mode !== 'catalogo' && (
        <section
          ref={resultsSectionRef}
          aria-label="Resultado da leitura"
          className="bg-white rounded-2xl p-4 shadow-sm border-2 border-teal-200 space-y-3"
        >
          {previewUrl && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-48 bg-slate-100 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Imagem enviada para leitura"
                className="max-h-48 object-contain"
              />
            </div>
          )}

          {scanning && (
            <div className="space-y-2 py-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-teal-800">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{scanStage || 'Lendo receita...'}</span>
                <span className="ml-auto">{scanProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0D9488] transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {!scanning && scanNotice && (
            <p
              className={`text-sm font-extrabold rounded-xl p-3 ${
                scanMatches.length > 0
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-amber-50 text-amber-950 border border-amber-200'
              }`}
            >
              {scanNotice}
            </p>
          )}

          {!scanning && scanMatches.length > 0 && (
            <div className="space-y-3">
              {scanMatches.map((match) => {
                const alreadyAdded = addedFeedbackIds.includes(match.medication.id);
                const saveLabel =
                  match.detectedTimes.length > 1
                    ? `Salvar + Alarme (${match.detectedTimes.length} horários)`
                    : `Salvar + Alarme (${match.detectedTimes[0]})`;

                return (
                  <div
                    key={match.medication.id}
                    className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <MedicinePackArt pack={match.medication.pack} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-base font-extrabold text-slate-900">
                            {match.medication.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-extrabold">
                            Encontrado!
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 truncate">
                          {match.medication.activeIngredient}
                        </p>
                        <p className="text-xs font-bold text-teal-800 mt-1 flex items-center gap-1">
                          <AlarmClock className="w-3.5 h-3.5 shrink-0" />
                          <span>Horário sugerido: {match.detectedTimes.join(' · ')}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onAddMedication(match.medication, {
                            createAlarm: true,
                            alarmTimes: match.detectedTimes,
                            openAfter: scanMatches.length === 1,
                          });
                          setAddedFeedbackIds((prev) =>
                            prev.includes(match.medication.id)
                              ? prev
                              : [...prev, match.medication.id]
                          );
                        }}
                        className={`py-3 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                          alreadyAdded
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{alreadyAdded ? 'Adicionado com Alarme ✓' : saveLabel}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onAddMedication(match.medication, {
                            createAlarm: false,
                            openAfter: true,
                          })
                        }
                        className="py-3 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-extrabold text-xs cursor-pointer"
                      >
                        Abrir Bula Fácil →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!scanning && extractedText && (
            <details className="text-xs text-slate-500">
              <summary className="cursor-pointer font-bold">Ver texto lido da receita</summary>
              <pre className="mt-1.5 whitespace-pre-wrap bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 font-sans">
                {extractedText}
              </pre>
            </details>
          )}
        </section>
      )}

      {/* MODE 1: FOTO DA RECEITA OU CAIXA */}
      {mode === 'foto' && (
        <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="py-4 px-4 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <Camera className="w-6 h-6" />
              <span>Abrir Câmera Agora</span>
            </button>

            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="py-4 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <ImagePlus className="w-5 h-5 text-teal-700" />
              <span>Escolher foto do celular</span>
            </button>
          </div>

          {/* Demo prescriptions so user can try 1-tap scanning immediately */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Ou teste agora com um exemplo real:</span>
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_PRESCRIPTIONS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleUseSample(sample)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-extrabold text-slate-900">{sample.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-extrabold">
                      {sample.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{sample.doctorOrSender}</p>
                  <div className="mt-1.5 text-xs text-slate-700 font-mono bg-white rounded-lg p-2 border border-slate-100">
                    {sample.previewLines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MODE 2: PRINT DE TELA / COLAR WHATSAPP */}
      {mode === 'print' && (
        <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="w-full py-4 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
          >
            <ImagePlus className="w-6 h-6" />
            <span>Enviar Print da Galeria</span>
          </button>

          <p className="text-xs text-center text-slate-500">
            Dica: você também pode colar um print direto aqui (Ctrl+V / Cmd+V) ou colar a mensagem da receita abaixo:
          </p>

          <div className="space-y-2">
            <label htmlFor="paste-prescription-text" className="block text-sm font-extrabold text-slate-800">
              Colar texto de receita ou WhatsApp
            </label>
            <textarea
              id="paste-prescription-text"
              rows={3}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Ex: Tomar Losartana 50mg às 08:00 e Iumi às 21:00..."
              className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm font-medium text-slate-900 focus:border-[#0D9488] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAnalyzePastedText(pastedText)}
              disabled={!pastedText.trim()}
              className="w-full py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ClipboardPaste className="w-4 h-4" />
              <span>Identificar Remédios e Horários</span>
            </button>
          </div>
        </section>
      )}

      {/* MODE 3: FALAR O NOME (VOZ) */}
      {mode === 'voz' && (
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col items-center text-center space-y-4">
          <p className="text-sm font-bold text-slate-700">
            Toque no botão azul e fale o nome do remédio em voz alta (ex.: &ldquo;Iumi&rdquo;,
            &ldquo;Losartana&rdquo;, &ldquo;Glifage&rdquo;):
          </p>

          <button
            type="button"
            onClick={handleToggleMic}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-95 cursor-pointer ${
              isListening
                ? 'bg-rose-600 ring-8 ring-rose-200 animate-pulse'
                : 'bg-[#1D4ED8] hover:bg-[#1E40AF] ring-8 ring-blue-100'
            }`}
            aria-label={isListening ? 'Parar de ouvir' : 'Tocar para falar o nome do remédio'}
          >
            {isListening ? <MicOff className="w-11 h-11" /> : <Mic className="w-11 h-11" />}
          </button>

          <p className="text-base font-extrabold text-slate-900">
            {isListening ? 'Estou ouvindo... pode falar!' : 'Toque para falar'}
          </p>

          {voiceTranscript && (
            <div className="w-full rounded-xl bg-blue-50 border border-blue-200 px-3 py-2 text-sm font-bold text-blue-950">
              Você falou: &ldquo;{voiceTranscript}&rdquo;
            </div>
          )}

          {voiceError && (
            <p className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3 w-full">
              {voiceError}
            </p>
          )}

          {/* One-tap voice shortcuts for quick accessibility testing */}
          <div className="w-full pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-2">Ou toque em um remédio comum:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Iumi', 'Glifage XR', 'Losartana', 'Puran T4', 'Losec MUPS', 'Dipirona'].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setVoiceTranscript(label);
                      handleAnalyzePastedText(label);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-teal-100 text-slate-800 text-xs font-extrabold cursor-pointer"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* MODE 4: VISUAL BOX CATALOG + SEARCH + MANUAL CUSTOM MEDICATION */}
      {mode === 'catalogo' && (
        <section className="space-y-3.5">
          {/* Search box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar nome, sintoma ou princípio ativo..."
              aria-label="Buscar medicamento"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-sm font-semibold text-slate-900 focus:border-[#0D9488] focus:outline-none shadow-xs"
            />
          </div>

          {/* Visual emoji category chips (great for low-literacy navigation!) */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {MEDICATION_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span aria-hidden="true">{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Visual Medication Box Cards */}
          <div className="space-y-2.5">
            {filteredCatalog.map((med) => {
              const inCabinet = myMedicationIds.includes(med.id);
              return (
                <div
                  key={med.id}
                  className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 flex items-center gap-3"
                >
                  <MedicinePackArt pack={med.pack} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-base font-extrabold text-slate-900 truncate">{med.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {med.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">{med.activeIngredient}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {med.purposeSimple}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onAddMedication(med, {
                        createAlarm: false,
                        openAfter: true,
                      })
                    }
                    className={`shrink-0 px-3.5 py-2.5 rounded-xl font-extrabold text-xs cursor-pointer transition-colors ${
                      inCabinet
                        ? 'bg-teal-50 text-teal-900 border border-teal-200 hover:bg-teal-100'
                        : 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                    }`}
                  >
                    {inCabinet ? 'Abrir' : 'Usar'}
                  </button>
                </div>
              );
            })}

            {filteredCatalog.length === 0 && (
              <div className="bg-white rounded-2xl p-5 text-center border border-slate-200 space-y-2">
                <p className="text-sm font-extrabold text-slate-800">
                  Não encontramos &ldquo;{searchQuery}&rdquo; no catálogo pronto.
                </p>
                <p className="text-xs text-slate-600">
                  Sem problema! Você pode cadastrar agora mesmo pelo botão abaixo.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ALWAYS AVAILABLE: Manual Custom Medication Registration */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-3">
        <button
          type="button"
          onClick={() => setShowCustomForm((prev) => !prev)}
          className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <PlusCircle className="w-6 h-6 text-[#0D9488] shrink-0" />
            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Cadastrar remédio manualmente
              </p>
              <p className="text-xs text-slate-600">
                Para qualquer remédio da sua receita que não esteja na lista
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-[#0D9488]">
            {showCustomForm ? 'Fechar' : 'Abrir'}
          </span>
        </button>

        {showCustomForm && (
          <form onSubmit={handleCreateCustomSubmit} className="pt-2 border-t border-slate-100 space-y-3">
            <div>
              <label htmlFor="custom-med-name" className="block text-xs font-extrabold text-slate-800 mb-1">
                Nome do remédio *
              </label>
              <input
                id="custom-med-name"
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Ex: Selozok 25 mg, Vitamina D..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-[#0D9488] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="custom-med-dosage" className="block text-xs font-extrabold text-slate-800 mb-1">
                  Dose
                </label>
                <input
                  id="custom-med-dosage"
                  type="text"
                  value={customDosage}
                  onChange={(e) => setCustomDosage(e.target.value)}
                  placeholder="1 comprimido"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="custom-med-time" className="block text-xs font-extrabold text-slate-800 mb-1">
                  Horário do alarme
                </label>
                <input
                  id="custom-med-time"
                  type="time"
                  value={customAlarmTime}
                  onChange={(e) => setCustomAlarmTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold focus:border-[#0D9488] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="custom-med-active" className="block text-xs font-extrabold text-slate-800 mb-1">
                Princípio ativo (opcional)
              </label>
              <input
                id="custom-med-active"
                type="text"
                value={customActive}
                onChange={(e) => setCustomActive(e.target.value)}
                placeholder="Ex: Succinato de Metoprolol"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium focus:border-[#0D9488] focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-xs font-extrabold text-slate-800 mb-1.5">
                Cor da caixinha (para reconhecer fácil)
              </span>
              <div className="flex items-center gap-2.5">
                {(
                  [
                    { id: 'teal', hex: '#14B8A6', label: 'Verde água' },
                    { id: 'pink', hex: '#F472B6', label: 'Rosa' },
                    { id: 'blue', hex: '#3B82F6', label: 'Azul' },
                    { id: 'amber', hex: '#F59E0B', label: 'Amarelo' },
                    { id: 'purple', hex: '#8B5CF6', label: 'Roxo' },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCustomColor(c.id)}
                    aria-label={`Cor ${c.label}`}
                    className={`w-9 h-9 rounded-full cursor-pointer transition-transform ${
                      customColor === c.id ? 'ring-4 ring-slate-900 scale-110' : 'opacity-80'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="custom-med-notes" className="block text-xs font-extrabold text-slate-800 mb-1">
                Como tomar / observação (opcional)
              </label>
              <input
                id="custom-med-notes"
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Ex: Tomar após o almoço com água"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium focus:border-[#0D9488] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-extrabold text-sm cursor-pointer"
            >
              Salvar Meu Remédio e Criar Alarme
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
