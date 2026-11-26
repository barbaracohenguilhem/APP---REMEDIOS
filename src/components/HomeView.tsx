'use client';

import { useState } from 'react';
import {
  BellRing,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Mic,
  Plus,
  RotateCcw,
} from 'lucide-react';
import type { Medication, MedicationSchedule } from '@/types/medication';
import {
  formatPunctualityLabel,
  getScheduleCycleInfo,
  type DayAdherenceSummary,
  type ScheduledDoseInstance,
} from '@/services/scheduleEngine';
import type { VoicePlaybackState } from '@/services/voiceEngine';
import { MedicationAvatar } from './MedicationAvatar';
import { AudioPlayerBar, QuietListenButton } from './AudioPlayerBar';

interface HomeViewProps {
  medications: Medication[];
  medicationPhotos: Record<string, string>;
  schedules: MedicationSchedule[];
  dosesToday: ScheduledDoseInstance[];
  last7Days: DayAdherenceSummary[];
  now: Date;
  playback: VoicePlaybackState;
  voiceRate: 'normal' | 'slow';
  hasNaturalVoiceKey: boolean;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onToggleRate: () => void;
  onOpenVoiceSettings: () => void;
  onMarkTaken: (dose: ScheduledDoseInstance) => void;
  onUndoDose: (dose: ScheduledDoseInstance) => void;
  onSelectMedication: (medId: string) => void;
  onOpenAddWithStep: (step: 'choose' | 'scan' | 'voice' | 'search') => void;
  onOpenAddAlarm: () => void;
  onOpenHistory: (dateStr?: string) => void;
  onTriggerTestAlarm: (dose: ScheduledDoseInstance) => void;
}

