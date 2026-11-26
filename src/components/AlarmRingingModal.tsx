'use client';

import { BellRing, Check, Clock, Volume2, X } from 'lucide-react';
import type { ScheduledDoseInstance } from '@/services/scheduleEngine';
import { MedicationAvatar } from './MedicationAvatar';

interface AlarmRingingModalProps {
  dose: ScheduledDoseInstance;
  photoOverride?: string;
  onMarkTaken: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
  onReplayVoice: () => void;
}

export function AlarmRingingModal({
  dose,
  photoOverride,
  onMarkTaken,
  onSnooze,
  onDismiss,
  onReplayVoice,
}: AlarmRingingModalProps) {
  const med = dose.medication;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alarm-ring-title"
      className="fixed inset-0 z-50 bg-[#111827]/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
        <div className="w-full max-w-[390px] bg-white rounded-[32px] p-6 shadow-2xl border-4 border-[#047857] relative animate-sheet-up">
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Fechar aviso"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#F3F4F6] text-[#111827] inline-flex items-center justify-center cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

              <div className="flex flex-col items-center text-center pt-1">
                <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#047857] flex items-center justify-center animate-calm-breathe">
                  <BellRing className="w-9 h-9" />
                </div>

                <span className="mt-3 px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[15px] font-extrabold uppercase">
                  HORA DO REMÉDIO · {dose.scheduledTime}
                </span>

                {med && (
                  <div className="mt-4">
                    <MedicationAvatar
                      medication={med}
                      photoOverride={photoOverride}
                      size="lg"
                      className="w-24 h-24 rounded-[26px]"
                    />
                  </div>
                )}

                  <h2 id="alarm-ring-title" className="text-[28px] font-extrabold text-[#111827] mt-3">
                    {med?.name ?? 'Seu Remédio'}
                  </h2>
                  <p className="text-[18px] font-bold text-[#047857] mt-1">{dose.dosage}</p>
                  {dose.notes && (
            <p className="text-[15.5px] font-medium text-[#374151] mt-1">{dose.notes}</p>
                  )}

                  <button
                    type="button"
                    onClick={onReplayVoice}
                    className="mt-4 min-h-[46px] px-5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-[15px] inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Ouvir novamente</span>
                  </button>

                    <div className="w-full space-y-3 mt-6">
                      <button
                        type="button"
                        onClick={onMarkTaken}
                        className="w-full min-h-[60px] rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-extrabold text-[19px] shadow-lg inline-flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all cursor-pointer"
                      >
                        <Check className="w-7 h-7 stroke-[3]" />
                        <span>JÁ TOMEI AGORA</span>
                      </button>

                      <button
                        type="button"
                        onClick={onSnooze}
                        className="w-full min-h-[54px] rounded-2xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] font-extrabold text-[16.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Clock className="w-5 h-5" />
                        <span>Lembrar em 15 minutos</span>
                      </button>
                    </div>
                  </div>
              </div>
            </div>
            );
}
