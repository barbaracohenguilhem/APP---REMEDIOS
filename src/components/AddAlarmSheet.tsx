'use client';

import { useState } from 'react';
import { Clock, Plus, Trash2, X } from 'lucide-react';
import type { Medication, MedicationSchedule } from '@/types/medication';
import { MedicationAvatar } from './MedicationAvatar';

interface AddAlarmSheetProps {
  medications: Medication[];
  medicationPhotos: Record<string, string>;
  initialMedicationId: string;
  onSave: (schedule: Omit<MedicationSchedule, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const PRESETS = [
  { label: 'Manhã (08:00)', times: ['08:00'] },
  { label: 'Noite (21:00)', times: ['21:00'] },
  { label: '12 em 12h', times: ['08:00', '20:00'] },
  { label: '8 em 8h', times: ['07:00', '15:00', '23:00'] },
];

export function AddAlarmSheet({
  medications,
  medicationPhotos,
  initialMedicationId,
  onSave,
  onClose,
}: AddAlarmSheetProps) {
  const initial = medications.find((m) => m.id === initialMedicationId) ?? medications[0];
  const [selectedMedId, setSelectedMedId] = useState(initial?.id ?? '');
  const [dosage, setDosage] = useState(initial?.howToTake.defaultDosage ?? '1 comprimido');
  const [times, setTimes] = useState<string[]>(
    initial?.howToTake.defaultTimes?.length ? [...initial.howToTake.defaultTimes] : ['08:00']
  );
  const [cycleMode, setCycleMode] = useState<MedicationSchedule['cycleMode']>(
    initial?.category === 'anticoncepcional' ? '24_4' : 'daily'
  );
  const [notes, setNotes] = useState(initial?.howToTake.summary ?? '');

  const handlePickMed = (med: Medication) => {
    setSelectedMedId(med.id);
    setDosage(med.howToTake.defaultDosage);
    setTimes(med.howToTake.defaultTimes.length ? [...med.howToTake.defaultTimes] : ['08:00']);
    setCycleMode(med.category === 'anticoncepcional' ? '24_4' : 'daily');
    setNotes(med.howToTake.summary);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTimes = Array.from(
      new Set(times.map((t) => t.trim()).filter((t) => /^\d{2}:\d{2}$/.test(t)))
    ).sort();
    if (!selectedMedId || cleanTimes.length === 0) return;

    onSave({
      medicationId: selectedMedId,
      dosage: dosage.trim() || '1 comprimido',
      times: cleanTimes,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      cycleMode,
      enabled: true,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-alarm-sheet-title"
      className="fixed inset-0 z-50 bg-[#111827]/55 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F7F6F2] rounded-t-[30px] sm:rounded-[30px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
      >
        <div className="flex items-center justify-between">
            <h2 id="add-alarm-sheet-title" className="text-[22px] font-extrabold text-[#111827]">
              Criar alarme
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#111827] inline-flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {medications.map((med) => {
                const active = med.id === selectedMedId;
                return (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => handlePickMed(med)}
                            ? 'bg-[#111827] text-white border-[#111827]'
                            : 'bg-white text-[#111827] border-slate-300'
                        }`}
                >
                  <MedicationAvatar
                    medication={med}
                    photoOverride={medicationPhotos[med.id]}
                    size="sm"
                    className="w-8 h-8 rounded-xl"
                  />
                  <span className="text-[15px] font-extrabold">{med.name}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-[22px] p-4 border-2 border-slate-200 space-y-3">
            <p className="text-[15.5px] font-extrabold text-[#111827]">Escolha os horários</p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setTimes([...p.times])}
                  className="min-h-[46px] px-3 rounded-xl bg-[#F7F6F2] hover:bg-[#DCFCE7] border border-slate-300 text-[14.5px] font-extrabold text-[#111827] text-left cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="space-y-2.5 pt-1">
              {times.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1 min-h-[54px] flex items-center gap-3 rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 px-4">
                    <Clock className="w-5 h-5 text-[#047857]" />
                    <input
                      type="time"
                      aria-label={`Horário ${idx + 1}`}
                      value={t}
                      onChange={(e) =>
                        setTimes((prev) => prev.map((v, i) => (i === idx ? e.target.value : v)))
                      }
                      className="flex-1 bg-transparent text-[22px] font-extrabold text-[#111827] focus:outline-none"
                    />
                  </div>
                  {times.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setTimes((prev) => prev.filter((_, i) => i !== idx))}
                      aria-label="Remover horário"
                      className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#B91C1C] inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const next =
                    ['12:00', '18:00', '20:00', '08:00', '14:00'].find((c) => !times.includes(c)) ??
                    '15:00';
                  setTimes((prev) => [...prev, next]);
                }}
                className="w-full min-h-[46px] rounded-xl border-2 border-dashed border-[#047857]/50 text-[#047857] text-[14.5px] font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>Outro horário no dia</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[22px] p-4 border-2 border-slate-200 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="al-dose" className="block text-[14px] font-extrabold text-[#111827] mb-1">
                Dose
              </label>
              <input
                id="al-dose"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full min-h-[48px] px-3.5 rounded-xl bg-[#F7F6F2] border-2 border-slate-300 text-[15px] font-bold text-[#111827] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="al-cycle" className="block text-[14px] font-extrabold text-[#111827] mb-1">
                Frequência
              </label>
              <select
                id="al-cycle"
                value={cycleMode}
                onChange={(e) => setCycleMode(e.target.value as MedicationSchedule['cycleMode'])}
                className="w-full min-h-[48px] px-3 rounded-xl bg-[#F7F6F2] border-2 border-slate-300 text-[15px] font-bold text-[#111827] focus:outline-none"
              >
                <option value="daily">Todos os dias</option>
                <option value="24_4">24d + 4 pausa</option>
                <option value="21_7">21d + 7 pausa</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full min-h-[56px] rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-extrabold text-[17px] cursor-pointer"
          >
            Salvar alarme
          </button>
        </form>
      </div>
    </div>
  );
}
