const gifPlaybackTimers = new WeakMap();
const gifDurationCache = new Map();
const DEFAULT_GIF_DURATION_MS = 4000;

function parseGifDurationMs(bytes) {
  if (bytes.length < 13) return null;

  const header = String.fromCharCode(...bytes.slice(0, 6));
  if (header !== "GIF87a" && header !== "GIF89a") return null;

  let index = 6;
  index += 4; // Logical screen width/height
  const packedField = bytes[index++];
  index += 2; // Background + pixel aspect ratio

  if (packedField & 0x80) {
    const globalColorTableSize = 3 * (2 ** ((packedField & 0x07) + 1));
    index += globalColorTableSize;
  }

  let totalDelayCs = 0;

  while (index < bytes.length) {
    const blockId = bytes[index++];

    if (blockId === 0x3B) break; // Trailer

    if (blockId === 0x21) {
      const extensionLabel = bytes[index++];

      if (extensionLabel === 0xF9) {
        const blockSize = bytes[index++];
        if (blockSize !== 4 || index + 4 > bytes.length) return null;

        index += 1; // Packed
        const delayCs = bytes[index] + (bytes[index + 1] << 8);
        totalDelayCs += delayCs > 0 ? delayCs : 10;
        index += 2; // Delay
        index += 1; // Transparent color index
        index += 1; // Terminator
      } else {
        while (index < bytes.length) {
          const subBlockSize = bytes[index++];
          if (subBlockSize === 0) break;
          index += subBlockSize;
        }
      }

      continue;
    }

    if (blockId === 0x2C) {
      if (index + 9 > bytes.length) return null;
      const imagePacked = bytes[index + 8];
      index += 9;

      if (imagePacked & 0x80) {
        const localColorTableSize = 3 * (2 ** ((imagePacked & 0x07) + 1));
        index += localColorTableSize;
      }

      index += 1; // LZW minimum code size
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

async function getGifDurationMs(gifUrl) {
  if (gifDurationCache.has(gifUrl)) {
    return gifDurationCache.get(gifUrl);
  }

  try {
    const response = await fetch(gifUrl, { cache: "force-cache" });
    if (!response.ok) throw new Error("Failed to fetch GIF");

    const bytes = new Uint8Array(await response.arrayBuffer());
    const durationMs = parseGifDurationMs(bytes);
    if (!durationMs) throw new Error("Could not parse GIF duration");

    gifDurationCache.set(gifUrl, durationMs);
    return durationMs;
  } catch (_) {
    gifDurationCache.set(gifUrl, DEFAULT_GIF_DURATION_MS);
    return DEFAULT_GIF_DURATION_MS;
  }
}

async function toggleGif(event, gifUrl) {
  event.preventDefault();

  const img = event.target.querySelector("img") ?? event.target;
  const resolvedGifUrl = new URL(gifUrl, window.location.href).href;

  if (!img.dataset.staticSrc) {
    img.dataset.staticSrc = img.currentSrc || img.src;
  }

  const existingTimer = gifPlaybackTimers.get(img);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  if (img.src !== resolvedGifUrl) {
    img.src = resolvedGifUrl;
  }

  const durationMs = await getGifDurationMs(resolvedGifUrl);

  const resetTimer = setTimeout(() => {
    img.src = img.dataset.staticSrc;
    gifPlaybackTimers.delete(img);
  }, durationMs * 2);

  gifPlaybackTimers.set(img, resetTimer);
}

const copyButtonLabel = "Copy markdown";

// you can use a class selector instead if you, or the syntax highlighting library adds one to the 'pre'. 
let blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("button");
    button.innerText = copyButtonLabel;
    button.addEventListener("click", copyCode);
    block.appendChild(button);
  }
});

async function copyCode(event) {
  const button = event.srcElement;
  const pre = button.parentElement;
  let code = pre.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  
  button.innerText = "Copied!";
  
  setTimeout(()=> {
    button.innerText = copyButtonLabel;
  },2000)
}
