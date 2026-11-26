import { useState } from 'react';
import {
  AlarmClock,
  Bell,
  BellRing,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Plus,
  RotateCcw,
  Trash2,
  XCircle,
} from 'lucide-react';
import type { DoseLog, Medication, MedicationSchedule } from '../types/medication';
import {
  buildLast7DaysAdherence,
  formatPunctualityLabel,
  getDosesForDate,
  getPeriodMeta,
  getScheduleCycleInfo,
  type DayPeriod,
  type ScheduledDoseInstance,
} from '../services/scheduleEngine';
import { MedicinePackArt } from '../components/MedicinePackArt';
import { SpeakButton } from '../components/SpeakButton';

interface HorariosViewProps {
  schedules: MedicationSchedule[];
  doseLogs: DoseLog[];
  medications: Medication[];
  now: Date;
  speakingId: string | null;
  onSpeakSection: (id: string, text: string) => void;
  onStopSpeaking: () => void;
  onMarkTaken: (dose: ScheduledDoseInstance) => void;
  onMarkSkipped: (dose: ScheduledDoseInstance) => void;
  onUndoDose: (dose: ScheduledDoseInstance) => void;
  onOpenAddAlarm: () => void;
  onToggleScheduleEnabled: (scheduleId: string) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onTriggerTestAlarm: (dose: ScheduledDoseInstance) => void;
  onOpenMedicationBula: (medId: string) => void;
}

type HorariosSubView = 'hoje' | 'historico' | 'alarmes';

