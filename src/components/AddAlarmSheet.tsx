import { useState } from 'react';
import { Clock, Plus, Trash2, X } from 'lucide-react';
import type { Medication, MedicationSchedule } from '../types/medication';
import { MedicinePackArt } from './MedicinePackArt';

interface AddAlarmSheetProps {
  medications: Medication[];
  savedMedicationIds?: string[];
  initialMedicationId: string;
  onSave: (schedule: Omit<MedicationSchedule, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const TIME_PRESETS: { label: string; emoji: string; times: string[] }[] = [
  { label: '1x Manhã (08:00)', emoji: '🌅', times: ['08:00'] },
  { label: '1x Noite (21:00)', emoji: '🌙', times: ['21:00'] },
  { label: '2x ao dia (08h e 20h)', emoji: '🔄', times: ['08:00', '20:00'] },
  { label: 'De 8 em 8h', emoji: '⏱️', times: ['07:00', '15:00', '23:00'] },
];

export function AddAlarmSheet({
  medications,
  savedMedicationIds = [],
  initialMedicationId,
  onSave,
  onClose,
}: AddAlarmSheetProps) {
  const initialMed =
    medications.find((m) => m.id === initialMedicationId) ?? medications[0];

  const [selectedMedId, setSelectedMedId] = useState(initialMed?.id ?? '');
  const [dosage, setDosage] = useState(initialMed?.howToTake.defaultDosage ?? '1 comprimido');
  const [times, setTimes] = useState<string[]>(
    initialMed?.howToTake.defaultTimes?.length ? initialMed.howToTake.defaultTimes : ['08:00']
  );
  const [cycleMode, setCycleMode] = useState<MedicationSchedule['cycleMode']>(
    initialMed?.category === 'anticoncepcional' ? '24_4' : 'daily'
  );
  const [notes, setNotes] = useState(initialMed?.howToTake.summary ?? '');

  const handleSelectMed = (med: Medication) => {
    setSelectedMedId(med.id);
    setDosage(med.howToTake.defaultDosage);
    setTimes(med.howToTake.defaultTimes.length ? [...med.howToTake.defaultTimes] : ['08:00']);
    setCycleMode(med.category === 'anticoncepcional' ? '24_4' : 'daily');
    setNotes(med.howToTake.summary);
  };

  const handleTimeChange = (idx: number, value: string) => {
    setTimes((prev) => prev.map((t, i) => (i === idx ? value : t)));
  };

  const handleAddTimeSlot = () => {
    const candidates = ['12:00', '18:00', '20:00', '08:00', '14:00', '22:00', '06:00'];
    setTimes((prev) => {
      const next = candidates.find((c) => !prev.includes(c)) ?? '15:00';
      return [...prev, next];
    });
  };

  const handleRemoveTimeSlot = (idx: number) => {
    if (times.length <= 1) return;
    setTimes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validTimes = Array.from(
      new Set(times.map((t) => t.trim()).filter((t) => /^\d{2}:\d{2}$/.test(t)))
    ).sort();

    if (!selectedMedId || validTimes.length === 0) return;

    onSave({
      medicationId: selectedMedId,
      dosage: dosage.trim() || '1 comprimido',
      times: validTimes,
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
      aria-labelledby="add-alarm-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90dvh] overflow-y-auto shadow-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="add-alarm-title" className="text-xl font-extrabold text-slate-900">
            Criar Alarme de Remédio
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 inline-flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Pick Medicine visually */}
          <div>
            <label className="block text-sm font-extrabold text-slate-800 mb-2">
              1. Escolha o remédio
            </label>
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 no-scrollbar">
              {medications.map((med) => {
                const selected = med.id === selectedMedId;
                const isSaved = savedMedicationIds.includes(med.id);
                return (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => handleSelectMed(med)}
                    className={`shrink-0 w-32 p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-[#0D9488] bg-teal-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <MedicinePackArt pack={med.pack} size="sm" className="mx-auto mb-1.5" />
                    <p className="text-xs font-extrabold text-slate-900 truncate text-center">
                      {med.name}
                    </p>
                    {isSaved && (
                      <p className="text-[10px] font-bold text-teal-700 text-center mt-0.5">
                        Na sua lista
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Quick frequency presets */}
          <div>
            <span className="block text-sm font-extrabold text-slate-800 mb-2">
              2. Escolha os horários (ou toque para mudar)
            </span>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {TIME_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setTimes([...preset.times])}
                  className="px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-800 text-left transition-colors cursor-pointer"
                >
                  <span className="mr-1">{preset.emoji}</span>
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {times.map((time, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2">
                    <Clock className="w-5 h-5 text-[#0D9488]" />
                    <input
                      type="time"
                      aria-label={`Horário ${idx + 1}`}
                      value={time}
                      onChange={(e) => handleTimeChange(idx, e.target.value)}
                      required
                      className="flex-1 bg-transparent text-lg font-extrabold text-slate-900 focus:outline-none"
                    />
                  </div>
                  {times.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTimeSlot(idx)}
                      aria-label={`Remover horário ${idx + 1}`}
                      className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddTimeSlot}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-teal-300 text-teal-800 font-bold text-sm hover:bg-teal-50 inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar outro horário no dia</span>
              </button>
            </div>
          </div>

          {/* 3. Dosage & Cycle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="alarm-dosage" className="block text-sm font-extrabold text-slate-800 mb-1">
                3. Quanto tomar
              </label>
              <input
                id="alarm-dosage"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="Ex: 1 comprimido"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-900 focus:border-[#0D9488] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="alarm-cycle" className="block text-sm font-extrabold text-slate-800 mb-1">
                4. Tipo de uso
              </label>
              <select
                id="alarm-cycle"
                value={cycleMode}
                onChange={(e) => setCycleMode(e.target.value as MedicationSchedule['cycleMode'])}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:border-[#0D9488] focus:outline-none"
              >
                <option value="daily">Todos os dias</option>
                <option value="24_4">24 dias + 4 pausa</option>
                <option value="21_7">21 dias + 7 pausa</option>
              </select>
            </div>
          </div>

          {/* Optional note */}
          <div>
            <label htmlFor="alarm-notes" className="block text-sm font-extrabold text-slate-800 mb-1">
              Lembrete curto (opcional)
            </label>
            <input
              id="alarm-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Tomar com água após o jantar"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-900 focus:border-[#0D9488] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-extrabold text-base shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            Salvar Alarme
          </button>
        </form>
      </div>
    </div>
  );
}
