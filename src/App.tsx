import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BadgeSide, EmployeeProfile } from './types/badge';
import { PRESET_PROFILES } from './data/presets';
import { deserializeBadgeFromUrl } from './utils/urlState';
import { soundFx } from './utils/audio';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EmployeeEditor } from './components/EmployeeEditor';
import { BadgePreview } from './components/BadgePreview';

export const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(() => soundFx.getMuted());
  const [currentSide, setCurrentSide] = useState<BadgeSide>('front');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('tony-stark');

  const defaultPreset = PRESET_PROFILES[0];
  const [profile, setProfile] = useState<EmployeeProfile>({
    name: defaultPreset.name,
    role: defaultPreset.role,
    clearance: defaultPreset.clearance,
    badgeNumber: defaultPreset.badgeNumber,
    photoUrl: defaultPreset.photoUrl,
    photoZoom: 1.0,
    photoPositionX: 0,
    photoPositionY: 0,
    orientation: 'vertical',
    showHolderClip: false,
  });

  // Restore badge from URL if present
  useEffect(() => {
    const shared = deserializeBadgeFromUrl();
    if (shared) {
      if (shared.side) setCurrentSide(shared.side);
      setProfile((prev) => ({
        ...prev,
        name: shared.name ?? prev.name,
        role: shared.role ?? prev.role,
        clearance: shared.clearance ?? prev.clearance,
        badgeNumber: shared.badgeNumber ?? prev.badgeNumber,
        orientation: shared.orientation ?? prev.orientation,
      }));
    }
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const target = PRESET_PROFILES.find((p) => p.id === presetId);
    if (!target) return;

    setProfile((prev) => ({
      ...prev,
      name: target.name,
      role: target.role,
      clearance: target.clearance,
      badgeNumber: target.badgeNumber,
      photoUrl: target.photoUrl,
      photoZoom: 1.0,
      photoPositionX: 0,
      photoPositionY: 0,
    }));
  };

  const handleChangeField = <K extends keyof EmployeeProfile>(
    field: K,
    value: EmployeeProfile[K]
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetPosition = () => {
    setProfile((prev) => ({
      ...prev,
      photoZoom: 1.0,
      photoPositionX: 0,
      photoPositionY: 0,
    }));
  };

  const handleToggleSide = () => {
    setCurrentSide((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-[#0077B6]">
      {/* Light Mode Header */}
      <Header isMuted={isMuted} onToggleSound={handleToggleSound} />

      {/* Main Studio Workspace */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Minimalist Editor */}
          <section className="lg:col-span-6 flex flex-col gap-6" aria-label="ID Configuration">
            <EmployeeEditor
              profile={profile}
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
              onChangeField={handleChangeField}
              onResetPosition={handleResetPosition}
            />
          </section>

          {/* Right Column: Live Badge Inspection Stage */}
          <section
            className="lg:col-span-6 lg:sticky lg:top-20 flex flex-col gap-4"
            aria-label="Live Badge Inspection"
          >
            <BadgePreview
              side={currentSide}
              profile={profile}
              onToggleSide={handleToggleSide}
            />
          </section>
        </div>
      </main>

      {/* Minimalist Footer */}
      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
