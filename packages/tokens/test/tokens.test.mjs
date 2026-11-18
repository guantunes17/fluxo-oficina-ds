import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { conferir } from '../scripts/contraste.mjs'
import { resolverTema } from '../scripts/resolver.mjs'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(join(raiz, 'src', 'tokens.json'), 'utf8'))

test('o build gera os três formatos', () => {
  execFileSync('node', [join(raiz, 'scripts', 'build.mjs')])
  for (const f of ['tokens.css', 'tailwind.css', 'native.css', 'global.css', 'tailwind.preset.cjs', 'theme.native.js', 'theme.native.d.ts'])
    assert.ok(existsSync(join(raiz, 'dist', f)), `falta dist/${f}`)
})

test('claro e escuro têm exatamente as mesmas chaves semânticas', () => {
  const claro = Object.keys(tokens.semantic.light).sort()
  const escuro = Object.keys(tokens.semantic.dark).sort()
  const faltamNoEscuro = claro.filter((k) => !escuro.includes(k))
  const sobramNoEscuro = escuro.filter((k) => !claro.includes(k))
  assert.deepEqual(faltamNoEscuro, [], 'faltam no escuro')
  assert.deepEqual(sobramNoEscuro, [], 'sobram no escuro')
})

test('toda referência semântica aponta para uma cor que existe', () => {
  assert.doesNotThrow(() => { resolverTema(tokens, 'light'); resolverTema(tokens, 'dark') })
})

test('o CSS e o tema nativo trazem a mesma lista de cores semânticas', () => {
  execFileSync('node', [join(raiz, 'scripts', 'build.mjs')])
  const css = readFileSync(join(raiz, 'dist', 'tokens.css'), 'utf8')
  const nativo = readFileSync(join(raiz, 'dist', 'theme.native.js'), 'utf8')
  const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  for (const nome of Object.keys(tokens.semantic.light)) {
    assert.match(css, new RegExp(`--${nome}:`), `CSS sem --${nome}`)
    assert.match(nativo, new RegExp(`"${camel(nome)}":`), `tema nativo sem ${camel(nome)}`)
  }
})

test('todo par de cor declarado passa no contraste WCAG', () => {
  const falhas = conferir(tokens).filter((r) => !r.ok)
  assert.deepEqual(falhas, [], falhas.map((f) => `${f.tema} ${f.frente}/${f.fundo} ${f.razao}`).join('; '))
})

test('native.css tem :root e .dark:root com as mesmas variáveis', () => {
  execFileSync('node', [join(raiz, 'scripts', 'build.mjs')])
  const css = readFileSync(join(raiz, 'dist', 'native.css'), 'utf8')
  const [claro, escuro] = css.split('.dark:root')
  for (const nome of Object.keys(tokens.semantic.light)) {
    assert.match(claro, new RegExp(`--${nome}:`), `native.css claro sem --${nome}`)
    assert.match(escuro, new RegExp(`--${nome}:`), `native.css escuro sem --${nome}`)
  }
})

test('o preset do Tailwind exporta cores semânticas por variável e as famílias do Inter', async () => {
  execFileSync('node', [join(raiz, 'scripts', 'build.mjs')])
  const { createRequire } = await import('node:module')
  const preset = createRequire(import.meta.url)(join(raiz, 'dist', 'tailwind.preset.cjs'))
  assert.equal(preset.theme.extend.colors.primary, 'var(--primary)')
  assert.equal(preset.theme.extend.fontFamily.sans[0], 'Inter_400Regular')
  assert.equal(preset.theme.extend.minHeight.touch, '44px')
})

test('a fonte padrão é sans serif e termina em sans-serif', () => {
  assert.equal(tokens.font.sans[0], 'Inter')
  assert.equal(tokens.font.sans.at(-1), 'sans-serif')
})
