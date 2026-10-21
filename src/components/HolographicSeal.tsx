import React from 'react';

interface HolographicSealProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

/**
 * Iridescent holographic security seal component with subtle rainbow metallic shimmer,
 * micro-security text, and Stark arc-reactor geometry.
 */
export const HolographicSeal: React.FC<HolographicSealProps> = ({
  className = '',
  size = 'md',
  label = 'AUTHENTIC SECURE',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-7 text-[5px]',
    md: 'w-16 h-9 text-[6px]',
    lg: 'w-20 h-11 text-[7px]',
  }[size];

  return (
    <div
      className={`relative rounded-md overflow-hidden border border-white/25 shadow-inner flex items-center justify-center select-none ${sizeClasses} ${className}`}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(0,217,255,0.6) 25%, rgba(255,100,200,0.5) 50%, rgba(255,220,100,0.6) 75%, rgba(66,211,146,0.7) 100%)',
      }}
      title="Tamper-Evident Holographic Security Foil"
    >
      {/* Light sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-black/20" />

      {/* Hologram micro-pattern */}
      <div className="relative z-10 flex flex-col items-center justify-center text-slate-900/80 font-mono font-bold leading-tight uppercase tracking-wider text-center px-1">
        <svg
          viewBox="0 0 24 16"
          className="w-5 h-3 opacity-75 mb-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <polygon points="2,14 12,2 22,14" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span className="font-extrabold tracking-widest leading-none drop-shadow-sm">STARK</span>
        <span className="text-[4px] tracking-tight opacity-90 leading-none">{label}</span>
      </div>
    </div>
  );
};
