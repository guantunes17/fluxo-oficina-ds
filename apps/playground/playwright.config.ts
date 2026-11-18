import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 90_000,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:6008',
    // Usa o Google Chrome instalado na máquina, sem baixar navegador.
    channel: 'chrome',
    viewport: { width: 430, height: 4600 },
  },
  webServer: { command: 'node tests/serve.mjs', url: 'http://127.0.0.1:6008/', reuseExistingServer: true, timeout: 30_000 },
})
