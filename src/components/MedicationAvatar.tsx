'use client';

import type { Medication } from '@/types/medication';

interface MedicationAvatarProps {
  medication: Pick<Medication, 'name' | 'pack' | 'category' | 'userPhotoUrl'>;
  photoOverride?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CATEGORY_SOFT_PALETTE: Record<string, { bg: string; fg: string; pill: string }> = {
  anticoncepcional: { bg: '#FCECF3', fg: '#9D174D', pill: '#EC4899' },
  diabetes: { bg: '#EBF3FE', fg: '#1D4ED8', pill: '#3B82F6' },
  pressao: { bg: '#E7F5F2', fg: '#115E59', pill: '#14B8A6' },
  estomago: { bg: '#F2EEFC', fg: '#6D28D9', pill: '#8B5CF6' },
  tireoide: { bg: '#FEF4E6', fg: '#B45309', pill: '#F59E0B' },
  dor_febre: { bg: '#EEF6FF', fg: '#0369A1', pill: '#0EA5E9' },
  antibiotico: { bg: '#FEEFF0', fg: '#BE123C', pill: '#F43F5E' },
  ansiedade_sono: { bg: '#EEF2FF', fg: '#4338CA', pill: '#6366F1' },
  colesterol: { bg: '#ECF7F1', fg: '#15803D', pill: '#22C55E' },
  alergia: { bg: '#FEF2F6', fg: '#BE185D', pill: '#EC4899' },
  outro: { bg: '#EFECE6', fg: '#44403C', pill: '#78716C' },
};

/**
 * Refined Apple Health–inspired medication visual.
 * Displays the user's actual captured box/pill photo when available, or a serene minimalist form glyph.
 */
export function MedicationAvatar({
  medication,
  photoOverride,
  size = 'md',
  className = '',
}: MedicationAvatarProps) {
  const photo = photoOverride || medication.userPhotoUrl;
  const palette = CATEGORY_SOFT_PALETTE[medication.category] ?? CATEGORY_SOFT_PALETTE.outro;

  const boxSize =
    size === 'sm'
      ? 'w-12 h-12 rounded-2xl'
      : size === 'lg'
        ? 'w-20 h-20 rounded-[26px]'
        : 'w-14 h-14 rounded-[18px]';

  if (photo) {
    return (
      <div
        className={`${boxSize} overflow-hidden shrink-0 border border-black/5 bg-[#EFECE6] shadow-xs ${className}`}
      >
        <img
          src={photo}
          alt={`Foto de ${medication.name}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const glyphScale = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';

  return (
    <div
      className={`${boxSize} shrink-0 flex items-center justify-center border border-black/[0.04] ${className}`}
      style={{ backgroundColor: palette.bg }}
      aria-hidden="true"
    >
      {medication.pack.style === 'drops-bottle' ? (
        <svg viewBox="0 0 32 32" className={glyphScale} fill="none">
          <path
            d="M16 4.5C16 4.5 8.5 13.4 8.5 19.2C8.5 23.4 11.9 26.8 16 26.8C20.1 26.8 23.5 23.4 23.5 19.2C23.5 13.4 16 4.5 16 4.5Z"
            fill={palette.pill}
            fillOpacity="0.22"
            stroke={palette.fg}
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M13 19.5C13 21.2 14.3 22.5 16 22.5"
            stroke={palette.fg}
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      ) : medication.pack.style === 'capsule-box' ? (
        <svg viewBox="0 0 32 32" className={glyphScale} fill="none">
          <g transform="rotate(-38 16 16)">
            <rect
              x="5.5"
              y="10.5"
              width="21"
              height="11"
              rx="5.5"
              fill="#FFFFFF"
              stroke={palette.fg}
              strokeWidth="2"
            />
            <path
              d="M16 10.5H21C24.0376 10.5 26.5 12.9624 26.5 16C26.5 19.0376 24.0376 21.5 21 21.5H16V10.5Z"
              fill={palette.pill}
              fillOpacity="0.85"
            />
            <line x1="16" y1="10.5" x2="16" y2="21.5" stroke={palette.fg} strokeWidth="1.8" />
          </g>
        </svg>
      ) : medication.category === 'anticoncepcional' ? (
        // Minimalist blister dot calendar motif (immediately recognizable for daily contraceptive)
        <svg viewBox="0 0 32 32" className={glyphScale} fill="none">
          <rect
            x="5"
            y="6"
            width="22"
            height="20"
            rx="5"
            fill="#FFFFFF"
            stroke={palette.fg}
            strokeWidth="1.9"
          />
          {[11, 16, 21].map((cx) =>
            [12, 19.5].map((cy) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="2.1"
                fill={cx === 21 && cy === 19.5 ? '#E2E8F0' : palette.pill}
                fillOpacity={cx === 21 && cy === 19.5 ? 1 : 0.85}
              />
            ))
          )}
        </svg>
      ) : (
        // Crisp minimalist scored round tablet (Apple Medications aesthetic)
        <svg viewBox="0 0 32 32" className={glyphScale} fill="none">
          <circle
            cx="16"
            cy="16"
            r="10.5"
            fill="#FFFFFF"
            stroke={palette.fg}
            strokeWidth="2"
          />
          <circle cx="16" cy="16" r="7.5" fill={palette.pill} fillOpacity="0.16" />
          <line
            x1="10.2"
            y1="21.8"
            x2="21.8"
            y2="10.2"
            stroke={palette.fg}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
