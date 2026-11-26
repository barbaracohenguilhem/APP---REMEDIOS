'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MapPin,
  MessageCircle,
  ShieldAlert,
  X,
} from 'lucide-react';
import { BRAZILIAN_REGIONS, getRegionByUf } from '@/data/regions';
import type { EquivalentProduct, Medication } from '@/types/medication';
import { calculateRegionalPrice, calculateSavingsPercent } from '@/services/pricing';
import type { VoicePlaybackState } from '@/services/voiceEngine';
import { MedicationAvatar } from './MedicationAvatar';
import { AccessiblePictogram } from './AccessiblePictograms';
import { AudioPlayerBar, QuietListenButton } from './AudioPlayerBar';

interface CompararViewProps {
  medication: Medication;
  allMedications?: Medication[];
  medicationPhotos?: Record<string, string>;
  onSelectMedication?: (medId: string) => void;
  selectedUf: string;
  onChangeUf: (uf: string) => void;
  playback: VoicePlaybackState;
  voiceRate: 'normal' | 'slow';
  hasNaturalVoiceKey: boolean;
  onSpeak: (sectionId: string, text: string) => void;
  onStopSpeaking: () => void;
  onToggleRate: () => void;
  onOpenVoiceSettings: () => void;
  onAskAboutSwitch: (question: string) => void;
  embedded?: boolean;
}

