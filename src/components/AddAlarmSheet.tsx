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
      className="fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[88dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-5"
      >
        <div className="flex items-center justify-between">
          <h2 id="add-alarm-sheet-title" className="text-[20px] font-bold text-[#1C1917]">
            Novo lembrete
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Med selector */}
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {medications.map((med) => {
              const active = med.id === selectedMedId;
              return (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => handlePickMed(med)}
                  className={`shrink-0 px-3.5 py-2.5 rounded-[20px] border flex items-center gap-2.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-white text-[#1C1917] border-black/[0.06]'
                  }`}
                >
                  <MedicationAvatar
                    medication={med}
                    photoOverride={medicationPhotos[med.id]}
                    size="sm"
                    className="w-8 h-8 rounded-xl"
                  />
                  <span className="text-[13.5px] font-semibold">{med.name}</span>
                </button>
              );
            })}
          </div>

          {/* Quick presets */}
          <div className="bg-white rounded-[24px] p-4 border border-black/[0.05] space-y-3">
            <p className="text-[13px] font-semibold text-[#57534E]">Horários</p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setTimes([...p.times])}
                  className="py-2.5 px-3 rounded-xl bg-[#F6F4EF] hover:bg-[#E6F2EF] text-[13px] font-semibold text-[#1C1917] text-left cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-1">
              {times.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2.5 rounded-2xl bg-[#F6F4EF] px-4 py-2.5">
                    <Clock className="w-4.5 h-4.5 text-[#146356]" />
                    <input
                      type="time"
                      aria-label={`Horário ${idx + 1}`}
                      value={t}
                      onChange={(e) =>
                        setTimes((prev) => prev.map((v, i) => (i === idx ? e.target.value : v)))
                      }
                      className="flex-1 bg-transparent text-[18px] font-bold text-[#1C1917] focus:outline-none"
                    />
                  </div>
                  {times.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setTimes((prev) => prev.filter((_, i) => i !== idx))}
                      aria-label="Remover horário"
                      className="w-10 h-10 rounded-full bg-[#FEECEF] text-[#BE123C] inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
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
                className="w-full py-2.5 rounded-xl border border-dashed border-[#146356]/35 text-[#146356] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Outro horário no dia</span>
              </button>
            </div>
          </div>

          {/* Dose & cycle */}
          <div className="bg-white rounded-[24px] p-4 border border-black/[0.05] grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="al-dose" className="block text-[12.5px] font-semibold text-[#57534E] mb-1">
                Dose
              </label>
              <input
                id="al-dose"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] font-semibold text-[#1C1917] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="al-cycle" className="block text-[12.5px] font-semibold text-[#57534E] mb-1">
                Frequência
              </label>
              <select
                id="al-cycle"
                value={cycleMode}
                onChange={(e) => setCycleMode(e.target.value as MedicationSchedule['cycleMode'])}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F6F4EF] text-[13.5px] font-semibold text-[#1C1917] focus:outline-none"
              >
                <option value="daily">Todos os dias</option>
                <option value="24_4">24d + 4 pausa</option>
                <option value="21_7">21d + 7 pausa</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#146356] hover:bg-[#0F4F45] text-white font-bold text-[15px] cursor-pointer"
          >
            Salvar lembrete
          </button>
        </form>
      </div>
    </div>
  );
}
