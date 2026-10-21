import { BadgeSide, BadgeOrientation, EmployeeProfile } from '../types/badge';

export function serializeBadgeToUrl(
  side: BadgeSide,
  profile: EmployeeProfile
): string {
  const params = new URLSearchParams();
  params.set('side', side);
  params.set('format', profile.orientation);
  if (profile.name) params.set('name', profile.name);
  if (profile.role) params.set('role', profile.role);
  if (profile.clearance) params.set('level', profile.clearance);
  if (profile.badgeNumber) params.set('code', profile.badgeNumber);

  const url = new URL(window.location.href);
  url.search = params.toString();
  return url.toString();
}

export function deserializeBadgeFromUrl(): Partial<EmployeeProfile & { side: BadgeSide }> | null {
  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('name') && !params.has('code') && !params.has('level')) {
      return null;
    }

    const rawSide = params.get('side');
    const side: BadgeSide = rawSide === 'back' ? 'back' : 'front';

    const rawFormat = params.get('format');
    const orientation: BadgeOrientation = rawFormat === 'horizontal' ? 'horizontal' : 'vertical';

    return {
      side,
      orientation,
      name: params.get('name') || '',
      role: params.get('role') || '',
      clearance: params.get('level') || '10',
      badgeNumber: params.get('code') || 'TS-001-000',
    };
  } catch {
    return null;
  }
}