function getGreeting(hour: number): string {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function HomeView({
  medications,
  medicationPhotos,
  schedules,
  dosesToday,
  last7Days,
  now,
  playback,
  voiceRate,
  hasNaturalVoiceKey,
  onSpeak,
  onStopSpeaking,
  onToggleRate,
  onOpenVoiceSettings,
  onMarkTaken,
  onUndoDose,
  onSelectMedication,
  onOpenAddWithStep,
  onOpenAddAlarm,
  onOpenHistory,
  onTriggerTestAlarm,
}: HomeViewProps) {
  const [showAllToday, setShowAllToday] = useState(false);

  const takenCount = dosesToday.filter((d) => d.status === 'taken').length;
  const totalCount = dosesToday.length;

  const heroDose =
    dosesToday.find((d) => d.status === 'due_now') ??
    dosesToday.find((d) => d.status === 'late') ??
    dosesToday.find((d) => d.status === 'upcoming') ??
    null;

  const medMap = new Map(medications.map((m) => [m.id, m]));
  const pausedCycle = schedules
    .filter((s) => s.enabled)
    .map((s) => ({
      schedule: s,
      cycle: getScheduleCycleInfo(s, now),
      med: medMap.get(s.medicationId),
    }))
    .find((x) => Boolean(x.cycle?.isPauseDay));

  const toggleSpeak = (id: string, text: string) => {
    if (playback.sectionId === id && playback.status !== 'idle') {
      onStopSpeaking();
    } else {
      onSpeak(id, text);
    }
  };

  const todaySummaryScript = heroDose
    ? `${getGreeting(now.getHours())}! Seu próximo remédio é ${heroDose.medication?.name ?? 'seu medicamento'}, ${heroDose.dosage}, às ${heroDose.scheduledTime}. Você já tomou ${takenCount} de ${totalCount} doses de hoje. Para adicionar uma receita ou caixa nova, toque no botão verde da câmera.`
    : totalCount > 0
      ? `${getGreeting(now.getHours())}! Parabéns, você tomou todos os ${totalCount} remédios de hoje certinho.`
      : `${getGreeting(now.getHours())}! Você ainda não tem horários cadastrados para hoje. Toque no botão da câmera ou do microfone para adicionar seu remédio.`;

  return (
    <div className="px-4 pt-3 pb-28 space-y-5">
      {/* 1. Prominent Accessible Voice Summary Bar right at top */}
      <AudioPlayerBar
        label="Ouvir resumo de hoje"
        sectionId="home-summary"
        playback={playback}
        rate={voiceRate}
        hasNaturalVoiceKey={hasNaturalVoiceKey}
        onPlayToggle={() => toggleSpeak('home-summary', todaySummaryScript)}
        onToggleRate={onToggleRate}
        onOpenVoiceSettings={onOpenVoiceSettings}
      />

      {/* 2. Giant, Unmistakable "Próximo Remédio" Hero Card */}
      <section aria-label="Próximo remédio">
        {heroDose ? (
          <div className="bg-white rounded-[26px] p-5 border-2 border-[#059669]/25 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13.5px] font-extrabold ${
                  heroDose.status === 'late'
                    ? 'bg-[#FEE2E2] text-[#991B1B]'
                    : heroDose.status === 'due_now'
                      ? 'bg-[#FEF3C7] text-[#92400E]'
                      : 'bg-[#DCFCE7] text-[#065F46]'
                }`}
              >
                <Clock className="w-4 h-4" />
                {heroDose.status === 'due_now'
                  ? 'HORA AGORA'
                  : heroDose.status === 'late'
                    ? `ATRASADO · ${heroDose.scheduledTime}`
                    : 'PRÓXIMO REMÉDIO'}
              </span>

              <QuietListenButton
                sectionId="home-hero-dose"
                playback={playback}
                onClick={() =>
                  toggleSpeak(
                    'home-hero-dose',
                    `Próximo remédio: ${heroDose.medication?.name ?? 'seu medicamento'}, ${heroDose.dosage}, às ${heroDose.scheduledTime}. ${heroDose.notes ?? ''}`
                  )
                }
                ariaLabel="Ouvir próximo remédio"
              />
            </div>

            <div className="flex items-center gap-4">
              {heroDose.medication && (
                <button
                  type="button"
                  onClick={() => onSelectMedication(heroDose.medication!.id)}
                  className="shrink-0 cursor-pointer"
                >
                  <MedicationAvatar
                    medication={heroDose.medication}
                    photoOverride={medicationPhotos[heroDose.medication.id]}
                    size="lg"
                  />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[34px] font-extrabold text-[#111827] leading-none">
                  {heroDose.scheduledTime}
                </p>
                <h2 className="text-[22px] font-extrabold text-[#111827] mt-1 leading-tight">
                  {heroDose.medication?.name ?? 'Medicamento'}
                </h2>
                <p className="text-[15.5px] font-semibold text-[#374151] mt-0.5">
                  {heroDose.dosage}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onMarkTaken(heroDose)}
                className="flex-1 min-h-[56px] px-5 rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-extrabold text-[17px] inline-flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all cursor-pointer"
              >
                <Check className="w-6 h-6 stroke-[3]" />
                <span>TOMEI AGORA</span>
              </button>

              <button
                type="button"
                onClick={() => onTriggerTestAlarm(heroDose)}
                aria-label="Testar tela de alarme"
                title="Testar alarme"
                className="w-14 h-14 rounded-2xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] inline-flex items-center justify-center shrink-0 cursor-pointer"
              >
                <BellRing className="w-6 h-6" />
              </button>
            </div>

            {totalCount > 1 && (
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAllToday((v) => !v)}
                  className="w-full py-2 flex items-center justify-between text-[15px] font-bold text-[#374151] cursor-pointer"
                >
                  <span>
                    Hoje: {takenCount} de {totalCount} tomados
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${showAllToday ? 'rotate-180' : ''}`}
                  />
                </button>

                {showAllToday && (
                  <div className="mt-2 space-y-2.5">
                    {dosesToday.map((dose) => {
                      const isTaken = dose.status === 'taken';
                      const punct = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
                      return (
                        <div
                          key={dose.key}
                          className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F7F6F2] border border-slate-200"
                        >
                          <div className="min-w-0">
                            <p className="text-[16px] font-extrabold text-[#111827]">
                              {dose.scheduledTime} · {dose.medication?.name ?? 'Remédio'}
                            </p>
                            <p className="text-[14px] font-medium text-[#374151]">
                              {isTaken && dose.log
                                ? `Tomado às ${dose.log.takenTimeDisplay} · ${punct?.label ?? ''}`
                                : dose.dosage}
                            </p>
                          </div>
                          {isTaken ? (
                            <button
                              type="button"
                              onClick={() => onUndoDose(dose)}
                              aria-label="Desfazer marcação"
                              className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#374151] inline-flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              <RotateCcw className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onMarkTaken(dose)}
                              className="px-4 py-2.5 rounded-xl bg-[#047857] text-white text-[14px] font-extrabold shrink-0 cursor-pointer"
                            >
                              Tomei
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : totalCount > 0 ? (
          <div className="bg-[#ECFDF5] rounded-[26px] p-5 border-2 border-[#059669]/40 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-[#047857] text-white flex items-center justify-center shrink-0">
                  <Check className="w-7 h-7 stroke-[3]" />
                </span>
                <div>
                  <h2 className="text-[21px] font-extrabold text-[#065F46]">
                    Tudo certinho hoje!
                  </h2>
                  <p className="text-[15px] font-semibold text-[#047857]">
                    {takenCount} de {totalCount} remédios tomados
                  </p>
                </div>
              </div>
              <QuietListenButton
                sectionId="home-all-done"
                playback={playback}
                onClick={() =>
                  toggleSpeak(
                    'home-all-done',
                    `Parabéns! Você tomou todos os ${totalCount} remédios de hoje certinho.`
                  )
                }
                ariaLabel="Ouvir resumo de hoje"
              />
            </div>
          </div>
        ) : pausedCycle?.cycle ? (
          <div className="bg-[#FDF2F8] rounded-[26px] p-5 border-2 border-[#F472B6]/40 space-y-1.5">
            <p className="text-[14px] font-extrabold text-[#9D174D] uppercase">
              Dia de pausa · {pausedCycle.cycle.dayInPhase} de {pausedCycle.cycle.phaseLength}
            </p>
            <h2 className="text-[20px] font-extrabold text-[#111827]">
              Hoje não precisa tomar {pausedCycle.med?.name ?? 'sua cartela'}
            </h2>
            <p className="text-[15px] text-[#374151]">
              O alarme volta sozinho na próxima cartela.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[26px] p-5 border-2 border-slate-200 space-y-3">
            <h2 className="text-[20px] font-extrabold text-[#111827]">
              Nenhum alarme para hoje
            </h2>
            <p className="text-[15px] text-[#374151]">
              Crie um lembrete para o celular te avisar com voz na hora certa.
            </p>
            <button
              type="button"
              onClick={onOpenAddAlarm}
              className="w-full min-h-[52px] rounded-2xl bg-[#047857] text-white text-[16px] font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.8]" />
              <span>Criar meu alarme</span>
            </button>
          </div>
        )}
      </section>

      {/* 3. Two GIANT Visual Input Cards (Photo & Voice right on Home — zero hunting!) */}
      <section aria-label="Adicionar remédio fácil" className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOpenAddWithStep('scan')}
          className="p-4 rounded-[24px] bg-[#0F766E] hover:bg-[#115E59] text-white text-left shadow-sm flex flex-col justify-between min-h-[124px] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Camera className="w-7 h-7 stroke-[2.2]" />
          </span>
          <div className="mt-3">
            <p className="text-[17px] font-extrabold leading-tight">Foto da receita</p>
            <p className="text-[13.5px] text-white/90 font-medium mt-0.5">Caixa ou print</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOpenAddWithStep('voice')}
          className="p-4 rounded-[24px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-left shadow-sm flex flex-col justify-between min-h-[124px] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Mic className="w-7 h-7 stroke-[2.2]" />
          </span>
          <div className="mt-3">
            <p className="text-[17px] font-extrabold leading-tight">Falar o nome</p>
            <p className="text-[13.5px] text-white/90 font-medium mt-0.5">Sem digitar</p>
          </div>
        </button>
      </section>

      {/* 4. High-Contrast 7-Day Adherence Strip ("Tomei certinho?") */}
      <section aria-label="Sua semana" className="bg-white rounded-[24px] p-4 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-extrabold text-[#111827]">Tomei certinho?</h3>
          <button
            type="button"
            onClick={() => onOpenHistory()}
            className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#111827] text-[14px] font-bold cursor-pointer"
          >
            Ver dias ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {last7Days.map((day) => {
            const dotCls =
              day.status === 'complete'
                ? 'bg-[#047857] text-white'
                : day.status === 'partial'
                  ? 'bg-[#F59E0B] text-[#111827]'
                  : day.status === 'missed'
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-[#E5E7EB] text-[#374151]';

            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => onOpenHistory(day.dateStr)}
                aria-label={`Dia ${day.dayNumber}: ${day.takenCount} de ${day.totalScheduled} tomados`}
                className="flex flex-col items-center py-1 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <span className="text-[12.5px] font-bold text-[#374151]">
                  {day.weekdayShort.slice(0, 3)}
                </span>
                <span
                  className={`mt-1.5 w-9 h-9 rounded-full flex items-center justify-center text-[13.5px] font-extrabold ${dotCls} ${
                    day.isToday ? 'ring-2 ring-[#111827] ring-offset-2' : ''
                  }`}
                >
                  {day.status === 'complete' ? <Check className="w-5 h-5 stroke-[3]" /> : day.dayNumber}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Spacious High-Contrast Saved Medications List (Each row has its own 🔊 button!) */}
      <section aria-label="Seus remédios" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[18px] font-extrabold text-[#111827]">Seus remédios</h3>
          <button
            type="button"
            onClick={() => onOpenAddWithStep('search')}
            className="px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#065F46] text-[14px] font-extrabold cursor-pointer"
          >
            + Buscar
          </button>
        </div>

        <div className="space-y-2.5">
          {medications.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-[22px] p-3.5 border border-slate-200 shadow-xs flex items-center gap-3"
            >
              <button
                type="button"
                onClick={() => onSelectMedication(med.id)}
                className="flex items-center gap-3.5 flex-1 min-w-0 text-left cursor-pointer"
              >
                <MedicationAvatar
                  medication={med}
                  photoOverride={medicationPhotos[med.id]}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[18px] font-extrabold text-[#111827] truncate">{med.name}</p>
                  <p className="text-[14px] font-medium text-[#374151] line-clamp-2 leading-snug mt-0.5">
                    {med.purposeSimple}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#4B5563] shrink-0" />
              </button>

              <QuietListenButton
                sectionId={`home-med-${med.id}`}
                playback={playback}
                onClick={() =>
                  toggleSpeak(`home-med-${med.id}`, `${med.name}. ${med.purposeSimple}`)
                }
                ariaLabel={`Ouvir para que serve ${med.name}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
