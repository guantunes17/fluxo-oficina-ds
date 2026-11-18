// Confere o contraste WCAG dos pares de cor declarados em tokens.json, nos dois temas.
// Texto precisa de 4,5:1 e elemento de interface de 3:1. Sai com código 1 se algum par reprovar.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { resolverTema } from './resolver.mjs'

export function luminancia(hex) {
  const n = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function razao(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

export function conferir(tokens) {
  const resultados = []
  for (const tema of ['light', 'dark']) {
    const cores = resolverTema(tokens, tema)
    for (const tipo of ['text', 'ui']) {
      const minimo = tokens.contrast[tipo]
      for (const [frente, fundo] of tokens.contrast.pairs[tipo]) {
        if (!(frente in cores) || !(fundo in cores)) continue
        const r = razao(cores[frente], cores[fundo])
        resultados.push({ tema, tipo, frente, fundo, razao: Math.round(r * 100) / 100, minimo, ok: r >= minimo })
      }
    }
  }
  return resultados
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const aqui = dirname(fileURLToPath(import.meta.url))
  const tokens = JSON.parse(readFileSync(join(aqui, '..', 'src', 'tokens.json'), 'utf8'))
  const res = conferir(tokens)
  const falhas = res.filter((x) => !x.ok)
  for (const x of res) console.log(`${x.ok ? 'ok   ' : 'FALHA'} ${x.tema.padEnd(5)} ${x.tipo.padEnd(4)} ${x.frente} sobre ${x.fundo}: ${x.razao}:1 (mínimo ${x.minimo})`)
  console.log(`\n${res.length} pares conferidos, ${falhas.length} reprovado(s).`)
  process.exit(falhas.length ? 1 : 0)
}
