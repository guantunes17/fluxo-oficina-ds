import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync } from 'node:fs'

// Percorre cada história nos temas claro e escuro, com a regra de contraste LIGADA,
// e guarda um screenshot de cada uma em tests/screenshots (fora do git).
const temas = ['light', 'dark'] as const
mkdirSync('tests/screenshots', { recursive: true })

// Regras desligadas, e por quê:
// - region: exige que todo conteúdo esteja num marco (landmark) da página. Cada história mostra um componente
//   isolado, e o marco é responsabilidade do app que o usa.
// - aria-hidden-focus, só nas histórias com sobreposição aberta (Select aberto): o Radix marca o resto da página
//   como aria-hidden de propósito e prende o foco dentro da lista, então o gatilho não é alcançável pelo teclado.
const REGRAS_DESLIGADAS_GERAL = ['region']
const REGRAS_DESLIGADAS_POR_HISTORIA: Record<string, string[]> = {
  'componentes-select--aberto': ['aria-hidden-focus'],
}

interface Entrada { id: string; type: string; title: string; name: string }

test.describe('contraste e acessibilidade no Chrome', () => {
  let historias: Entrada[] = []

  test.beforeAll(async ({ request }) => {
    const resposta = await request.get('/index.json')
    const indice = (await resposta.json()) as { entries: Record<string, Entrada> }
    historias = Object.values(indice.entries).filter((e) => e.type === 'story')
  })

  test('há uma história por componente', () => {
    const componentes = new Set(historias.map((h) => h.title))
    expect(componentes.size).toBeGreaterThanOrEqual(34)
  })

  for (const tema of temas) {
    test(`todas as histórias passam no axe no tema ${tema}`, async ({ page }) => {
      const falhas: string[] = []
      for (const h of historias) {
        await page.goto(`/iframe.html?id=${h.id}&viewMode=story&globals=theme:${tema}`)
        await page.waitForSelector('body.sb-show-main', { timeout: 15_000 })
        await page.waitForTimeout(250)
        await page.screenshot({ path: `tests/screenshots/${h.id}--${tema}.png` })
        const desligadas = [...REGRAS_DESLIGADAS_GERAL, ...(REGRAS_DESLIGADAS_POR_HISTORIA[h.id] ?? [])]
        const resultado = await new AxeBuilder({ page }).include('body').disableRules(desligadas).analyze()
        for (const v of resultado.violations)
          falhas.push(`[${tema}] ${h.title} / ${h.name}: ${v.id} (${v.impact}) em ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)
      }
      expect(falhas, falhas.join('\n')).toEqual([])
    })
  }
})
