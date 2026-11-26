'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
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
    <div className={embedded ? 'space-y-4' : 'px-5 pt-2 pb-28 space-y-5'}>
      {/* Standalone header when opened directly from bottom tab */}
      {!embedded && (
        <section className="space-y-3">
          <div>
            <p className="text-[13px] font-medium text-[#78716C]">Genéricos e similares</p>
            <h2 className="text-[26px] font-bold text-[#1C1917] leading-tight mt-0.5">
              Comparar opções
            </h2>
          </div>

          {allMedications.length > 1 && onSelectMedication && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {allMedications.map((med) => {
                const active = med.id === medication.id;
                return (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => onSelectMedication(med.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-white text-[#57534E] border border-black/[0.06] hover:bg-[#F3EFE8]'
                    }`}
                  >
                    {med.name}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <MedicationAvatar
              medication={medication}
              photoOverride={medicationPhotos[medication.id]}
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-bold text-[#1C1917] truncate">{medication.name}</p>
              <p className="text-[13px] text-[#78716C] truncate">{medication.activeIngredient}</p>
            </div>
          </div>
        </section>
      )}

      {/* Compact single-row State/Region picker + Calm 1-sentence insight */}
      <div className="bg-white rounded-[22px] p-4 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#57534E]">
            <MapPin className="w-4 h-4 text-[#146356]" />
            <span>Preços em</span>
          </div>
          <select
            aria-label="Selecionar estado para média de preço"
            value={selectedUf}
            onChange={(e) => onChangeUf(e.target.value)}
            className="rounded-full bg-[#F3EFE8] hover:bg-[#EAE4D9] px-3.5 py-1.5 text-[13px] font-semibold text-[#1C1917] focus:outline-none cursor-pointer"
          >
            {BRAZILIAN_REGIONS.map((r) => (
              <option key={r.uf} value={r.uf}>
                {r.uf === 'BR' ? 'Média Brasil' : `${r.uf} · ${r.name}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start justify-between gap-3 pt-2.5 border-t border-black/[0.05]">
          <p className="text-[13.5px] text-[#57534E] leading-relaxed">
            Mesma eficácia pela ANVISA. Toque em qualquer opção abaixo para ver{' '}
            <strong className="text-[#1C1917] font-semibold">o que pode mudar na troca</strong>{' '}
            (revestimento, excipientes e absorção).
          </p>
          <QuietListenButton
            sectionId="compare-why"
            playback={playback}
            onClick={() => toggleSpeak('compare-why', medication.genericsHighlight.spokenScript)}
            ariaLabel="Ouvir sobre diferenças entre genéricos"
          />
        </div>
      </div>

      {/* Clean, spacious bioequivalent list (NO badge soup, progressive disclosure into focused sheet) */}
      <section aria-label="Opções bioequivalentes" className="space-y-3">
        {medication.equivalents.map((eq) => {
          const price = calculateRegionalPrice(eq, selectedUf);
          const savings = calculateSavingsPercent(reference, eq, selectedUf);
          const isRef = eq.id === reference?.id;
          const firstEffect = eq.switchingEffects[0];

          return (
            <button
              key={eq.id}
              type="button"
              onClick={() => setInspectingProduct(eq)}
              className="w-full text-left bg-white hover:bg-[#FCFBF9] active:scale-[0.995] rounded-[24px] p-5 border border-black/[0.05] shadow-[0_2px_14px_rgba(28,25,23,0.03)] transition-all cursor-pointer space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-[#78716C]">
                    {isRef
                      ? 'Referência'
                      : eq.type === 'generico'
                        ? 'Genérico'
                        : 'Similar intercambiável'}{' '}
                    · {eq.lab}
                  </p>
                  <h3 className="text-[16px] font-bold text-[#1C1917] mt-0.5 leading-snug">
                    {eq.name}
                  </h3>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A8A29E] shrink-0 mt-1" />
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={`text-[17px] font-bold ${
                    price.isFreeSus ? 'text-[#15803D]' : 'text-[#1C1917]'
                  }`}
                >
                  {price.formattedRange}
                </p>
                {savings !== null && savings > 0 && !isRef && (
                  <span className="text-[12.5px] font-semibold text-[#146356]">
                    {savings === 100 ? 'Gratuito SUS' : `Economiza ~${savings}%`}
                  </span>
                )}
              </div>

              {firstEffect && (
                <div className="pt-2 border-t border-black/[0.05] flex items-center gap-2 text-[13px] text-[#9A3412]">
                  <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span className="truncate font-medium">
                    Na troca: {firstEffect.symptom}
                  </span>
                </div>
              )}

              {!eq.bioequivalent && (
                <div className="pt-2 border-t border-black/[0.05] flex items-center gap-2 text-[13px] text-[#BE123C]">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">Atenção: não substitui diretamente</span>
                </div>
              )}
            </button>
          );
        })}
      </section>

      {/* FOCUSED COMPARISON SHEET — ONLY 3 CRYSTAL-CLEAR BLOCKS */}
      {inspectingProduct && reference && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-sheet-title"
          className="fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => {
            onStopSpeaking();
            setInspectingProduct(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[430px] max-h-[88dvh] overflow-y-auto bg-[#F6F4EF] rounded-t-[32px] sm:rounded-[32px] p-5 pb-8 shadow-2xl animate-sheet-up space-y-4"
          >
            {/* Sheet Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#146356]">
                  {inspectingProduct.id === reference.id
                    ? 'Medicamento de referência'
                    : `Troca · ${reference.name.split(' ')[0]} → ${inspectingProduct.lab}`}
                </p>
                <h3
                  id="switch-sheet-title"
                  className="text-[21px] font-bold text-[#1C1917] leading-snug mt-0.5"
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
                className="w-9 h-9 rounded-full bg-white text-[#57534E] hover:bg-[#EAE4D9] inline-flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Natural Voice Play Bar for this exact switch */}
            <AudioPlayerBar
              label="Ouvir o que muda nessa troca"
              sublabel={inspectingProduct.switchVerdict.headline}
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
                    : 'Este é o medicamento de referência usado como base.';
                toggleSpeak(
                  `sheet-eq-${inspectingProduct.id}`,
                  `${inspectingProduct.name}, do laboratório ${inspectingProduct.lab}. ${inspectingProduct.switchVerdict.headline}. ${inspectingProduct.switchVerdict.explanation} ${effectsSpoken}`
                );
              }}
              onToggleRate={onToggleRate}
              onOpenVoiceSettings={onOpenVoiceSettings}
            />

            {/* BLOCK 1: Preço & Economia */}
            <div className="bg-white rounded-[22px] p-4 border border-black/[0.05] space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#78716C]">
                1. Média de preço em {region.name}
              </p>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[22px] font-bold text-[#1C1917]">
                  {calculateRegionalPrice(inspectingProduct, selectedUf).formattedRange}
                </p>
                {inspectingProduct.id !== reference.id && (
                  <p className="text-[13px] text-[#78716C]">
                    Original: {calculateRegionalPrice(reference, selectedUf).formattedRange}
                  </p>
                )}
              </div>
              <p className="text-[12.5px] text-[#78716C]">{region.icmsLabel}</p>
            </div>

            {/* BLOCK 2: O que continua igual */}
            <div className="bg-[#EEF7F2] rounded-[22px] p-4 border border-[#146356]/10 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#146356] shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-[#0F4F45]">
                  {inspectingProduct.bioequivalent
                    ? 'O que continua igual'
                    : 'Atenção: formulação diferente'}
                </p>
                <p className="text-[13.5px] text-[#146356]/90 mt-0.5 leading-relaxed">
                  {inspectingProduct.switchVerdict.explanation}
                </p>
              </div>
            </div>

            {/* BLOCK 3: O que MUDA de um equivalente para outro */}
            <div className="bg-white rounded-[22px] p-4 border border-black/[0.05] space-y-3.5">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B45309]">
                3. O que muda na troca (revestimento & absorção)
              </p>

              <div className="space-y-2 text-[13.5px] text-[#44403C] leading-relaxed">
                <p>
                  <strong className="text-[#1C1917]">Revestimento / Base:</strong>{' '}
                  {inspectingProduct.coatingOrTech}
                </p>
                <p>
                  <strong className="text-[#1C1917]">Absorção:</strong>{' '}
                  {inspectingProduct.absorptionNote}
                </p>
                <p>
                  <strong className="text-[#1C1917]">Excipientes:</strong>{' '}
                  {inspectingProduct.excipients.keyNotes}
                </p>
              </div>

              {inspectingProduct.switchingEffects.length > 0 && (
                <div className="pt-2 border-t border-black/[0.05] space-y-2.5">
                  {inspectingProduct.switchingEffects.map((fx, i) => (
                    <div
                      key={`${fx.symptom}-${i}`}
                      className="rounded-2xl bg-[#FEF8EC] p-3.5 border border-[#F59E0B]/20"
                    >
                      <p className="text-[14.5px] font-bold text-[#9A3412]">{fx.symptom}</p>
                      <p className="text-[13.5px] text-[#57534E] mt-1 leading-relaxed">{fx.why}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct AI Pharmacist follow-up */}
            {inspectingProduct.id !== reference.id && (
              <button
                type="button"
                onClick={() => {
                  const q = `Troquei ${reference.name} pelo ${inspectingProduct.name} da ${inspectingProduct.lab}. O que devo observar de diferença no meu corpo?`;
                  setInspectingProduct(null);
                  onAskAboutSwitch(q);
                }}
                className="w-full py-3.5 px-4 rounded-full bg-white border border-black/10 hover:bg-[#F3EFE8] text-[#1C1917] font-semibold text-[14px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#146356]" />
                <span>Tirar dúvida sobre essa troca com a IA</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