export function CompararView({
  medication,
  allMedications = [],
  medicationPhotos = {},
  onSelectMedication,
  selectedUf,
  onChangeUf,
  playback,
  voiceRate,
  hasNaturalVoiceKey,
  onSpeak,
  onStopSpeaking,
  onToggleRate,
  onOpenVoiceSettings,
  onAskAboutSwitch,
  embedded = false,
}: CompararViewProps) {
  const [inspectingProduct, setInspectingProduct] = useState<EquivalentProduct | null>(null);
  const [showTechDetails, setShowTechDetails] = useState(false);

  const reference =
    medication.equivalents.find((e) => e.type === 'referencia') ?? medication.equivalents[0];
  const region = getRegionByUf(selectedUf);

  const toggleSpeak = (id: string, text: string) => {
    if (playback.sectionId === id && playback.status !== 'idle') {
      onStopSpeaking();
    } else {
      onSpeak(id, text);
    }
  };

  return (
    <div className={embedded ? 'space-y-4' : 'px-4 pt-3 pb-28 space-y-4'}>
      {/* Standalone header */}
      {!embedded && (
        <section className="space-y-3">
          <h2 className="text-[25px] font-extrabold text-[#111827] leading-tight">
            Genéricos e Diferenças
          </h2>

          {allMedications.length > 1 && onSelectMedication && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {allMedications.map((med) => {
                const active = med.id === medication.id;
                return (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => onSelectMedication(med.id)}
                    className={`shrink-0 min-h-[44px] px-4 rounded-full text-[15px] font-extrabold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#111827] text-white'
                        : 'bg-white text-[#111827] border-2 border-slate-300'
                    }`}
                  >
                    {med.name}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-3.5 bg-white rounded-[22px] p-3.5 border border-slate-200">
            <MedicationAvatar
              medication={medication}
              photoOverride={medicationPhotos[medication.id]}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[19px] font-extrabold text-[#111827] truncate">{medication.name}</p>
              <p className="text-[14px] font-medium text-[#374151] truncate">
                {medication.activeIngredient}
              </p>
            </div>
            <QuietListenButton
              sectionId="compare-why-top"
              playback={playback}
              onClick={() => toggleSpeak('compare-why-top', medication.genericsHighlight.spokenScript)}
              ariaLabel="Ouvir sobre genéricos e diferenças"
            />
          </div>
        </section>
      )}

      {/* Clear Region Selector + Plain-Portuguese Explainer */}
      <div className="bg-white rounded-[22px] p-4 border border-slate-200 space-y-3">
        <label
          htmlFor="uf-picker"
          className="flex items-center gap-2 text-[15px] font-extrabold text-[#111827]"
        >
          <MapPin className="w-5 h-5 text-[#0F766E]" />
          <span>Preços no seu estado:</span>
        </label>
        <select
          id="uf-picker"
          value={selectedUf}
          onChange={(e) => onChangeUf(e.target.value)}
          className="w-full min-h-[48px] rounded-2xl bg-[#F7F6F2] border-2 border-slate-300 px-4 text-[16px] font-bold text-[#111827] focus:border-[#0F766E] focus:outline-none cursor-pointer"
        >
          {BRAZILIAN_REGIONS.map((r) => (
            <option key={r.uf} value={r.uf}>
              {r.uf === 'BR' ? 'Média de todo o Brasil' : `${r.name} (${r.uf})`}
            </option>
          ))}
        </select>

        <div className="rounded-2xl bg-[#FFFBEB] border-l-[6px] border-[#D97706] p-3.5 flex items-center justify-between gap-3">
          <p className="text-[14.5px] font-semibold text-[#78350F] leading-snug">
            Mesmo remédio pela ANVISA. Toque em qualquer opção abaixo para ver{' '}
            <strong>o que pode mudar na troca</strong> (como inchaço ou estômago).
          </p>
          <QuietListenButton
            sectionId="compare-why"
            playback={playback}
            onClick={() => toggleSpeak('compare-why', medication.genericsHighlight.spokenScript)}
            ariaLabel="Ouvir por que pode dar diferença na troca"
          />
        </div>
      </div>

      {/* High-Contrast Bioequivalent Cards */}
      <section aria-label="Opções no mercado" className="space-y-3">
        {medication.equivalents.map((eq) => {
          const price = calculateRegionalPrice(eq, selectedUf);
          const savings = calculateSavingsPercent(reference, eq, selectedUf);
          const isRef = eq.id === reference?.id;
          const firstEffect = eq.switchingEffects[0];

          return (
            <div
              key={eq.id}
              className="bg-white rounded-[24px] p-4 border-2 border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowTechDetails(false);
                    setInspectingProduct(eq);
                  }}
                  className="text-left flex-1 min-w-0 cursor-pointer"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[13px] font-extrabold ${
                      isRef
                        ? 'bg-[#EEF2FF] text-[#3730A3]'
                        : eq.type === 'generico'
                          ? 'bg-[#FEF3C7] text-[#92400E]'
                          : 'bg-[#E0F2FE] text-[#075985]'
                    }`}
                  >
                    {isRef ? 'Original' : eq.type === 'generico' ? 'Genérico' : 'Similar'} · {eq.lab}
                  </span>

                  <h3 className="text-[18px] font-extrabold text-[#111827] mt-2 leading-snug">
                    {eq.name}
                  </h3>

                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <span
                      className={`text-[20px] font-extrabold ${
                        price.isFreeSus ? 'text-[#047857]' : 'text-[#111827]'
                      }`}
                    >
                      {price.formattedRange}
                    </span>
                    {savings !== null && savings > 0 && !isRef && (
                      <span className="px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#065F46] text-[13.5px] font-extrabold">
                        {savings === 100 ? 'GRÁTIS NO SUS' : `Economia ~${savings}%`}
                      </span>
                    )}
                  </div>
                </button>

                <QuietListenButton
                  sectionId={`eq-card-${eq.id}`}
                  playback={playback}
                  onClick={() =>
                    toggleSpeak(
                      `eq-card-${eq.id}`,
                      `${eq.name}, laboratório ${eq.lab}. Preço em ${region.name}: ${price.formattedRange}. ${eq.spokenSummary}`
                    )
                  }
                  ariaLabel={`Ouvir sobre ${eq.name}`}
                />
              </div>

              {firstEffect && (
                <button
                  type="button"
                  onClick={() => {
                    setShowTechDetails(false);
                    setInspectingProduct(eq);
                  }}
                  className="w-full text-left rounded-2xl bg-[#FFFBEB] border border-[#F59E0B]/50 p-3 flex items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0" />
                    <span className="text-[14.5px] font-extrabold text-[#78350F] leading-snug">
                      Na troca: {firstEffect.symptom}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#B45309] shrink-0" />
                </button>
              )}

              {!eq.bioequivalent && (
                <button
                  type="button"
                  onClick={() => {
                    setShowTechDetails(false);
                    setInspectingProduct(eq);
                  }}
                  className="w-full text-left rounded-2xl bg-[#FEF2F2] border border-[#DC2626]/40 p-3 flex items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-[#B91C1C] shrink-0" />
                    <span className="text-[14.5px] font-extrabold text-[#991B1B]">
                      Atenção: NÃO substitui direto
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#B91C1C] shrink-0" />
                </button>
              )}

              {!firstEffect && eq.bioequivalent && (
                <button
                  type="button"
                  onClick={() => {
                    setShowTechDetails(false);
                    setInspectingProduct(eq);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] text-[14.5px] font-bold flex items-center justify-between cursor-pointer"
                >
                  <span>{isRef ? 'Ver detalhes do Original' : 'Ver o que muda na troca'}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          );
        })}
      </section>

      {/* FOCUSED ACCESSIBLE COMPARISON SHEET (Plain Spoken Language + Visual Pictograms!) */}
      {inspectingProduct && reference && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-sheet-title"
          className="fixed inset-0 z-50 bg-[#111827]/55 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => {
            onStopSpeaking();
            setInspectingProduct(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#F7F6F2] rounded-t-[30px] sm:rounded-[30px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13.5px] font-extrabold uppercase text-[#0F766E]">
                  {inspectingProduct.id === reference.id
                    ? 'Remédio Original'
                    : `Troca: ${reference.name.split(' ')[0]} → ${inspectingProduct.lab}`}
                </p>
                <h3
                  id="switch-sheet-title"
                  className="text-[22px] font-extrabold text-[#111827] leading-snug mt-0.5"
                >
                  {inspectingProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  onStopSpeaking();
                  setInspectingProduct(null);
                }}
                aria-label="Fechar comparação"
                className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#111827] inline-flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Big Blue Voice Player */}
            <AudioPlayerBar
              label="Ouvir o que muda na troca"
              sectionId={`sheet-eq-${inspectingProduct.id}`}
              playback={playback}
              rate={voiceRate}
              hasNaturalVoiceKey={hasNaturalVoiceKey}
              onPlayToggle={() => {
                const effectsSpoken =
                  inspectingProduct.switchingEffects.length > 0
                    ? `O que pode mudar na troca: ${inspectingProduct.switchingEffects
                        .map((fx) => `${fx.symptom}. ${fx.why}`)
                        .join(' ')}`
                    : 'Este é o medicamento original usado como referência.';
                toggleSpeak(
                  `sheet-eq-${inspectingProduct.id}`,
                  `${inspectingProduct.name}, do laboratório ${inspectingProduct.lab}. ${inspectingProduct.switchVerdict.headline}. ${inspectingProduct.switchVerdict.explanation} ${effectsSpoken}`
                );
              }}
              onToggleRate={onToggleRate}
              onOpenVoiceSettings={onOpenVoiceSettings}
            />

            {/* 1. PREÇO */}
            <div className="bg-white rounded-[22px] p-4 border-2 border-slate-200 space-y-1">
              <p className="text-[13.5px] font-extrabold uppercase text-[#374151]">
                1. Média de preço em {region.name}
              </p>
              <p className="text-[26px] font-extrabold text-[#047857]">
                {calculateRegionalPrice(inspectingProduct, selectedUf).formattedRange}
              </p>
              {inspectingProduct.id !== reference.id && (
                <p className="text-[15px] font-semibold text-[#374151]">
                  Original custa cerca de{' '}
                  <strong>{calculateRegionalPrice(reference, selectedUf).formattedRange}</strong>
                </p>
              )}
            </div>

            {/* 2. O QUE É IGUAL */}
            <div className="bg-[#ECFDF5] rounded-[22px] p-4 border-l-[7px] border-[#059669] flex items-start gap-3">
              <CheckCircle2 className="w-7 h-7 text-[#047857] shrink-0 mt-0.5" />
              <div>
                <p className="text-[16px] font-extrabold text-[#065F46]">
                  {inspectingProduct.bioequivalent
                    ? '2. O que continua igual'
                    : '2. Atenção: fórmula diferente'}
                </p>
                <p className="text-[15.5px] font-medium text-[#111827] mt-1 leading-snug">
                  {inspectingProduct.switchVerdict.explanation}
                </p>
              </div>
            </div>

            {/* 3. O QUE MUDA NA TROCA (Visual & Plain Portuguese FIRST!) */}
            <div className="bg-white rounded-[22px] p-4 border-2 border-[#F59E0B]/50 space-y-3">
              <p className="text-[16px] font-extrabold text-[#92400E] uppercase">
                3. O que pode mudar na troca
              </p>

              {inspectingProduct.switchingEffects.length > 0 ? (
                <div className="space-y-3">
                  {inspectingProduct.switchingEffects.map((fx, i) => (
                    <div
                      key={`${fx.symptom}-${i}`}
                      className="rounded-2xl bg-[#FFFBEB] p-3.5 border border-[#F59E0B]/40 flex items-start gap-3.5"
                    >
                      <AccessiblePictogram type={fx.icon} size={48} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[16.5px] font-extrabold text-[#78350F] leading-snug">
                          {fx.symptom}
                        </p>
                        <p className="text-[15px] font-medium text-[#111827] mt-1 leading-snug">
                          {fx.why}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[15.5px] text-[#374151] leading-snug">
                  Este é o remédio original. Toque em um genérico da lista para ver o que pode mudar ao trocar.
                </p>
              )}

              {/* Optional technical details tucked cleanly away so non-readers aren't overwhelmed */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowTechDetails((v) => !v)}
                  className="w-full py-1.5 flex items-center justify-between text-[14.5px] font-bold text-[#374151] cursor-pointer"
                >
                  <span>Detalhes técnicos (revestimento e excipientes)</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${showTechDetails ? 'rotate-180' : ''}`}
                  />
                </button>
                {showTechDetails && (
                  <div className="mt-2 space-y-2 text-[14.5px] text-[#374151] leading-relaxed bg-[#F7F6F2] rounded-xl p-3">
                    <p>
                      <strong className="text-[#111827]">Revestimento:</strong>{' '}
                      {inspectingProduct.coatingOrTech}
                    </p>
                    <p>
                      <strong className="text-[#111827]">Absorção:</strong>{' '}
                      {inspectingProduct.absorptionNote}
                    </p>
                    <p>
                      <strong className="text-[#111827]">Excipientes:</strong>{' '}
                      {inspectingProduct.excipients.keyNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {inspectingProduct.id !== reference.id && (
              <button
                type="button"
                onClick={() => {
                  const q = `Troquei ${reference.name} pelo ${inspectingProduct.name} da ${inspectingProduct.lab}. O que devo observar de diferença no meu corpo?`;
                  setInspectingProduct(null);
                  onAskAboutSwitch(q);
                }}
                className="w-full min-h-[54px] px-4 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-[15.5px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Tirar dúvida sobre essa troca por voz</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
