// Gera, a partir de src/tokens.json, os três formatos que os pacotes consomem:
//   dist/tokens.css        variáveis CSS (web e NativeWind), com :root e .dark
//   dist/tailwind.css      mapeamento Tailwind v4 (@theme inline)
//   dist/theme.native.js   tema em JavaScript para React Native (e o .d.ts)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolverTema } from './resolver.mjs'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = join(aqui, '..')
const tokens = JSON.parse(readFileSync(join(raiz, 'src', 'tokens.json'), 'utf8'))
const dist = join(raiz, 'dist')
mkdirSync(dist, { recursive: true })

const px = (n) => `${n}px`
const fonte = tokens.font.sans.map((f) => (/[\s-]/.test(f) && !f.startsWith('-') && f !== 'system-ui' ? `"${f}"` : f)).join(', ')
const claro = resolverTema(tokens, 'light')
const escuro = resolverTema(tokens, 'dark')

// ── tokens.css ─────────────────────────────────────────────
const paleta = []
for (const [escala, passos] of Object.entries(tokens.color))
  for (const [passo, hex] of Object.entries(passos)) paleta.push(`  --color-${escala}-${passo}: ${hex};`)

const bloco = (cores) => Object.entries(cores).map(([k, v]) => `  --${k}: ${v};`).join('\n')

const estrutura = [
  `  --font-sans: ${fonte};`,
  ...Object.entries(tokens.font.weight).map(([k, v]) => `  --font-weight-${k}: ${v};`),
  ...Object.entries(tokens.font.size).flatMap(([k, [t, l]]) => [`  --text-${k}: ${px(t)};`, `  --text-${k}--line-height: ${px(l)};`]),
  ...Object.entries(tokens.radius).map(([k, v]) => `  --radius-${k}: ${px(v)};`),
  ...Object.entries(tokens.spacing).map(([k, v]) => `  --space-${k}: ${px(v)};`),
  ...Object.entries(tokens.shadow).map(([k, v]) => `  --shadow-${k}: ${v};`),
  ...Object.entries(tokens.motion).map(([k, v]) => `  --motion-${k}: ${v}ms;`),
  ...Object.entries(tokens.touch).map(([k, v]) => `  --touch-${k}: ${px(v)};`),
  `  --radius: ${px(tokens.radius.md)};`,
].join('\n')

const css = `/* Gerado por scripts/build.mjs a partir de src/tokens.json. Não edite. */
:root {
${paleta.join('\n')}
${bloco(claro)}
${estrutura}
}

.dark {
${bloco(escuro)}
}
`
writeFileSync(join(dist, 'tokens.css'), css)

// ── tailwind.css ───────────────────────────────────────────
const mapaSemantico = Object.keys(claro).map((k) => `  --color-${k}: var(--${k});`)
const mapaPaleta = Object.entries(tokens.color).flatMap(([e, p]) => Object.keys(p).map((n) => `  --color-${e}-${n}: var(--color-${e}-${n});`))
const tailwind = `/* Gerado por scripts/build.mjs. Use depois de: @import "tailwindcss"; @import "@fluxo-oficina/tokens/tokens.css"; */
@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: var(--font-sans);
${mapaSemantico.join('\n')}
${mapaPaleta.join('\n')}
${Object.keys(tokens.radius).map((k) => `  --radius-${k}: var(--radius-${k});`).join('\n')}
${Object.keys(tokens.font.size).flatMap((k) => [`  --text-${k}: var(--text-${k});`, `  --text-${k}--line-height: var(--text-${k}--line-height);`]).join('\n')}
${Object.keys(tokens.shadow).map((k) => `  --shadow-${k}: var(--shadow-${k});`).join('\n')}
}
`
writeFileSync(join(dist, 'tailwind.css'), tailwind)

