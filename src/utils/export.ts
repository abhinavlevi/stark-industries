import { toPng } from 'html-to-image';
import { BadgeSide, BadgeOrientation } from '../types/badge';
import { BADGE_SIZES } from '../components/badges/BadgeShell';
import { soundFx } from './audio';

export interface ExportBadgeOptions {
  cardElement: HTMLElement;
  side: BadgeSide;
  orientation: BadgeOrientation;
  badgeNumber: string;
}

export async function exportBadgeAsPng({
  cardElement,
  side,
  orientation,
  badgeNumber,
}: ExportBadgeOptions): Promise<string> {
  const { width: targetWidth, height: targetHeight } = BADGE_SIZES[orientation];

  soundFx.playAuthHum();

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue anyway
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 80));

  const dataUrl = await toPng(cardElement, {
    pixelRatio: 3,
    cacheBust: true,
    quality: 1.0,
    width: targetWidth,
    height: targetHeight,
    canvasWidth: targetWidth * 3,
    canvasHeight: targetHeight * 3,
    style: {
      transform: 'none',
      transformOrigin: '0 0',
      margin: '0',
      padding: '0',
      maxWidth: 'none',
      maxHeight: 'none',
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      boxShadow: 'none',
    },
  });

  const cleanBadgeNo = (badgeNumber || 'TS-001-000').replace(/[^a-zA-Z0-9-]/g, '_');
  const filename = `stark-id-${orientation}-${cleanBadgeNo}-${side}.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  soundFx.playSuccessChime();

  return filename;
}
