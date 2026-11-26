import type { Medication } from '../types/medication';

interface MedicinePackArtProps {
  pack: Medication['pack'];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MedicinePackArt({ pack, size = 'md', className = '' }: MedicinePackArtProps) {
  const dims =
    size === 'sm'
      ? 'w-14 h-11'
      : size === 'lg'
        ? 'w-28 h-20'
        : 'w-24 h-16';

  const stripeColor =
    pack.stripeType === 'preta'
      ? '#1E293B'
      : pack.stripeType === 'vermelha'
        ? '#DC2626'
        : pack.stripeType === 'amarela'
          ? '#F59E0B'
          : null;

  const displayLabel = pack.labelText.trim().slice(0, 11);
  const boxFontSize =
    displayLabel.length > 9
      ? '6.6'
      : displayLabel.length > 7
        ? '7.6'
        : displayLabel.length > 5
          ? '9.2'
          : '11';

  if (pack.style === 'drops-bottle') {
    const dropLabel = pack.labelText.trim().slice(0, 9);
    const dropFontSize = dropLabel.length > 7 ? '7.2' : '8.5';
    return (
      <svg
        viewBox="0 0 112 76"
        className={`${dims} shrink-0 select-none ${className}`}
        aria-hidden="true"
      >
        {/* Box behind */}
        <rect x="8" y="12" width="54" height="54" rx="6" fill={pack.primaryColor} stroke={pack.secondaryColor} strokeWidth="2" />
        <path d="M8 18 L18 12 H62 V66 H8 Z" fill={pack.primaryColor} />
        <rect x="8" y="48" width="54" height="7" fill={stripeColor ?? pack.secondaryColor} opacity={stripeColor ? 0.9 : 0.6} />
        <text
          x="13"
          y="33"
          fill={pack.accentColor}
          fontSize={dropFontSize}
          fontWeight="800"
          fontFamily="Inter, sans-serif"
          textLength={dropLabel.length > 7 ? '44' : undefined}
          lengthAdjust={dropLabel.length > 7 ? 'spacingAndGlyphs' : undefined}
        >
          {dropLabel}
        </text>
        <rect x="13" y="38" width="24" height="3" rx="1.5" fill={pack.accentColor} opacity="0.35" />

        {/* Dropper bottle on right */}
        <rect x="74" y="8" width="14" height="10" rx="3" fill="#475569" />
        <rect x="77" y="18" width="8" height="6" fill="#94A3B8" />
        <rect x="67" y="24" width="28" height="42" rx="7" fill="#78350F" opacity="0.88" />
        <rect x="70" y="32" width="22" height="24" rx="3" fill="#FFFFFF" />
        <rect x="70" y="49" width="22" height="4" fill={stripeColor ?? pack.accentColor} />
        <text x="72.5" y="43" fill="#1E293B" fontSize="5.5" fontWeight="700">
          GOTAS
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 112 76"
      className={`${dims} shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Blister pack peeking out on the right (just like the approved mockup) */}
      <rect
        x="62"
        y="14"
        width="44"
        height="48"
        rx="7"
        fill="#CBD5E1"
        stroke="#94A3B8"
        strokeWidth="1.5"
      />
      <rect x="65" y="17" width="38" height="42" rx="5" fill="#E2E8F0" />

      {pack.style === 'capsule-box' ? (
        <>
          {[24, 38, 52].map((cy) =>
            [74, 88, 97].slice(0, 2).map((cx) => (
              <g key={`${cx}-${cy}`}>
                <rect x={cx - 5} y={cy - 3.2} width="12" height="6.4" rx="3.2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.7" />
                <path d={`M${cx + 1} ${cy - 3.2} H${cx + 3.8} A3.2 3.2 0 0 1 ${cx + 3.8} ${cy + 3.2} H${cx + 1} Z`} fill={pack.pillColor} />
              </g>
            ))
          )}
        </>
      ) : (
        <>
          {[24, 38, 52].map((cy) =>
            [73, 84, 95].map((cx) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="4"
                fill="#FFFFFF"
                stroke="#94A3B8"
                strokeWidth="0.8"
              />
            ))
          )}
        </>
      )}

      {/* 3D Side Flap of Medicine Box */}
      <polygon
        points="6,17 16,10 16,64 6,58"
        fill={pack.secondaryColor}
      />

      {/* Front Face of Medicine Box */}
      <rect
        x="16"
        y="10"
        width="58"
        height="54"
        rx="4"
        fill={pack.primaryColor}
        stroke={pack.secondaryColor}
        strokeWidth="1.5"
      />

      {/* Soft diagonal design band */}
      <path
        d="M16 42 Q42 34 74 44 L74 64 L16 64 Z"
        fill={pack.secondaryColor}
        opacity="0.35"
      />

      {/* Subtle top stripe if tarja */}
      {stripeColor && (
        <rect
          x="16"
          y="53"
          width="58"
          height="5.5"
          fill={stripeColor}
          opacity="0.82"
        />
      )}

      {/* Medicine Label on Box (constrained strictly inside x=20..70 so long names never overflow) */}
      <text
        x="20"
        y="29"
        fill={pack.accentColor}
        fontSize={boxFontSize}
        fontWeight="800"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.2"
        textLength={displayLabel.length > 8 ? '49' : undefined}
        lengthAdjust={displayLabel.length > 8 ? 'spacingAndGlyphs' : undefined}
      >
        {displayLabel}
      </text>

      {/* Stylized sub-lines on box */}
      <rect x="20" y="36" width="32" height="3" rx="1.5" fill={pack.accentColor} opacity="0.3" />
      <rect x="20" y="42" width="22" height="2.5" rx="1.25" fill={pack.accentColor} opacity="0.22" />
      <circle cx="64" cy="43" r="3.8" fill={pack.pillColor} opacity="0.85" />
    </svg>
  );
}
