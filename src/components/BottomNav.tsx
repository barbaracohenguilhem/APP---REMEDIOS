import { AlarmClock, ArrowLeftRight, BookOpen, Camera } from 'lucide-react';
import type { ActiveTab } from '../types/medication';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  pendingDosesCount: number;
}

export function BottomNav({
  activeTab,
  onSelectTab,
  pendingDosesCount,
}: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="sticky bottom-0 z-30 shrink-0 bg-white border-t border-slate-200 px-2 pt-1.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(15,23,42,0.06)]"
    >
      <div className="grid grid-cols-4 items-end">
        {/* Entender */}
        <button
          type="button"
          onClick={() => onSelectTab('entender')}
          aria-current={activeTab === 'entender' ? 'page' : undefined}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'entender' ? 'text-[#0D9488]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {activeTab === 'entender' && (
            <span className="absolute -top-1.5 w-12 h-1 rounded-full bg-[#0D9488]" />
          )}
          <BookOpen className={`w-6 h-6 ${activeTab === 'entender' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className={`text-xs mt-1 ${activeTab === 'entender' ? 'font-extrabold' : 'font-semibold'}`}>
            Entender
          </span>
        </button>

        {/* Comparar */}
        <button
          type="button"
          onClick={() => onSelectTab('comparar')}
          aria-current={activeTab === 'comparar' ? 'page' : undefined}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'comparar' ? 'text-[#0D9488]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {activeTab === 'comparar' && (
            <span className="absolute -top-1.5 w-12 h-1 rounded-full bg-[#0D9488]" />
          )}
          <ArrowLeftRight className={`w-6 h-6 ${activeTab === 'comparar' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className={`text-xs mt-1 ${activeTab === 'comparar' ? 'font-extrabold' : 'font-semibold'}`}>
            Comparar
          </span>
        </button>

        {/* Horários */}
        <button
          type="button"
          onClick={() => onSelectTab('horarios')}
          aria-current={activeTab === 'horarios' ? 'page' : undefined}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'horarios' ? 'text-[#0D9488]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {activeTab === 'horarios' && (
            <span className="absolute -top-1.5 w-12 h-1 rounded-full bg-[#0D9488]" />
          )}
          <div className="relative">
            <AlarmClock className={`w-6 h-6 ${activeTab === 'horarios' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
            {pendingDosesCount > 0 && (
              <span
                aria-label={`${pendingDosesCount} doses pendentes`}
                className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white"
              >
                {pendingDosesCount > 9 ? '9+' : pendingDosesCount}
              </span>
            )}
          </div>
          <span className={`text-xs mt-1 ${activeTab === 'horarios' ? 'font-extrabold' : 'font-semibold'}`}>
            Horários
          </span>
        </button>

        {/* Adicionar (Elevated circular teal camera button matching mockup) */}
        <button
          type="button"
          onClick={() => onSelectTab('adicionar')}
          aria-current={activeTab === 'adicionar' ? 'page' : undefined}
          className="relative flex flex-col items-center justify-center pb-1.5 cursor-pointer group"
        >
          <span
            className={`-mt-7 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-95 ${
              activeTab === 'adicionar'
                ? 'bg-[#0F766E] ring-4 ring-teal-200'
                : 'bg-[#0D9488] hover:bg-[#0F766E]'
            }`}
          >
            <Camera className="w-7 h-7 stroke-[2.2]" />
          </span>
          <span
            className={`text-xs mt-1 ${
              activeTab === 'adicionar' ? 'font-extrabold text-[#0D9488]' : 'font-semibold text-slate-600'
            }`}
          >
            Adicionar
          </span>
        </button>
      </div>
    </nav>
  );
}
