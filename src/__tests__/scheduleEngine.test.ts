import { describe, expect, it } from 'vitest';
import { MEDICATIONS_CATALOG } from '../data/medications';
import type { DoseLog, MedicationSchedule } from '../types/medication';
import {
  buildLast7DaysAdherence,
  computeDelayMinutes,
  findDueAlarmNow,
  formatLocalDateStr,
  formatPunctualityLabel,
  getDosesForDate,
  getPeriodForTime,
  getScheduleCycleInfo,
} from '../services/scheduleEngine';

describe('scheduleEngine service', () => {
  it('maps clock boundaries to Manhã, Tarde, and Noite correctly', () => {
    expect(getPeriodForTime('04:59')).toBe('noite');
    expect(getPeriodForTime('05:00')).toBe('manha');
    expect(getPeriodForTime('11:59')).toBe('manha');
    expect(getPeriodForTime('12:00')).toBe('tarde');
    expect(getPeriodForTime('17:59')).toBe('tarde');
    expect(getPeriodForTime('18:00')).toBe('noite');
    expect(getPeriodForTime('00:00')).toBe('noite');
  });

  it('formats punctuality labels cleanly at boundary thresholds', () => {
    expect(formatPunctualityLabel(0)).toEqual({ label: 'No horário certinho ✓', isOnTime: true });
    expect(formatPunctualityLabel(15)).toEqual({ label: 'No horário certinho ✓', isOnTime: true });
    expect(formatPunctualityLabel(-15)).toEqual({ label: 'No horário certinho ✓', isOnTime: true });
    expect(formatPunctualityLabel(16)).toEqual({ label: '16 min depois', isOnTime: false });
    expect(formatPunctualityLabel(75)).toEqual({ label: '1h15min depois', isOnTime: false });
    expect(formatPunctualityLabel(-30)).toEqual({ label: '30 min antes', isOnTime: true });
  });

  it('classifies doses as late, due_now, upcoming, taken, and deduplicates times', () => {
    const now = new Date(2026, 4, 10, 12, 0); // May 10, 2026 12:00
    const todayStr = formatLocalDateStr(now);
    const createdAt = new Date(2026, 4, 8, 8, 0).toISOString();

    const schedules: MedicationSchedule[] = [
      {
        id: 's1',
        medicationId: 'losartana',
        dosage: '1 comp',
        times: ['08:00', '08:00', '12:10', '21:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: 'daily',
        enabled: true,
        createdAt,
      },
      {
        id: 's-disabled',
        medicationId: 'iumi',
        dosage: '1 comp',
        times: ['09:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: 'daily',
        enabled: false,
        createdAt,
      },
    ];

    const logs: DoseLog[] = [];
    const doses = getDosesForDate(schedules, logs, MEDICATIONS_CATALOG, now, now);

    expect(doses).toHaveLength(3); // duplicate 08:00 removed, disabled schedule ignored
    expect(doses[0].scheduledTime).toBe('08:00');
    expect(doses[0].status).toBe('late');
    expect(doses[1].scheduledTime).toBe('12:10');
    expect(doses[1].status).toBe('due_now');
    expect(doses[2].scheduledTime).toBe('21:00');
    expect(doses[2].status).toBe('upcoming');

    // Mark 08:00 as taken
    const takenLog: DoseLog = {
      id: 'l1',
      scheduleId: 's1',
      medicationId: 'losartana',
      dateStr: todayStr,
      scheduledTime: '08:00',
      status: 'taken',
      actionTimestamp: new Date(2026, 4, 10, 8, 4).toISOString(),
      takenTimeDisplay: '08:04',
      delayMinutes: 4,
    };
    const updated = getDosesForDate(schedules, [takenLog], MEDICATIONS_CATALOG, now, now);
    expect(updated[0].status).toBe('taken');
  });

  it('does not show fake missed days before a schedule was created', () => {
    const now = new Date(2026, 4, 10, 10, 0);
    const yesterday = new Date(2026, 4, 9, 8, 0);
    const yesterdayStr = formatLocalDateStr(yesterday);

    const schedules: MedicationSchedule[] = [
      {
        id: 's1',
        medicationId: 'iumi',
        dosage: '1 comp',
        times: ['21:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: '24_4',
        enabled: true,
        createdAt: yesterday.toISOString(),
      },
    ];

    const logs: DoseLog[] = [
      {
        id: 'l1',
        scheduleId: 's1',
        medicationId: 'iumi',
        dateStr: yesterdayStr,
        scheduledTime: '21:00',
        status: 'taken',
        actionTimestamp: new Date(2026, 4, 9, 21, 1).toISOString(),
        takenTimeDisplay: '21:01',
        delayMinutes: 1,
      },
    ];

    const days = buildLast7DaysAdherence(schedules, logs, MEDICATIONS_CATALOG, now);
    expect(days).toHaveLength(7);
    // First 5 days (before yesterday) should be 'none', not 'missed'
    for (let i = 0; i < 5; i++) {
      expect(days[i].status).toBe('none');
      expect(days[i].totalScheduled).toBe(0);
    }
    // Yesterday should be 'complete'
    expect(days[5].status).toBe('complete');
    // Today (with upcoming 21:00 dose) should be 'partial' (not 'missed')
    expect(days[6].isToday).toBe(true);
    expect(days[6].status).toBe('partial');
  });

  it('triggers alarms at exact scheduled minute and respects snooze/dismiss', () => {
    const now = new Date(2026, 4, 10, 21, 0, 0);
    const createdAt = new Date(2026, 4, 9, 8, 0).toISOString();
    const schedules: MedicationSchedule[] = [
      {
        id: 's-iumi',
        medicationId: 'iumi',
        dosage: '1 comp',
        times: ['21:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        cycleMode: '24_4',
        enabled: true,
        createdAt,
      },
    ];

    const doses = getDosesForDate(schedules, [], MEDICATIONS_CATALOG, now, now);
    const dismissed = new Set<string>();
    const snoozed: Record<string, number> = {};

    // Rings at 21:00
    expect(findDueAlarmNow(doses, now, dismissed, snoozed)?.scheduleId).toBe('s-iumi');

    // Snoozed for 15 minutes -> does not ring at 21:05
    snoozed[doses[0].key] = now.getTime() + 15 * 60 * 1000;
    const at2105 = new Date(2026, 4, 10, 21, 5, 0);
    expect(findDueAlarmNow(doses, at2105, dismissed, snoozed)).toBeNull();

    // Rings again at 21:15 when snooze expires
    const at2115 = new Date(2026, 4, 10, 21, 15, 0);
    expect(findDueAlarmNow(doses, at2115, dismissed, snoozed)?.scheduleId).toBe('s-iumi');

    // Once dismissed, does not ring
    dismissed.add(doses[0].key);
    expect(findDueAlarmNow(doses, at2115, dismissed, snoozed)).toBeNull();

    // Does not re-trigger while the same dose is already actively ringing
    const freshDismissed = new Set<string>();
    expect(findDueAlarmNow(doses, now, freshDismissed, {}, doses[0].key)).toBeNull();
  });

  it('computes midnight-crossing delays accurately instead of ±23h50m', () => {
    // Scheduled 23:55, taken at 00:05 next day -> +10 min late (still on time!)
    expect(computeDelayMinutes('23:55', new Date(2026, 4, 11, 0, 5))).toBe(10);
    expect(computeDelayMinutes('23:55', new Date(2026, 4, 11, 0, 5), '2026-05-10')).toBe(10);
    expect(formatPunctualityLabel(10).isOnTime).toBe(true);

    // Scheduled 00:05, taken at 23:55 previous night -> -10 min early (still on time!)
    expect(computeDelayMinutes('00:05', new Date(2026, 4, 10, 23, 55))).toBe(-10);
    expect(computeDelayMinutes('00:05', new Date(2026, 4, 11, 0, 20), '2026-05-11')).toBe(15);
  });

  it('respects 24+4 and 21+7 contraceptive pause days in getDosesForDate and getScheduleCycleInfo', () => {
    const sched24: MedicationSchedule = {
      id: 's-iumi-cycle',
      medicationId: 'iumi',
      dosage: '1 comp',
      times: ['21:00'],
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      cycleMode: '24_4',
      enabled: true,
      createdAt: new Date(2026, 4, 1, 8, 0).toISOString(), // Day 1 = May 1
    };

    // Day 24 (May 24): active pill day
    const day24 = new Date(2026, 4, 24, 12, 0);
    expect(getScheduleCycleInfo(sched24, day24)).toMatchObject({ isPauseDay: false, dayInPhase: 24 });
    expect(getDosesForDate([sched24], [], MEDICATIONS_CATALOG, day24, day24)).toHaveLength(1);

    // Day 25 (May 25): Pause day 1 of 4 -> no active dose scheduled
    const day25 = new Date(2026, 4, 25, 12, 0);
    expect(getScheduleCycleInfo(sched24, day25)).toMatchObject({ isPauseDay: true, dayInPhase: 1, phaseLength: 4 });
    expect(getDosesForDate([sched24], [], MEDICATIONS_CATALOG, day25, day25)).toHaveLength(0);

    // Day 28 (May 28): Pause day 4 of 4 -> no active dose scheduled
    const day28 = new Date(2026, 4, 28, 12, 0);
    expect(getScheduleCycleInfo(sched24, day28)).toMatchObject({ isPauseDay: true, dayInPhase: 4 });
    expect(getDosesForDate([sched24], [], MEDICATIONS_CATALOG, day28, day28)).toHaveLength(0);

    // Day 29 (May 29): New pack day 1 -> active pill resumes
    const day29 = new Date(2026, 4, 29, 12, 0);
    expect(getScheduleCycleInfo(sched24, day29)).toMatchObject({ isPauseDay: false, dayInPhase: 1 });
    expect(getDosesForDate([sched24], [], MEDICATIONS_CATALOG, day29, day29)).toHaveLength(1);
  });
});
