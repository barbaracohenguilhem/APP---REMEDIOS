import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import type { VoicePreferences } from '../types/medication';

interface HeaderProps {
  title: string;
  showBackButton: boolean;
  onBackClick: () => void;
  voice: VoicePreferences;
  isSpeaking: boolean;
  onToggleVoice: () => void;
  onToggleVoiceRate: () => void;
  onStopSpeaking: () => void;
}

export function Header({
  title,
  showBackButton,
  onBackClick,
  voice,
  isSpeaking,
  onToggleVoice,
  onToggleVoiceRate,
  onStopSpeaking,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 px-3 min-[360px]:px-4 pt-3 pb-2.5 shrink-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-[360px]:gap-2.5 min-w-0">
          {showBackButton && (
            <button
              type="button"
              onClick={onBackClick}
              aria-label="Voltar para Meus Remédios"
              className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 -ml-1.5 inline-flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 stroke-[2.25]" />
            </button>
          )}
          <h1 className="text-[19px] min-[360px]:text-[22px] font-extrabold tracking-tight text-[#1E293B] truncate">
            {title}
          </h1>
        </div>

        <button
          type="button"
          onClick={onToggleVoice}
          aria-pressed={voice.enabled}
          aria-label={voice.enabled ? 'Desativar leitura em voz alta' : 'Ativar leitura em voz alta'}
          className={`inline-flex items-center gap-1 min-[360px]:gap-1.5 px-2.5 min-[360px]:px-3.5 py-1.5 min-[360px]:py-2 rounded-full text-xs min-[360px]:text-sm font-bold transition-all active:scale-95 cursor-pointer shrink-0 ${
            voice.enabled
              ? 'bg-[#D6F5E3] text-[#057A55] ring-1 ring-[#A7F3D0]'
              : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
          }`}
        >
          {voice.enabled ? (
            <>
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
              <span>Voz ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 stroke-[2.5]" />
              <span>Voz OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Live audio reading bar (appears automatically while reading aloud OR offers slow speed when voice ON) */}
      {isSpeaking && (
        <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3 py-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
              <span className="w-1 h-4 bg-blue-600 rounded-full animate-wave-1" />
              <span className="w-1 h-4 bg-blue-600 rounded-full animate-wave-2" />
              <span className="w-1 h-4 bg-blue-600 rounded-full animate-wave-3" />
            </div>
            <span className="text-xs font-bold text-blue-900 truncate">
              Lendo em voz alta ({voice.rate === 'slow' ? 'Devagar' : 'Normal'})
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onToggleVoiceRate}
              className="px-2 py-1 rounded-lg bg-white text-blue-800 border border-blue-200 text-[11px] font-bold hover:bg-blue-100 cursor-pointer"
            >
              {voice.rate === 'slow' ? '🐢 Devagar' : '⚡ Normal'}
            </button>
            <button
              type="button"
              onClick={onStopSpeaking}
              className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 cursor-pointer"
            >
              Parar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