export function HorariosView({
  schedules,
  doseLogs,
  medications,
  now,
  speakingId,
  onSpeakSection,
  onStopSpeaking,
  onMarkTaken,
  onMarkSkipped,
  onUndoDose,
  onOpenAddAlarm,
  onToggleScheduleEnabled,
  onDeleteSchedule,
  onTriggerTestAlarm,
  onOpenMedicationBula,
}: HorariosViewProps) {
  const [subView, setSubView] = useState<HorariosSubView>('hoje');
  const [selectedHistoryDateStr, setSelectedHistoryDateStr] = useState<string | null>(null);
  const [notifStatus, setNotifStatus] = useState<string>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    return window.Notification.permission;
  });

  const dosesToday = getDosesForDate(schedules, doseLogs, medications, now, now);
  const takenTodayCount = dosesToday.filter((d) => d.status === 'taken').length;
  const totalTodayCount = dosesToday.length;
  const progressPct = totalTodayCount > 0 ? Math.round((takenTodayCount / totalTodayCount) * 100) : 0;

  const last7Days = buildLast7DaysAdherence(schedules, doseLogs, medications, now);
  const activeHistoryDateStr =
    selectedHistoryDateStr ?? last7Days[last7Days.length - 1]?.dateStr ?? '';

  const medMap = new Map(medications.map((m) => [m.id, m]));
  const pausedCyclesToday = schedules
    .filter((s) => s.enabled)
    .map((s) => ({ schedule: s, cycle: getScheduleCycleInfo(s, now), med: medMap.get(s.medicationId) }))
    .filter((x): x is { schedule: MedicationSchedule; cycle: NonNullable<ReturnType<typeof getScheduleCycleInfo>>; med: Medication | undefined } => Boolean(x.cycle?.isPauseDay));

  const handleRequestNotifications = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    try {
      const result = await window.Notification.requestPermission();
      setNotifStatus(result);
    } catch {
      setNotifStatus('denied');
    }
  };

  const buildTodaySpokenSummary = (): string => {
    if (dosesToday.length === 0) {
      return 'Você ainda não tem alarmes cadastrados para hoje. Toque em Novo Alarme para criar um lembrete.';
    }
    const pending = dosesToday.filter((d) => d.status !== 'taken' && d.status !== 'skipped');
    const summaryParts = [
      `Resumo dos seus horários de hoje: você já tomou ${takenTodayCount} de ${totalTodayCount} doses.`,
    ];
    if (pending.length === 0) {
      summaryParts.push('Parabéns! Você tomou todos os remédios de hoje certinho.');
    } else {
      const nextList = pending
        .map((d) => `${d.medication?.name ?? 'Remédio'} às ${d.scheduledTime}`)
        .join(', e ');
      summaryParts.push(`Ainda faltam: ${nextList}.`);
    }
    return summaryParts.join(' ');
  };

  const handleToggleSpeak = (id: string, text: string) => {
    if (speakingId === id) {
      onStopSpeaking();
    } else {
      onSpeakSection(id, text);
    }
  };

  const handleSpeakToday = () => {
    handleToggleSpeak('horarios-hoje', buildTodaySpokenSummary());
  };

  const buildDoseSpokenText = (dose: ScheduledDoseInstance): string => {
    const medName = dose.medication?.name ?? 'Medicamento';
    const punctuality = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
    let statusText = 'Ainda vai chegar a hora de tomar.';
    if (dose.status === 'taken') {
      const takenAt = dose.log?.takenTimeDisplay ? ` às ${dose.log.takenTimeDisplay}` : '';
      const punctNote = punctuality ? `, ${punctuality.label.replace(' ✓', '')}` : '';
      statusText = `Já foi tomado${takenAt}${punctNote}.`;
    } else if (dose.status === 'skipped') {
      statusText = 'Esta dose foi marcada como pulada.';
    } else if (dose.status === 'late') {
      statusText = 'Está atrasado. Se ainda puder tomar, toque no botão verde Tomei Agora.';
    } else if (dose.status === 'due_now') {
      statusText = 'Está na hora de tomar agora!';
    }
    const notesText = dose.notes ? ` Observação: ${dose.notes}` : '';
    return `${medName}, ${dose.dosage}, horário previsto às ${dose.scheduledTime}. ${statusText}${notesText}`;
  };

  const periods: DayPeriod[] = ['manha', 'tarde', 'noite'];
  const nextUntakenDose =
    dosesToday.find((d) => d.status === 'due_now' || d.status === 'late') ??
    dosesToday.find((d) => d.status === 'upcoming') ??
    dosesToday[0];

  // Selected history day's doses
  const selectedDayParts = activeHistoryDateStr.split('-').map(Number);
  const selectedDayDate =
    selectedDayParts.length === 3
      ? new Date(selectedDayParts[0], selectedDayParts[1] - 1, selectedDayParts[2])
      : now;
  const selectedHistoryDoses = getDosesForDate(
    schedules,
    doseLogs,
    medications,
    selectedDayDate,
    now
  );

  const formattedActiveHistoryDate = activeHistoryDateStr.split('-').reverse().join('/');
  const selectedDaySummary = last7Days.find((d) => d.dateStr === activeHistoryDateStr);

  const buildLast7DaysSpokenSummary = (): string => {
    const totalTaken7d = last7Days.reduce((acc, day) => acc + day.takenCount, 0);
    const totalScheduled7d = last7Days.reduce((acc, day) => acc + day.totalScheduled, 0);
    const completeDays7d = last7Days.filter((day) => day.status === 'complete').length;

    if (totalScheduled7d === 0) {
      return 'Resumo dos últimos 7 dias: você não teve doses programadas neste período.';
    }

    const selectedPart = selectedDaySummary
      ? ` No dia selecionado, ${formattedActiveHistoryDate}, foram tomadas ${selectedDaySummary.takenCount} de ${selectedDaySummary.totalScheduled} doses.`
      : '';

    return `Resumo dos últimos 7 dias: você tomou ${totalTaken7d} de ${totalScheduled7d} doses programadas, com ${completeDays7d} ${completeDays7d === 1 ? 'dia completo' : 'dias completos'}.${selectedPart}`;
  };

  const buildSelectedDaySpokenSummary = (): string => {
    if (selectedHistoryDoses.length === 0) {
      return `Registro do dia ${formattedActiveHistoryDate}: nenhuma dose programada neste dia.`;
    }
    const takenCount = selectedHistoryDoses.filter((d) => d.status === 'taken').length;
    const details = selectedHistoryDoses.map((dose) => {
      const medName = dose.medication?.name ?? 'Medicamento';
      if (dose.status === 'taken') {
        const punct = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
        const takenAt = dose.log?.takenTimeDisplay ? ` às ${dose.log.takenTimeDisplay}` : '';
        const punctText = punct ? `, ${punct.label.replace(' ✓', '')}` : '';
        return `${medName}, previsto às ${dose.scheduledTime}, tomado${takenAt}${punctText}`;
      }
      if (dose.status === 'skipped') {
        return `${medName}, previsto às ${dose.scheduledTime}, marcado como pulado`;
      }
      if (dose.status === 'upcoming') {
        return `${medName}, agendado para às ${dose.scheduledTime}`;
      }
      if (dose.status === 'due_now') {
        return `${medName}, previsto às ${dose.scheduledTime}, está na hora agora`;
      }
      return `${medName}, previsto às ${dose.scheduledTime}, não registrado`;
    });

    return `Registro do dia ${formattedActiveHistoryDate}: ${takenCount} de ${selectedHistoryDoses.length} doses tomadas. ${details.join('. ')}.`;
  };

  return (
    <div className="px-4 py-3.5 space-y-4 pb-12">
      {/* Top Progress & Controls Card */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">
              Controle de Hoje
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {takenTodayCount} de {totalTodayCount}{' '}
              <span className="text-base font-bold text-slate-500">tomados</span>
            </h2>
          </div>
          <SpeakButton
            isSpeaking={speakingId === 'horarios-hoje'}
            onClick={handleSpeakToday}
            ariaLabel="Ouvir seus horários de remédios de hoje"
          />
        </div>

        {/* Visual progress bar */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onOpenAddAlarm}
            className="py-3 px-3 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-extrabold text-sm flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Alarme</span>
          </button>

          <button
            type="button"
            disabled={!nextUntakenDose}
            onClick={() => nextUntakenDose && onTriggerTestAlarm(nextUntakenDose)}
            className="py-3 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 disabled:opacity-50 text-amber-950 font-extrabold text-sm flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <BellRing className="w-4 h-4" />
            <span>Testar Alarme</span>
          </button>
        </div>

        {notifStatus === 'default' && (
          <button
            type="button"
            onClick={handleRequestNotifications}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Ativar notificações do celular na hora do remédio</span>
          </button>
        )}
      </section>

      {/* Segmented Sub-tabs */}
      <div
        role="tablist"
        aria-label="Seções de horários"
        className="grid grid-cols-3 gap-1.5 bg-slate-200/70 p-1 rounded-2xl"
      >
        {(
          [
            { id: 'hoje', label: 'Hoje' },
            { id: 'historico', label: 'Histórico' },
            { id: 'alarmes', label: `Alarmes (${schedules.length})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={subView === tab.id}
            onClick={() => setSubView(tab.id)}
            className={`py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              subView === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBVIEW 1: HOJE */}
      {subView === 'hoje' && (
        <div className="space-y-4">
          {pausedCyclesToday.map(({ schedule, cycle, med }) => {
            const pauseSpeakId = `pause-${schedule.id}`;
            return (
              <div
                key={pauseSpeakId}
                className={`rounded-2xl bg-pink-50 border border-pink-200 p-3.5 flex items-center gap-3 ${
                  speakingId === pauseSpeakId ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {med && <MedicinePackArt pack={med.pack} size="sm" />}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-pink-950">
                    🌸 {med?.name ?? 'Cartela'} — Dia de pausa ({cycle.dayInPhase} de {cycle.phaseLength})
                  </p>
                  <p className="text-xs text-pink-900/80 mt-0.5">
                    Hoje não precisa tomar comprimido. O alarme volta automaticamente na próxima cartela.
                  </p>
                </div>
                <SpeakButton
                  size="sm"
                  isSpeaking={speakingId === pauseSpeakId}
                  onClick={() =>
                    handleToggleSpeak(
                      pauseSpeakId,
                      `${med?.name ?? 'Sua cartela'}: hoje é dia de pausa, dia ${cycle.dayInPhase} de ${cycle.phaseLength}. Hoje não precisa tomar comprimido. O alarme volta automaticamente na próxima cartela.`
                    )
                  }
                  ariaLabel={`Ouvir aviso de pausa de ${med?.name ?? 'cartela'}`}
                />
              </div>
            );
          })}

          {dosesToday.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 space-y-3">
              <AlarmClock className="w-12 h-12 text-teal-600 mx-auto" />
              <p className="text-base font-extrabold text-slate-900">
                Nenhum alarme ativo para hoje
              </p>
              <p className="text-sm text-slate-600">
                Adicione o horário dos seus remédios para receber avisos com som e voz.
              </p>
              <button
                type="button"
                onClick={onOpenAddAlarm}
                className="px-5 py-3 rounded-xl bg-[#0D9488] text-white font-extrabold text-sm cursor-pointer"
              >
                Criar meu primeiro alarme
              </button>
            </div>
          ) : (
            periods.map((period) => {
              const periodDoses = dosesToday.filter((d) => d.period === period);
              if (periodDoses.length === 0) return null;
              const meta = getPeriodMeta(period);

              return (
                <section key={period} aria-label={meta.label} className="space-y-2.5">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-lg" aria-hidden="true">
                      {meta.emoji}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                      {meta.label}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">({meta.range})</span>
                  </div>

                  {periodDoses.map((dose) => {
                    const isTaken = dose.status === 'taken';
                    const isSkipped = dose.status === 'skipped';
                    const isLate = dose.status === 'late';
                    const isDueNow = dose.status === 'due_now';
                    const punctuality = dose.log
                      ? formatPunctualityLabel(dose.log.delayMinutes)
                      : null;

                    const doseSpeakId = `dose-${dose.key}`;

                    return (
                      <div
                        key={dose.key}
                        className={`rounded-2xl p-4 border-2 transition-all ${
                          isTaken
                            ? 'bg-emerald-50/70 border-emerald-200'
                            : isLate
                              ? 'bg-rose-50/80 border-rose-300'
                              : isDueNow
                                ? 'bg-amber-50/90 border-amber-400 shadow-sm'
                                : 'bg-white border-slate-100 shadow-xs'
                        } ${speakingId === doseSpeakId ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => dose.medication && onOpenMedicationBula(dose.medication.id)}
                            className="shrink-0 cursor-pointer"
                            title="Abrir bula deste remédio"
                          >
                            {dose.medication ? (
                              <MedicinePackArt pack={dose.medication.pack} size="sm" />
                            ) : (
                              <div className="w-14 h-11 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 font-extrabold">
                                💊
                              </div>
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1 text-xl font-extrabold text-slate-900">
                                <Clock className="w-4 h-4 text-teal-700" />
                                {dose.scheduledTime}
                              </span>

                              {isTaken && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  Tomado {dose.log?.takenTimeDisplay}
                                </span>
                              )}
                              {isLate && (
                                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-xs font-extrabold">
                                  Atrasado
                                </span>
                              )}
                              {isDueNow && (
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-extrabold animate-pulse">
                                  Hora agora!
                                </span>
                              )}
                              {isSkipped && (
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-400 text-white text-xs font-extrabold">
                                  Pulado
                                </span>
                              )}
                            </div>

                            <div className="flex items-start justify-between gap-2 mt-0.5">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-base font-extrabold text-slate-900 truncate">
                                  {dose.medication?.name ?? 'Medicamento'}
                                </h4>
                                <p className="text-xs font-semibold text-slate-600">{dose.dosage}</p>
                              </div>
                              <SpeakButton
                                size="sm"
                                isSpeaking={speakingId === doseSpeakId}
                                onClick={() => handleToggleSpeak(doseSpeakId, buildDoseSpokenText(dose))}
                                ariaLabel={`Ouvir dose de ${dose.medication?.name ?? 'medicamento'} às ${dose.scheduledTime}`}
                              />
                            </div>
                            {dose.notes && (
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {dose.notes}
                              </p>
                            )}
                            {isTaken && punctuality && (
                              <p
                                className={`text-xs font-extrabold mt-1 ${
                                  punctuality.isOnTime ? 'text-emerald-700' : 'text-amber-800'
                                }`}
                              >
                                {punctuality.label}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Big Accessible Action Row */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center gap-2">
                          {isTaken || isSkipped ? (
                            <button
                              type="button"
                              onClick={() => onUndoDose(dose)}
                              className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Desfazer marcação</span>
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => onMarkTaken(dose)}
                                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm inline-flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                                <span>TOMEI AGORA</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onMarkSkipped(dose)}
                                className="py-3 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Pular</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </section>
              );
            })
          )}
        </div>
      )}

      {/* SUBVIEW 2: HISTÓRICO (7-day adherence & exact timestamps) */}
      {subView === 'historico' && (
        <section aria-label="Histórico de adesão" className="space-y-4">
          <div
            className={`bg-white rounded-2xl p-4 shadow-xs border transition-all ${
              speakingId === 'horarios-historico-semana'
                ? 'border-blue-400 ring-2 ring-blue-200'
                : 'border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <CalendarDays className="w-5 h-5 text-[#0D9488] shrink-0" />
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Últimos 7 dias (Toque no dia para ver horários)
                </h3>
              </div>
              <SpeakButton
                size="sm"
                isSpeaking={speakingId === 'horarios-historico-semana'}
                onClick={() =>
                  handleToggleSpeak('horarios-historico-semana', buildLast7DaysSpokenSummary())
                }
                ariaLabel="Ouvir resumo de adesão dos últimos 7 dias"
              />
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {last7Days.map((day) => {
                const isSelected = day.dateStr === activeHistoryDateStr;
                const dotColor =
                  day.status === 'complete'
                    ? 'bg-emerald-500 text-white'
                    : day.status === 'partial'
                      ? 'bg-amber-400 text-amber-950'
                      : day.status === 'missed'
                        ? 'bg-rose-400 text-white'
                        : 'bg-slate-200 text-slate-500';

                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onClick={() => {
                      if (speakingId === 'horarios-historico-dia') onStopSpeaking();
                      setSelectedHistoryDateStr(day.dateStr);
                    }}
                    className={`flex flex-col items-center py-2 px-1 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0D9488] bg-teal-50/70'
                        : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {day.weekdayShort}
                    </span>
                    <span
                      className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${dotColor}`}
                    >
                      {day.status === 'complete' ? '✓' : day.dayNumber}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 mt-1">
                      {day.takenCount}/{day.totalScheduled}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Log Details */}
          <div
            className={`bg-white rounded-2xl p-4 shadow-xs border space-y-3 transition-all ${
              speakingId === 'horarios-historico-dia'
                ? 'border-blue-400 ring-2 ring-blue-200'
                : 'border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-extrabold text-slate-900">
                Registro do dia {formattedActiveHistoryDate}
              </h4>
              <SpeakButton
                size="sm"
                isSpeaking={speakingId === 'horarios-historico-dia'}
                onClick={() =>
                  handleToggleSpeak('horarios-historico-dia', buildSelectedDaySpokenSummary())
                }
                ariaLabel={`Ouvir registro de doses do dia ${formattedActiveHistoryDate}`}
              />
            </div>

            {selectedHistoryDoses.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhuma dose programada neste dia.</p>
            ) : (
              <div className="space-y-2.5">
                {selectedHistoryDoses.map((dose) => {
                  const punct = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
                  return (
                    <div
                      key={dose.key}
                      className="rounded-xl border border-slate-200 p-3 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-slate-900 truncate">
                          {dose.medication?.name ?? 'Medicamento'}
                        </p>
                        <p className="text-xs text-slate-600">
                          Previsto: <strong>{dose.scheduledTime}</strong>
                          {dose.log && dose.status === 'taken' && (
                            <>
                              {' '}
                              · Tomado às <strong>{dose.log.takenTimeDisplay}</strong>
                            </>
                          )}
                        </p>
                      </div>

                      {dose.status === 'taken' && punct ? (
                        <span
                          className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                            punct.isOnTime
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-amber-100 text-amber-950'
                          }`}
                        >
                          {punct.label}
                        </span>
                      ) : dose.status === 'skipped' ? (
                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-extrabold">
                          Pulado
                        </span>
                      ) : dose.status === 'upcoming' ? (
                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-extrabold">
                          Agendado
                        </span>
                      ) : dose.status === 'due_now' ? (
                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold">
                          Hora agora
                        </span>
                      ) : (
                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold">
                          Não registrado
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SUBVIEW 3: MEUS ALARMES */}
      {subView === 'alarmes' && (
        <section aria-label="Alarmes configurados" className="space-y-3">
          {schedules.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-sm font-bold text-slate-700">Você não tem alarmes salvos.</p>
            </div>
          ) : (
            schedules.map((sched) => {
              const med = medMap.get(sched.medicationId);
              const cycleLabel =
                sched.cycleMode === '24_4'
                  ? '24d + 4 pausa'
                  : sched.cycleMode === '21_7'
                    ? '21d + 7 pausa'
                    : 'Todos os dias';

              return (
                <div
                  key={sched.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {med && <MedicinePackArt pack={med.pack} size="sm" />}
                    <div className="min-w-0">
                      <p className="text-base font-extrabold text-slate-900 truncate">
                        {med?.name ?? 'Medicamento'}
                      </p>
                      <p className="text-xs font-bold text-teal-800">
                        {sched.times.join(' · ')} · {cycleLabel}
                      </p>
                      <p className="text-xs text-slate-500">{sched.dosage}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={sched.enabled}
                      aria-label={`Ativar ou pausar alarme de ${med?.name ?? 'medicamento'}`}
                      onClick={() => onToggleScheduleEnabled(sched.id)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                        sched.enabled ? 'bg-[#0D9488]' : 'bg-slate-300'
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
                      aria-label={`Excluir alarme de ${med?.name ?? 'medicamento'}`}
                      className="w-9 h-9 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      )}
    </div>
  );
}
