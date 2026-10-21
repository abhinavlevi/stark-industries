import React from 'react';

interface BrandMarkProps {
  className?: string;
  themeColor?: 'navy' | 'white' | 'cyan';
  variant?: 'stacked' | 'horizontal';
}

/**
 * Authentic Stark Industries logo rendering the exact official brandmark
 * with complete uncropped pointed chevron wing, perfectly recolored for
 * dark navy banners (white) and light card backs (navy) with 100% transparent backgrounds.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  themeColor = 'white',
  variant = 'stacked',
}) => {
  const logoSrc =
    variant === 'horizontal'
      ? themeColor === 'navy'
        ? '/presets/stark_logo_horiz_navy.png'
        : '/presets/stark_logo_horiz_white.png'
      : themeColor === 'navy'
      ? '/presets/stark_logo_stacked_navy.png'
      : '/presets/stark_logo_stacked_white.png';

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Stark Industries"
    >
      <img
        src={logoSrc}
        alt="Stark Industries"
        className="w-full h-auto object-contain pointer-events-none select-none"
      />
    </div>
  );
};
