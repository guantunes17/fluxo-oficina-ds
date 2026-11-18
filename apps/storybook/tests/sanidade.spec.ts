import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Prova que a regra de contraste está ligada: uma página com texto cinza claro sobre branco precisa falhar.
test('o axe detecta contraste ruim (controle negativo)', async ({ page }) => {
  await page.setContent('<main><p style="color:#bbbbbb;background:#ffffff">texto de baixo contraste</p></main>')
  const r = await new AxeBuilder({ page }).analyze()
  expect(r.violations.map((v) => v.id)).toContain('color-contrast')
})
