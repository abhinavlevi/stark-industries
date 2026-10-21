// In-memory cache for processed transparent Stark Industries logo Data URLs
const logoCache = new Map<string, string>();

/**
 * Converts black-on-white Stark Industries logo into a crisp, transparent PNG DataURL
 * with custom fill color (pure white for navy banners, or dark navy for light backs).
 */
export async function getColoredLogoDataUrl(
  src: string,
  color: 'white' | 'navy' | 'cyan'
): Promise<string> {
  const cacheKey = `${src}_${color}`;
  if (logoCache.has(cacheKey)) {
    return logoCache.get(cacheKey)!;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(src);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Target RGB
      const [r, g, b] =
        color === 'white'
          ? [255, 255, 255]
          : color === 'cyan'
          ? [0, 217, 255]
          : [9, 30, 58]; // #091E3A

      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        
        // Calculate clean alpha: black pixels (logo) become fully opaque,
        // white pixels (background) become fully transparent.
        // Uses smoothstep curve for clean anti-aliasing.
        let alpha = 0;
        if (brightness < 240) {
          alpha = Math.round(((240 - brightness) / 240) * 255);
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = alpha;
      }

      ctx.putImageData(imgData, 0, 0);
      const resultUrl = canvas.toDataURL('image/png');
      logoCache.set(cacheKey, resultUrl);
      resolve(resultUrl);
    };

    img.onerror = () => {
      resolve(src);
    };
  });
}
