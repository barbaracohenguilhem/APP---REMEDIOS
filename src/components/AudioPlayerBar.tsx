'use client';

import { Loader2, Pause, Play, Sparkles, Volume2 } from 'lucide-react';
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
    <div className="rounded-[22px] bg-[#146356] text-white p-3.5 shadow-[0_10px_28px_rgba(20,99,86,0.22)]">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onPlayToggle}
          aria-label={isThisPlaying ? 'Pausar leitura' : label}
          className="w-12 h-12 rounded-full bg-white text-[#146356] hover:bg-[#F6F4EF] flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          {isThisLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isThisPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={onPlayToggle}
          className="flex-1 min-w-0 text-left cursor-pointer"
        >
          <p className="text-[15px] font-bold leading-tight tracking-tight">
            {isThisLoading
              ? 'Preparando voz natural...'
              : isThisPlaying
                ? 'Ouvindo agora...'
                : label}
          </p>
          <p className="text-[12.5px] text-white/75 mt-0.5 truncate">
            {isThisPlaying
              ? playback.provider === 'elevenlabs'
                ? 'Voz humana · ElevenLabs'
                : playback.provider === 'gemini'
                  ? 'Voz natural · Gemini'
                  : 'Voz do aparelho (conecte IA para voz humana)'
              : sublabel ??
                (hasNaturalVoiceKey
                  ? 'Explicação calma em português natural'
                  : 'Toque para ouvir em voz alta')}
          </p>
        </button>

        {isThisPlaying ? (
          <div className="flex items-end gap-[3px] h-5 pr-1 shrink-0" aria-hidden="true">
            <span className="w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-1" />
            <span className="w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-2" />
            <span className="w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-3" />
            <span className="w-[3px] h-5 bg-white/90 rounded-full animate-soft-wave-4" />
          </div>
        ) : (
          <button
            type="button"
            onClick={onToggleRate}
            aria-label="Alternar velocidade da voz"
            className="px-2.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
          >
            {rate === 'slow' ? '0.85×' : '1×'}
          </button>
        )}
      </div>

      {!hasNaturalVoiceKey && (
        <button
          type="button"
          onClick={onOpenVoiceSettings}
          className="mt-2.5 w-full py-2 px-3 rounded-xl bg-white/12 hover:bg-white/20 text-white/95 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Conectar ElevenLabs ou Gemini para voz 100% humana</span>
        </button>
      )}
    </div>
  );
}

interface QuietListenButtonProps {
  sectionId: string;
  playback: VoicePlaybackState;
  onClick: () => void;
  ariaLabel: string;
}

export function QuietListenButton({
  sectionId,
  playback,
  onClick,
  ariaLabel,
}: QuietListenButtonProps) {
  const isLoading = playback.status === 'loading' && playback.sectionId === sectionId;
  const isPlaying = playback.status === 'playing' && playback.sectionId === sectionId;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isPlaying}
      className={`w-10 h-10 rounded-full inline-flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer ${
        isPlaying
          ? 'bg-[#146356] text-white shadow-sm'
          : 'bg-[#F0ECE4] text-[#146356] hover:bg-[#E6F2EF]'
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPlaying ? (
        <Pause className="w-4 h-4 fill-current" />
      ) : (
        <Volume2 className="w-4.5 h-4.5 stroke-[2.1]" />
      )}
    </button>
  );
}
