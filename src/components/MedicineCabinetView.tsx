import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import type { Medication } from '../types/medication';
import { MedicinePackArt } from './MedicinePackArt';
import { SpeakButton } from './SpeakButton';
import { getLowestGenericPrice } from '../services/pricing';

interface MedicineCabinetViewProps {
  medications: Medication[];
  activeMedicationId: string;
  selectedUf: string;
  onSelectMedication: (medId: string) => void;
  onRemoveMedication: (medId: string) => void;
  onOpenAdd: () => void;
  onSpeakText: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  speakingId: string | null;
}

export function MedicineCabinetView({
  medications,
  activeMedicationId,
  selectedUf,
  onSelectMedication,
  onRemoveMedication,
  onOpenAdd,
  onSpeakText,
  onStopSpeaking,
  speakingId,
}: MedicineCabinetViewProps) {
  const handleToggleCabinetIntro = () => {
    if (speakingId === 'cabinet-intro') {
      onStopSpeaking();
    } else {
      onSpeakText(
        'cabinet-intro',
        `Você tem ${medications.length} ${medications.length === 1 ? 'remédio salvo' : 'remédios salvos'}: ${medications.map((m) => m.name).join(', ')}. Toque em qualquer caixinha para abrir.`
      );
    }
  };

  return (
    <section aria-label="Meus Remédios" className="px-4 py-4 space-y-4 pb-12">
      <div
        className={`bg-white rounded-2xl p-4 shadow-sm border flex items-center justify-between gap-3 transition-all ${
          speakingId === 'cabinet-intro'
            ? 'border-blue-400 ring-2 ring-blue-200'
            : 'border-slate-100'
        }`}
      >
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Sua Caixinha de Remédios</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Toque em um remédio para ver a bula fácil, ouvir em voz alta ou comparar genéricos.
          </p>
        </div>
        <SpeakButton
          isSpeaking={speakingId === 'cabinet-intro'}
          onClick={handleToggleCabinetIntro}
          ariaLabel="Ouvir lista dos meus remédios"
        />
      </div>

      <div className="space-y-3">
        {medications.map((med) => {
          const isActive = med.id === activeMedicationId;
          const lowest = getLowestGenericPrice(med, selectedUf);

          return (
            <div
              key={med.id}
              className={`bg-white rounded-2xl p-3.5 shadow-sm border-2 transition-all ${
                isActive ? 'border-[#0D9488] ring-2 ring-teal-100' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectMedication(med.id)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                >
                  <MedicinePackArt pack={med.pack} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-base font-extrabold text-slate-900 truncate">
                        {med.name}
                      </h3>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold">
                          Aberto
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 truncate">{med.activeIngredient}</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1">{lowest.priceText}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </button>

                {medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveMedication(med.id)}
                    aria-label={`Remover ${med.name} da minha lista`}
                    className="w-9 h-9 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 inline-flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onOpenAdd}
        className="w-full py-4 px-5 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-extrabold text-base shadow-md flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all cursor-pointer"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
        <span>Adicionar outro remédio (Foto, Print ou Voz)</span>
      </button>
    </section>
  );
}
