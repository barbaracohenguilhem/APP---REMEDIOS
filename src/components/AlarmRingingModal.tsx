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
      className="fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-sm flex items-center justify-center p-5"
    >
      <div className="w-full max-w-[380px] bg-[#F6F4EF] rounded-[34px] p-6 shadow-2xl border border-white/60 relative animate-sheet-up">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar aviso"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-14 h-14 rounded-full bg-[#E6F2EF] text-[#146356] flex items-center justify-center animate-calm-breathe">
            <BellRing className="w-7 h-7" />
          </div>

          <p className="mt-4 text-[13px] font-semibold uppercase tracking-wide text-[#146356]">
            Hora do seu remédio · {dose.scheduledTime}
          </p>

          {med && (
            <div className="mt-4">
              <MedicationAvatar
                medication={med}
                photoOverride={photoOverride}
                size="lg"
                className="w-24 h-24 rounded-[28px]"
              />
            </div>
          )}

          <h2 id="alarm-ring-title" className="text-[26px] font-bold text-[#1C1917] mt-4">
            {med?.name ?? 'Seu Remédio'}
          </h2>
          <p className="text-[16px] font-semibold text-[#57534E] mt-1">{dose.dosage}</p>
          {dose.notes && (
            <p className="text-[13.5px] text-[#78716C] mt-1 max-w-[260px]">{dose.notes}</p>
          )}

          <button
            type="button"
            onClick={onReplayVoice}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#146356] font-semibold text-[13px] border border-black/[0.06] hover:bg-[#E6F2EF] cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Ouvir novamente</span>
          </button>

          <div className="w-full space-y-2.5 mt-6">
            <button
              type="button"
              onClick={onMarkTaken}
              className="w-full py-4 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-bold text-[16px] shadow-[0_8px_22px_rgba(20,99,86,0.28)] inline-flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Check className="w-5 h-5 stroke-[2.6]" />
              <span>Já tomei agora</span>
            </button>

            <button
              type="button"
              onClick={onSnooze}
              className="w-full py-3.5 rounded-full bg-white border border-black/10 hover:bg-[#EFECE6] text-[#1C1917] font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4.5 h-4.5 text-[#78716C]" />
              <span>Lembrar em 15 minutos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
