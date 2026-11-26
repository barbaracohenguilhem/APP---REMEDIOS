import {
  AlarmClock,
  AlertTriangle,
  ArrowLeftRight,
  Ban,
  CheckCircle2,
  ChevronRight,
  Info,
  Square,
  Volume2,
} from 'lucide-react';
import type { Medication } from '../types/medication';
import { MedicinePackArt } from '../components/MedicinePackArt';
import { BulaIcon } from '../components/BulaIcons';
import { SpeakButton } from '../components/SpeakButton';
import { getLowestGenericPrice } from '../services/pricing';

interface EntenderViewProps {
  medication: Medication;
  selectedUf: string;
  speakingId: string | null;
  onSpeakAll: () => void;
  onSpeakSection: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onOpenComparar: () => void;
  onOpenAddAlarm: () => void;
  savedCount: number;
  onOpenCabinet: () => void;
}

export function EntenderView({
  medication,
  selectedUf,
  speakingId,
  onSpeakAll,
  onSpeakSection,
  onStopSpeaking,
  onOpenComparar,
  onOpenAddAlarm,
  savedCount,
  onOpenCabinet,
}: EntenderViewProps) {
  const lowestGeneric = getLowestGenericPrice(medication, selectedUf);
  const isReadingAll = speakingId !== null && speakingId.startsWith('all-');

  const handleToggleSection = (sectionId: string, text: string) => {
    if (speakingId === sectionId) {
      onStopSpeaking();
    } else {
      onSpeakSection(sectionId, text);
    }
  };

  return (
    <div className="px-4 py-3.5 space-y-3.5 pb-12">
      {/* Hero Medicine Card (Matches approved visual mockup) */}
      <section
        aria-label={`Resumo de ${medication.name}`}
        className={`bg-white rounded-2xl p-4 shadow-[0_2px_14px_rgba(15,23,42,0.06)] border transition-all ${
          speakingId === 'all-intro' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <MedicinePackArt pack={medication.pack} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-[26px] font-extrabold text-[#1E293B] leading-tight tracking-tight">
                {medication.name}
              </h2>
              {savedCount > 1 && (
                <button
                  type="button"
                  onClick={onOpenCabinet}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Trocar ({savedCount})
                </button>
              )}
            </div>
            <p className="text-[14px] text-slate-600 leading-snug mt-0.5 font-medium">
              {medication.activeIngredient}
            </p>
            <p className="text-xs text-slate-500 mt-1">{medication.purposeSimple}</p>
          </div>
        </div>

        {/* Prominent Royal Blue "OUVIR TUDO EM VOZ ALTA" pill button */}
        <button
          type="button"
          onClick={isReadingAll ? onStopSpeaking : onSpeakAll}
          className={`mt-4 w-full py-3.5 px-4 rounded-full font-extrabold text-[13px] min-[360px]:text-[15px] tracking-wide whitespace-nowrap shadow-sm flex items-center justify-center gap-2 min-[360px]:gap-2.5 active:scale-[0.99] transition-all cursor-pointer ${
            isReadingAll
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
          }`}
        >
          {isReadingAll ? (
            <>
              <Square className="w-5 h-5 fill-current shrink-0" />
              <span>PARAR LEITURA EM VOZ ALTA</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 stroke-[2.5] shrink-0" />
              <span>OUVIR TUDO EM VOZ ALTA</span>
            </>
          )}
        </button>
      </section>

      {/* Card 1: COMO TOMAR (Green left-bordered card) */}
      <section
        aria-label="Como tomar"
        className={`rounded-2xl bg-[#E8F8F0] border-l-[7px] border-[#059669] p-4 shadow-xs transition-all ${
          speakingId === 'how-to-take' || speakingId === 'all-how'
            ? 'ring-2 ring-blue-500'
            : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#059669] stroke-[2.4]" />
            <h3 className="text-[16px] font-extrabold tracking-wide text-[#065F46] uppercase">
              COMO TOMAR
            </h3>
          </div>
          <SpeakButton
            isSpeaking={speakingId === 'how-to-take' || speakingId === 'all-how'}
            onClick={() => handleToggleSection('how-to-take', medication.howToTake.spokenScript)}
            ariaLabel="Ouvir como tomar"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {medication.howToTake.items.map((item, idx) => (
            <button
              key={`${item.shortLabel}-${idx}`}
              type="button"
              onClick={() =>
                handleToggleSection(`how-item-${idx}`, `${item.shortLabel}. ${item.spokenDetail}`)
              }
              title={`Toque para ouvir: ${item.spokenDetail}`}
              className={`flex flex-col items-center text-center p-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
                speakingId === `how-item-${idx}`
                  ? 'bg-white/95 ring-2 ring-blue-500 shadow-xs'
                  : 'hover:bg-white/60'
              }`}
            >
              <BulaIcon type={item.icon} size={50} />
              <span className="mt-1.5 text-[13px] font-extrabold text-slate-900 leading-tight">
                {item.shortLabel}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-[15px] font-medium text-slate-800 leading-snug">
          {medication.howToTake.summary}
        </p>
      </section>

      {/* Card 2: O QUE NÃO PODE (Red left-bordered card) */}
      <section
        aria-label="O que não pode"
        className={`rounded-2xl bg-[#FDECEC] border-l-[7px] border-[#DC2626] p-4 shadow-xs transition-all ${
          speakingId === 'what-not' || speakingId === 'all-not'
            ? 'ring-2 ring-blue-500'
            : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Ban className="w-6 h-6 text-[#DC2626] stroke-[2.4]" />
            <h3 className="text-[16px] font-extrabold tracking-wide text-[#991B1B] uppercase">
              O QUE NÃO PODE
            </h3>
          </div>
          <SpeakButton
            isSpeaking={speakingId === 'what-not' || speakingId === 'all-not'}
            onClick={() => handleToggleSection('what-not', medication.whatNotToDo.spokenScript)}
            ariaLabel="Ouvir o que não pode fazer"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {medication.whatNotToDo.items.map((item, idx) => (
            <button
              key={`${item.shortLabel}-${idx}`}
              type="button"
              onClick={() =>
                handleToggleSection(`not-item-${idx}`, `Atenção: ${item.shortLabel}. ${item.spokenDetail}`)
              }
              title={`Toque para ouvir: ${item.spokenDetail}`}
              className={`flex flex-col items-center text-center p-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
                speakingId === `not-item-${idx}`
                  ? 'bg-white/95 ring-2 ring-blue-500 shadow-xs'
                  : 'hover:bg-white/60'
              }`}
            >
              <BulaIcon type={item.icon} size={50} />
              <span className="mt-1.5 text-[13px] font-extrabold text-slate-900 leading-tight">
                {item.shortLabel}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-[15px] font-medium text-slate-800 leading-snug">
          {medication.whatNotToDo.summary}
        </p>
      </section>

      {/* Card 3: GENÉRICOS E DIFERENÇAS (Amber left-bordered card matching mockup) */}
      <section
        aria-label="Genéricos e diferenças"
        className={`rounded-2xl bg-[#FEF5E4] border-l-[7px] border-[#D97706] p-4 shadow-xs transition-all ${
          speakingId === 'generics-summary' || speakingId === 'all-generics'
            ? 'ring-2 ring-blue-500'
            : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <ArrowLeftRight className="w-6 h-6 text-[#B45309] stroke-[2.4] shrink-0" />
            <h3 className="text-[16px] font-extrabold tracking-wide text-[#92400E] uppercase truncate">
              GENÉRICOS E DIFERENÇAS
            </h3>
          </div>
          <SpeakButton
            isSpeaking={speakingId === 'generics-summary' || speakingId === 'all-generics'}
            onClick={() =>
              handleToggleSection(
                'generics-summary',
                `Preço estimado: ${lowestGeneric.priceText}. ${medication.genericsHighlight.spokenScript}`
              )
            }
            ariaLabel="Ouvir sobre genéricos e diferenças"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[18px] font-extrabold text-[#047857]">
            {lowestGeneric.priceText}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] text-xs font-extrabold">
            {medication.genericsHighlight.sameEffectBadge}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenComparar}
          className="mt-3 w-full text-left rounded-xl bg-[#FDE7C2] hover:bg-[#FCDCA8] border border-amber-300/80 p-3 transition-colors cursor-pointer group"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5 fill-amber-400/50" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-[#78350F] leading-snug">
                {medication.genericsHighlight.switchWarningShort}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-extrabold text-[#92400E] group-hover:underline">
                Ver opções bioequivalentes e diferenças na troca
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </button>
      </section>

      {/* Card 4: O QUE PODE, QUANDO AGE E SE ESQUECER (Soft blue card) */}
      <section
        aria-label="O que pode fazer e se esquecer"
        className={`rounded-2xl bg-[#EFF6FF] border-l-[7px] border-[#2563EB] p-4 shadow-xs transition-all ${
          speakingId === 'what-can' || speakingId === 'all-can'
            ? 'ring-2 ring-blue-500'
            : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-[#2563EB] stroke-[2.4]" />
            <h3 className="text-[16px] font-extrabold tracking-wide text-[#1E3A8A] uppercase">
              O QUE PODE E DICAS
            </h3>
          </div>
          <SpeakButton
            isSpeaking={speakingId === 'what-can' || speakingId === 'all-can'}
            onClick={() => handleToggleSection('what-can', medication.whatYouCanDo.spokenScript)}
            ariaLabel="Ouvir o que pode fazer e dicas"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {medication.whatYouCanDo.items.map((item, idx) => (
            <button
              key={`${item.shortLabel}-${idx}`}
              type="button"
              onClick={() =>
                handleToggleSection(`can-item-${idx}`, `${item.shortLabel}. ${item.spokenDetail}`)
              }
              className={`flex flex-col items-center text-center p-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
                speakingId === `can-item-${idx}`
                  ? 'bg-white ring-2 ring-blue-500 shadow-xs'
                  : 'hover:bg-white/70'
              }`}
            >
              <BulaIcon type={item.icon} size={46} />
              <span className="mt-1.5 text-[12.5px] font-extrabold text-slate-900 leading-tight">
                {item.shortLabel}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          <div className="rounded-xl bg-white/85 p-3 border border-blue-100">
            <p className="text-xs font-extrabold text-blue-900 uppercase tracking-wide">
              ⏱️ Quando faz efeito
            </p>
            <p className="text-sm text-slate-800 mt-0.5">{medication.whatYouCanDo.onsetTime}</p>
          </div>

          <div className="rounded-xl bg-white/85 p-3 border border-blue-100">
            <p className="text-xs font-extrabold text-blue-900 uppercase tracking-wide">
              🤔 Esqueci de tomar — e agora?
            </p>
            <p className="text-sm text-slate-800 mt-0.5">
              {medication.whatYouCanDo.missedDoseTip}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Alarm Shortcut */}
      <button
        type="button"
        onClick={onOpenAddAlarm}
        className="w-full rounded-2xl bg-white border-2 border-teal-200 hover:border-teal-400 p-4 flex items-center justify-between gap-3 shadow-xs active:scale-[0.99] transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <AlarmClock className="w-6 h-6" />
          </span>
          <div>
            <p className="text-base font-extrabold text-slate-900">
              Criar alarme para {medication.name}
            </p>
            <p className="text-xs text-slate-600">
              O app te avisa com som e voz na hora certinha de tomar
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-teal-700 shrink-0" />
      </button>

      <p className="text-[11px] text-center text-slate-500 px-3 leading-relaxed">
        Informação educativa em linguagem simples. Não substitui a orientação do seu médico ou farmacêutico.
      </p>
    </div>
  );
}
