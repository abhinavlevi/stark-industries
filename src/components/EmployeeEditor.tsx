import React, { useRef } from 'react';
import { EmployeeProfile } from '../types/badge';
import { PRESET_PROFILES } from '../data/presets';
import { soundFx } from '../utils/audio';
import { Upload, RotateCcw, Camera, Sliders, Check } from 'lucide-react';

interface EmployeeEditorProps {
  profile: EmployeeProfile;
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onChangeField: <K extends keyof EmployeeProfile>(field: K, value: EmployeeProfile[K]) => void;
  onResetPosition: () => void;
}

export const EmployeeEditor: React.FC<EmployeeEditorProps> = ({
  profile,
  selectedPresetId,
  onSelectPreset,
  onChangeField,
  onResetPosition,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        soundFx.playClick();
        onChangeField('photoUrl', result);
        onResetPosition();
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Format Variation Selector: Exactly 2 variations (Vertical & Horizontal) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Badge Variation
        </label>
        <div className="grid grid-cols-2 gap-3">
          {/* Vertical Variation */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onChangeField('orientation', 'vertical');
            }}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
              profile.orientation === 'vertical'
                ? 'bg-blue-50/80 border-[#0077B6] text-[#0077B6] shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div
              className={`w-6 h-9 rounded-xs border flex flex-col justify-between p-0.5 shrink-0 ${
                profile.orientation === 'vertical'
                  ? 'border-[#0077B6] bg-[#0077B6]/15'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <div className="w-full h-1 bg-current opacity-70" />
              <div className="w-3 h-3.5 mx-auto bg-current opacity-40 rounded-2xs" />
              <div className="w-full h-1 bg-current opacity-50" />
            </div>
            <div>
              <span className="text-xs font-bold block">Vertical</span>
              <span className="text-[10px] text-slate-500 block">320 × 490 px</span>
            </div>
          </button>

          {/* Horizontal Variation */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onChangeField('orientation', 'horizontal');
            }}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
              profile.orientation === 'horizontal'
                ? 'bg-blue-50/80 border-[#0077B6] text-[#0077B6] shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div
              className={`w-9 h-6 rounded-xs border flex items-center justify-between p-0.5 shrink-0 ${
                profile.orientation === 'horizontal'
                  ? 'border-[#0077B6] bg-[#0077B6]/15'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <div className="w-3 h-4 bg-current opacity-40 rounded-2xs" />
              <div className="flex-1 h-full flex flex-col justify-around pl-1">
                <div className="w-full h-1 bg-current opacity-70" />
                <div className="w-3/4 h-1 bg-current opacity-50" />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold block">Horizontal</span>
              <span className="text-[10px] text-slate-500 block">500 × 335 px</span>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Character Presets */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Employee Profile
        </label>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_PROFILES.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onSelectPreset(preset.id);
                }}
                className={`relative flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-[#0077B6] text-[#0077B6] shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {/* Thumbnail Avatar */}
                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 mb-2 border border-slate-300/80 shrink-0">
                  {preset.photoUrl ? (
                    <img
                      src={preset.photoUrl}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                      <Camera className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <span className="text-xs font-bold leading-tight truncate w-full">
                  {preset.name}
                </span>
                <span className="text-[10px] text-slate-500 truncate w-full mt-0.5">
                  {preset.role}
                </span>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#0077B6] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Badge Form Fields */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
          Badge Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onChangeField('name', e.target.value.toUpperCase())}
              placeholder="e.g. TONY STARK"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#0077B6] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm font-semibold text-slate-900 uppercase"
            />
          </div>

          {/* Job Title / Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Title / Designation
            </label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => onChangeField('role', e.target.value.toUpperCase())}
              placeholder="e.g. CEO/OWNER"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#0077B6] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm font-semibold text-slate-900 uppercase"
            />
          </div>

          {/* Security Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Security Level
            </label>
            <input
              type="text"
              value={profile.clearance}
              onChange={(e) => onChangeField('clearance', e.target.value)}
              placeholder="e.g. 10"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#0077B6] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm font-semibold text-slate-900"
            />
          </div>

          {/* Badge Serial / Code */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Badge Serial Code
            </label>
            <input
              type="text"
              value={profile.badgeNumber}
              onChange={(e) => onChangeField('badgeNumber', e.target.value.toUpperCase())}
              placeholder="e.g. TS-001-000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#0077B6] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm font-mono font-semibold text-slate-900 uppercase"
            />
          </div>
        </div>
      </div>

      {/* 4. Portrait Photo Upload & Position Adjuster */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Portrait Photo
          </h3>
          {profile.photoUrl && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onChangeField('photoUrl', null);
                onResetPosition();
              }}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Remove Photo</span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload Employee Portrait Photo"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-[#0077B6] rounded-xl p-4 bg-slate-50/50 hover:bg-blue-50/20 transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-14 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                {profile.photoUrl ? 'Replace Photo' : 'Upload Your Photo'}
              </span>
              <Upload className="w-3.5 h-3.5 text-[#0077B6]" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Click to upload your own picture. Stays 100% private in your browser.
            </p>
          </div>
        </div>

        {profile.photoUrl && (
          <div className="pt-2 space-y-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#0077B6]" />
                Adjust Framing
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onResetPosition();
                }}
                className="text-[11px] text-[#0077B6] hover:underline cursor-pointer"
              >
                Reset Framing
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Zoom</span>
                <span className="font-semibold">{profile.photoZoom.toFixed(2)}×</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.05"
                value={profile.photoZoom}
                onChange={(e) => onChangeField('photoZoom', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Horizontal Offset</span>
                <span className="font-semibold">{profile.photoPositionX}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={profile.photoPositionX}
                onChange={(e) => onChangeField('photoPositionX', parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Vertical Offset</span>
                <span className="font-semibold">{profile.photoPositionY}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={profile.photoPositionY}
                onChange={(e) => onChangeField('photoPositionY', parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Lanyard Clip Toggle */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-800 block">
            Lanyard Clip Sleeve
          </span>
          <span className="text-xs text-slate-500 block">
            Preview badge inside a clear protective sleeve with clip
          </span>
        </div>
        <input
          type="checkbox"
          checked={profile.showHolderClip}
          onChange={(e) => onChangeField('showHolderClip', e.target.checked)}
          className="w-4 h-4 accent-[#0077B6] rounded cursor-pointer"
        />
      </div>
    </div>
  );
};
