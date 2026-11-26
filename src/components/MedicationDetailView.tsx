'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  Ban,
  BellRing,
  CheckCircle2,
  ChevronRight,
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
import { getLowestGenericPrice } from '@/services/pricing';
import { askPharmacistAi } from '@/services/aiClient';
import { voiceEngine, type VoicePlaybackState } from '@/services/voiceEngine';
import { MedicationAvatar } from './MedicationAvatar';
import { AccessiblePictogram } from './AccessiblePictograms';
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
  const [questionInput, setQuestionInput] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [askingAi, setAskingAi] = useState(false);
  const [listeningQ, setListeningQ] = useState(false);

  const lowestGeneric = getLowestGenericPrice(medication, selectedUf);

  const toggleSpeak = (id: string, text: string) => {
    if (playback.sectionId === id && playback.status !== 'idle') {
      onStopSpeaking();
    } else {
      onSpeak(id, text);
    }
  };

  const fullSummaryScript = `${medication.name}. ${medication.purposeSimple} ${medication.howToTake.spokenScript} ${medication.whatNotToDo.spokenScript} Sobre genéricos: ${lowestGeneric.priceText}. ${medication.genericsHighlight.spokenScript}`;

  const submitQuestion = async (rawQuestion: string) => {
    const q = rawQuestion.trim();
    if (!q) return;
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
    <div className="px-4 pt-3 pb-28 space-y-4">
      {/* High-contrast horizontal medication switcher */}
      {myMedications.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {myMedications.map((med) => {
            const active = med.id === medication.id;
            return (
              <button
                key={med.id}
                type="button"
                onClick={() => onSelectMedication(med.id)}
                className={`shrink-0 min-h-[44px] px-4 rounded-full text-[15px] font-extrabold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-[#111827] border-2 border-slate-300'
                }`}
              >
                {med.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Hero Medication Card + Big Royal-Blue "OUVIR TUDO EM VOZ ALTA" */}
      <section className="bg-white rounded-[26px] p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <MedicationAvatar
            medication={medication}
            photoOverride={medicationPhotos[medication.id]}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-[26px] font-extrabold text-[#111827] leading-tight">
              {medication.name}
            </h2>
            <p className="text-[14.5px] font-semibold text-[#374151] mt-0.5 leading-snug">
              {medication.activeIngredient}
            </p>
            <p className="text-[14px] text-[#4B5563] mt-1 leading-snug">
              {medication.purposeSimple}
            </p>
          </div>
        </div>

        <AudioPlayerBar
          label="OUVIR TUDO EM VOZ ALTA"
          sectionId={`med-all-${medication.id}`}
          playback={playback}
          rate={voiceRate}
          hasNaturalVoiceKey={hasNaturalVoiceKey}
          onPlayToggle={() => toggleSpeak(`med-all-${medication.id}`, fullSummaryScript)}
          onToggleRate={onToggleRate}
          onOpenVoiceSettings={onOpenVoiceSettings}
        />
      </section>

      {/* Big High-Contrast 3-Way Tab Bar */}
      <div
        role="tablist"
        aria-label="Seções do medicamento"
        className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#E5E7EB]"
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
            className={`min-h-[44px] rounded-xl text-[14.5px] font-extrabold transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-[#374151] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: BULA FÁCIL (Unmistakable Green / Red / Amber Visual Cards!) */}
      {activeSubTab === 'bula' && (
        <div className="space-y-4">
          {/* CARD 1: COMO TOMAR (Green) */}
          <section
            aria-label="Como tomar"
            className="rounded-[24px] bg-[#ECFDF5] border-l-[8px] border-[#059669] p-4 shadow-xs space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-7 h-7 text-[#047857] stroke-[2.5] shrink-0" />
                <h3 className="text-[18px] font-extrabold text-[#065F46] uppercase tracking-wide">
                  COMO TOMAR
                </h3>
              </div>
              <QuietListenButton
                sectionId={`how-${medication.id}`}
                playback={playback}
                onClick={() => toggleSpeak(`how-${medication.id}`, medication.howToTake.spokenScript)}
                ariaLabel="Ouvir como tomar"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
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
                  className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/75 hover:bg-white active:scale-95 transition-all cursor-pointer"
                >
                  <AccessiblePictogram type={item.icon} size={56} />
                  <span className="mt-2 text-[14px] font-extrabold text-[#111827] leading-tight">
                    {item.shortLabel}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[16px] font-bold text-[#111827] leading-snug">
              {medication.howToTake.summary}
            </p>
          </section>

          {/* CARD 2: O QUE NÃO PODE (Strong Red!) */}
          <section
            aria-label="O que não pode"
            className="rounded-[24px] bg-[#FEF2F2] border-l-[8px] border-[#DC2626] p-4 shadow-xs space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Ban className="w-7 h-7 text-[#B91C1C] stroke-[2.5] shrink-0" />
                <h3 className="text-[18px] font-extrabold text-[#991B1B] uppercase tracking-wide">
                  O QUE NÃO PODE
                </h3>
              </div>
              <QuietListenButton
                sectionId={`not-${medication.id}`}
                playback={playback}
                onClick={() => toggleSpeak(`not-${medication.id}`, medication.whatNotToDo.spokenScript)}
                ariaLabel="Ouvir o que não pode fazer"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
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
                  className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/80 hover:bg-white active:scale-95 transition-all cursor-pointer"
                >
                  <AccessiblePictogram type={item.icon} size={56} />
                  <span className="mt-2 text-[14px] font-extrabold text-[#7F1D1D] leading-tight">
                    {item.shortLabel}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[16px] font-bold text-[#111827] leading-snug">
              {medication.whatNotToDo.summary}
            </p>
          </section>

          {/* CARD 3: GENÉRICOS E DIFERENÇAS PREVIEW (Amber — matches approved visual hierarchy!) */}
          <section
            aria-label="Genéricos e diferenças"
            className="rounded-[24px] bg-[#FFFBEB] border-l-[8px] border-[#D97706] p-4 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <ArrowLeftRight className="w-6 h-6 text-[#B45309] stroke-[2.5] shrink-0" />
                <h3 className="text-[17px] font-extrabold text-[#92400E] uppercase tracking-wide">
                  GENÉRICOS E DIFERENÇAS
                </h3>
              </div>
              <QuietListenButton
                sectionId={`gen-preview-${medication.id}`}
                playback={playback}
                onClick={() =>
                  toggleSpeak(
                    `gen-preview-${medication.id}`,
                    `Preço estimado: ${lowestGeneric.priceText}. ${medication.genericsHighlight.spokenScript}`
                  )
                }
                ariaLabel="Ouvir sobre genéricos e diferenças"
              />
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <span className="text-[20px] font-extrabold text-[#047857]">
                {lowestGeneric.priceText}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#065F46] text-[13.5px] font-extrabold">
                {medication.genericsHighlight.sameEffectBadge}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onChangeSubTab('genericos')}
              className="w-full text-left rounded-2xl bg-[#FDE68A]/70 hover:bg-[#FDE68A] border border-[#D97706]/35 p-3.5 flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-6 h-6 text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[15px] font-extrabold text-[#78350F] leading-snug">
                    {medication.genericsHighlight.switchWarningShort}
                  </p>
                  <p className="text-[14px] font-extrabold text-[#92400E] mt-1 underline">
                    Toque para comparar opções
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-[#92400E] shrink-0" />
            </button>
          </section>

          {/* CARD 4: SE ESQUECER & O QUE PODE (Always clearly visible — never hidden!) */}
          <section
            aria-label="Se esquecer de tomar e o que pode fazer"
            className="rounded-[24px] bg-white border-2 border-slate-200 p-4 space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[17px] font-extrabold text-[#111827] uppercase">
                SE ESQUECER & O QUE PODE
              </h3>
              <QuietListenButton
                sectionId={`missed-${medication.id}`}
                playback={playback}
                onClick={() =>
                  toggleSpeak(
                    `missed-${medication.id}`,
                    `${medication.whatYouCanDo.spokenScript} Se esquecer: ${medication.whatYouCanDo.missedDoseTip}`
                  )
                }
                ariaLabel="Ouvir o que fazer se esquecer e o que pode fazer"
              />
            </div>

            <div className="rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-3.5">
              <p className="text-[14px] font-extrabold text-[#1E40AF] uppercase">
                Esqueci de tomar — e agora?
              </p>
              <p className="text-[15.5px] font-medium text-[#111827] mt-1 leading-snug">
                {medication.whatYouCanDo.missedDoseTip}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F6F2] p-3.5">
              <p className="text-[14px] font-extrabold text-[#374151] uppercase">
                Quando começa a fazer efeito
              </p>
              <p className="text-[15.5px] font-medium text-[#111827] mt-1 leading-snug">
                {medication.whatYouCanDo.onsetTime}
              </p>
            </div>
          </section>

          {/* CARD 5: ASK BY VOICE (Big Friendly Voice Pharmacist Box) */}
          <section
            aria-label="Perguntar por voz"
            className="rounded-[24px] bg-white border-2 border-[#1D4ED8]/25 p-4 space-y-3"
          >
            <h3 className="text-[17px] font-extrabold text-[#111827]">
              Tem alguma dúvida sobre {medication.name}?
            </h3>
            <p className="text-[14.5px] font-medium text-[#374151]">
              Toque no microfone azul para perguntar falando — eu respondo em voz alta!
            </p>

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
                aria-label="Falar minha dúvida"
                className={`w-13 h-13 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm cursor-pointer ${
                  listeningQ ? 'bg-[#B91C1C] animate-pulse' : 'bg-[#1D4ED8] hover:bg-[#1E40AF]'
                }`}
              >
                {listeningQ ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Ou escreva aqui sua dúvida..."
                className="flex-1 min-w-0 min-h-[50px] px-4 rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 text-[15.5px] text-[#111827] focus:border-[#1D4ED8] focus:outline-none"
              />
              <button
                type="submit"
                disabled={askingAi || !questionInput.trim()}
                aria-label="Enviar dúvida"
                className="w-13 h-13 rounded-2xl bg-[#047857] disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer"
              >
                {askingAi ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>

            {aiAnswer && (
              <div className="rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-4 flex items-start justify-between gap-3">
                <p className="text-[15.5px] font-medium text-[#111827] leading-relaxed">
                  {aiAnswer}
                </p>
                <QuietListenButton
                  sectionId="pharmacist-answer"
                  playback={playback}
                  onClick={() => toggleSpeak('pharmacist-answer', aiAnswer)}
                  ariaLabel="Ouvir resposta novamente"
                />
              </div>
            )}
          </section>

          <p className="text-[13px] text-center text-[#4B5563] px-2 leading-relaxed">
            Informação educativa em linguagem simples. Não substitui a orientação do seu médico ou farmacêutico.
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

      {/* SUBTAB 3: ALARMES */}
      {activeSubTab === 'alarmes' && (
        <div className="space-y-3.5">
          {schedulesForMed.length === 0 ? (
            <div className="bg-white rounded-[24px] p-5 border-2 border-slate-200 text-center space-y-3">
              <p className="text-[18px] font-extrabold text-[#111827]">
                Nenhum alarme para {medication.name}
              </p>
              <p className="text-[15px] text-[#374151]">
                Crie um lembrete para o celular tocar e falar na hora de tomar.
              </p>
              <button
                type="button"
                onClick={onOpenAddAlarm}
                className="w-full min-h-[54px] rounded-2xl bg-[#047857] text-white text-[16px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[2.8]" />
                <span>Criar alarme</span>
              </button>
            </div>
          ) : (
            <>
              {schedulesForMed.map((sched) => (
                <div
                  key={sched.id}
                  className="bg-white rounded-[24px] p-4 border-2 border-slate-200 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-[26px] font-extrabold text-[#111827] leading-none">
                      {sched.times.join(' · ')}
                    </p>
                    <p className="text-[14.5px] font-semibold text-[#374151] mt-1.5">
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
                      className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                        sched.enabled ? 'bg-[#047857]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`block w-6 h-6 rounded-full bg-white shadow transition-transform ${
                          sched.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteSchedule(sched.id)}
                      aria-label="Remover alarme"
                      className="w-11 h-11 rounded-full bg-[#FEF2F2] text-[#B91C1C] inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onOpenAddAlarm}
                  className="min-h-[54px] rounded-2xl bg-[#047857] text-white text-[15.5px] font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  <span>Novo horário</span>
                </button>
                {dosesTodayForMed[0] && (
                  <button
                    type="button"
                    onClick={() => onTriggerTestAlarm(dosesTodayForMed[0])}
                    className="min-h-[54px] rounded-2xl bg-[#FEF3C7] text-[#92400E] text-[15.5px] font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BellRing className="w-5 h-5" />
                    <span>Testar alarme</span>
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
