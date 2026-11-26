'use client';

import { useState } from 'react';
import {
  BellRing,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
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
import { QuietListenButton } from './AudioPlayerBar';

interface HomeViewProps {
  medications: Medication[];
  medicationPhotos: Record<string, string>;
  schedules: MedicationSchedule[];
  dosesToday: ScheduledDoseInstance[];
  last7Days: DayAdherenceSummary[];
  now: Date;
  playback: VoicePlaybackState;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onMarkTaken: (dose: ScheduledDoseInstance) => void;
  onUndoDose: (dose: ScheduledDoseInstance) => void;
  onSelectMedication: (medId: string) => void;
  onOpenAdd: () => void;
  onOpenAddAlarm: () => void;
  onOpenHistory: (dateStr?: string) => void;
  onTriggerTestAlarm: (dose: ScheduledDoseInstance) => void;
}

function getGreeting(hour: number): string {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function formatFriendlyDatePt(date: Date): string {
  const formatted = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function HomeView({
  medications,
  medicationPhotos,
  schedules,
  dosesToday,
  last7Days,
  now,
  playback,
  onSpeak,
  onStopSpeaking,
  onMarkTaken,
  onUndoDose,
  onSelectMedication,
  onOpenAdd,
  onOpenAddAlarm,
  onOpenHistory,
  onTriggerTestAlarm,
}: HomeViewProps) {
  const [showAllToday, setShowAllToday] = useState(false);

  const takenCount = dosesToday.filter((d) => d.status === 'taken').length;
  const totalCount = dosesToday.length;

  // Pick the single most urgent / next upcoming dose for the calm hero card
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

  return (
    <div className="px-5 pt-2 pb-28 space-y-6">
      {/* Serene Greeting */}
      <section className="pt-1">
        <p className="text-[13px] font-medium text-[#78716C]">{formatFriendlyDatePt(now)}</p>
        <h2 className="text-[28px] font-bold text-[#1C1917] leading-tight mt-0.5">
          {getGreeting(now.getHours())}
        </h2>
      </section>

      {/* 1. Calm Hero Card: Next Dose (ONLY one focus at a time) */}
      <section aria-label="Próxima dose">
        {heroDose ? (
          <div className="bg-white rounded-[28px] p-5 border border-black/[0.05] shadow-[0_6px_28px_rgba(28,25,23,0.05)] space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide uppercase text-[#146356]">
                <Clock className="w-3.5 h-3.5" />
                {heroDose.status === 'due_now'
                  ? 'Hora agora'
                  : heroDose.status === 'late'
                    ? 'Atrasado · previsto às ' + heroDose.scheduledTime
                    : 'Próximo remédio · ' + heroDose.scheduledTime}
              </span>
              <QuietListenButton
                sectionId="home-hero-dose"
                playback={playback}
                onClick={() =>
                  toggleSpeak(
                    'home-hero-dose',
                    `Seu próximo remédio é ${heroDose.medication?.name ?? 'seu medicamento'}, ${heroDose.dosage}, às ${heroDose.scheduledTime}. ${heroDose.notes ?? ''}`
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
                <p className="text-[30px] font-bold text-[#1C1917] leading-none tracking-tight">
                  {heroDose.scheduledTime}
                </p>
                <h3 className="text-[19px] font-bold text-[#1C1917] mt-1.5 truncate">
                  {heroDose.medication?.name ?? 'Medicamento'}
                </h3>
                <p className="text-[14px] text-[#6B6560] mt-0.5">{heroDose.dosage}</p>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onMarkTaken(heroDose)}
                className="flex-1 py-3.5 px-5 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(20,99,86,0.22)] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>Tomei agora</span>
              </button>

              <button
                type="button"
                onClick={() => onTriggerTestAlarm(heroDose)}
                aria-label="Testar aviso do alarme"
                title="Testar tela de alarme"
                className="w-12 h-12 rounded-full bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#57534E] inline-flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
              >
                <BellRing className="w-5 h-5" />
              </button>
            </div>

            {totalCount > 1 && (
              <div className="pt-1 border-t border-black/[0.05]">
                <button
                  type="button"
                  onClick={() => setShowAllToday((v) => !v)}
                  className="w-full py-1.5 flex items-center justify-between text-[13px] font-medium text-[#6B6560] hover:text-[#1C1917] cursor-pointer"
                >
                  <span>
                    Hoje: {takenCount} de {totalCount} tomados
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showAllToday ? 'rotate-180' : ''}`}
                  />
                </button>

                {showAllToday && (
                  <div className="mt-2.5 space-y-2">
                    {dosesToday.map((dose) => {
                      const isTaken = dose.status === 'taken';
                      const punct = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
                      return (
                        <div
                          key={dose.key}
                          className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-2xl bg-[#F8F6F2]"
                        >
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-[#1C1917] truncate">
                              {dose.scheduledTime} · {dose.medication?.name ?? 'Remédio'}
                            </p>
                            <p className="text-[12px] text-[#78716C]">
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
                              className="p-2 rounded-full text-[#78716C] hover:bg-white cursor-pointer"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onMarkTaken(dose)}
                              className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-[#146356] text-xs font-semibold hover:bg-[#E6F2EF] cursor-pointer"
                            >
                              Tomar
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
          <div className="bg-[#E8F4EE] rounded-[28px] p-6 border border-[#146356]/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-full bg-[#146356] text-white flex items-center justify-center">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <QuietListenButton
                sectionId="home-all-done"
                playback={playback}
                onClick={() =>
                  toggleSpeak(
                    'home-all-done',
                    `Parabéns! Você tomou todos os ${totalCount} remédios programados para hoje certinho.`
                  )
                }
                ariaLabel="Ouvir resumo do dia"
              />
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#0F4F45]">Tudo certinho hoje</h3>
              <p className="text-[14px] text-[#146356]/85 mt-1">
                Você completou {takenCount} de {totalCount} doses de hoje.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenHistory()}
              className="text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer"
            >
              Ver horários registrados ›
            </button>
          </div>
        ) : pausedCycle?.cycle ? (
          <div className="bg-[#FDF2F6] rounded-[28px] p-5 border border-[#FBCFE8]/60 space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#9D174D]">
              Dia de pausa · {pausedCycle.cycle.dayInPhase} de {pausedCycle.cycle.phaseLength}
            </p>
            <h3 className="text-[19px] font-bold text-[#1C1917]">
              Hoje não precisa tomar {pausedCycle.med?.name ?? 'sua cartela'}
            </h3>
            <p className="text-[14px] text-[#6B6560]">
              O alarme volta automaticamente no início da próxima cartela.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[28px] p-6 border border-black/[0.05] shadow-[0_6px_28px_rgba(28,25,23,0.04)] space-y-3">
            <h3 className="text-[19px] font-bold text-[#1C1917]">Nenhum alarme ativo hoje</h3>
            <p className="text-[14px] text-[#6B6560] leading-relaxed">
              Crie um lembrete calmo com voz natural para nunca esquecer seu horário.
            </p>
            <button
              type="button"
              onClick={onOpenAddAlarm}
              className="mt-1 py-3 px-5 rounded-full bg-[#146356] text-white text-[14px] font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Criar lembrete</span>
            </button>
          </div>
        )}
      </section>

      {/* 2. Serene 7-day Adherence Strip (taps open detailed History sheet) */}
      <section aria-label="Sua semana" className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[14px] font-semibold text-[#57534E]">Sua semana</h3>
          <button
            type="button"
            onClick={() => onOpenHistory()}
            className="text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer"
          >
            Histórico ›
          </button>
        </div>

        <div className="bg-white rounded-[24px] p-4 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] grid grid-cols-7 gap-1">
          {last7Days.map((day) => {
            const dotCls =
              day.status === 'complete'
                ? 'bg-[#146356] text-white'
                : day.status === 'partial'
                  ? 'bg-[#FEF3DD] text-[#B45309] ring-1 ring-[#F59E0B]/30'
                  : day.status === 'missed'
                    ? 'bg-[#FEECEF] text-[#BE123C]'
                    : 'bg-[#F3EFE8] text-[#A8A29E]';

            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => onOpenHistory(day.dateStr)}
                aria-label={`Ver dia ${day.dayNumber}: ${day.takenCount} de ${day.totalScheduled} tomados`}
                className="flex flex-col items-center py-1 rounded-xl hover:bg-[#F6F4EF] transition-colors cursor-pointer"
              >
                <span
                  className={`text-[11px] font-medium ${
                    day.isToday ? 'text-[#146356] font-bold' : 'text-[#78716C]'
                  }`}
                >
                  {day.weekdayShort.slice(0, 3)}
                </span>
                <span
                  className={`mt-1.5 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${dotCls} ${
                    day.isToday ? 'ring-2 ring-[#146356]/30 ring-offset-2' : ''
                  }`}
                >
                  {day.status === 'complete' ? <Check className="w-4 h-4 stroke-[2.6]" /> : day.dayNumber}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Clean Saved Medications List */}
      <section aria-label="Seus remédios" className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[14px] font-semibold text-[#57534E]">Seus remédios</h3>
          <button
            type="button"
            onClick={onOpenAdd}
            className="text-[13px] font-semibold text-[#146356] hover:underline cursor-pointer"
          >
            + Adicionar
          </button>
        </div>

        <div className="bg-white rounded-[24px] border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] divide-y divide-black/[0.05] overflow-hidden">
          {medications.map((med) => (
            <button
              key={med.id}
              type="button"
              onClick={() => onSelectMedication(med.id)}
              className="w-full px-4 py-3.5 flex items-center gap-3.5 text-left hover:bg-[#FAF9F6] active:bg-[#F3EFE8] transition-colors cursor-pointer"
            >
              <MedicationAvatar
                medication={med}
                photoOverride={medicationPhotos[med.id]}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-bold text-[#1C1917] truncate">{med.name}</p>
                <p className="text-[13px] text-[#78716C] truncate mt-0.5">{med.purposeSimple}</p>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[#A8A29E] shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
