import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync } from 'node:fs'

// O playground nativo, renderizado pelo react-native-web no Chrome, com a regra de contraste LIGADA.
// Isto não substitui um aparelho: mostra a estrutura de acessibilidade e as cores, não o toque nem a fonte nativa.
mkdirSync('tests/screenshots', { recursive: true })

for (const tema of ['claro', 'escuro'] as const) {
  test(`catálogo nativo no tema ${tema}: sem violação de acessibilidade e contraste`, async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Catálogo FluxoOficina' })).toBeVisible({ timeout: 30_000 })
    if (tema === 'escuro') {
      await page.getByRole('button', { name: 'Tema escuro' }).click()
      await expect(page.getByRole('button', { name: 'Tema claro' })).toBeVisible()
    }
    await page.waitForTimeout(500)
    await page.screenshot({ path: `tests/screenshots/catalogo-${tema}.png` })
    const resultado = await new AxeBuilder({ page }).disableRules(['region', 'landmark-one-main', 'page-has-heading-one']).analyze()
    const falhas = resultado.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`)
    expect(falhas, falhas.join('\n')).toEqual([])
  })
}
