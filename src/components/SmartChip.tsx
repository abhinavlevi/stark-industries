import React from 'react';

interface SmartChipProps {
  className?: string;
}

/**
 * Microcontroller contact pad (smart chip) rendering in authentic gold/brass metallic foil
 * with ISO/IEC 7816 contact pad traces.
 */
export const SmartChip: React.FC<SmartChipProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-11 h-8 rounded-[4px] border border-amber-600/40 relative overflow-hidden select-none shadow-sm ${className}`}
      style={{
        background: 'linear-gradient(135deg, #d4af37 0%, #f9d976 50%, #b8860b 100%)',
      }}
      aria-label="Integrated Cryptographic Access Chip"
    >
      {/* Contact pad traces */}
      <svg
        viewBox="0 0 44 32"
        className="w-full h-full opacity-80"
        fill="none"
        stroke="#593b02"
        strokeWidth="0.8"
      >
        {/* Central horizontal dividing line */}
        <line x1="0" y1="16" x2="44" y2="16" />
        {/* Vertical lines */}
        <line x1="14" y1="0" x2="14" y2="32" />
        <line x1="30" y1="0" x2="30" y2="32" />
        {/* Central pad */}
        <rect x="14" y="9" width="16" height="14" rx="2" strokeWidth="0.7" fill="#dfbe57" />
        <circle cx="22" cy="16" r="3" strokeWidth="0.6" />
      </svg>
    </div>
  );
};
