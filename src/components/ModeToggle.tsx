import { useEffect } from 'react';
import { ThemeIcon } from './icons';

const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

type ColorMode = 'light' | 'dark';

function getCSSCustomProp(propKey: string): string {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  if (response.length) {
    response = response.replace(/'|"/g, '').trim();
  }

  return response;
}

function applySetting(passedSetting?: ColorMode) {
  const currentSetting = passedSetting || (localStorage.getItem(STORAGE_KEY) as ColorMode | null);

  if (currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    return;
  }

  document.documentElement.removeAttribute('data-user-color-scheme');
}

function toggleSetting(): ColorMode {
  let currentSetting = localStorage.getItem(STORAGE_KEY) as ColorMode | null;

  switch (currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);
  return currentSetting;
}

export function ModeToggle() {
  useEffect(() => {
    applySetting();
  }, []);

  return (
    <div className="mode-toggle">
      <button
        className="[ toggle-button ] [ js-mode-toggle ]"
        onClick={(event) => {
          event.preventDefault();
          applySetting(toggleSetting());
        }}
      >
        <span className="toggle-icon" aria-hidden="true">
          <ThemeIcon />
        </span>
        <span className="[ toggle-text ] [ js-mode-toggle-text ]">mode</span>
      </button>
    </div>
  );
}
