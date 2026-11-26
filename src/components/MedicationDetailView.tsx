'use client';

import { useEffect, useState } from 'react';
import {
  BellRing,
  ChevronDown,
  Loader2,
  Mic,
  MicOff,
  Plus,
  Send,
  Trash2,
} from 'lucide-react';
import type {
  Medication,
  MedicationDetailTab,
  MedicationSchedule,
} from '@/types/medication';
import type { ScheduledDoseInstance } from '@/services/scheduleEngine';
import { askPharmacistAi } from '@/services/aiClient';
import { voiceEngine, type VoicePlaybackState } from '@/services/voiceEngine';
import { MedicationAvatar } from './MedicationAvatar';
import { CleanIcon } from './CleanIcons';
import { AudioPlayerBar, QuietListenButton } from './AudioPlayerBar';
import { CompararView } from './CompararView';

interface MedicationDetailViewProps {
  medication: Medication;
  myMedications: Medication[];
  medicationPhotos: Record<string, string>;
  schedulesForMed: MedicationSchedule[];
  dosesTodayForMed: ScheduledDoseInstance[];
  selectedUf: string;
  activeSubTab: MedicationDetailTab;
  onChangeSubTab: (tab: MedicationDetailTab) => void;
  onSelectMedication: (medId: string) => void;
  onChangeUf: (uf: string) => void;
  playback: VoicePlaybackState;
  voiceRate: 'normal' | 'slow';
  hasNaturalVoiceKey: boolean;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onToggleRate: () => void;
  onOpenVoiceSettings: () => void;
  onOpenAddAlarm: () => void;
  onToggleScheduleEnabled: (schedId: string) => void;
  onDeleteSchedule: (schedId: string) => void;
  onTriggerTestAlarm: (dose: ScheduledDoseInstance) => void;
  pendingQuestion?: string | null;
  onClearPendingQuestion?: () => void;
}

