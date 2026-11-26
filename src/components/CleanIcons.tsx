'use client';

import {
  Activity,
  AlertTriangle,
  Ban,
  Calendar,
  Car,
  CigaretteOff,
  Clock,
  Coffee,
  Droplets,
  Heart,
  Moon,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Utensils,
  WineOff,
  Zap,
} from 'lucide-react';
import type { BulaIconType } from '@/types/medication';

interface CleanIconProps {
  type: BulaIconType;
  tone?: 'sage' | 'rose' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
}

const TONE_MAP = {
  sage: 'bg-[#E6F2EF] text-[#146356]',
  rose: 'bg-[#FEECEF] text-[#BE123C]',
  amber: 'bg-[#FEF3DD] text-[#B45309]',
  neutral: 'bg-[#F0ECE4] text-[#44403C]',
};

export function CleanIcon({ type, tone = 'sage', size = 'md' }: CleanIconProps) {
  const box = size === 'sm' ? 'w-10 h-10 rounded-2xl' : 'w-12 h-12 rounded-2xl';
  const iconCls = size === 'sm' ? 'w-5 h-5 stroke-[2]' : 'w-5.5 h-5.5 stroke-[2]';

  const renderIcon = () => {
    switch (type) {
      case 'pill':
        return <Pill className={iconCls} />;
      case 'clock':
        return <Clock className={iconCls} />;
      case 'calendar':
        return <Calendar className={iconCls} />;
      case 'water':
      case 'drops':
        return <Droplets className={iconCls} />;
      case 'food':
        return <Utensils className={iconCls} />;
      case 'fasting':
        return <Coffee className={iconCls} />;
      case 'no-smoking':
        return <CigaretteOff className={iconCls} />;
      case 'no-alcohol':
      case 'no-juice':
        return <WineOff className={iconCls} />;
      case 'cuts-effect':
      case 'no-crush':
      case 'pregnant-no':
      case 'no-driving':
        return <Ban className={iconCls} />;
      case 'vomit-warning':
      case 'stomach-ache':
      case 'bloating':
      case 'alert-triangle':
        return <AlertTriangle className={iconCls} />;
      case 'sun-warning':
        return <Sun className={iconCls} />;
      case 'heart-check':
        return <Heart className={iconCls} />;
      case 'car-ok':
        return <Car className={iconCls} />;
      case 'sleep':
      case 'fatigue':
        return <Moon className={iconCls} />;
      case 'doctor':
        return <Stethoscope className={iconCls} />;
      case 'time-fast':
        return <Zap className={iconCls} />;
      case 'shield-check':
      case 'stomach-ok':
        return <ShieldCheck className={iconCls} />;
      case 'headache':
      case 'dizziness':
      case 'taste':
        return <Activity className={iconCls} />;
      default:
        return <Sparkles className={iconCls} />;
    }
  };

  return (
    <span
      className={`${box} ${TONE_MAP[tone]} inline-flex items-center justify-center shrink-0`}
      aria-hidden="true"
    >
      {renderIcon()}
    </span>
  );
}
