import { defineConfig } from '@playwright/test';

export const PORT = 8799;

export default defineConfig({
  testDir: 'tests',
  timeout: 90_000,
  // The live test resets the single shared room, so runs can't overlap.
  workers: 1,
  use: { baseURL: `http://127.0.0.1:${PORT}` },
  webServer: {
    // Own port and storage, so a run never touches a `wrangler dev` you have open.
    command: `npx wrangler dev --port ${PORT} --var PRESENTER_KEY:dev --persist-to .wrangler/test-state`,
    cwd: 'worker',
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
