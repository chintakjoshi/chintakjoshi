import { useEffect, type RefObject } from 'react';

export function useStretchEffect(appRef: RefObject<HTMLElement | null>, isHomePage: boolean) {
  useEffect(() => {
    const app = appRef.current;

    if (!app) {
      return;
    }

    const canStretch = () => window.matchMedia('(min-width: 500px)').matches && !isHomePage;

    if (!canStretch()) {
      app.style.transform = 'scale(1, 1)';
      return;
    }

    const appWidth = app.offsetWidth || 1;
    let windowWidth = window.innerWidth;
    let debounceTimer: number | null = null;

    const resetTransform = () => {
      windowWidth = window.innerWidth;
      app.style.transform = 'scale(1, 1)';
    };

    const observer = new ResizeObserver((entries) => {
      if (!canStretch()) {
        resetTransform();
        return;
      }

      entries.forEach((entry) => {
        const newWidth = entry.contentRect.width;
        const scaleX = Math.max(0.01, (newWidth - windowWidth) / appWidth + 1);
        app.style.transform = `scale(${scaleX}, 1)`;

        if (debounceTimer) {
          window.clearTimeout(debounceTimer);
        }

        debounceTimer = window.setTimeout(() => {
          resetTransform();
          debounceTimer = null;
        }, 200);
      });
    });

    observer.observe(document.body);
    window.addEventListener('resize', resetTransform);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resetTransform);

      if (debounceTimer) {
        window.clearTimeout(debounceTimer);
      }

      app.style.transform = 'scale(1, 1)';
    };
  }, [appRef, isHomePage]);
}
