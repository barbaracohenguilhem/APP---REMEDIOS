import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  MapPin,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { BRAZILIAN_REGIONS, getRegionByUf } from '../data/regions';
import type { EquivalentProduct, Medication } from '../types/medication';
import { MedicinePackArt } from '../components/MedicinePackArt';
import { BulaIcon } from '../components/BulaIcons';
import { SpeakButton } from '../components/SpeakButton';
import { calculateRegionalPrice, calculateSavingsPercent } from '../services/pricing';

interface CompararViewProps {
  medication: Medication;
  selectedUf: string;
  onChangeUf: (uf: string) => void;
  speakingId: string | null;
  onSpeakSection: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
}

export function CompararView({
  medication,
  selectedUf,
  onChangeUf,
  speakingId,
  onSpeakSection,
  onStopSpeaking,
}: CompararViewProps) {
  const reference =
    medication.equivalents.find((e) => e.type === 'referencia') ?? medication.equivalents[0];
  const alternatives = medication.equivalents.filter((e) => e.id !== reference?.id);

  const [selectedCompareId, setSelectedCompareId] = useState<string>(
    alternatives[0]?.id ?? reference?.id ?? ''
  );
  const detailSectionRef = useRef<HTMLElement | null>(null);

  const handleSelectCompare = (id: string, scrollToDetail = false) => {
    setSelectedCompareId(id);
    if (scrollToDetail) {
      requestAnimationFrame(() => {
        detailSectionRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  // Reset selected comparison item when active medication changes
  useEffect(() => {
    const ref =
      medication.equivalents.find((e) => e.type === 'referencia') ?? medication.equivalents[0];
    const firstAlt = medication.equivalents.find((e) => e.id !== ref?.id);
    setSelectedCompareId(firstAlt?.id ?? ref?.id ?? '');
  }, [medication.id, medication.equivalents]);

  const selectedProduct: EquivalentProduct | undefined =
    medication.equivalents.find((e) => e.id === selectedCompareId) ?? alternatives[0] ?? reference;

  const region = getRegionByUf(selectedUf);

  const handleToggleSpeak = (id: string, text: string) => {
    if (speakingId === id) {
      onStopSpeaking();
    } else {
      onSpeakSection(id, text);
    }
  };

  const explainWhyDifferencesText =
    'Entenda a diferença entre original e genérico: os bioequivalentes têm a mesma molécula principal e a mesma eficácia comprovada pela ANVISA. Porém, o revestimento do comprimido, a lactose, os corantes e o ritmo de absorção podem variar de um fabricante para outro. Por isso, em pessoas sensíveis, trocar de marca pode causar efeitos diferentes na troca, como inchaço, dor de estômago ou dor de cabeça que você não tinha com o original.';

  const typeBadge = (eq: EquivalentProduct) => {
    if (eq.type === 'referencia') {
      return { label: 'Original / Referência', cls: 'bg-indigo-100 text-indigo-900' };
    }
    if (eq.type === 'generico') {
      return { label: 'Genérico (Tarja G)', cls: 'bg-amber-100 text-amber-950' };
    }
    return { label: 'Similar Intercambiável', cls: 'bg-sky-100 text-sky-900' };
  };

  const verdictStyle = (level: EquivalentProduct['switchVerdict']['level']) => {
    if (level === 'tranquila') {
      return {
        bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      };
    }
    if (level === 'atencao') {
      return {
        bg: 'bg-amber-50 border-amber-300 text-amber-950',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
      };
    }
    return {
      bg: 'bg-rose-50 border-rose-300 text-rose-950',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />,
    };
  };

  return (
    <div className="px-4 py-3.5 space-y-4 pb-12">
      {/* Header summary + Region picker */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-3">
          <MedicinePackArt pack={medication.pack} size="sm" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-extrabold text-slate-900 truncate">
              Genéricos de {medication.name}
            </h2>
            <p className="text-xs text-slate-600 font-medium truncate">
              {medication.activeIngredient}
            </p>
          </div>
          <SpeakButton
            size="sm"
            isSpeaking={speakingId === 'compare-intro'}
            onClick={() =>
              handleToggleSpeak('compare-intro', medication.genericsHighlight.spokenScript)
            }
            ariaLabel="Ouvir resumo de genéricos e diferenças"
          />
        </div>

        {/* Regional selector (optional refinement requested by user) */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
          <label
            htmlFor="uf-region-select"
            className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 mb-1.5"
          >
            <MapPin className="w-4 h-4 text-[#0D9488]" />
            <span>Sua região para média de preço (opcional)</span>
          </label>
          <select
            id="uf-region-select"
            value={selectedUf}
            onChange={(e) => onChangeUf(e.target.value)}
            className="w-full rounded-xl bg-white border-2 border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-[#0D9488] focus:outline-none cursor-pointer"
          >
            {BRAZILIAN_REGIONS.map((r) => (
              <option key={r.uf} value={r.uf}>
                {r.uf === 'BR' ? `${r.name} (Todo o Brasil)` : `${r.uf} — ${r.name}`}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Mostrando média estimada para <strong>{region.name}</strong> ({region.icmsLabel}).
          </p>
        </div>
      </section>

      {/* Plain-language explainer on switching differences */}
      <section className="rounded-2xl bg-[#FEF5E4] border-l-[6px] border-[#D97706] p-3.5">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-extrabold text-amber-950">
                Por que trocar de marca pode dar reação diferente?
              </h3>
              <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                Aqui não falamos dos efeitos da molécula em geral — e sim do que muda{' '}
                <strong>de um equivalente para outro</strong> (revestimento, lactose, corantes e
                ritmo de absorção).
              </p>
            </div>
          </div>
          <SpeakButton
            size="sm"
            isSpeaking={speakingId === 'why-switch-diff'}
            onClick={() => handleToggleSpeak('why-switch-diff', explainWhyDifferencesText)}
            ariaLabel="Ouvir por que equivalentes podem dar efeitos diferentes na troca"
          />
        </div>
      </section>

      {/* Options selector list */}
      <section aria-label="Opções no mercado" className="space-y-2.5">
        <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wide px-0.5">
          Opções no mercado brasileiro ({medication.equivalents.length})
        </h3>

        {medication.equivalents.map((eq) => {
          const price = calculateRegionalPrice(eq, selectedUf);
          const savings = calculateSavingsPercent(reference, eq, selectedUf);
          const badge = typeBadge(eq);
          const isSelected = selectedProduct?.id === eq.id;

          return (
            <div
              key={eq.id}
              className={`w-full rounded-2xl bg-white p-3.5 border-2 transition-all ${
                isSelected
                  ? 'border-[#0D9488] ring-2 ring-teal-100 shadow-sm'
                  : 'border-slate-100 shadow-xs hover:border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectCompare(eq.id)}
                  className="text-left flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${badge.cls}`}>
                      {badge.label}
                    </span>
                    {eq.bioequivalent ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                        ✓ Bioequivalente
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold">
                        ⚠️ NÃO intercambiável direto
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 mt-1.5">{eq.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">Lab.: {eq.lab}</p>

                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-base font-extrabold ${
                        price.isFreeSus ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {price.formattedRange}
                    </span>
                    {savings !== null && savings > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold">
                        {savings === 100 ? 'Grátis SUS' : `Economia ~${savings}%`}
                      </span>
                    )}
                  </div>

                  {eq.switchingEffects.length > 0 && (
                    <p className="mt-2 text-xs font-bold text-amber-800 bg-amber-50 rounded-lg px-2.5 py-1.5 inline-block">
                      ⚠️ Na troca: {eq.switchingEffects[0].symptom}
                    </p>
                  )}
                </button>

                <SpeakButton
                  size="sm"
                  isSpeaking={speakingId === `eq-${eq.id}`}
                  onClick={() =>
                    handleToggleSpeak(
                      `eq-${eq.id}`,
                      `${eq.name}. Preço médio em ${region.name}: ${price.formattedRange}. ${eq.spokenSummary}`
                    )
                  }
                  ariaLabel={`Ouvir detalhes de ${eq.name}`}
                />
              </div>

              {!isSelected && (
                <button
                  type="button"
                  onClick={() => handleSelectCompare(eq.id, true)}
                  className="mt-2.5 w-full py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>
                    {eq.id === reference?.id
                      ? 'Ver detalhes do Original'
                      : 'Comparar diferenças com o Original'}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </section>

      {/* Detailed Side-by-Side Comparison: Original vs Selected Equivalent */}
      {reference && selectedProduct && (
        <section
          ref={detailSectionRef}
          aria-label="Comparação detalhada na troca"
          className="bg-white rounded-2xl p-4 shadow-sm border-2 border-teal-200 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">
                Comparação na troca
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                {selectedProduct.id === reference.id
                  ? `Detalhes do Original (${reference.name})`
                  : `${reference.name.split(' ')[0]} vs. ${selectedProduct.name}`}
              </h3>
            </div>
            <SpeakButton
              isSpeaking={speakingId === 'compare-detail'}
              onClick={() => {
                const diffSummary =
                  selectedProduct.switchingEffects.length > 0
                    ? `Efeitos relatados ao trocar do original para este equivalente: ${selectedProduct.switchingEffects
                        .map((fx) => `${fx.symptom}, porque ${fx.why}`)
                        .join('. ')}.`
                    : 'Este é o medicamento de referência usado como padrão de comparação.';
                handleToggleSpeak(
                  'compare-detail',
                  `Comparando ${selectedProduct.name}. ${selectedProduct.switchVerdict.headline}. ${selectedProduct.switchVerdict.explanation}. Revestimento: ${selectedProduct.coatingOrTech}. ${diffSummary}`
                );
              }}
              ariaLabel="Ouvir comparação detalhada"
            />
          </div>

          {/* Verdict Banner */}
          {(() => {
            const v = verdictStyle(selectedProduct.switchVerdict.level);
            return (
              <div className={`rounded-xl border p-3.5 flex items-start gap-2.5 ${v.bg}`}>
                {v.icon}
                <div>
                  <p className="text-sm font-extrabold">{selectedProduct.switchVerdict.headline}</p>
                  <p className="text-xs mt-0.5 leading-relaxed opacity-90">
                    {selectedProduct.switchVerdict.explanation}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Visual 2-column comparison table (Original vs Selected) */}
          {selectedProduct.id !== reference.id && (
            <div className="grid grid-cols-2 gap-2.5">
              {/* Original Column */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 text-[10px] font-extrabold uppercase">
                  Original
                </span>
                <p className="text-xs font-extrabold text-slate-900">{reference.name}</p>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Preço ({region.uf})</p>
                  <p className="text-sm font-extrabold text-slate-900">
                    {calculateRegionalPrice(reference, selectedUf).formattedRange}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Revestimento / Base</p>
                  <p className="text-xs text-slate-700 leading-snug">{reference.coatingOrTech}</p>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-700">
                    {reference.excipients.hasLactose ? 'Com lactose' : 'Sem lactose'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-700">
                    {reference.excipients.hasDyes ? 'Com corante' : 'Sem corante'}
                  </span>
                </div>
              </div>

              {/* Selected Equivalent Column */}
              <div className="rounded-xl bg-teal-50/60 border border-teal-200 p-3 space-y-2">
                <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 text-[10px] font-extrabold uppercase">
                  Escolhido
                </span>
                <p className="text-xs font-extrabold text-slate-900">{selectedProduct.name}</p>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Preço ({region.uf})</p>
                  <p className="text-sm font-extrabold text-emerald-700">
                    {calculateRegionalPrice(selectedProduct, selectedUf).formattedRange}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Revestimento / Base</p>
                  <p className="text-xs text-slate-800 leading-snug font-medium">
                    {selectedProduct.coatingOrTech}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-teal-200 text-[10px] font-bold text-slate-700">
                    {selectedProduct.excipients.hasLactose ? 'Com lactose' : 'Sem lactose'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-teal-200 text-[10px] font-bold text-slate-700">
                    {selectedProduct.excipients.hasDyes ? 'Com corante' : 'Sem corante'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Absorption & Excipient details */}
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-2">
            <div>
              <p className="text-xs font-extrabold text-slate-800">
                🧪 Absorção e comportamento no corpo
              </p>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                {selectedProduct.absorptionNote}
              </p>
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">
                📋 Excipientes (ingredientes inativos)
              </p>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                {selectedProduct.excipients.keyNotes}
              </p>
            </div>
          </div>

          {/* Specific Switching Effects (the core user pain point: Iumi -> generic bloating!) */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-extrabold text-slate-900">
              ⚠️ Possíveis diferenças ao trocar do Original para este:
            </h4>

            {selectedProduct.switchingEffects.length === 0 ? (
              <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                Você está vendo o medicamento de referência. Toque em um <strong>Genérico</strong>{' '}
                ou <strong>Similar</strong> na lista acima para ver exatamente o que pode mudar na
                troca.
              </p>
            ) : (
              <div className="space-y-2.5">
                {selectedProduct.switchingEffects.map((effect, idx) => (
                  <div
                    key={`${effect.symptom}-${idx}`}
                    className="rounded-xl bg-[#FFF8EB] border border-amber-200 p-3 flex items-start gap-3"
                  >
                    <BulaIcon type={effect.icon} size={42} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-extrabold text-amber-950">{effect.symptom}</p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            effect.likelihood === 'comum'
                              ? 'bg-rose-100 text-rose-800'
                              : effect.likelihood === 'ocasional'
                                ? 'bg-amber-200 text-amber-950'
                                : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {effect.likelihood === 'comum'
                            ? 'Relatado na troca'
                            : effect.likelihood === 'ocasional'
                              ? 'Pode acontecer'
                              : 'Raro na troca'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 mt-1 leading-relaxed">{effect.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
