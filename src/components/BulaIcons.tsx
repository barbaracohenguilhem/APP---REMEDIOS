import type { BulaIconType } from '../types/medication';

interface BulaIconProps {
  type: BulaIconType;
  size?: number;
  className?: string;
}

export function BulaIcon({ type, size = 48, className = '' }: BulaIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    className: `shrink-0 ${className}`,
    'aria-hidden': true as const,
  };

  switch (type) {
    case 'pill':
      return (
        <svg {...props}>
          <g transform="rotate(-40 32 32)">
            <rect x="12" y="21" width="40" height="22" rx="11" fill="#FBCFE8" />
            <path d="M32 21 H41 A11 11 0 0 1 41 43 H32 Z" fill="#F472B6" />
            <rect x="17" y="25" width="11" height="4" rx="2" fill="#FFFFFF" opacity="0.7" />
          </g>
        </svg>
      );

    case 'clock':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3.5" />
          <circle cx="32" cy="32" r="17.5" fill="#F8FAFC" />
          <line x1="32" y1="18" x2="32" y2="32" stroke="#334155" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="32" y1="32" x2="41" y2="38" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="32" r="2.8" fill="#1E293B" />
        </svg>
      );

    case 'calendar':
      return (
        <svg {...props}>
          <rect x="11" y="14" width="42" height="39" rx="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
          <path d="M11 21 A7 7 0 0 1 18 14 H46 A7 7 0 0 1 53 21 V25 H11 Z" fill="#EF4444" />
          <rect x="20" y="9" width="4.5" height="10" rx="2.2" fill="#94A3B8" />
          <rect x="39.5" y="9" width="4.5" height="10" rx="2.2" fill="#94A3B8" />
          {[31, 39, 46].map((y, row) =>
            [18, 27, 36, 44].map((x, col) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="5.5"
                height="4.5"
                rx="1.2"
                fill={row === 2 && col >= 2 ? '#FCA5A5' : '#CBD5E1'}
              />
            ))
          )}
        </svg>
      );

    case 'no-smoking':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <rect x="16" y="34" width="24" height="7" rx="1.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
          <rect x="16" y="34" width="8" height="7" rx="1" fill="#F59E0B" />
          <rect x="41" y="34" width="4" height="7" rx="1" fill="#94A3B8" />
          <path d="M43 30 C41 25 46 23 43 18" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M47 29 C46 25 50 23 48 19" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <line x1="17" y1="17" x2="47" y2="47" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'cuts-effect':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <g transform="translate(-4 -2) rotate(-35 28 28)">
            <rect x="17" y="22" width="18" height="9" rx="4.5" fill="#EF4444" />
            <path d="M26 22 H30.5 A4.5 4.5 0 0 1 30.5 31 H26 Z" fill="#93C5FD" />
          </g>
          <path d="M35 45 C35 33 45 27 49 27 C49 36 44 45 35 45 Z" fill="#22C55E" />
          <line x1="36" y1="44" x2="46" y2="30" stroke="#166534" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="17" y1="47" x2="47" y2="17" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'vomit-warning':
      return (
        <svg {...props}>
          <path
            d="M32 9 L56 51 A3.5 3.5 0 0 1 53 56 H11 A3.5 3.5 0 0 1 8 51 L32 9 Z"
            fill="#FACC15"
            stroke="#B45309"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Clean anatomical stomach silhouette inside warning triangle */}
          <path
            d="M30 22 V28 C30 30.5 27 31 24.5 33.5 C21.5 36.5 21.5 42.5 24.5 46 C27.5 49.5 33.5 49.5 37.5 47 C41.5 44.5 42.5 39 40.5 34.5 C39 31.5 36 30.5 35.5 27.5 V25"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27.5 39.5 C29.5 37.5 32.5 37.5 34.5 39.5 C36 41 34.5 43.5 31.5 43.5"
            stroke="#FACC15"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'water':
      return (
        <svg {...props}>
          <path d="M18 14 H46 L42 52 A4 4 0 0 1 38 56 H26 A4 4 0 0 1 22 52 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.8" />
          <path d="M20.5 30 Q26 27 32 30 T43.5 30 L41.5 51 A3 3 0 0 1 38.5 54 H25.5 A3 3 0 0 1 22.5 51 Z" fill="#38BDF8" />
          <circle cx="29" cy="42" r="2.2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="36" cy="37" r="1.6" fill="#FFFFFF" opacity="0.7" />
        </svg>
      );

    case 'food':
      return (
        <svg {...props}>
          <circle cx="34" cy="34" r="18" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.8" />
          <circle cx="34" cy="34" r="11" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M12 16 V30 M9 16 V24 M15 16 V24 M12 30 V50" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="31" cy="33" r="3" fill="#22C55E" />
          <circle cx="37" cy="35" r="3.2" fill="#EF4444" />
          <circle cx="35" cy="29" r="2.5" fill="#F59E0B" />
        </svg>
      );

    case 'fasting':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="21" fill="#FEF9C3" stroke="#EAB308" strokeWidth="2.8" />
          <circle cx="32" cy="28" r="9" fill="#F59E0B" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="13"
              x2="32"
              y2="16.5"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 32 28)`}
            />
          ))}
          <rect x="16" y="42" width="32" height="5" rx="2.5" fill="#0EA5E9" />
        </svg>
      );

    case 'no-alcohol':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <path d="M24 18 H40 L37 31 A5 5 0 0 1 27 31 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.8" />
          <line x1="32" y1="36" x2="32" y2="47" stroke="#78350F" strokeWidth="2.4" />
          <line x1="25" y1="47" x2="39" y2="47" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="17" y1="17" x2="47" y2="47" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'no-crush':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <ellipse cx="32" cy="33" rx="14" ry="8" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
          <path d="M30 25 L34 31 L30 35 L33 41" stroke="#DC2626" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <line x1="17" y1="17" x2="47" y2="47" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'pregnant-no':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <circle cx="31" cy="20" r="4.5" fill="#475569" />
          <path d="M27 27 C27 27 37 28 38 35 C39 40 35 43 32 43 V49 H27 V27 Z" fill="#475569" />
          <line x1="17" y1="17" x2="47" y2="47" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'no-driving':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <rect x="17" y="31" width="30" height="11" rx="3" fill="#334155" />
          <path d="M21 31 L25 23 H39 L43 31 Z" fill="#64748B" />
          <circle cx="23" cy="43" r="3.5" fill="#0F172A" />
          <circle cx="41" cy="43" r="3.5" fill="#0F172A" />
          <line x1="17" y1="17" x2="47" y2="47" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'no-juice':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="23" fill="#FFF1F2" stroke="#DC2626" strokeWidth="4.5" />
          <circle cx="32" cy="35" r="12" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          <path d="M32 23 C35 17 40 17 42 19 C39 23 36 24 32 23 Z" fill="#22C55E" />
          <line x1="17" y1="17" x2="47" y2="47" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'heart-check':
      return (
        <svg {...props}>
          <path
            d="M32 52 C16 42 11 32 11 23 A11 11 0 0 1 32 18 A11 11 0 0 1 53 23 C53 32 48 42 32 52 Z"
            fill="#FB7185"
            stroke="#E11D48"
            strokeWidth="2.5"
          />
          <path d="M23 30 L29 36 L41 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'stomach-ok':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" />
          <path
            d="M29 19 V26 C29 29 23 30 23 37 C23 42 27 45 32 45 C38 45 41 40 40 34 C39 30 36 29 36 26"
            fill="#15803D"
          />
          <path d="M27 35 L31 39 L38 31" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'car-ok':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#DBEAFE" stroke="#2563EB" strokeWidth="3" />
          <rect x="17" y="31" width="30" height="10" rx="3" fill="#1D4ED8" />
          <path d="M21 31 L25 23 H39 L43 31 Z" fill="#60A5FA" />
          <circle cx="23" cy="42" r="3.2" fill="#1E293B" />
          <circle cx="41" cy="42" r="3.2" fill="#1E293B" />
        </svg>
      );

    case 'sleep':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="3" />
          <path d="M36 18 A13 13 0 1 0 46 39 A10 10 0 1 1 36 18 Z" fill="#4338CA" />
          <text x="36" y="27" fill="#4F46E5" fontSize="10" fontWeight="800">Z</text>
          <text x="43" y="21" fill="#6366F1" fontSize="8" fontWeight="800">z</text>
        </svg>
      );

    case 'bloating':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <circle cx="32" cy="34" r="12" fill="#FDBA74" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M14 34 H20 M16 31 L13 34 L16 37" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M50 34 H44 M48 31 L51 34 L48 37" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'stomach-ache':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3" />
          <path
            d="M29 19 V26 C29 29 23 30 23 37 C23 42 27 45 32 45 C38 45 41 40 40 34 C39 30 36 29 36 26"
            fill="#EA580C"
          />
          <path d="M28 33 L35 37 L29 41" stroke="#FEF08A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'headache':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" />
          <circle cx="32" cy="35" r="11" fill="#FCA5A5" stroke="#B91C1C" strokeWidth="2" />
          <path d="M22 18 L27 24 M42 18 L37 24 M32 14 V21" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'dizziness':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <path
            d="M32 32 m-12 0 a12 12 0 1 1 20 8 a8 8 0 1 1 -14 -4 a4 4 0 1 1 6 0"
            fill="none"
            stroke="#B45309"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'fatigue':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <rect x="19" y="25" width="23" height="14" rx="3" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="42" y="29" width="4" height="6" rx="1" fill="#0369A1" />
          <rect x="22" y="28" width="6" height="8" rx="1" fill="#EF4444" />
        </svg>
      );

    case 'taste':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="3" />
          <circle cx="25" cy="27" r="2.5" fill="#713F12" />
          <circle cx="39" cy="27" r="2.5" fill="#713F12" />
          <path d="M22 39 Q27 35 32 39 T42 39" stroke="#713F12" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'drops':
      return (
        <svg {...props}>
          <path d="M32 10 C32 10 48 29 48 39 A16 16 0 0 1 16 39 C16 29 32 10 32 10 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <path d="M24 40 A8 8 0 0 0 31 47" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'shield-check':
      return (
        <svg {...props}>
          <path d="M32 10 L50 17 V32 C50 44 41 52 32 55 C23 52 14 44 14 32 V17 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="3" />
          <path d="M24 33 L30 39 L41 26" stroke="#047857" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'doctor':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <rect x="28" y="19" width="8" height="26" rx="2.5" fill="#0284C7" />
          <rect x="19" y="28" width="26" height="8" rx="2.5" fill="#0284C7" />
        </svg>
      );

    case 'time-fast':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <polygon points="34,15 21,34 31,34 29,49 43,29 33,29" fill="#F59E0B" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );

    case 'sun-warning':
    case 'alert-triangle':
    default:
      return (
        <svg {...props}>
          <path
            d="M32 10 L55 51 A3 3 0 0 1 52.3 55.5 H11.7 A3 3 0 0 1 9 51 L32 10 Z"
            fill="#FACC15"
            stroke="#B45309"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="32" y1="25" x2="32" y2="39" stroke="#1E293B" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="32" cy="46.5" r="2.7" fill="#1E293B" />
        </svg>
      );
  }
}
