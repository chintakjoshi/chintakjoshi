/// <reference types="vite/client" />

interface Window {
  goatcounter?: {
    count: (options?: {
      path?: string;
      title?: string;
      event?: boolean;
    }) => void;
  };
}
