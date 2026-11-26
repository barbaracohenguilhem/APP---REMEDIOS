import { Square, Volume2 } from 'lucide-react';

interface SpeakButtonProps {
  isSpeaking: boolean;
  onClick: () => void;
  ariaLabel: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function SpeakButton({
  isSpeaking,
  onClick,
  ariaLabel,
  size = 'md',
  className = '',
}: SpeakButtonProps) {
  const dims = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={isSpeaking ? `Parar leitura: ${ariaLabel}` : ariaLabel}
      title={isSpeaking ? 'Parar leitura' : ariaLabel}
      className={`${dims} inline-flex items-center justify-center rounded-full shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer ${
        isSpeaking
          ? 'bg-rose-600 text-white ring-4 ring-rose-200'
          : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
      } ${className}`}
    >
      {isSpeaking ? (
        <Square className="w-4 h-4 fill-current" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
