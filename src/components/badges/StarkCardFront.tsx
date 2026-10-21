import React from 'react';
import { EmployeeProfile } from '../../types/badge';
import { BrandMark } from '../BrandMark';
import { Barcode } from '../../utils/barcode';
import { Camera } from 'lucide-react';

interface StarkCardFrontProps {
  profile: EmployeeProfile;
}

export const StarkCardFront: React.FC<StarkCardFrontProps> = ({ profile }) => {
  const name = (profile.name || 'TONY STARK').toUpperCase();
  const role = (profile.role || 'CEO/OWNER').toUpperCase();
  const level = profile.clearance || '10';
  const code = (profile.badgeNumber || 'TS-001-000').toUpperCase();

  return (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-[#0284C7] via-[#0077B6] to-[#034078] text-white">
      {/* Background Arc-Reactor HUD Graphics matching reference photo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 320 490"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Concentric Arc Reactor Circles centered behind upper body */}
          <circle cx="160" cy="205" r="148" stroke="#00D9FF" strokeWidth="1" strokeDasharray="5 3" opacity="0.75" />
          <circle cx="160" cy="205" r="138" stroke="#38BDF8" strokeWidth="2.5" opacity="0.45" />
          <circle cx="160" cy="205" r="124" stroke="#00D9FF" strokeWidth="1.2" opacity="0.9" />
          <circle cx="160" cy="205" r="102" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
          <circle cx="160" cy="205" r="76" stroke="#00D9FF" strokeWidth="1.8" strokeDasharray="16 6" opacity="0.5" />
          <circle cx="160" cy="205" r="48" stroke="#00D9FF" strokeWidth="0.8" opacity="0.4" />

          {/* Sweeping Outer Arc Tracks on Left & Right */}
          <path d="M 0 110 A 180 180 0 0 1 120 380" stroke="#00D9FF" strokeWidth="1.5" opacity="0.6" />
          <path d="M 0 130 A 160 160 0 0 1 90 350" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />

          {/* Right Border Vertical Telemetry Ladder (visible in reference photo) */}
          <g transform="translate(294, 150)" opacity="0.8">
            <rect x="0" y="0" width="14" height="84" stroke="#00D9FF" strokeWidth="1.2" fill="none" />
            <line x1="0" y1="12" x2="14" y2="12" stroke="#00D9FF" strokeWidth="1" />
            <line x1="0" y1="24" x2="14" y2="24" stroke="#00D9FF" strokeWidth="1" />
            <line x1="0" y1="36" x2="14" y2="36" stroke="#00D9FF" strokeWidth="1" />
            <line x1="0" y1="48" x2="14" y2="48" stroke="#00D9FF" strokeWidth="1" />
            <line x1="0" y1="60" x2="14" y2="60" stroke="#00D9FF" strokeWidth="1" />
            <line x1="0" y1="72" x2="14" y2="72" stroke="#00D9FF" strokeWidth="1" />
            <text x="2" y="80" fill="#00D9FF" fontSize="5" fontFamily="monospace" transform="rotate(-90 2,80)">
              0000
            </text>
          </g>

          {/* Radial tick marks */}
          <line x1="160" y1="45" x2="160" y2="62" stroke="#00D9FF" strokeWidth="2" opacity="0.8" />
          <line x1="288" y1="205" x2="305" y2="205" stroke="#00D9FF" strokeWidth="2" opacity="0.8" />
          <line x1="15" y1="205" x2="32" y2="205" stroke="#00D9FF" strokeWidth="2" opacity="0.8" />
        </svg>
      </div>

      {/* Top Header Banner: Dark Navy with Authentic Stark Industries Logo */}
      <div className="relative z-10 w-full pt-3 pb-2.5 px-4 bg-[#081C36] border-b-2 border-white/90 shadow-sm flex items-center justify-center">
        <BrandMark themeColor="white" className="w-[195px]" />
      </div>

      {/* Center Section: Framed Portrait + Attached Solid White Nameplate */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-[185px] rounded-t-sm overflow-hidden shadow-lg flex flex-col">
          {/* Photo Frame */}
          <div className="w-full h-[270px] relative bg-[#081C36] overflow-hidden border border-white/40 border-b-0 shadow-sm">
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#081C36] to-[#041224] text-cyan-300 p-2 text-center">
                <Camera className="w-8 h-8 opacity-70 mb-1" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-wider">
                  NO PORTRAIT
                </span>
                <span className="text-[8px] opacity-80 mt-0.5">Click upload to add</span>
              </div>
            )}
          </div>

          {/* Integrated Solid White Nameplate directly under the photo */}
          <div className="w-full bg-white px-3 py-2.5 text-center shadow-md">
            <h2 className="font-sans font-black text-[18px] tracking-tight leading-none text-[#0B1528] truncate">
              {name}
            </h2>
            <p className="font-sans font-bold text-[11px] tracking-wide text-[#0077B6] mt-1 leading-none truncate">
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Security Code String + Full-Width Barcode */}
      <div className="relative z-10 w-full bg-[#061528] pt-2 pb-2.5 px-4 flex flex-col items-center border-t-2 border-cyan-400/40">
        {/* Security level code string matching reference: <<<Security level<<<10>>> CODE TS-001-000>>>>> */}
        <div className="font-mono text-[7.5px] text-white tracking-wider uppercase mb-1 font-bold">
          &lt;&lt;&lt;Security level&lt;&lt;&lt;{level}&gt;&gt;&gt; CODE {code}&gt;&gt;&gt;&gt;&gt;
        </div>

        {/* Full-width crisp Code-128 barcode */}
        <div className="w-full max-w-[275px]">
          <Barcode
            value={code}
            height={34}
            showText={false}
            color="#FFFFFF"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
