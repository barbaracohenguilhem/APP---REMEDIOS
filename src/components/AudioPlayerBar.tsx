'use client';

import { Loader2, Sparkles, Square, Volume2 } from 'lucide-react';
import type { VoicePlaybackState } from '@/services/voiceEngine';

interface AudioPlayerBarProps {
  label: string;
  sublabel?: string;
  sectionId: string;
  playback: VoicePlaybackState;
  rate: 'normal' | 'slow';
  hasNaturalVoiceKey: boolean;
  onPlayToggle: () => void;
  onToggleRate: () => void;
  onOpenVoiceSettings: () => void;
}

/**
 * Unmistakable high-contrast royal blue audio banner.
 * Designed so even a user who cannot read instantly recognizes the giant speaker button to listen.
 */
export function AudioPlayerBar({
  label,
  sublabel,
  sectionId,
  playback,
  rate,
  hasNaturalVoiceKey,
  onPlayToggle,
  onToggleRate,
  onOpenVoiceSettings,
}: AudioPlayerBarProps) {
  const isThisLoading = playback.status === 'loading' && playback.sectionId === sectionId;
  const isThisPlaying = playback.status === 'playing' && playback.sectionId === sectionId;

  return (
    <div className="space-y-2">
      <div
        className={`rounded-[22px] p-2 shadow-[0_8px_24px_rgba(29,78,216,0.22)] transition-colors ${
          isThisPlaying ? 'bg-[#B91C1C]' : 'bg-[#1D4ED8]'
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPlayToggle}
            aria-label={isThisPlaying ? 'Parar leitura em voz alta' : label}
            className="flex-1 min-h-[54px] px-3.5 py-2.5 rounded-[16px] text-white flex items-center justify-center gap-3 active:scale-[0.99] transition-transform cursor-pointer"
          >
            {isThisLoading ? (
              <Loader2 className="w-7 h-7 animate-spin shrink-0" />
            ) : isThisPlaying ? (
              <Square className="w-6 h-6 fill-current shrink-0" />
            ) : (
              <Volume2 className="w-7 h-7 stroke-[2.5] shrink-0" />
            )}

            <div className="text-left min-w-0">
              <p className="text-[16px] font-extrabold leading-tight tracking-wide uppercase">
                {isThisLoading
                  ? 'PREPARANDO VOZ...'
                  : isThisPlaying
                    ? 'PARAR DE OUVIR'
                    : label}
              </p>
              {(sublabel || isThisPlaying) && (
                <p className="text-[13px] text-white/90 font-medium leading-tight mt-0.5 truncate">
                  {isThisPlaying
                    ? playback.provider === 'elevenlabs'
                      ? 'Voz humana · ElevenLabs'
                      : playback.provider === 'gemini'
                        ? 'Voz natural · Gemini'
                        : 'Lendo em voz alta...'
                    : sublabel}
                </p>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={onToggleRate}
            aria-label={rate === 'slow' ? 'Voz devagar ativada. Toque para normal' : 'Velocidade normal. Toque para falar mais devagar'}
            className="min-h-[48px] px-3 rounded-[14px] bg-white/18 hover:bg-white/28 text-white text-[13px] font-bold shrink-0 cursor-pointer"
          >
            {rate === 'slow' ? '🐢 Devagar' : 'Normal'}
          </button>
        </div>
      </div>

      {!hasNaturalVoiceKey && (
        <button
          type="button"
          onClick={onOpenVoiceSettings}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-[#1E40AF] text-[13.5px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Ativar voz humana real (ElevenLabs / Gemini)</span>
        </button>
      )}
    </div>
  );
}

interface AccessibleSpeakButtonProps {
  sectionId: string;
  playback: VoicePlaybackState;
  onClick: () => void;
  ariaLabel: string;
}

/**
 * Unmistakable solid blue 48x48 circular speaker button on every card (WCAG AAA target & contrast).
 */
export function QuietListenButton({
  sectionId,
  playback,
  onClick,
  ariaLabel,
}: AccessibleSpeakButtonProps) {
  const isLoading = playback.status === 'loading' && playback.sectionId === sectionId;
  const isPlaying = playback.status === 'playing' && playback.sectionId === sectionId;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isPlaying}
      className={`w-12 h-12 rounded-full inline-flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer ${
        isPlaying
          ? 'bg-[#B91C1C] text-white ring-4 ring-[#FECACA]'
          : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isPlaying ? (
        <Square className="w-4.5 h-4.5 fill-current" />
      ) : (
        <Volume2 className="w-6 h-6 stroke-[2.4]" />
      )}
    </button>
  );
}
