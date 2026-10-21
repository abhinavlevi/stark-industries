import React from 'react';
import { EmployeeProfile } from '../../types/badge';
import { BrandMark } from '../BrandMark';
import { Barcode } from '../../utils/barcode';
import { Camera } from 'lucide-react';

interface StarkCardFrontHorizontalProps {
  profile: EmployeeProfile;
}

export const StarkCardFrontHorizontal: React.FC<StarkCardFrontHorizontalProps> = ({ profile }) => {
  const name = (profile.name || 'TONY STARK').toUpperCase();
  const role = (profile.role || 'CEO/OWNER').toUpperCase();
  const level = profile.clearance || '10';
  const code = (profile.badgeNumber || 'TS-001-000').toUpperCase();

  return (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] text-[#091E3A] p-5">
      {/* Background Arc-Reactor Watermark in subtle light gray */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.05 }}>
        <svg
          viewBox="0 0 500 315"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="360" cy="155" r="142" stroke="#64748B" strokeWidth="1" strokeDasharray="5 3" />
          <circle cx="360" cy="155" r="110" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="360" cy="155" r="75" stroke="#64748B" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Top Header: Dark Navy Stark Industries Logo */}
      <div className="relative z-10 w-full flex items-center justify-between pb-2 border-b border-slate-200">
        <BrandMark themeColor="navy" className="w-[170px]" />
        <span className="font-mono text-[7.5px] font-bold tracking-widest text-[#0077B6] uppercase">
          FACILITY ACCESS IDENTIFICATION
        </span>
      </div>

      {/* Main Content: Left Portrait with Attached Nameplate + Right Security Details */}
      <div className="relative z-10 flex-1 flex items-center justify-between px-2 py-2 gap-5 my-auto">
        {/* Left: Framed Portrait + Nameplate */}
        <div className="w-[145px] shrink-0 rounded-md overflow-hidden shadow-xs flex flex-col border border-slate-200 bg-white">
          <div className="w-full h-[148px] relative bg-slate-100 overflow-hidden">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={name}
                crossOrigin="anonymous"
                className="w-full h-full object-cover select-none pointer-events-none"
                style={{
                  transform: `scale(${profile.photoZoom}) translate(${profile.photoPositionX}%, ${profile.photoPositionY}%)`,
                  transformOrigin: 'center center',
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-2 text-center">
                <Camera className="w-6 h-6 opacity-60 mb-1" />
                <span className="font-mono text-[8px] uppercase font-bold tracking-wider">
                  NO PORTRAIT
                </span>
              </div>
            )}
          </div>

          {/* Integrated Solid White Nameplate */}
          <div className="w-full bg-white px-2 py-2 text-center border-t border-slate-100">
            <h2 className="font-sans font-black text-[13.5px] tracking-tight leading-tight text-[#091E3A] truncate">
              {name}
            </h2>
            <p className="font-sans font-bold text-[9px] tracking-wide text-[#0077B6] leading-tight truncate mt-0.5">
              {role}
            </p>
          </div>
        </div>

        {/* Right: Security Classification & Barcode */}
        <div className="flex-1 flex flex-col justify-center text-right pl-4">
          <div className="mb-2">
            <span className="font-mono text-[8px] tracking-[0.25em] text-[#0077B6] uppercase block font-bold">
              AUTHORIZATION LEVEL
            </span>
            <span className="font-sans font-black text-[32px] tracking-tight text-[#091E3A] leading-none">
              LEVEL {level}
            </span>
          </div>

          <div className="font-mono text-[8px] text-[#0077B6] tracking-wider uppercase mb-2 font-bold">
            &lt;&lt;&lt;Security level&lt;&lt;&lt;{level}&gt;&gt;&gt; CODE {code}&gt;&gt;&gt;&gt;&gt;
          </div>

          {/* Barcode in dark navy */}
          <div className="w-full flex justify-end">
            <div className="w-[215px]">
              <Barcode
                value={code}
                height={32}
                showText={false}
                color="#091E3A"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Stripe */}
      <div className="relative z-10 w-full pt-2 border-t border-slate-200 flex items-center justify-between text-[7px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-black font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          <span>STARK INDUSTRIES IDENTIFICATION</span>
        </div>
        <span className="tracking-widest uppercase">AUTHORIZED ACCESS ONLY</span>
      </div>
    </div>
  );
};
