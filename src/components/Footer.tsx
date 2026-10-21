import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-4 px-4 text-center mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-slate-500">
        <span>STARK INDUSTRIES IDENTIFICATION SYSTEM</span>
        <span className="text-slate-400">FICTIONAL PROP CREDENTIAL</span>
        <span>INSPIRED BY IRON MAN (2008)</span>
      </div>
    </footer>
  );
};
