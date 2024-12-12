import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 60000,
  },
});
