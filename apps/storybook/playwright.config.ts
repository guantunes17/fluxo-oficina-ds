import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:6007',
    // Usa o Google Chrome instalado na máquina, sem baixar navegador.
    channel: 'chrome',
    viewport: { width: 1024, height: 720 },
  },
  webServer: { command: 'node tests/serve.mjs', url: 'http://127.0.0.1:6007/index.json', reuseExistingServer: true, timeout: 30_000 },
})
