'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  BookOpen,
  Calendar,
  Camera,
  SlidersHorizontal,
  Volume2,
} from 'lucide-react';
import { MEDICATIONS_CATALOG } from '@/data/medications';
import type {
  ActiveTab,
  AppPersistedState,
  ClientAiKeys,
  DoseLog,
  Medication,
  MedicationDetailTab,
  MedicationSchedule,
  VoiceProfile,
} from '@/types/medication';
import {
  createDefaultState,
  loadClientAiKeys,
  loadPersistedState,
  saveClientAiKeys,
  savePersistedState,
} from '@/services/storage';
import {
  buildLast7DaysAdherence,
  computeDelayMinutes,
  findDueAlarmNow,
  formatTimeHHMM,
  getDosesForDate,
  type ScheduledDoseInstance,
} from '@/services/scheduleEngine';
import { voiceEngine, type VoicePlaybackState } from '@/services/voiceEngine';
import { fetchAiStatus, type AiBackendStatus } from '@/services/aiClient';
import { HomeView } from './HomeView';
import { MedicationDetailView } from './MedicationDetailView';
import { CompararView } from './CompararView';
import { VoiceGuidedOverlay } from './VoiceGuidedOverlay';
import { AddMedicationSheet, type SheetStep } from './AddMedicationSheet';
import { VoiceAiSettingsSheet } from './VoiceAiSettingsSheet';
import { AlarmRingingModal } from './AlarmRingingModal';
import { AddAlarmSheet } from './AddAlarmSheet';
import { HistorySheet } from './HistorySheet';

