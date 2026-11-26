'use client';

import { useState } from 'react';
import { Check, Share2, X } from 'lucide-react';
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
  const displayDate = selectedDateStr.split('-').reverse().join('/');

  const buildSpokenDay = () => {
    if (dayDoses.length === 0) {
      return `No dia ${displayDate}, nenhum remédio estava marcado.`;
    }
    const items = dayDoses
      .map((d) => {
        const name = d.medication?.name ?? 'Remédio';
        if (d.status === 'taken' && d.log) {
          const p = formatPunctualityLabel(d.log.delayMinutes);
          return `${name}, previsto às ${d.scheduledTime}, tomado às ${d.log.takenTimeDisplay}, ${p.label}`;
        }
        if (d.status === 'upcoming') return `${name}, agendado para ${d.scheduledTime}`;
        return `${name}, previsto às ${d.scheduledTime}, ainda não registrado`;
      })
      .join('. ');
    return `Resumo do dia ${displayDate}. ${items}.`;
  };

  const buildWhatsAppShareUrl = () => {
    const lines = [
      `Resumo dos remédios (${displayDate}) — Meu Remédio:`,
      ...dayDoses.map((d) => {
        const name = d.medication?.name ?? 'Remédio';
        if (d.status === 'taken' && d.log) {
          return `✅ ${name} (${d.scheduledTime}) — Tomado às ${d.log.takenTimeDisplay}`;
        }
        if (d.status === 'upcoming') return `⏰ ${name} — Previsto às ${d.scheduledTime}`;
        return `⚠️ ${name} (${d.scheduledTime}) — Não registrado`;
      }),
    ];
    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-sheet-title"
      className="fixed inset-0 z-50 bg-[#111827]/55 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={() => {
        onStopSpeaking();
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[88dvh] overflow-y-auto bg-[#F7F6F2] rounded-t-[30px] sm:rounded-[30px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
              <h2 id="history-sheet-title" className="text-[22px] font-extrabold text-[#111827]">
                Tomei certinho?
              </h2>
                <p className="text-[14.5px] font-medium text-[#374151]">
                  Toque em um dia para ver os horários
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onStopSpeaking();
                  onClose();
                }}
                aria-label="Fechar histórico"
                className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#111827] inline-flex items-center justify-center cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
          </div>

            {/* High-contrast 7-day picker */}
            <div className="bg-white rounded-[22px] p-3.5 border-2 border-slate-200 grid grid-cols-7 gap-1">
              {last7Days.map((day) => {
                const active = day.dateStr === selectedDateStr;
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
                onClick={() => {
                  onStopSpeaking();
                  setSelectedDateStr(day.dateStr);
                }}
                  active ? 'bg-[#DCFCE7] ring-2 ring-[#047857]' : 'hover:bg-slate-100'
                }`}
              >
                <span className="text-[12px] font-bold text-[#374151]">
                  {day.weekdayShort.slice(0, 3)}
                </span>
                <span
                  className={`mt-1 w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-extrabold ${dotCls}`}
                >
                  {day.status === 'complete' ? <Check className="w-5 h-5 stroke-[3]" /> : day.dayNumber}
                </span>
              </button>
              );
          })}
            </div>

              {/* Day details */}
              <div className="bg-white rounded-[24px] p-4 border-2 border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[18px] font-extrabold text-[#111827]">Dia {displayDate}</h3>
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
                    <p className="text-[15.5px] font-medium text-[#374151] py-2">
                      Nenhum remédio marcado para este dia.
                    </p>
                    ) : (
                      <div className="divide-y divide-slate-200">
                        {dayDoses.map((dose) => {
                          const punct = dose.log ? formatPunctualityLabel(dose.log.delayMinutes) : null;
                          return (
                              <div
                                key={dose.key}
                                className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
                              >
                                <div className="min-w-0">
                                    <p className="text-[17px] font-extrabold text-[#111827] truncate">
                                      {dose.medication?.name ?? 'Medicamento'}
                                    </p>
                                      <p className="text-[14.5px] font-medium text-[#374151]">
                                        Previsto {dose.scheduledTime}
                                        {dose.status === 'taken' && dose.log && (
                          <> · Tomado às <strong>{dose.log.takenTimeDisplay}</strong></>
                                        )}
                                      </p>
                                    </div>
                                    <span
                                            ? punct?.isOnTime
                                                ? 'bg-[#DCFCE7] text-[#065F46]'
                                                : 'bg-[#FEF3C7] text-[#92400E]'
                                            : dose.status === 'upcoming'
                                                ? 'bg-[#EFF6FF] text-[#1E40AF]'
                                                : 'bg-[#FEE2E2] text-[#991B1B]'
                                          }`}
                    >
                      {dose.status === 'taken'
                        ? punct?.isOnTime
                          ? 'Certinho ✓'
                          : punct?.label
                        : dose.status === 'upcoming'
                          ? 'Agendado'
                          : 'Faltou'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 1-Tap Caregiver WhatsApp Share */}
        {dayDoses.length > 0 && (
          <a
            href={buildWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[54px] px-4 rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-extrabold text-[15.5px] inline-flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Enviar resumo no WhatsApp (Familiar)</span>
          </a>
        )}
      </div>
    </div>
  );
}
