import { BellRing, Check, Clock, Volume2, X } from 'lucide-react';
import type { ScheduledDoseInstance } from '../services/scheduleEngine';
import { MedicinePackArt } from './MedicinePackArt';

interface AlarmRingingModalProps {
  dose: ScheduledDoseInstance;
  onMarkTaken: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
  onReplayVoice: () => void;
}

export function AlarmRingingModal({
  dose,
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
      aria-labelledby="alarm-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-4 border-teal-500 animate-in fade-in zoom-in-95 duration-200 relative">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar aviso de alarme"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 inline-flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-3 animate-bounce">
            <BellRing className="w-9 h-9" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-sm font-extrabold">
            <Clock className="w-4 h-4" />
            HORA DO REMÉDIO · {dose.scheduledTime}
          </span>

          <h2 id="alarm-modal-title" className="text-2xl font-extrabold text-slate-900 mt-3">
            {med?.name ?? 'Seu Remédio'}
          </h2>
          <p className="text-base font-bold text-teal-800 mt-1">{dose.dosage}</p>
          {dose.notes && <p className="text-sm text-slate-600 mt-1">{dose.notes}</p>}

          {med && (
            <div className="my-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <MedicinePackArt pack={med.pack} size="lg" />
            </div>
          )}

          <button
            type="button"
            onClick={onReplayVoice}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-800 font-bold text-sm hover:bg-blue-100 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Ouvir aviso novamente</span>
          </button>

          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={onMarkTaken}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              <span>JÁ TOMEI AGORA</span>
            </button>

            <button
              type="button"
              onClick={onSnooze}
              className="w-full py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Clock className="w-5 h-5" />
              <span>Lembrar daqui 15 minutos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