// ── theme.native.js ────────────────────────────────────────
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
const paraNativo = (cores) => Object.fromEntries(Object.entries(cores).map(([k, v]) => [camel(k), v]))
const tema = {
  colors: { light: paraNativo(claro), dark: paraNativo(escuro) },
  palette: tokens.color,
  font: {
    family: { regular: 'Inter_400Regular', medium: 'Inter_500Medium', semibold: 'Inter_600SemiBold', bold: 'Inter_700Bold' },
    weight: tokens.font.weight,
    size: Object.fromEntries(Object.entries(tokens.font.size).map(([k, [fontSize, lineHeight]]) => [k, { fontSize, lineHeight }])),
  },
  radius: tokens.radius,
  spacing: tokens.spacing,
  motion: tokens.motion,
  touch: { min: tokens.touch['min-native'] },
}
writeFileSync(join(dist, 'theme.native.js'), `// Gerado por scripts/build.mjs. Não edite.\nexport const theme = ${JSON.stringify(tema, null, 2)}\n`)
writeFileSync(
  join(dist, 'theme.native.d.ts'),
  `// Gerado por scripts/build.mjs. Não edite.
export type ColorName = ${Object.keys(paraNativo(claro)).map((k) => `'${k}'`).join(' | ')}
export interface Theme {
  colors: { light: Record<ColorName, string>; dark: Record<ColorName, string> }
  palette: Record<string, Record<string, string>>
  font: {
    family: Record<'regular' | 'medium' | 'semibold' | 'bold', string>
    weight: Record<'regular' | 'medium' | 'semibold' | 'bold', number>
    size: Record<string, { fontSize: number; lineHeight: number }>
  }
  radius: Record<string, number>
  spacing: Record<string, number>
  motion: Record<string, number>
  touch: { min: number }
}
export declare const theme: Theme
`,
)

// ── native.css e tailwind.preset.cjs (NativeWind 4, Tailwind 3) ──────────
// NativeWind 4 lê variáveis de :root e de .dark:root, e o Tailwind 3 ainda não tem @theme.
const varsNativas = (cores) => Object.entries(cores).map(([k, v]) => `  --${k}: ${v};`).join('\n')
writeFileSync(
  join(dist, 'native.css'),
  `/* Gerado por scripts/build.mjs. Não edite. Variáveis para o NativeWind 4. */
:root {
${varsNativas(claro)}
}

.dark:root {
${varsNativas(escuro)}
}
`,
)
const coresPreset = {
  ...Object.fromEntries(Object.keys(claro).map((k) => [k, `var(--${k})`])),
  ...Object.fromEntries(Object.entries(tokens.color).map(([escala, passos]) => [escala, passos])),
}
const preset = {
  theme: {
    extend: {
      colors: coresPreset,
      borderRadius: Object.fromEntries(Object.entries(tokens.radius).map(([k, v]) => [k, `${v}px`])),
      fontFamily: {
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold': ['Inter_700Bold'],
      },
      fontSize: Object.fromEntries(Object.entries(tokens.font.size).map(([k, [t, l]]) => [k, [`${t}px`, { lineHeight: `${l}px` }]])),
      spacing: Object.fromEntries(Object.entries(tokens.spacing).map(([k, v]) => [`t${k}`, `${v}px`])),
      minHeight: { touch: `${tokens.touch['min-native']}px` },
      minWidth: { touch: `${tokens.touch['min-native']}px` },
    },
  },
}
writeFileSync(join(dist, 'tailwind.preset.cjs'), `// Gerado por scripts/build.mjs. Não edite.\nmodule.exports = ${JSON.stringify(preset, null, 2)}\n`)
// global.css do app Expo: diretivas do Tailwind 3 mais as variáveis, num arquivo só (sem @import).
writeFileSync(
  join(dist, 'global.css'),
  `/* Gerado por scripts/build.mjs. Não edite. */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${readFileSync(join(dist, 'native.css'), 'utf8')}`,
)
console.log('dist/tokens.css, dist/tailwind.css e dist/theme.native.js gerados.')
