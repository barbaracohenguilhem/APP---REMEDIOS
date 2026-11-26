import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MEDICATIONS_CATALOG } from './data/medications';
import type {
  ActiveTab,
  AppPersistedState,
  DoseLog,
  Medication,
  MedicationSchedule,
} from './types/medication';
import { loadPersistedState, savePersistedState } from './services/storage';
import { speechService } from './services/speech';
import { getLowestGenericPrice } from './services/pricing';
import {
  computeDelayMinutes,
  findDueAlarmNow,
  formatTimeHHMM,
  getDosesForDate,
  type ScheduledDoseInstance,
} from './services/scheduleEngine';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MedicineCabinetView } from './components/MedicineCabinetView';
import { AlarmRingingModal } from './components/AlarmRingingModal';
import { AddAlarmSheet } from './components/AddAlarmSheet';
import { EntenderView } from './views/EntenderView';
import { CompararView } from './views/CompararView';
import { HorariosView } from './views/HorariosView';
import { AdicionarView } from './views/AdicionarView';

export function App() {
  const [state, setState] = useState<AppPersistedState>(() => loadPersistedState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('entender');
  const [showCabinet, setShowCabinet] = useState(false);
  const [showAddAlarmSheet, setShowAddAlarmSheet] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(() => new Date());
  const [ringingAlarm, setRingingAlarm] = useState<{
    dose: ScheduledDoseInstance;
    isTest: boolean;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const dismissedAlarmKeysRef = useRef<Set<string>>(new Set());
  const snoozedUntilRef = useRef<Record<string, number>>({});
  const ringingAlarmRef = useRef<{ dose: ScheduledDoseInstance; isTest: boolean } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const updateRingingAlarm = useCallback(
    (next: { dose: ScheduledDoseInstance; isTest: boolean } | null) => {
      ringingAlarmRef.current = next;
      setRingingAlarm(next);
    },
    []
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3600);
  }, []);

  // Persist changes
  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  // Subscribe to speech status
  useEffect(() => {
    const unsub = speechService.subscribe(setSpeakingId);
    return () => {
      unsub();
      speechService.stop();
    };
  }, []);

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

  const orderedAlarmMedications: Medication[] = useMemo(() => {
    const savedSet = new Set(myMedications.map((m) => m.id));
    return [...myMedications, ...fullCatalog.filter((m) => !savedSet.has(m.id))];
  }, [myMedications, fullCatalog]);

  const activeMedication: Medication = useMemo(() => {
    return (
      fullCatalog.find((m) => m.id === state.activeMedicationId) ??
      myMedications[0] ??
      MEDICATIONS_CATALOG[0]
    );
  }, [fullCatalog, myMedications, state.activeMedicationId]);

  const dosesToday = useMemo(
    () => getDosesForDate(state.schedules, state.doseLogs, fullCatalog, now, now),
    [state.schedules, state.doseLogs, fullCatalog, now]
  );

  const pendingDosesCount = useMemo(
    () => dosesToday.filter((d) => d.status === 'due_now' || d.status === 'late').length,
    [dosesToday]
  );

  const speakAlarmNotice = useCallback(
    (dose: ScheduledDoseInstance, forceVoice = false) => {
      speechService.playAlarmChime();
      const medName = dose.medication?.name ?? 'seu remédio';
      const spoken = `Hora do seu remédio! Tomar ${dose.dosage} de ${medName} agora. ${
        dose.notes ?? ''
      }`;
      if (state.voice.enabled || forceVoice) {
        speechService.speak(spoken, {
          sectionId: 'alarm-ring',
          rate: state.voice.rate,
        });
      }

      if (
        typeof window !== 'undefined' &&
        'Notification' in window &&
        window.Notification.permission === 'granted'
      ) {
        try {
          new window.Notification(`⏰ Hora do ${medName}`, {
            body: `${dose.dosage} · Previsto às ${dose.scheduledTime}`,
          });
        } catch {
          // Ignore notification constructor restrictions in some browsers
        }
      }
    },
    [state.voice.enabled, state.voice.rate]
  );

  // Live clock + alarm trigger monitor (every 15 seconds)
  useEffect(() => {
    const checkClock = () => {
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
        dismissedAlarmKeysRef.current,
        snoozedUntilRef.current,
        ringingAlarmRef.current?.dose.key ?? null
      );
      if (due && !ringingAlarmRef.current) {
        delete snoozedUntilRef.current[due.key];
        updateRingingAlarm({ dose: due, isTest: false });
        speakAlarmNotice(due);
      }
    };

    const intervalId = window.setInterval(checkClock, 15000);
    return () => window.clearInterval(intervalId);
  }, [state.schedules, state.doseLogs, fullCatalog, speakAlarmNotice, updateRingingAlarm]);

  // Speech controls (keep side effects outside React state updaters for StrictMode safety)
  const handleToggleVoice = () => {
    const nextEnabled = !state.voice.enabled;
    setState((prev) => ({
      ...prev,
      voice: { ...prev.voice, enabled: nextEnabled },
    }));
    if (!nextEnabled) {
      speechService.stop();
    } else {
      speechService.speak('Leitura em voz alta ligada.', {
        sectionId: 'voice-toggle',
        rate: state.voice.rate,
      });
    }
  };

  const handleToggleVoiceRate = () => {
    const nextRate = state.voice.rate === 'normal' ? 'slow' : 'normal';
    setState((prev) => ({
      ...prev,
      voice: { ...prev.voice, rate: nextRate },
    }));
    speechService.updateRate(nextRate);
    showToast(nextRate === 'slow' ? '🐢 Leitura mais devagar ativada' : '⚡ Velocidade normal');
  };

  const handleSpeakSection = useCallback(
    (sectionId: string, text: string) => {
      if (!state.voice.enabled) {
        setState((prev) => ({ ...prev, voice: { ...prev.voice, enabled: true } }));
      }
      speechService.speak(text, { sectionId, rate: state.voice.rate });
    },
    [state.voice.enabled, state.voice.rate]
  );

  const handleSpeakAutoIfEnabled = useCallback(
    (sectionId: string, text: string) => {
      if (!state.voice.enabled) return;
      speechService.speak(text, { sectionId, rate: state.voice.rate });
    },
    [state.voice.enabled, state.voice.rate]
  );

  const handleSpeakAllBula = () => {
    if (!state.voice.enabled) {
      setState((prev) => ({ ...prev, voice: { ...prev.voice, enabled: true } }));
    }
    const med = activeMedication;
    const lowest = getLowestGenericPrice(med, state.selectedUf);
    speechService.speakSequence(
      [
        {
          sectionId: 'all-intro',
          text: `${med.name}. ${med.activeIngredient}. ${med.purposeSimple}`,
        },
        {
          sectionId: 'all-how',
          text: med.howToTake.spokenScript,
        },
        {
          sectionId: 'all-not',
          text: med.whatNotToDo.spokenScript,
        },
        {
          sectionId: 'all-generics',
          text: `Preço médio estimado: ${lowest.priceText}. ${med.genericsHighlight.spokenScript}`,
        },
        {
          sectionId: 'all-can',
          text: med.whatYouCanDo.spokenScript,
        },
      ],
      { rate: state.voice.rate }
    );
  };

  // Dose tracking handlers
  const handleMarkDose = (dose: ScheduledDoseInstance, status: 'taken' | 'skipped') => {
    const actionDate = new Date();
    const delayMinutes = computeDelayMinutes(dose.scheduledTime, actionDate, dose.dateStr);
    const takenTimeDisplay = formatTimeHHMM(actionDate);

    const newLog: DoseLog = {
      id: `log-${dose.scheduleId}-${dose.dateStr}-${dose.scheduledTime}-${Date.now()}`,
      scheduleId: dose.scheduleId,
      medicationId: dose.medicationId,
      dateStr: dose.dateStr,
      scheduledTime: dose.scheduledTime,
      status,
      actionTimestamp: actionDate.toISOString(),
      takenTimeDisplay,
      delayMinutes,
    };

    dismissedAlarmKeysRef.current.add(dose.key);
    delete snoozedUntilRef.current[dose.key];
    updateRingingAlarm(null);
    speechService.stop();

    setState((prev) => {
      const filtered = prev.doseLogs.filter(
        (l) =>
          !(
            l.scheduleId === dose.scheduleId &&
            l.dateStr === dose.dateStr &&
            l.scheduledTime === dose.scheduledTime
          )
      );
      return { ...prev, doseLogs: [...filtered, newLog] };
    });

    if (status === 'taken') {
      const msg =
        Math.abs(delayMinutes) <= 15
          ? `✅ ${dose.medication?.name ?? 'Remédio'} tomado às ${takenTimeDisplay} — Certinho!`
          : `✅ ${dose.medication?.name ?? 'Remédio'} registrado às ${takenTimeDisplay}`;
      showToast(msg);
      handleSpeakAutoIfEnabled(
        'dose-confirmed',
        `Muito bem! ${dose.medication?.name ?? 'Remédio'} marcado como tomado às ${takenTimeDisplay}.`
      );
    } else {
      showToast(`Dose de ${dose.scheduledTime} marcada como pulada.`);
    }
  };

  const handleUndoDose = (dose: ScheduledDoseInstance) => {
    dismissedAlarmKeysRef.current.delete(dose.key);
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
    const newSchedule: MedicationSchedule = {
      ...input,
      id: `sched-${input.medicationId}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      myMedicationIds: prev.myMedicationIds.includes(input.medicationId)
        ? prev.myMedicationIds
        : [input.medicationId, ...prev.myMedicationIds],
      schedules: [...prev.schedules, newSchedule],
    }));

    setShowAddAlarmSheet(false);
    setActiveTab('horarios');
    setShowCabinet(false);

    const medName = fullCatalog.find((m) => m.id === input.medicationId)?.name ?? 'Remédio';
    showToast(`⏰ Alarme criado para ${medName} (${input.times.join(', ')})`);
    handleSpeakAutoIfEnabled(
      'alarm-created',
      `Alarme salvo para ${medName}, às ${input.times.join(' e ')}.`
    );
  };

  const handleAddMedicationFromFlow = (
    med: Medication,
    options: { createAlarm?: boolean; alarmTimes?: string[]; openAfter?: boolean }
  ) => {
    setState((prev) => {
      const nextIds = prev.myMedicationIds.includes(med.id)
        ? prev.myMedicationIds
        : [med.id, ...prev.myMedicationIds];

      let nextSchedules = prev.schedules;
      if (options.createAlarm) {
        const times =
          options.alarmTimes && options.alarmTimes.length > 0
            ? options.alarmTimes
            : med.howToTake.defaultTimes;
        const alreadySame = prev.schedules.some(
          (s) => s.medicationId === med.id && s.times.join(',') === times.join(',')
        );
        if (!alreadySame) {
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
      }

      return {
        ...prev,
        myMedicationIds: nextIds,
        activeMedicationId: med.id,
        schedules: nextSchedules,
      };
    });

    if (options.createAlarm) {
      showToast(`✅ ${med.name} adicionado com alarme!`);
    } else {
      showToast(`✅ ${med.name} aberto na bula fácil!`);
    }

    if (options.openAfter) {
      setShowCabinet(false);
      setActiveTab('entender');
    }
  };

  const handleAddCustomMedication = (med: Medication, alarmTime?: string) => {
    setState((prev) => {
      const nextSchedules: MedicationSchedule[] = alarmTime
        ? [
            ...prev.schedules,
            {
              id: `sched-${med.id}-${Date.now()}`,
              medicationId: med.id,
              dosage: med.howToTake.defaultDosage,
              times: [alarmTime],
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              cycleMode: 'daily',
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
        schedules: nextSchedules,
      };
    });

    setShowCabinet(false);
    setActiveTab('entender');
    showToast(`✅ ${med.name} cadastrado${alarmTime ? ` com alarme às ${alarmTime}` : ''}!`);
    handleSpeakAutoIfEnabled('custom-added', `${med.name} salvo com sucesso.`);
  };

  const handleRemoveMedication = (medId: string) => {
    setState((prev) => {
      const remaining = prev.myMedicationIds.filter((id) => id !== medId);
      const nextIds = remaining.length > 0 ? remaining : [MEDICATIONS_CATALOG[0].id];
      const removedReally = !nextIds.includes(medId);
      const nextActive =
        prev.activeMedicationId === medId ? nextIds[0] : prev.activeMedicationId;
      return {
        ...prev,
        myMedicationIds: nextIds,
        activeMedicationId: nextActive,
        schedules: removedReally
          ? prev.schedules.filter((s) => s.medicationId !== medId)
          : prev.schedules,
      };
    });
    showToast('Remédio removido da sua lista.');
  };

  const handleSelectTab = (tab: ActiveTab) => {
    speechService.stop();
    setShowCabinet(false);
    setActiveTab(tab);
  };

  const handleBackClick = () => {
    speechService.stop();
    if (showCabinet) {
      setShowCabinet(false);
      return;
    }
    if (activeTab === 'entender' || activeTab === 'comparar') {
      setShowCabinet(true);
    } else {
      setActiveTab('entender');
    }
  };

  const headerTitle = showCabinet
    ? 'Meus Remédios'
    : activeTab === 'entender'
      ? 'Meu Remédio'
      : activeTab === 'comparar'
        ? 'Genéricos'
        : activeTab === 'horarios'
          ? 'Meus Horários'
          : 'Adicionar';

  return (
    <div className="min-h-dvh w-full flex justify-center sm:items-center sm:py-4 sm:px-3">
      {/* Mobile-first App Frame (fixed viewport height on phones so Header & BottomNav stay pinned; phone card shell on desktop) */}
      <div className="w-full max-w-[430px] h-dvh sm:h-[min(860px,92dvh)] bg-[#F5F7F8] sm:rounded-[34px] sm:shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:border sm:border-white/80 flex flex-col overflow-hidden relative">
        <Header
          title={headerTitle}
          showBackButton={true}
          onBackClick={handleBackClick}
          voice={state.voice}
          isSpeaking={speakingId !== null}
          onToggleVoice={handleToggleVoice}
          onToggleVoiceRate={handleToggleVoiceRate}
          onStopSpeaking={() => speechService.stop()}
        />

        {/* Floating Toast Feedback */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className="mx-4 mt-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-extrabold shadow-lg text-center"
          >
            {toast}
          </div>
        )}

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          {showCabinet ? (
            <MedicineCabinetView
              medications={myMedications}
              activeMedicationId={activeMedication.id}
              selectedUf={state.selectedUf}
              onSelectMedication={(medId) => {
                setState((prev) => ({ ...prev, activeMedicationId: medId }));
                setShowCabinet(false);
                setActiveTab('entender');
              }}
              onRemoveMedication={handleRemoveMedication}
              onOpenAdd={() => {
                setShowCabinet(false);
                setActiveTab('adicionar');
              }}
              onSpeakText={handleSpeakSection}
              speakingId={speakingId}
            />
          ) : activeTab === 'entender' ? (
            <EntenderView
              medication={activeMedication}
              selectedUf={state.selectedUf}
              speakingId={speakingId}
              onSpeakAll={handleSpeakAllBula}
              onSpeakSection={handleSpeakSection}
              onStopSpeaking={() => speechService.stop()}
              onOpenComparar={() => handleSelectTab('comparar')}
              onOpenAddAlarm={() => setShowAddAlarmSheet(true)}
              savedCount={myMedications.length}
              onOpenCabinet={() => setShowCabinet(true)}
            />
          ) : activeTab === 'comparar' ? (
            <CompararView
              medication={activeMedication}
              selectedUf={state.selectedUf}
              onChangeUf={(uf) => {
                setState((prev) => ({ ...prev, selectedUf: uf }));
                showToast(`📍 Preços atualizados para ${uf === 'BR' ? 'Média Brasil' : uf}`);
              }}
              speakingId={speakingId}
              onSpeakSection={handleSpeakSection}
              onStopSpeaking={() => speechService.stop()}
            />
          ) : activeTab === 'horarios' ? (
            <HorariosView
              schedules={state.schedules}
              doseLogs={state.doseLogs}
              medications={fullCatalog}
              now={now}
              speakingId={speakingId}
              onSpeakSection={handleSpeakSection}
              onStopSpeaking={() => speechService.stop()}
              onMarkTaken={(dose) => handleMarkDose(dose, 'taken')}
              onMarkSkipped={(dose) => handleMarkDose(dose, 'skipped')}
              onUndoDose={handleUndoDose}
              onOpenAddAlarm={() => setShowAddAlarmSheet(true)}
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
                updateRingingAlarm({ dose, isTest: true });
                speakAlarmNotice(dose, true);
              }}
              onOpenMedicationBula={(medId) => {
                setState((prev) => ({ ...prev, activeMedicationId: medId }));
                setActiveTab('entender');
              }}
            />
          ) : (
            <AdicionarView
              catalog={fullCatalog}
              myMedicationIds={state.myMedicationIds}
              speakingId={speakingId}
              onSpeakSection={handleSpeakSection}
              onStopSpeaking={() => speechService.stop()}
              onAddMedication={handleAddMedicationFromFlow}
              onAddCustomMedication={handleAddCustomMedication}
            />
          )}
        </main>

        <BottomNav
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          pendingDosesCount={pendingDosesCount}
        />

        {/* Add Alarm Modal Sheet */}
        {showAddAlarmSheet && (
          <AddAlarmSheet
            medications={orderedAlarmMedications}
            savedMedicationIds={state.myMedicationIds}
            initialMedicationId={activeMedication.id}
            onSave={handleSaveSchedule}
            onClose={() => setShowAddAlarmSheet(false)}
          />
        )}

        {/* Active Ringing Alarm Modal */}
        {ringingAlarm && (
          <AlarmRingingModal
            dose={ringingAlarm.dose}
            onMarkTaken={() => handleMarkDose(ringingAlarm.dose, 'taken')}
            onSnooze={() => {
              if (!ringingAlarm.isTest) {
                snoozedUntilRef.current[ringingAlarm.dose.key] = Date.now() + 15 * 60 * 1000;
              }
              updateRingingAlarm(null);
              speechService.stop();
              showToast('⏰ Alarme adiado por 15 minutos');
            }}
            onDismiss={() => {
              if (!ringingAlarm.isTest) {
                dismissedAlarmKeysRef.current.add(ringingAlarm.dose.key);
              }
              updateRingingAlarm(null);
              speechService.stop();
            }}
            onReplayVoice={() => speakAlarmNotice(ringingAlarm.dose, true)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
