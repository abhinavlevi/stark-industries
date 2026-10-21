export type BadgeSide = 'front' | 'back';
export type BadgeOrientation = 'vertical' | 'horizontal';

export interface EmployeeProfile {
  name: string;
  role: string;
  clearance: string; // e.g. "10"
  badgeNumber: string; // e.g. "TS-001-000"
  photoUrl: string | null;
  photoZoom: number; // 1.0 to 2.5
  photoPositionX: number; // -40 to +40
  photoPositionY: number; // -40 to +40
  orientation: BadgeOrientation; // 'vertical' | 'horizontal'
  showHolderClip: boolean; // clear lanyard clip sleeve preview
}
