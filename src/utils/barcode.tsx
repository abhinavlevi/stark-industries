import React from 'react';

interface BarcodeProps {
  value: string;
  className?: string;
  height?: number;
  showText?: boolean;
  color?: string;
}

/**
 * High-fidelity vector barcode generator simulating Code-128 / Code-39 barcode patterns
 * for cinema prop cards. Uses deterministic hash-based bar generation to guarantee
 * distinct, crisp barcode representations for any input string.
 */
export const Barcode: React.FC<BarcodeProps> = ({
  value,
  className = '',
  height = 36,
  showText = true,
  color = 'currentColor',
}) => {
  // Deterministic bar widths based on input string
  const cleanVal = (value || 'SI-000-00').toUpperCase().replace(/[^A-Z0-9-]/g, '');
  
  // Create deterministic sequence of bar widths (1, 2, 3) and spaces (1, 2, 3)
  const bars: { width: number; isBar: boolean }[] = [];
  
  // Start guard pattern
  bars.push({ width: 2, isBar: true });
  bars.push({ width: 1, isBar: false });
  bars.push({ width: 2, isBar: true });
  bars.push({ width: 2, isBar: false });

  let hash = 0;
  for (let i = 0; i < cleanVal.length; i++) {
    hash = (hash * 31 + cleanVal.charCodeAt(i)) & 0xffffffff;
  }

  // Generate bars for each character
  for (let i = 0; i < cleanVal.length; i++) {
    const charCode = cleanVal.charCodeAt(i);
    const pattern = (charCode ^ (i * 7) ^ hash) & 0x7f;
    // 6 elements per character (3 bars, 3 spaces)
    bars.push({ width: 1 + (pattern & 1), isBar: true });
    bars.push({ width: 1 + ((pattern >> 1) & 1), isBar: false });
    bars.push({ width: 1 + ((pattern >> 2) & 1) + ((pattern >> 5) & 1), isBar: true });
    bars.push({ width: 1 + ((pattern >> 3) & 1), isBar: false });
    bars.push({ width: 1 + ((pattern >> 4) & 1), isBar: true });
    bars.push({ width: 1, isBar: false });
  }

  // Stop guard pattern
  bars.push({ width: 2, isBar: true });
  bars.push({ width: 1, isBar: false });
  bars.push({ width: 3, isBar: true });

  const totalWidth = bars.reduce((acc, b) => acc + b.width, 0);

  let currentX = 0;
  const barElements = bars.map((bar, index) => {
    const x = currentX;
    currentX += bar.width;
    if (!bar.isBar) return null;
    return (
      <rect
        key={index}
        x={x}
        y={0}
        width={bar.width}
        height={height}
        fill={color}
        shapeRendering="crispEdges"
      />
    );
  });

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full h-auto max-h-12 overflow-visible"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {barElements}
      </svg>
      {showText && (
        <span
          className="font-mono text-[9px] tracking-[0.25em] text-center mt-0.5 opacity-90 uppercase font-semibold"
          style={{ color }}
        >
          *{cleanVal}*
        </span>
      )}
    </div>
  );
};
