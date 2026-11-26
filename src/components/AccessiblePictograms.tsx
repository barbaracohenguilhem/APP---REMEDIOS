'use client';

import type { BulaIconType } from '@/types/medication';

interface AccessiblePictogramProps {
  type: BulaIconType;
  size?: number;
}

/**
 * Large, crisp, unmistakable pictorial icons engineered for low-literacy and non-reading users.
 * Every prohibition carries a bold universal red circle-slash; every warning carries a clear amber triangle;
 * every "how to take" action carries a clean, unmistakable everyday object.
 */
export function AccessiblePictogram({ type, size = 56 }: AccessiblePictogramProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    'aria-hidden': true as const,
    className: 'shrink-0 select-none',
  };

  switch (type) {
    case 'pill':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#D1FAE5" />
          <g transform="rotate(-38 32 32)">
            <rect x="13" y="21" width="38" height="22" rx="11" fill="#FFFFFF" stroke="#065F46" strokeWidth="2.8" />
            <path d="M32 21H40C46.075 21 51 25.925 51 32C51 38.075 46.075 43 40 43H32V21Z" fill="#EC4899" />
            <line x1="32" y1="21" x2="32" y2="43" stroke="#065F46" strokeWidth="2.4" />
          </g>
        </svg>
      );

    case 'clock':
    case 'time-fast':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#DBEAFE" />
          <circle cx="32" cy="32" r="20" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="3" />
          <line x1="32" y1="20" x2="32" y2="32" stroke="#1E3A8A" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="32" y1="32" x2="41" y2="36" stroke="#1D4ED8" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="32" cy="32" r="2.8" fill="#1E3A8A" />
        </svg>
      );

    case 'calendar':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
          <rect x="14" y="17" width="36" height="33" rx="7" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.8" />
          <path d="M14 25C14 20.58 17.58 17 22 17H42C46.42 17 50 20.58 50 25V27H14V25Z" fill="#0284C7" />
          <line x1="24" y1="12" x2="24" y2="20" stroke="#0369A1" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="40" y1="12" x2="40" y2="20" stroke="#0369A1" strokeWidth="3.2" strokeLinecap="round" />
          <rect x="20" y="32" width="6" height="6" rx="1.5" fill="#10B981" />
          <rect x="29" y="32" width="6" height="6" rx="1.5" fill="#10B981" />
          <rect x="38" y="32" width="6" height="6" rx="1.5" fill="#10B981" />
          <rect x="20" y="41" width="6" height="5" rx="1.5" fill="#CBD5E1" />
          <rect x="29" y="41" width="6" height="5" rx="1.5" fill="#CBD5E1" />
        </svg>
      );

    case 'water':
    case 'drops':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
          <path
            d="M32 13C32 13 18 28.5 18 38.5C18 46.2 24.3 52.5 32 52.5C39.7 52.5 46 46.2 46 38.5C46 28.5 32 13 32 13Z"
            fill="#38BDF8"
            stroke="#0369A1"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M25 39C25 43 28 46 32 46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'food':
    case 'fasting':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <circle cx="32" cy="33" r="17" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.8" />
          <circle cx="32" cy="33" r="10.5" fill="#FDE68A" />
          <line x1="12" y1="18" x2="12" y2="46" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <line x1="52" y1="18" x2="52" y2="46" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'no-smoking':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="28" fill="#FFFFFF" stroke="#DC2626" strokeWidth="5.5" />
          <rect x="14" y="31" width="24" height="7" rx="1.5" fill="#334155" />
          <rect x="14" y="31" width="9" height="7" rx="1.5" fill="#EA580C" />
          <path d="M42 27C44 24 41 21 43 18" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M47 28C49 25 46 22 48 19" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="14" x2="50" y2="50" stroke="#DC2626" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      );

    case 'no-alcohol':
    case 'no-juice':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="28" fill="#FFFFFF" stroke="#DC2626" strokeWidth="5.5" />
          <path d="M24 18H40L37 31C36.4 34 34.4 36 32 36C29.6 36 27.6 34 27 31L24 18Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
          <line x1="32" y1="36" x2="32" y2="46" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="25" y1="46" x2="39" y2="46" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="14" y1="14" x2="50" y2="50" stroke="#DC2626" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      );

    case 'cuts-effect':
    case 'no-crush':
    case 'pregnant-no':
    case 'no-driving':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="28" fill="#FFFFFF" stroke="#DC2626" strokeWidth="5.5" />
          <g transform="rotate(-35 28 29)">
            <rect x="17" y="23" width="22" height="12" rx="6" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
          </g>
          <path d="M35 42C35 32 43 26 49 25C49 33 44 43 35 42Z" fill="#16A34A" />
          <line x1="14" y1="14" x2="50" y2="50" stroke="#DC2626" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      );

    case 'vomit-warning':
    case 'stomach-ache':
    case 'bloating':
    case 'alert-triangle':
      return (
        <svg {...props}>
          <path
            d="M32 7L57 52C58.2 54.2 56.6 57 54 57H10C7.4 57 5.8 54.2 7 52L32 7Z"
            fill="#FBBF24"
            stroke="#92400E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="32" y1="24" x2="32" y2="39" stroke="#1C1917" strokeWidth="4.8" strokeLinecap="round" />
          <circle cx="32" cy="48" r="3.2" fill="#1C1917" />
        </svg>
      );

    case 'sun-warning':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <circle cx="32" cy="32" r="12" fill="#F59E0B" stroke="#B45309" strokeWidth="2.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="10"
              x2="32"
              y2="16"
              stroke="#D97706"
              strokeWidth="3.2"
              strokeLinecap="round"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
        </svg>
      );

    case 'car-ok':
    case 'shield-check':
    case 'heart-check':
    case 'stomach-ok':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#D1FAE5" />
          <circle cx="32" cy="32" r="20" fill="#059669" />
          <path d="M22 32.5L29 39.5L43 24.5" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'doctor':
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#DBEAFE" />
          <rect x="27" y="16" width="10" height="32" rx="3" fill="#DC2626" />
          <rect x="16" y="27" width="32" height="10" rx="3" fill="#DC2626" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <circle cx="32" cy="32" r="18" fill="#F59E0B" />
          <line x1="32" y1="22" x2="32" y2="35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="42" r="2.6" fill="#FFFFFF" />
        </svg>
      );
  }
}
