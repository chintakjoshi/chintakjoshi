const gifPlaybackTimers = new WeakMap<HTMLImageElement, number>();
const gifDurationCache = new Map<string, number>();
const DEFAULT_GIF_DURATION_MS = 4000;

function parseGifDurationMs(bytes: Uint8Array): number | null {
  if (bytes.length < 13) return null;

  const header = String.fromCharCode(...bytes.slice(0, 6));
  if (header !== 'GIF87a' && header !== 'GIF89a') return null;

  let index = 6;
  index += 4;
  const packedField = bytes[index++];
  index += 2;

  if (packedField & 0x80) {
    const globalColorTableSize = 3 * 2 ** ((packedField & 0x07) + 1);
    index += globalColorTableSize;
  }

  let totalDelayCs = 0;

  while (index < bytes.length) {
    const blockId = bytes[index++];

    if (blockId === 0x3b) break;

    if (blockId === 0x21) {
      const extensionLabel = bytes[index++];

      if (extensionLabel === 0xf9) {
        const blockSize = bytes[index++];
        if (blockSize !== 4 || index + 4 > bytes.length) return null;

        index += 1;
        const delayCs = bytes[index] + (bytes[index + 1] << 8);
        totalDelayCs += delayCs > 0 ? delayCs : 10;
        index += 2;
        index += 1;
        index += 1;
      } else {
        while (index < bytes.length) {
          const subBlockSize = bytes[index++];
          if (subBlockSize === 0) break;
          index += subBlockSize;
        }
      }

      continue;
    }

    if (blockId === 0x2c) {
      if (index + 9 > bytes.length) return null;
      const imagePacked = bytes[index + 8];
      index += 9;

      if (imagePacked & 0x80) {
        const localColorTableSize = 3 * 2 ** ((imagePacked & 0x07) + 1);
        index += localColorTableSize;
      }

      index += 1;
      while (index < bytes.length) {
        const subBlockSize = bytes[index++];
        if (subBlockSize === 0) break;
        index += subBlockSize;
      }

      continue;
    }

    return null;
  }

  if (!totalDelayCs) return null;
  return totalDelayCs * 10;
}

async function getGifDurationMs(gifUrl: string): Promise<number> {
  if (gifDurationCache.has(gifUrl)) {
    return gifDurationCache.get(gifUrl) as number;
  }

  try {
    const response = await fetch(gifUrl, { cache: 'force-cache' });
    if (!response.ok) throw new Error('Failed to fetch GIF');

    const bytes = new Uint8Array(await response.arrayBuffer());
    const durationMs = parseGifDurationMs(bytes);
    if (!durationMs) throw new Error('Could not parse GIF duration');

    gifDurationCache.set(gifUrl, durationMs);
    return durationMs;
  } catch {
    gifDurationCache.set(gifUrl, DEFAULT_GIF_DURATION_MS);
    return DEFAULT_GIF_DURATION_MS;
  }
}

export async function playGifPreview(img: HTMLImageElement, gifUrl: string): Promise<void> {
  const resolvedGifUrl = new URL(gifUrl, window.location.href).href;

  if (!img.dataset.staticSrc) {
    img.dataset.staticSrc = img.currentSrc || img.src;
  }

  const existingTimer = gifPlaybackTimers.get(img);
  if (existingTimer) {
    window.clearTimeout(existingTimer);
  }

  if (img.src !== resolvedGifUrl) {
    img.src = resolvedGifUrl;
  }

  const durationMs = await getGifDurationMs(resolvedGifUrl);

  const resetTimer = window.setTimeout(() => {
    if (img.dataset.staticSrc) {
      img.src = img.dataset.staticSrc;
    }
    gifPlaybackTimers.delete(img);
  }, durationMs * 2);

  gifPlaybackTimers.set(img, resetTimer);
}
