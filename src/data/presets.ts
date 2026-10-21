export interface PresetProfile {
  id: string;
  name: string;
  role: string;
  clearance: string; // e.g. "10"
  badgeNumber: string; // e.g. "TS-001-000"
  photoUrl: string | null;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'tony-stark',
    name: 'TONY STARK',
    role: 'CEO/OWNER',
    clearance: '10',
    badgeNumber: 'TS-001-000',
    photoUrl: '/presets/tony_stark.png',
  },
  {
    id: 'virginia-potts',
    name: 'VIRGINIA POTTS',
    role: 'CHIEF EXECUTIVE OFFICER',
    clearance: '10',
    badgeNumber: 'VP-002-000',
    photoUrl: '/presets/pepper_potts.png',
  },
  {
    id: 'peter-parker',
    name: 'PETER PARKER',
    role: 'RESEARCH INTERN',
    clearance: '3',
    badgeNumber: 'SI-118-PP',
    photoUrl: '/presets/peter_parker.png',
  },
];
