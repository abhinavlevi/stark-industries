import React from 'react';
import { EmployeeProfile } from '../../types/badge';
import { BrandMark } from '../BrandMark';
import { HolographicSeal } from '../HolographicSeal';
import { SmartChip } from '../SmartChip';
import { Radio } from 'lucide-react';

interface StarkCardBackProps {
  profile: EmployeeProfile;
}

export const StarkCardBack: React.FC<StarkCardBackProps> = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] text-[#1E293B] p-5">
      {/* Background Arc-Reactor Circular Watermark in subtle light silver-gray */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.05 }}>
        <svg
          viewBox="0 0 320 490"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="160" cy="180" r="140" stroke="#64748B" strokeWidth="1" strokeDasharray="5 3" />
          <circle cx="160" cy="180" r="110" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="160" cy="180" r="80" stroke="#64748B" strokeWidth="0.8" />
          <circle cx="160" cy="180" r="50" stroke="#64748B" strokeWidth="1.5" strokeDasharray="10 5" />
          <line x1="160" y1="30" x2="160" y2="330" stroke="#64748B" strokeWidth="0.75" />
          <line x1="10" y1="180" x2="310" y2="180" stroke="#64748B" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Top Header: Stark Industries Logo in dark navy */}
      <div className="relative z-10 flex flex-col items-center pt-2">
        <BrandMark themeColor="navy" className="w-[190px]" />
      </div>

      {/* Middle Text: Exact access notice paragraph from movie prop reference */}
      <div className="relative z-10 px-3 my-auto text-center space-y-3 font-sans">
        <p className="text-[9.5px] leading-relaxed font-bold tracking-tight text-[#1E293B]">
          The bearer of this identification card is a STARK INDUSTRIES employee and is to be afforded a level of access required by their job title and the current security policy.
        </p>

        <p className="text-[8px] leading-normal font-extrabold tracking-wider text-[#0F172A] uppercase pt-1">
          PLEASE IMMEDIATELY RETURN THIS TO THE HUMAN RESOURCES DEPARTMENT.
        </p>
      </div>

      {/* Lower Section: Horizontal Dark Navy Stripe with Holographic Seal + Gold Smart Chip */}
      <div className="relative z-10 -mx-5 my-2">
        <div className="w-full h-14 bg-[#091E3A] flex items-center justify-between px-6 shadow-sm">
          {/* Holographic Seal */}
          <HolographicSeal size="md" label="AUTHENTIC" className="shadow-md" />

          {/* Gold Microchip Contact Pad */}
          <SmartChip className="shadow-md" />
        </div>
      </div>

      {/* Bottom Proximity Sensor & Disclaimer */}
      <div className="relative z-10 flex flex-col items-center text-center pb-1">
        <div className="flex items-center gap-1.5 text-[#0F172A]">
          <Radio className="w-3.5 h-3.5 text-[#0077B6]" />
          <span className="font-sans font-bold text-[10px] tracking-wide">
            Proximity Card
          </span>
        </div>
        <span className="text-[7.5px] text-[#64748B] font-medium tracking-wide mt-0.5">
          Hold Near Door Security Sensors For Access
        </span>

        <span className="text-[6.5px] font-mono text-[#94A3B8] tracking-widest uppercase mt-3">
          FICTIONAL PROP CREDENTIAL
        </span>
      </div>
    </div>
  );
};