export function MedicationDetailView({
  medication,
  myMedications,
  medicationPhotos,
  schedulesForMed,
  dosesTodayForMed,
  selectedUf,
  activeSubTab,
  onChangeSubTab,
  onSelectMedication,
  onChangeUf,
  playback,
  voiceRate,
  hasNaturalVoiceKey,
  onSpeak,
  onStopSpeaking,
  onToggleRate,
  onOpenVoiceSettings,
  onOpenAddAlarm,
  onToggleScheduleEnabled,
  onDeleteSchedule,
  onTriggerTestAlarm,
  pendingQuestion,
  onClearPendingQuestion,
}: MedicationDetailViewProps) {
  const [openAccordion, setOpenAccordion] = useState<'missed' | 'can' | 'ask' | null>(null);
  const [questionInput, setQuestionInput] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [askingAi, setAskingAi] = useState(false);
  const [listeningQ, setListeningQ] = useState(false);

  const toggleSpeak = (id: string, text: string) => {
    if (playback.sectionId === id && playback.status !== 'idle') {
      onStopSpeaking();
    } else {
      onSpeak(id, text);
    }
  };

  const fullSummaryScript = `${medication.name}. ${medication.purposeSimple} ${medication.howToTake.spokenScript} ${medication.whatNotToDo.spokenScript}`;

  const submitQuestion = async (rawQuestion: string) => {
    const q = rawQuestion.trim();
    if (!q) return;
    setOpenAccordion('ask');
    setQuestionInput(q);
    setAskingAi(true);
    setAiAnswer(null);
    onClearPendingQuestion?.();

    const res = await askPharmacistAi({
      question: q,
      medicationName: medication.name,
      activeIngredient: medication.activeIngredient,
      contextNotes: `${medication.howToTake.summary} ${medication.genericsHighlight.switchWarningShort}`,
    });

    setAskingAi(false);
    setAiAnswer(res.answer);
    if (res.answer) {
      onSpeak('pharmacist-answer', res.answer);
    }
  };

  useEffect(() => {
    if (pendingQuestion) {
      void submitQuestion(pendingQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingQuestion]);

  const handleVoiceQuestion = () => {
    if (listeningQ) {
      setListeningQ(false);
      return;
    }
    setListeningQ(true);
    const stop = voiceEngine.startListening({
      onResult: (transcript) => {
        setListeningQ(false);
        void submitQuestion(transcript);
      },
      onError: () => {
        setListeningQ(false);
      },
      onEnd: () => {
        setListeningQ(false);
      },
    });
    if (!stop) setListeningQ(false);
  };

  return (
    <div className="px-5 pt-2 pb-28 space-y-5">
      {/* Quiet horizontal switcher when user has multiple saved meds */}
      {myMedications.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {myMedications.map((med) => {
            const active = med.id === medication.id;
            return (
              <button
                key={med.id}
                type="button"
                onClick={() => onSelectMedication(med.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1C1917] text-white'
                    : 'bg-white text-[#57534E] border border-black/[0.06] hover:bg-[#F3EFE8]'
                }`}
              >
                {med.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Calm Editorial Hero */}
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <MedicationAvatar
            medication={medication}
            photoOverride={medicationPhotos[medication.id]}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-[26px] font-bold text-[#1C1917] leading-tight truncate">
              {medication.name}
            </h2>
            <p className="text-[13.5px] text-[#6B6560] mt-0.5 leading-snug">
              {medication.activeIngredient}
            </p>
            <p className="text-[13px] text-[#78716C] mt-1">{medication.purposeSimple}</p>
          </div>
        </div>

        {/* Single gorgeous natural-voice Audio Player */}
        <AudioPlayerBar
          label="Ouvir tudo em voz natural"
          sectionId={`med-all-${medication.id}`}
          playback={playback}
          rate={voiceRate}
          hasNaturalVoiceKey={hasNaturalVoiceKey}
          onPlayToggle={() => toggleSpeak(`med-all-${medication.id}`, fullSummaryScript)}
          onToggleRate={onToggleRate}
          onOpenVoiceSettings={onOpenVoiceSettings}
        />
      </section>

      {/* Clean Apple-style 3-way segmented control */}
      <div
        role="tablist"
        aria-label="Detalhes do medicamento"
        className="grid grid-cols-3 p-1 rounded-full bg-[#EAE5DC]"
      >
        {(
          [
            { id: 'bula', label: 'Bula Fácil' },
            { id: 'genericos', label: 'Genéricos' },
            { id: 'alarmes', label: 'Alarmes' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeSubTab === tab.id}
            onClick={() => onChangeSubTab(tab.id)}
            className={`py-2.5 rounded-full text-[13.5px] font-semibold transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-white text-[#1C1917] shadow-xs'
                : 'text-[#6B6560] hover:text-[#1C1917]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: BULA FÁCIL (Radical calm — 2 core cards + clean accordions) */}
      {activeSubTab === 'bula' && (
        <div className="space-y-4">
          {/* Card 1: COMO TOMAR */}
          <section className="bg-white rounded-[26px] p-5 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[17px] font-bold text-[#1C1917]">Como tomar</h3>
              <QuietListenButton
                sectionId={`how-${medication.id}`}
                playback={playback}
                onClick={() => toggleSpeak(`how-${medication.id}`, medication.howToTake.spokenScript)}
                ariaLabel="Ouvir como tomar"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {medication.howToTake.items.map((item, idx) => (
                <button
                  key={`${item.shortLabel}-${idx}`}
                  type="button"
                  onClick={() =>
                    toggleSpeak(
                      `how-item-${medication.id}-${idx}`,
                      `${item.shortLabel}. ${item.spokenDetail}`
                    )
                  }
                  className="flex flex-col items-center text-center p-2.5 rounded-2xl hover:bg-[#F6F4EF] active:scale-95 transition-all cursor-pointer"
                >
                  <CleanIcon type={item.icon} tone="sage" />
                  <span className="mt-2 text-[13px] font-semibold text-[#1C1917] leading-tight">
                    {item.shortLabel}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[14.5px] text-[#57534E] leading-relaxed">
              {medication.howToTake.summary}
            </p>
          </section>

          {/* Card 2: O QUE NÃO PODE */}
          <section className="bg-[#FFF6F7] rounded-[26px] p-5 border border-[#BE123C]/10 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[17px] font-bold text-[#9F1239]">O que não pode</h3>
              <QuietListenButton
                sectionId={`not-${medication.id}`}
                playback={playback}
                onClick={() => toggleSpeak(`not-${medication.id}`, medication.whatNotToDo.spokenScript)}
                ariaLabel="Ouvir o que não pode fazer"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {medication.whatNotToDo.items.map((item, idx) => (
                <button
                  key={`${item.shortLabel}-${idx}`}
                  type="button"
                  onClick={() =>
                    toggleSpeak(
                      `not-item-${medication.id}-${idx}`,
                      `Atenção: ${item.shortLabel}. ${item.spokenDetail}`
                    )
                  }
                  className="flex flex-col items-center text-center p-2.5 rounded-2xl hover:bg-white/70 active:scale-95 transition-all cursor-pointer"
                >
                  <CleanIcon type={item.icon} tone="rose" />
                  <span className="mt-2 text-[13px] font-semibold text-[#881337] leading-tight">
                    {item.shortLabel}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[14.5px] text-[#881337]/90 leading-relaxed">
              {medication.whatNotToDo.summary}
            </p>
          </section>

          {/* Progressive Disclosure Accordions (Clean, Zero Wall of Text) */}
          <section className="bg-white rounded-[26px] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] divide-y divide-black/[0.05] overflow-hidden">
            {/* Missed Dose */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion((v) => (v === 'missed' ? null : 'missed'))}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF9F6]"
              >
                <span className="text-[15px] font-semibold text-[#1C1917]">
                  Esqueci de tomar — e agora?
                </span>
                <ChevronDown
                  className={`w-4.5 h-4.5 text-[#78716C] transition-transform ${
                    openAccordion === 'missed' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'missed' && (
                <div className="px-5 pb-4 flex items-start justify-between gap-3">
                  <p className="text-[14px] text-[#57534E] leading-relaxed">
                    {medication.whatYouCanDo.missedDoseTip}
                  </p>
                  <QuietListenButton
                    sectionId={`missed-${medication.id}`}
                    playback={playback}
                    onClick={() =>
                      toggleSpeak(`missed-${medication.id}`, medication.whatYouCanDo.missedDoseTip)
                    }
                    ariaLabel="Ouvir orientação de dose esquecida"
                  />
                </div>
              )}
            </div>

            {/* What you can do & onset */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion((v) => (v === 'can' ? null : 'can'))}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF9F6]"
              >
                <span className="text-[15px] font-semibold text-[#1C1917]">
                  O que pode fazer & quando age
                </span>
                <ChevronDown
                  className={`w-4.5 h-4.5 text-[#78716C] transition-transform ${
                    openAccordion === 'can' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'can' && (
                <div className="px-5 pb-4 space-y-3">
                  <p className="text-[14px] text-[#57534E] leading-relaxed">
                    <strong className="text-[#1C1917]">Início do efeito:</strong>{' '}
                    {medication.whatYouCanDo.onsetTime}
                  </p>
                  <div className="space-y-2">
                    {medication.whatYouCanDo.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-[#57534E]">
                        <CleanIcon type={item.icon} tone="neutral" size="sm" />
                        <div className="pt-0.5">
                          <p className="font-semibold text-[#1C1917]">{item.shortLabel}</p>
                          <p className="text-[13px] text-[#6B6560]">{item.spokenDetail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ask Pharmacist AI (Voice or Text) */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion((v) => (v === 'ask' ? null : 'ask'))}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF9F6]"
              >
                <span className="text-[15px] font-semibold text-[#146356]">
                  Tirar uma dúvida sobre {medication.name}
                </span>
                <ChevronDown
                  className={`w-4.5 h-4.5 text-[#146356] transition-transform ${
                    openAccordion === 'ask' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'ask' && (
                <div className="px-5 pb-5 space-y-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void submitQuestion(questionInput);
                    }}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={handleVoiceQuestion}
                      aria-label="Falar sua dúvida"
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        listeningQ
                          ? 'bg-[#BE123C] text-white animate-pulse'
                          : 'bg-[#E6F2EF] text-[#146356] hover:bg-[#D5EBE5]'
                      }`}
                    >
                      {listeningQ ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <input
                      type="text"
                      value={questionInput}
                      onChange={(e) => setQuestionInput(e.target.value)}
                      placeholder="Ex: Posso tomar com café?"
                      className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[#F6F4EF] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#146356]/30"
                    />
                    <button
                      type="submit"
                      disabled={askingAi || !questionInput.trim()}
                      aria-label="Enviar dúvida"
                      className="w-11 h-11 rounded-full bg-[#146356] disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      {askingAi ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </form>

                  {aiAnswer && (
                    <div className="rounded-2xl bg-[#F6F4EF] p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[14px] text-[#1C1917] leading-relaxed">{aiAnswer}</p>
                        <QuietListenButton
                          sectionId="pharmacist-answer"
                          playback={playback}
                          onClick={() => toggleSpeak('pharmacist-answer', aiAnswer)}
                          ariaLabel="Ouvir resposta novamente"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <p className="text-[11.5px] text-center text-[#A8A29E] px-4">
            Guia educativo em linguagem simples. Em caso de dúvida clínica, fale com seu médico ou farmacêutico.
          </p>
        </div>
      )}

      {/* SUBTAB 2: GENÉRICOS */}
      {activeSubTab === 'genericos' && (
        <CompararView
          medication={medication}
          selectedUf={selectedUf}
          onChangeUf={onChangeUf}
          playback={playback}
          voiceRate={voiceRate}
          hasNaturalVoiceKey={hasNaturalVoiceKey}
          onSpeak={onSpeak}
          onStopSpeaking={onStopSpeaking}
          onToggleRate={onToggleRate}
          onOpenVoiceSettings={onOpenVoiceSettings}
          onAskAboutSwitch={(q) => {
            onChangeSubTab('bula');
            void submitQuestion(q);
          }}
          embedded={true}
        />
      )}

      {/* SUBTAB 3: ALARMES DESTE REMÉDIO */}
      {activeSubTab === 'alarmes' && (
        <div className="space-y-3.5">
          {schedulesForMed.length === 0 ? (
            <div className="bg-white rounded-[26px] p-6 border border-black/[0.05] text-center space-y-3">
              <p className="text-[16px] font-bold text-[#1C1917]">
                Sem alarme para {medication.name}
              </p>
              <p className="text-[14px] text-[#6B6560]">
                Adicione um horário para o app te lembrar com voz natural.
              </p>
              <button
                type="button"
                onClick={onOpenAddAlarm}
                className="py-3 px-6 rounded-full bg-[#146356] text-white text-[14px] font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Criar alarme</span>
              </button>
            </div>
          ) : (
            <>
              {schedulesForMed.map((sched) => (
                <div
                  key={sched.id}
                  className="bg-white rounded-[24px] p-4 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-[22px] font-bold text-[#1C1917] leading-none">
                      {sched.times.join(' · ')}
                    </p>
                    <p className="text-[13px] text-[#6B6560] mt-1.5">
                      {sched.dosage} ·{' '}
                      {sched.cycleMode === '24_4'
                        ? '24 dias + 4 pausa'
                        : sched.cycleMode === '21_7'
                          ? '21 dias + 7 pausa'
                          : 'Todos os dias'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={sched.enabled}
                      aria-label="Ativar ou pausar alarme"
                      onClick={() => onToggleScheduleEnabled(sched.id)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                        sched.enabled ? 'bg-[#146356]' : 'bg-[#D6D3CD]'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          sched.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteSchedule(sched.id)}
                      aria-label="Remover alarme"
                      className="w-9 h-9 rounded-full text-[#A8A29E] hover:text-[#BE123C] hover:bg-[#FEECEF] inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onOpenAddAlarm}
                  className="flex-1 py-3.5 rounded-full bg-[#146356] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo horário</span>
                </button>
                {dosesTodayForMed[0] && (
                  <button
                    type="button"
                    onClick={() => onTriggerTestAlarm(dosesTodayForMed[0])}
                    className="py-3.5 px-5 rounded-full bg-white border border-black/10 text-[#1C1917] text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BellRing className="w-4 h-4 text-[#146356]" />
                    <span>Testar</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
