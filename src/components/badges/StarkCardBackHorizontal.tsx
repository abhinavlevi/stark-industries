import React from 'react';
import { BrandMark } from '../BrandMark';
import { HolographicSeal } from '../HolographicSeal';
import { SmartChip } from '../SmartChip';
import { Radio } from 'lucide-react';

export const StarkCardBackHorizontal: React.FC = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] text-[#1E293B] p-5">
      {/* Background Arc-Reactor Watermark in subtle, non-intrusive light gray */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.05 }}>
        <svg
          viewBox="0 0 500 315"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="157" r="130" stroke="#64748B" strokeWidth="1" strokeDasharray="5 3" />
          <circle cx="250" cy="157" r="100" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="250" cy="157" r="70" stroke="#64748B" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Top Header: Stark Logo in navy */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-2">
        <BrandMark themeColor="navy" className="w-[170px]" />
        <span className="font-mono text-[7px] text-slate-400 uppercase tracking-widest">
          FACILITY ACCESS CREDENTIAL
        </span>
      </div>

      {/* Center Layout: Left Access Statement + Right Chip/Hologram Block */}
      <div className="relative z-10 flex items-center justify-between gap-6 my-auto py-2">
        {/* Left Notice */}
        <div className="flex-1 space-y-2">
          <p className="text-[9.5px] leading-relaxed font-bold tracking-tight text-[#1E293B]">
            The bearer of this identification card is a STARK INDUSTRIES employee and is to be afforded a level of access required by their job title and the current security policy.
          </p>
          <p className="text-[8px] leading-normal font-extrabold tracking-wider text-[#0F172A] uppercase">
            PLEASE IMMEDIATELY RETURN THIS TO THE HUMAN RESOURCES DEPARTMENT.
          </p>
        </div>

        {/* Right Navy Block with Hologram & Gold Smart Chip */}
        <div className="w-[190px] h-16 bg-[#091E3A] rounded-md flex items-center justify-around px-3 shadow-md shrink-0">
          <HolographicSeal size="sm" label="AUTHENTIC" className="shadow-sm" />
          <SmartChip className="shadow-sm" />
        </div>
      </div>

      {/* Bottom Proximity Sensor & Disclaimer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[#0077B6]" />
          <div>
            <span className="font-sans font-bold text-[9px] tracking-wide block leading-none">
              Proximity Card
            </span>
            <span className="text-[7px] text-[#64748B] block leading-none mt-0.5">
              Hold Near Door Security Sensors For Access
            </span>
          </div>
        </div>

        <span className="text-[6.5px] font-mono text-[#94A3B8] tracking-widest uppercase">
          FICTIONAL PROP CREDENTIAL
        </span>
      </div>
    </div>
  );
};
