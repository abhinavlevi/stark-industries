import React from 'react';
import { BadgeSide, BadgeOrientation } from '../../types/badge';

interface BadgeShellProps {
  side: BadgeSide;
  orientation: BadgeOrientation;
  children: React.ReactNode;
  id?: string;
  className?: string;
  showHolderClip?: boolean;
}

export const BADGE_SIZES: Record<BadgeOrientation, { width: number; height: number }> = {
  vertical: { width: 320, height: 490 },
  horizontal: { width: 500, height: 335 },
};

/**
 * Shared physical badge container with exact PVC credit card dimensions,
 * rounded corners, and optional realistic lanyard clip sleeve.
 */
export const BadgeShell: React.FC<BadgeShellProps> = ({
  side,
  orientation,
  children,
  id = 'stark-industries-id-card',
  className = '',
  showHolderClip = false,
}) => {
  const { width, height } = BADGE_SIZES[orientation];

  return (
    <div className="relative flex flex-col items-center">
      {/* Optional Lanyard Clip & Holder Sleeve (Image 2 & 3 reference) */}
      {showHolderClip && (
        <div className="pointer-events-none flex flex-col items-center z-30 -mb-5 select-none">
          {/* Metal Spring Clip */}
          <div className="w-6 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-sm shadow-md border border-slate-500 flex flex-col items-center justify-between p-1">
            <div className="w-2 h-2 rounded-full bg-slate-600 border border-slate-400 shadow-inner" />
            <div className="w-4 h-1 bg-slate-500 rounded-xs" />
          </div>
          {/* Clear Vinyl Strap */}
          <div className="w-3.5 h-6 bg-white/70 backdrop-blur-xs border-x border-slate-300/80 shadow-xs flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-500" />
          </div>
        </div>
      )}

      {/* Holder Frame (if enabled) */}
      <div
        className={`relative transition-all ${
          showHolderClip
            ? 'p-3 pt-6 rounded-[22px] bg-white/30 backdrop-blur-md border border-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.18)]'
            : ''
        }`}
      >
        {/* Top slot hole in holder */}
        {showHolderClip && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-slate-800/20 border border-white/80 shadow-inner" />
        )}

        {/* The Exact Capture Target ID Badge */}
        <div
          id={id}
          data-badge-side={side}
          data-badge-orientation={orientation}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            minWidth: `${width}px`,
            minHeight: `${height}px`,
            maxWidth: `${width}px`,
            maxHeight: `${height}px`,
            backgroundColor: orientation === 'horizontal' ? '#F8FAFC' : (side === 'front' ? '#0077B6' : '#F8FAFC'),
          }}
          className={`relative overflow-hidden rounded-[16px] select-none font-sans border border-slate-300/70 shadow-2xl ${className}`}
        >
          {/* Subtle glossy card surface highlight reflection */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-20 mix-blend-overlay"
            style={{
              background:
                'linear-gradient(125deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.2) 100%)',
            }}
          />

          {/* Card Content */}
          <div className="relative w-full h-full z-10 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
