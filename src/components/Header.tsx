import React from 'react';
import { Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMuted, onToggleSound }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Stark Logo */}
        <div className="flex items-center gap-3">
          <BrandMark themeColor="navy" className="w-[145px]" />
          <div className="hidden sm:block h-5 w-[1px] bg-slate-200" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Security ID Generator
          </span>
        </div>

        {/* Right: Sound Toggle & Status */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#0077B6]" />
                <span className="text-[#0077B6] font-semibold">Sound On</span>
              </>
            )}
          </button>

          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