export function MeuRemedioApp() {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<AppPersistedState>(() => createDefaultState());
  const [aiKeys, setAiKeys] = useState<ClientAiKeys>({});
  const [aiStatus, setAiStatus] = useState<AiBackendStatus>({
    elevenLabsConnected: false,
    elevenLabsSource: 'none',
    geminiConnected: false,
    geminiSource: 'none',
    naturalVoiceProvider: 'none',
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('hoje');
  const [detailSubTab, setDetailSubTab] = useState<MedicationDetailTab>('bula');
  const [addSheetStep, setAddSheetStep] = useState<SheetStep | null>(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showAddAlarm, setShowAddAlarm] = useState(false);
  const [historySheetDate, setHistorySheetDate] = useState<string | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [largeText, setLargeText] = useState(false);

  const [playback, setPlayback] = useState<VoicePlaybackState>(() => voiceEngine.getState());
  const [now, setNow] = useState<Date>(() => new Date());
  const [ringingAlarm, setRingingAlarm] = useState<{
    dose: ScheduledDoseInstance;
    isTest: boolean;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const dismissedKeysRef = useRef<Set<string>>(new Set());
  const snoozedUntilRef = useRef<Record<string, number>>({});
  const ringingRef = useRef<{ dose: ScheduledDoseInstance; isTest: boolean } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const setRinging = useCallback((next: { dose: ScheduledDoseInstance; isTest: boolean } | null) => {
    ringingRef.current = next;
    setRingingAlarm(next);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    setState(loadPersistedState());
    const keys = loadClientAiKeys();
    setAiKeys(keys);
    setHydrated(true);
    void fetchAiStatus(keys).then(setAiStatus);
  }, []);

  useEffect(() => {
    if (hydrated) savePersistedState(state);
  }, [state, hydrated]);

  useEffect(() => {
    const unsub = voiceEngine.subscribe(setPlayback);
    return () => {
      unsub();
      voiceEngine.stop();
    };
  }, []);

  // Apply accessible extra-large text scaling cleanly on root html font-size
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = largeText ? '115%' : '100%';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.style.fontSize = '100%';
      }
    };
  }, [largeText]);

  const fullCatalog: Medication[] = useMemo(
    () => [...MEDICATIONS_CATALOG, ...state.customMedications],
    [state.customMedications]
  );

  const myMedications: Medication[] = useMemo(() => {
    const map = new Map(fullCatalog.map((m) => [m.id, m]));
    const list = state.myMedicationIds
      .map((id) => map.get(id))
      .filter((m): m is Medication => Boolean(m));
    return list.length > 0 ? list : [MEDICATIONS_CATALOG[0]];
  }, [fullCatalog, state.myMedicationIds]);

  const activeMedication: Medication = useMemo(
    () =>
      fullCatalog.find((m) => m.id === state.activeMedicationId) ??
      myMedications[0] ??
      MEDICATIONS_CATALOG[0],
    [fullCatalog, myMedications, state.activeMedicationId]
  );

  const medicationPhotos = state.medicationPhotos ?? {};

  const dosesToday = useMemo(
    () => getDosesForDate(state.schedules, state.doseLogs, fullCatalog, now, now),
    [state.schedules, state.doseLogs, fullCatalog, now]
  );

  const last7Days = useMemo(
    () => buildLast7DaysAdherence(state.schedules, state.doseLogs, fullCatalog, now),
    [state.schedules, state.doseLogs, fullCatalog, now]
  );

  const nextUntakenDose = useMemo(
    () =>
      dosesToday.find((d) => d.status === 'due_now') ??
      dosesToday.find((d) => d.status === 'late') ??
      dosesToday.find((d) => d.status === 'upcoming') ??
      null,
    [dosesToday]
  );

  const hasNaturalVoiceKey =
    aiStatus.naturalVoiceProvider !== 'none' ||
    Boolean(aiKeys.elevenLabsKey) ||
    Boolean(aiKeys.geminiKey);

  const hasGeminiKey = aiStatus.geminiConnected || Boolean(aiKeys.geminiKey);

  const speak = useCallback(
    (sectionId: string, text: string) => {
      void voiceEngine.speak(text, {
        sectionId,
        rate: state.voice.rate,
        voiceProfile: state.voice.voiceProfile ?? 'acolhedora',
        keysOverride: aiKeys,
      });
    },
    [state.voice.rate, state.voice.voiceProfile, aiKeys]
  );

  const announceAlarm = useCallback(
    (dose: ScheduledDoseInstance) => {
      voiceEngine.playGentleChime();
      const medName = dose.medication?.name ?? 'seu remédio';
      speak(
        'alarm-ring',
        `Olá! Está na hora do seu remédio. Tome ${dose.dosage} de ${medName}. ${dose.notes ?? ''}`
      );
    },
    [speak]
  );

  useEffect(() => {
    const tick = () => {
      const current = new Date();
      setNow(current);
      const todayList = getDosesForDate(
        state.schedules,
        state.doseLogs,
        fullCatalog,
        current,
        current
      );
      const due = findDueAlarmNow(
        todayList,
        current,
        dismissedKeysRef.current,
        snoozedUntilRef.current,
        ringingRef.current?.dose.key ?? null
      );
      if (due && !ringingRef.current) {
        delete snoozedUntilRef.current[due.key];
        setRinging({ dose: due, isTest: false });
        announceAlarm(due);
      }
    };
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [state.schedules, state.doseLogs, fullCatalog, announceAlarm, setRinging]);

  const handleMarkTaken = (dose: ScheduledDoseInstance) => {
    const actionDate = new Date();
    const delayMinutes = computeDelayMinutes(dose.scheduledTime, actionDate, dose.dateStr);
    const takenTimeDisplay = formatTimeHHMM(actionDate);

    const newLog: DoseLog = {
      id: `log-${dose.scheduleId}-${dose.dateStr}-${dose.scheduledTime}-${Date.now()}`,
      scheduleId: dose.scheduleId,
      medicationId: dose.medicationId,
      dateStr: dose.dateStr,
      scheduledTime: dose.scheduledTime,
      status: 'taken',
      actionTimestamp: actionDate.toISOString(),
      takenTimeDisplay,
      delayMinutes,
    };

    dismissedKeysRef.current.add(dose.key);
    delete snoozedUntilRef.current[dose.key];
    setRinging(null);
    voiceEngine.stop();

    setState((prev) => ({
      ...prev,
      doseLogs: [
        ...prev.doseLogs.filter(
          (l) =>
            !(
              l.scheduleId === dose.scheduleId &&
              l.dateStr === dose.dateStr &&
              l.scheduledTime === dose.scheduledTime
            )
        ),
        newLog,
      ],
    }));

    showToast(
      `✓ ${dose.medication?.name ?? 'Remédio'} tomado às ${takenTimeDisplay}${
        Math.abs(delayMinutes) <= 15 ? ' · Certinho!' : ''
      }`
    );
  };

  const handleUndoDose = (dose: ScheduledDoseInstance) => {
    dismissedKeysRef.current.delete(dose.key);
    setState((prev) => ({
      ...prev,
      doseLogs: prev.doseLogs.filter(
        (l) =>
          !(
            l.scheduleId === dose.scheduleId &&
            l.dateStr === dose.dateStr &&
            l.scheduledTime === dose.scheduledTime
          )
      ),
    }));
    showToast('Marcação desfeita.');
  };

  const handleSaveSchedule = (input: Omit<MedicationSchedule, 'id' | 'createdAt'>) => {
    const sched: MedicationSchedule = {
      ...input,
      id: `sched-${input.medicationId}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      myMedicationIds: prev.myMedicationIds.includes(input.medicationId)
        ? prev.myMedicationIds
        : [input.medicationId, ...prev.myMedicationIds],
      schedules: [...prev.schedules, sched],
    }));
    setShowAddAlarm(false);
    showToast(`Alarme salvo (${input.times.join(', ')})`);
  };

  const handleAddExisting = (
    med: Medication,
    options: {
      createAlarm?: boolean;
      alarmTimes?: string[];
      photoDataUrl?: string;
      openAfter?: boolean;
    }
  ) => {
    setState((prev) => {
      const nextIds = prev.myMedicationIds.includes(med.id)
        ? prev.myMedicationIds
        : [med.id, ...prev.myMedicationIds];
      const nextPhotos = options.photoDataUrl
        ? { ...(prev.medicationPhotos ?? {}), [med.id]: options.photoDataUrl }
        : prev.medicationPhotos ?? {};

      let nextSchedules = prev.schedules;
      if (options.createAlarm) {
        const times =
          options.alarmTimes && options.alarmTimes.length > 0
            ? options.alarmTimes
            : med.howToTake.defaultTimes;
        nextSchedules = [
          ...prev.schedules,
          {
            id: `sched-${med.id}-${Date.now()}`,
            medicationId: med.id,
            dosage: med.howToTake.defaultDosage,
            times,
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            cycleMode: med.category === 'anticoncepcional' ? '24_4' : 'daily',
            enabled: true,
            notes: med.howToTake.summary,
            createdAt: new Date().toISOString(),
          },
        ];
      }

      return {
        ...prev,
        myMedicationIds: nextIds,
        activeMedicationId: med.id,
        medicationPhotos: nextPhotos,
        schedules: nextSchedules,
      };
    });

    if (options.openAfter) {
      setActiveTab('remedios');
      setDetailSubTab('bula');
    }
    showToast(`${med.name} adicionado.`);
  };

  const handleAddNewMedication = (
    med: Medication,
    alarmTimes?: string[],
    photoDataUrl?: string
  ) => {
    setState((prev) => {
      const nextPhotos = photoDataUrl
        ? { ...(prev.medicationPhotos ?? {}), [med.id]: photoDataUrl }
        : prev.medicationPhotos ?? {};

      const nextSchedules: MedicationSchedule[] =
        alarmTimes && alarmTimes.length > 0
          ? [
              ...prev.schedules,
              {
                id: `sched-${med.id}-${Date.now()}`,
                medicationId: med.id,
                dosage: med.howToTake.defaultDosage,
                times: alarmTimes,
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                cycleMode: med.category === 'anticoncepcional' ? '24_4' : 'daily',
                enabled: true,
                notes: med.howToTake.summary,
                createdAt: new Date().toISOString(),
              },
            ]
          : prev.schedules;

      return {
        ...prev,
        customMedications: [...prev.customMedications, med],
        myMedicationIds: [med.id, ...prev.myMedicationIds],
        activeMedicationId: med.id,
        medicationPhotos: nextPhotos,
        schedules: nextSchedules,
      };
    });
    setActiveTab('remedios');
    setDetailSubTab('bula');
    showToast(`${med.name} pronto na sua lista!`);
  };

  const handleSaveAiKeys = async (nextKeys: ClientAiKeys) => {
    saveClientAiKeys(nextKeys);
    setAiKeys(nextKeys);
    voiceEngine.clearCache();
    const updated = await fetchAiStatus(nextKeys);
    setAiStatus(updated);
    showToast('Configurações de Voz & IA salvas.');
  };

  const toggleVoiceRate = () => {
    const nextRate = state.voice.rate === 'normal' ? 'slow' : 'normal';
    setState((prev) => ({ ...prev, voice: { ...prev.voice, rate: nextRate } }));
    showToast(nextRate === 'slow' ? '🐢 Leitura mais devagar ativada' : 'Velocidade normal');
  };

  const toggleGuidedMode = () => {
    voiceEngine.stop();
    setState((prev) => ({
      ...prev,
      voice: { ...prev.voice, guidedMode: !prev.voice.guidedMode },
    }));
  };

  const isGuided = Boolean(state.voice.guidedMode);

  return (
    <div className="min-h-dvh w-full flex justify-center sm:items-center sm:py-5 sm:px-4">
      <div className="w-full max-w-[430px] h-dvh sm:h-[min(860px,92dvh)] bg-[#F7F6F2] sm:rounded-[36px] sm:shadow-[0_28px_70px_rgba(17,24,39,0.16)] sm:border sm:border-white/80 flex flex-col overflow-hidden relative">
        {/* High-Contrast Accessible Header */}
        <header className="shrink-0 px-4 pt-3.5 pb-3 flex items-center justify-between gap-2 bg-white border-b border-slate-200 z-20">
          <h1 className="text-[20px] font-extrabold text-[#111827] tracking-tight truncate">
            Meu Remédio
          </h1>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Large Text A+ Toggle for Seniors / Low Vision */}
            <button
              type="button"
              onClick={() => {
                setLargeText((v) => !v);
                showToast(!largeText ? 'Letra maior ativada (A+)' : 'Tamanho de letra normal');
              }}
              aria-pressed={largeText}
              aria-label="Aumentar tamanho das letras"
              title="Aumentar letras (A+)"
              className={`min-h-[40px] min-w-[40px] px-2.5 rounded-full text-[14px] font-extrabold transition-all cursor-pointer ${
                largeText
                  ? 'bg-[#111827] text-white'
                  : 'bg-[#F3F4F6] text-[#111827] border border-slate-300'
              }`}
            >
              A+
            </button>

            {/* Unmistakable Modo Só Voz Pill */}
            <button
              type="button"
              onClick={toggleGuidedMode}
              aria-pressed={isGuided}
              className={`min-h-[40px] px-3.5 rounded-full text-[14px] font-extrabold inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                isGuided
                  ? 'bg-[#1D4ED8] text-white shadow-sm'
                  : 'bg-[#DCFCE7] text-[#065F46] border border-[#86EFAC]'
              }`}
            >
              <Volume2 className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>{isGuided ? 'Só Voz ON' : 'Só Voz'}</span>
            </button>

            {/* Voice & AI Settings */}
            <button
              type="button"
              onClick={() => setShowVoiceSettings(true)}
              aria-label="Configurar voz humana e inteligência artificial"
              title="Voz Humana & IA"
              className="relative w-10 h-10 rounded-full bg-[#F3F4F6] border border-slate-300 text-[#111827] inline-flex items-center justify-center cursor-pointer"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
              <span
                className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border border-white ${
                  hasNaturalVoiceKey ? 'bg-[#047857]' : 'bg-[#D97706]'
                }`}
              />
            </button>
          </div>
        </header>

        {/* High-Contrast Toast */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className="absolute top-[70px] left-4 right-4 z-40 px-4 py-3 rounded-2xl bg-[#111827] text-white text-[14.5px] font-bold text-center shadow-lg animate-sheet-up"
          >
            {toast}
          </div>
        )}

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          {isGuided ? (
            <VoiceGuidedOverlay
              activeMedication={activeMedication}
              nextDose={nextUntakenDose}
              playback={playback}
              onSpeak={speak}
              onStopSpeaking={() => voiceEngine.stop()}
              onOpenCameraAdd={() => setAddSheetStep('scan')}
              onMarkDoseTaken={handleMarkTaken}
              onCloseGuidedMode={toggleGuidedMode}
            />
          ) : activeTab === 'hoje' ? (
            <HomeView
              medications={myMedications}
              medicationPhotos={medicationPhotos}
              schedules={state.schedules}
              dosesToday={dosesToday}
              last7Days={last7Days}
              now={now}
              playback={playback}
              voiceRate={state.voice.rate}
              hasNaturalVoiceKey={hasNaturalVoiceKey}
              onSpeak={speak}
              onStopSpeaking={() => voiceEngine.stop()}
              onToggleRate={toggleVoiceRate}
              onOpenVoiceSettings={() => setShowVoiceSettings(true)}
              onMarkTaken={handleMarkTaken}
              onUndoDose={handleUndoDose}
              onSelectMedication={(medId) => {
                voiceEngine.stop();
                setState((prev) => ({ ...prev, activeMedicationId: medId }));
                setDetailSubTab('bula');
                setActiveTab('remedios');
              }}
              onOpenAddWithStep={(step) => setAddSheetStep(step)}
              onOpenAddAlarm={() => setShowAddAlarm(true)}
              onOpenHistory={(dateStr) =>
                setHistorySheetDate(dateStr ?? last7Days[last7Days.length - 1]?.dateStr ?? '')
              }
              onTriggerTestAlarm={(dose) => {
                setRinging({ dose, isTest: true });
                announceAlarm(dose);
              }}
            />
          ) : activeTab === 'remedios' ? (
            <MedicationDetailView
              medication={activeMedication}
              myMedications={myMedications}
              medicationPhotos={medicationPhotos}
              schedulesForMed={state.schedules.filter(
                (s) => s.medicationId === activeMedication.id
              )}
              dosesTodayForMed={dosesToday.filter(
                (d) => d.medicationId === activeMedication.id
              )}
              selectedUf={state.selectedUf}
              activeSubTab={detailSubTab}
              onChangeSubTab={(tab) => {
                voiceEngine.stop();
                setDetailSubTab(tab);
              }}
              onSelectMedication={(medId) => {
                voiceEngine.stop();
                setState((prev) => ({ ...prev, activeMedicationId: medId }));
              }}
              onChangeUf={(uf) => {
                setState((prev) => ({ ...prev, selectedUf: uf }));
                showToast(`Preços atualizados para ${uf === 'BR' ? 'Média Brasil' : uf}`);
              }}
              playback={playback}
              voiceRate={state.voice.rate}
              hasNaturalVoiceKey={hasNaturalVoiceKey}
              onSpeak={speak}
              onStopSpeaking={() => voiceEngine.stop()}
              onToggleRate={toggleVoiceRate}
              onOpenVoiceSettings={() => setShowVoiceSettings(true)}
              onOpenAddAlarm={() => setShowAddAlarm(true)}
              onToggleScheduleEnabled={(schedId) =>
                setState((prev) => ({
                  ...prev,
                  schedules: prev.schedules.map((s) =>
                    s.id === schedId ? { ...s, enabled: !s.enabled } : s
                  ),
                }))
              }
              onDeleteSchedule={(schedId) => {
                setState((prev) => ({
                  ...prev,
                  schedules: prev.schedules.filter((s) => s.id !== schedId),
                }));
                showToast('Alarme removido.');
              }}
              onTriggerTestAlarm={(dose) => {
                setRinging({ dose, isTest: true });
                announceAlarm(dose);
              }}
              pendingQuestion={pendingQuestion}
              onClearPendingQuestion={() => setPendingQuestion(null)}
            />
          ) : (
            <CompararView
              medication={activeMedication}
              allMedications={myMedications}
              medicationPhotos={medicationPhotos}
              onSelectMedication={(medId) => {
                voiceEngine.stop();
                setState((prev) => ({ ...prev, activeMedicationId: medId }));
              }}
              selectedUf={state.selectedUf}
              onChangeUf={(uf) => {
                setState((prev) => ({ ...prev, selectedUf: uf }));
                showToast(`Preços atualizados para ${uf === 'BR' ? 'Média Brasil' : uf}`);
              }}
              playback={playback}
              voiceRate={state.voice.rate}
              hasNaturalVoiceKey={hasNaturalVoiceKey}
              onSpeak={speak}
              onStopSpeaking={() => voiceEngine.stop()}
              onToggleRate={toggleVoiceRate}
              onOpenVoiceSettings={() => setShowVoiceSettings(true)}
              onAskAboutSwitch={(q) => {
                setPendingQuestion(q);
                setActiveTab('remedios');
                setDetailSubTab('bula');
              }}
            />
          )}
        </main>

        {/* Tall, High-Contrast Accessible Bottom Navigation */}
        {!isGuided && (
          <nav
            aria-label="Navegação principal"
            className="shrink-0 bg-white border-t-2 border-slate-200 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-20"
          >
            <div className="grid grid-cols-4 gap-1 items-center">
              <button
                type="button"
                onClick={() => {
                  voiceEngine.stop();
                  setActiveTab('hoje');
                }}
                aria-current={activeTab === 'hoje' ? 'page' : undefined}
                className={`min-h-[58px] rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  activeTab === 'hoje'
                    ? 'bg-[#ECFDF5] text-[#047857]'
                    : 'text-[#374151] hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-6 h-6 stroke-[2.4]" />
                <span className="text-[13px] font-extrabold mt-1">Hoje</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  voiceEngine.stop();
                  setActiveTab('remedios');
                }}
                aria-current={activeTab === 'remedios' ? 'page' : undefined}
                className={`min-h-[58px] rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  activeTab === 'remedios'
                    ? 'bg-[#ECFDF5] text-[#047857]'
                    : 'text-[#374151] hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-6 h-6 stroke-[2.4]" />
                <span className="text-[13px] font-extrabold mt-1">Bula</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  voiceEngine.stop();
                  setActiveTab('comparar');
                }}
                aria-current={activeTab === 'comparar' ? 'page' : undefined}
                className={`min-h-[58px] rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  activeTab === 'comparar'
                    ? 'bg-[#ECFDF5] text-[#047857]'
                    : 'text-[#374151] hover:bg-slate-100'
                }`}
              >
                <ArrowLeftRight className="w-6 h-6 stroke-[2.4]" />
                <span className="text-[13px] font-extrabold mt-1">Comparar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  voiceEngine.stop();
                  setAddSheetStep('choose');
                }}
                aria-label="Adicionar remédio por foto, voz ou busca"
                className="min-h-[58px] rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white flex flex-col items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Camera className="w-6 h-6 stroke-[2.4]" />
                <span className="text-[13px] font-extrabold mt-1">Adicionar</span>
              </button>
            </div>
          </nav>
        )}

        {/* Sheets & Modals */}
        {addSheetStep && (
          <AddMedicationSheet
            catalog={fullCatalog}
            hasGeminiKey={hasGeminiKey}
            initialStep={addSheetStep}
            onClose={() => setAddSheetStep(null)}
            onOpenVoiceSettings={() => setShowVoiceSettings(true)}
            onAddExisting={handleAddExisting}
            onAddNewMedication={handleAddNewMedication}
            onSpeak={speak}
          />
        )}

        {showVoiceSettings && (
          <VoiceAiSettingsSheet
            keys={aiKeys}
            status={aiStatus}
            voiceProfile={state.voice.voiceProfile ?? 'acolhedora'}
            voiceRate={state.voice.rate}
            onSaveKeys={handleSaveAiKeys}
            onChangeVoiceProfile={(profile: VoiceProfile) => {
              setState((prev) => ({
                ...prev,
                voice: { ...prev.voice, voiceProfile: profile },
              }));
            }}
            onToggleRate={toggleVoiceRate}
            onTestVoice={(keysOverride, profile) => {
              void voiceEngine.speak(
                'Olá! Eu sou a voz do Meu Remédio. Vou explicar cada detalhe do seu tratamento com calma e clareza, no seu ritmo.',
                {
                  sectionId: 'voice-test',
                  rate: state.voice.rate,
                  voiceProfile: profile,
                  keysOverride,
                }
              );
            }}
            onClose={() => setShowVoiceSettings(false)}
          />
        )}

        {showAddAlarm && (
          <AddAlarmSheet
            medications={myMedications}
            medicationPhotos={medicationPhotos}
            initialMedicationId={activeMedication.id}
            onSave={handleSaveSchedule}
            onClose={() => setShowAddAlarm(false)}
          />
        )}

        {historySheetDate !== null && (
          <HistorySheet
            last7Days={last7Days}
            initialDateStr={historySheetDate}
            schedules={state.schedules}
            doseLogs={state.doseLogs}
            medications={fullCatalog}
            now={now}
            playback={playback}
            onSpeak={speak}
            onStopSpeaking={() => voiceEngine.stop()}
            onClose={() => setHistorySheetDate(null)}
          />
        )}

        {ringingAlarm && (
          <AlarmRingingModal
            dose={ringingAlarm.dose}
            photoOverride={medicationPhotos[ringingAlarm.dose.medicationId]}
            onMarkTaken={() => handleMarkTaken(ringingAlarm.dose)}
            onSnooze={() => {
              if (!ringingAlarm.isTest) {
                snoozedUntilRef.current[ringingAlarm.dose.key] = Date.now() + 15 * 60 * 1000;
              }
              setRinging(null);
              voiceEngine.stop();
              showToast('Lembrete adiado por 15 minutos.');
            }}
            onDismiss={() => {
              if (!ringingAlarm.isTest) {
                dismissedKeysRef.current.add(ringingAlarm.dose.key);
              }
              setRinging(null);
              voiceEngine.stop();
            }}
            onReplayVoice={() => announceAlarm(ringingAlarm.dose)}
          />
        )}
      </div>
    </div>
  );
}
