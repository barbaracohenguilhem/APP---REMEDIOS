'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { DoseLog, Medication, MedicationSchedule } from '@/types/medication';
import {
  formatPunctualityLabel,
  getDosesForDate,
  type DayAdherenceSummary,
} from '@/services/scheduleEngine';
import type { VoicePlaybackState } from '@/services/voiceEngine';
import { QuietListenButton } from './AudioPlayerBar';

interface HistorySheetProps {
  last7Days: DayAdherenceSummary[];
  initialDateStr?: string;
  schedules: MedicationSchedule[];
  doseLogs: DoseLog[];
  medications: Medication[];
  now: Date;
  playback: VoicePlaybackState;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onClose: () => void;
}

export function HistorySheet({
  last7Days,
  initialDateStr,
  schedules,
  doseLogs,
  medications,
  now,
  playback,
  onSpeak,
  onStopSpeaking,
  onClose,
}: HistorySheetProps) {
  const [selectedDateStr, setSelectedDateStr] = useState(
    initialDateStr || last7Days[last7Days.length - 1]?.dateStr || ''
  );

  const parts = selectedDateStr.split('-').map(Number);
  const targetDate =
    parts.length === 3 ? new Date(parts[0], parts[1] - 1, parts[2]) : now;
  const dayDoses = getDosesForDate(schedules, doseLogs, medications, targetDate, now);

  const buildSpokenDay = () => {
    const label = selectedDateStr.split('-').reverse().join('/');
    if (dayDoses.length === 0) {
      return `No dia ${label}, nenhuma dose estava programada.`;
    }
    const items = dayDoses
      .map((d) => {
        const name = d.medication?.name ?? 'Remédio';
        if (d.status === 'taken' && d.log) {
          const p = formatPunctualityLabel(d.log.delayMinutes);
          return `${name}, previsto às ${d.scheduledTime}, tomado às ${d.log.takenTimeDisplay}, ${p.label}`;
        }
        if (d.status === 'upcoming') return `${name}, agendado para ${d.scheduledTime}`;
        return `${name}, previsto às ${d.scheduledTime}, não registrado`;
      })
      .join('. ');
    return `Registro do dia ${label}. ${items}.`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-sheet-title"
      className="fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={() => {
        onStopSpeaking();
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[85dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 id="history-sheet-title" className="text-[20px] font-bold text-[#1C1917]">
              Histórico de horários
            </h2>
            <p className="text-[13px] text-[#78716C]">
              Toque em qualquer dia para ver se foi tomado certinho
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onStopSpeaking();
              onClose();
            }}
            aria-label="Fechar histórico"
            className="w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-day picker */}
        <div className="bg-white rounded-[22px] p-3.5 border border-black/[0.05] grid grid-cols-7 gap-1">
          {last7Days.map((day) => {
            const active = day.dateStr === selectedDateStr;
            const dotCls =
              day.status === 'complete'
                ? 'bg-[#146356] text-white'
                : day.status === 'partial'
                  ? 'bg-[#FEF3DD] text-[#B45309]'
                  : day.status === 'missed'
                    ? 'bg-[#FEECEF] text-[#BE123C]'
                    : 'bg-[#F3EFE8] text-[#A8A29E]';

            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => {
                  onStopSpeaking();
                  setSelectedDateStr(day.dateStr);
                }}
                className={`flex flex-col items-center py-1.5 rounded-xl transition-all cursor-pointer ${
                  active ? 'bg-[#E6F2EF]' : 'hover:bg-[#F6F4EF]'
                }`}
              >
                <span className="text-[11px] font-medium text-[#78716C]">
                  {day.weekdayShort.slice(0, 3)}
                </span>
                <span
                  className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${dotCls}`}
                >
                  {day.status === 'complete' ? <Check className="w-4 h-4 stroke-[2.6]" /> : day.dayNumber}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day detail list */}
        <div className="bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-bold text-[#1C1917]">
              Dia {selectedDateStr.split('-').reverse().join('/')}
            </h3>
            <QuietListenButton
              sectionId="history-day"
              playback={playback}
              onClick={() => {
                if (playback.sectionId === 'history-day' && playback.status !== 'idle') {
                  onStopSpeaking();
                } else {
                  onSpeak('history-day', buildSpokenDay());
                }
              }}
              ariaLabel="Ouvir resumo deste dia"
            />
          </div>

          {dayDoses.length === 0 ? (
            <p className="text-[14px] text-[#78716C] py-2">
              Nenhuma dose programada neste dia.
            </p>
          ) : (
            <div className="divide-y divide-black/[0.05]">
              {dayDoses.map((dose) => {
                const punct = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
                return (
                  <div key={dose.key} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-[#1C1917] truncate">
                        {dose.medication?.name ?? 'Medicamento'}
                      </p>
                      <p className="text-[13px] text-[#6B6560]">
                        Previsto {dose.scheduledTime}
                        {dose.status === 'taken' && dose.log && (
                          <> · Tomado às {dose.log.takenTimeDisplay}</>
                        )}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[12px] font-semibold px-3 py-1 rounded-full ${
                        dose.status === 'taken'
                          ? punct?.isOnTime
                            ? 'bg-[#E6F2EF] text-[#146356]'
                            : 'bg-[#FEF3DD] text-[#B45309]'
                          : dose.status === 'upcoming'
                            ? 'bg-[#F3EFE8] text-[#57534E]'
                            : 'bg-[#FEECEF] text-[#BE123C]'
                      }`}
                    >
                      {dose.status === 'taken'
                        ? punct?.isOnTime
                          ? 'Certinho ✓'
                          : punct?.label
                        : dose.status === 'upcoming'
                          ? 'Agendado'
                          : 'Não registrado'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
