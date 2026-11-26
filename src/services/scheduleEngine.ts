import type { DoseLog, Medication, MedicationSchedule } from '../types/medication';

export type DayPeriod = 'manha' | 'tarde' | 'noite';

export type DoseDisplayStatus = 'taken' | 'skipped' | 'late' | 'due_now' | 'upcoming';

export interface ScheduledDoseInstance {
  key: string; // `${scheduleId}__${dateStr}__${scheduledTime}`
  scheduleId: string;
  medicationId: string;
  medication?: Medication;
  dosage: string;
  dateStr: string;
  scheduledTime: string; // HH:MM
  period: DayPeriod;
  status: DoseDisplayStatus;
  log?: DoseLog;
  minutesDeltaFromNow: number; // negative = past scheduled time
  notes?: string;
}

export interface DayAdherenceSummary {
  dateStr: string;
  weekdayShort: string;
  dayNumber: number;
  totalScheduled: number;
  takenCount: number;
  onTimeCount: number;
  skippedCount: number;
  isToday: boolean;
  status: 'complete' | 'partial' | 'missed' | 'none' | 'future';
}

export function formatLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatTimeHHMM(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export function timeToMinutes(hhmm: string): number {
  const [hStr, mStr] = hhmm.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return 0;
  return h * 60 + m;
}

export function getPeriodForTime(hhmm: string): DayPeriod {
  const mins = timeToMinutes(hhmm);
  if (mins >= 300 && mins < 720) return 'manha'; // 05:00 - 11:59
  if (mins >= 720 && mins < 1080) return 'tarde'; // 12:00 - 17:59
  return 'noite'; // 18:00 - 04:59
}

export function getPeriodMeta(period: DayPeriod): { label: string; emoji: string; range: string } {
  switch (period) {
    case 'manha':
      return { label: 'Manhã', emoji: '🌅', range: '05h às 11h59' };
    case 'tarde':
      return { label: 'Tarde', emoji: '☀️', range: '12h às 17h59' };
    case 'noite':
      return { label: 'Noite', emoji: '🌙', range: '18h em diante' };
  }
}

export interface ScheduleCycleInfo {
  isPauseDay: boolean;
  dayInPhase: number;
  phaseLength: number;
  activeDays: number;
  pauseDays: number;
}

export function getScheduleCycleInfo(
  schedule: MedicationSchedule,
  targetDate: Date
): ScheduleCycleInfo | null {
  if (schedule.cycleMode === 'daily') return null;
  const createdDate = new Date(schedule.createdAt);
  if (Number.isNaN(createdDate.getTime())) return null;

  const startUtc = Date.UTC(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate()
  );
  const targetUtc = Date.UTC(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const daysDiff = Math.round((targetUtc - startUtc) / 86_400_000);
  if (daysDiff < 0) return null;

  const activeDays = schedule.cycleMode === '24_4' ? 24 : 21;
  const pauseDays = schedule.cycleMode === '24_4' ? 4 : 7;
  const cycleLen = activeDays + pauseDays;
  const pos = daysDiff % cycleLen;

  if (pos < activeDays) {
    return {
      isPauseDay: false,
      dayInPhase: pos + 1,
      phaseLength: activeDays,
      activeDays,
      pauseDays,
    };
  }

  return {
    isPauseDay: true,
    dayInPhase: pos - activeDays + 1,
    phaseLength: pauseDays,
    activeDays,
    pauseDays,
  };
}

export function computeDelayMinutes(
  scheduledTime: string,
  actualDate: Date,
  scheduledDateStr?: string
): number {
  const [hStr, mStr] = scheduledTime.split(':');
  const schedH = Number(hStr);
  const schedM = Number(mStr);

  if (scheduledDateStr && Number.isFinite(schedH) && Number.isFinite(schedM)) {
    const parts = scheduledDateStr.split('-').map(Number);
    if (parts.length === 3 && parts.every(Number.isFinite)) {
      const scheduledDate = new Date(parts[0], parts[1] - 1, parts[2], schedH, schedM, 0, 0);
      return Math.round((actualDate.getTime() - scheduledDate.getTime()) / 60_000);
    }
  }

  const scheduledMins = timeToMinutes(scheduledTime);
  const actualMins = actualDate.getHours() * 60 + actualDate.getMinutes();
  let diff = actualMins - scheduledMins;
  // Handle midnight wrap-around (e.g., scheduled 23:55 taken at 00:05 = +10 min)
  if (diff < -720) diff += 1440;
  else if (diff > 720) diff -= 1440;
  return diff;
}

export function formatPunctualityLabel(delayMinutes: number): {
  label: string;
  isOnTime: boolean;
} {
  if (Math.abs(delayMinutes) <= 15) {
    return { label: 'No horário certinho ✓', isOnTime: true };
  }
  if (delayMinutes > 15) {
    const hrs = Math.floor(delayMinutes / 60);
    const mins = delayMinutes % 60;
    const duration = hrs > 0 ? `${hrs}h${mins > 0 ? `${mins}min` : ''}` : `${mins} min`;
    return { label: `${duration} depois`, isOnTime: false };
  }
  const absMins = Math.abs(delayMinutes);
  const hrs = Math.floor(absMins / 60);
  const mins = absMins % 60;
  const duration = hrs > 0 ? `${hrs}h${mins > 0 ? `${mins}min` : ''}` : `${mins} min`;
  return { label: `${duration} antes`, isOnTime: true };
}

export function getDosesForDate(
  schedules: MedicationSchedule[],
  logs: DoseLog[],
  medications: Medication[],
  targetDate: Date,
  now: Date = new Date()
): ScheduledDoseInstance[] {
  const dateStr = formatLocalDateStr(targetDate);
  const todayStr = formatLocalDateStr(now);
  const dayOfWeek = targetDate.getDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const medMap = new Map(medications.map((m) => [m.id, m]));

  const instances: ScheduledDoseInstance[] = [];

  for (const schedule of schedules) {
    if (!schedule.enabled) continue;
    if (schedule.daysOfWeek.length > 0 && !schedule.daysOfWeek.includes(dayOfWeek)) {
      continue;
    }

    // Do not count dates strictly before the schedule was created unless a log exists for that date
    const createdDate = new Date(schedule.createdAt);
    const createdDateStr = Number.isNaN(createdDate.getTime())
      ? null
      : formatLocalDateStr(createdDate);
    const hasLogOnDate = logs.some(
      (l) => l.scheduleId === schedule.id && l.dateStr === dateStr
    );
    if (createdDateStr && dateStr < createdDateStr && !hasLogOnDate) {
      continue;
    }

    // Respect contraceptive/cycle pause days (24+4 or 21+7) unless explicitly logged
    const cycleInfo = getScheduleCycleInfo(schedule, targetDate);
    if (cycleInfo?.isPauseDay && !hasLogOnDate) {
      continue;
    }

    const uniqueTimes = Array.from(new Set(schedule.times));
    for (const scheduledTime of uniqueTimes) {
      const log = logs.find(
        (l) =>
          l.scheduleId === schedule.id &&
          l.dateStr === dateStr &&
          l.scheduledTime === scheduledTime
      );

      const schedMins = timeToMinutes(scheduledTime);
      const minutesDeltaFromNow = schedMins - nowMinutes;

      let status: DoseDisplayStatus = 'upcoming';
      if (log?.status === 'taken') {
        status = 'taken';
      } else if (log?.status === 'skipped') {
        status = 'skipped';
      } else if (dateStr < todayStr) {
        status = 'late';
      } else if (dateStr === todayStr) {
        if (minutesDeltaFromNow < -15) {
          status = 'late';
        } else if (minutesDeltaFromNow <= 15) {
          status = 'due_now';
        } else {
          status = 'upcoming';
        }
      }

      instances.push({
        key: `${schedule.id}__${dateStr}__${scheduledTime}`,
        scheduleId: schedule.id,
        medicationId: schedule.medicationId,
        medication: medMap.get(schedule.medicationId),
        dosage: schedule.dosage,
        dateStr,
        scheduledTime,
        period: getPeriodForTime(scheduledTime),
        status,
        log,
        minutesDeltaFromNow,
        notes: schedule.notes,
      });
    }
  }

  return instances.sort((a, b) => timeToMinutes(a.scheduledTime) - timeToMinutes(b.scheduledTime));
}

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function buildLast7DaysAdherence(
  schedules: MedicationSchedule[],
  logs: DoseLog[],
  medications: Medication[],
  now: Date = new Date()
): DayAdherenceSummary[] {
  const result: DayAdherenceSummary[] = [];
  const todayStr = formatLocalDateStr(now);

  for (let offset = -6; offset <= 0; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dateStr = formatLocalDateStr(d);
    const doses = getDosesForDate(schedules, logs, medications, d, now);

    const totalScheduled = doses.length;
    const taken = doses.filter((item) => item.status === 'taken');
    const skipped = doses.filter((item) => item.status === 'skipped');
    const onTimeCount = taken.filter((item) => Math.abs(item.log?.delayMinutes ?? 0) <= 15).length;

    let status: DayAdherenceSummary['status'] = 'none';
    if (totalScheduled === 0) {
      status = 'none';
    } else if (taken.length === totalScheduled) {
      status = 'complete';
    } else if (taken.length > 0) {
      status = 'partial';
    } else if (dateStr === todayStr && doses.some((item) => item.status === 'upcoming' || item.status === 'due_now')) {
      status = 'partial';
    } else {
      status = 'missed';
    }

    result.push({
      dateStr,
      weekdayShort: WEEKDAYS_PT[d.getDay()],
      dayNumber: d.getDate(),
      totalScheduled,
      takenCount: taken.length,
      onTimeCount,
      skippedCount: skipped.length,
      isToday: dateStr === todayStr,
      status,
    });
  }

  return result;
}

/**
 * Finds the next untaken dose whose exact clock minute matches `now` (and isn't already dismissed/snoozed).
 */
export function findDueAlarmNow(
  dosesToday: ScheduledDoseInstance[],
  now: Date,
  dismissedKeys: Set<string>,
  snoozedUntilMap: Record<string, number>,
  activeRingingKey: string | null = null
): ScheduledDoseInstance | null {
  const currentHHMM = formatTimeHHMM(now);
  const nowMs = now.getTime();

  for (const dose of dosesToday) {
    if (dose.status === 'taken' || dose.status === 'skipped') continue;
    if (dismissedKeys.has(dose.key)) continue;
    if (activeRingingKey && dose.key === activeRingingKey) continue;

    const snoozedUntil = snoozedUntilMap[dose.key];
    if (snoozedUntil) {
      if (nowMs >= snoozedUntil) {
        return dose;
      }
      continue;
    }

    if (dose.scheduledTime === currentHHMM) {
      return dose;
    }
  }

  return null;
}
