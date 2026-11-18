import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'Fundamentos/Tokens' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const escalas = ['petroleo', 'ambar', 'neutro', 'verde', 'azul', 'vermelho'] as const
const nomes: Record<(typeof escalas)[number], string> = { petroleo: 'Petróleo', ambar: 'Âmbar', neutro: 'Neutro', verde: 'Verde', azul: 'Azul', vermelho: 'Vermelho' }
const passos: Record<(typeof escalas)[number], string[]> = {
  petroleo: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  ambar: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  neutro: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  verde: ['50', '100', '300', '600', '700', '800', '900'],
  azul: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  vermelho: ['50', '100', '300', '600', '700', '800', '900'],
}

// Cada família de estado vira um bloco com os quatro papéis: base, foreground, subtle e border.
const familias = ['success', 'warning', 'danger', 'info', 'neutral', 'highlight'] as const

// Pares de superfície e texto. O texto de cada amostra usa o foreground do par.
const superficies = [
  ['background', 'foreground'],
  ['surface', 'foreground'],
  ['surface-raised', 'foreground'],
  ['surface-sunken', 'foreground'],
  ['card', 'card-foreground'],
  ['popover', 'popover-foreground'],
  ['primary', 'primary-foreground'],
  ['primary-hover', 'primary-foreground'],
  ['primary-active', 'primary-foreground'],
  ['secondary', 'secondary-foreground'],
  ['muted', 'muted-foreground'],
  ['accent', 'accent-foreground'],
  ['destructive', 'destructive-foreground'],
] as const

export const Paletas: Story = {
  render: () => (
    <div className="grid gap-6">
      {escalas.map((escala) => (
        <section key={escala} aria-labelledby={`p-${escala}`}>
          <h3 id={`p-${escala}`} className="mb-2 font-semibold">{nomes[escala]}</h3>
          <div className="flex flex-wrap gap-2">
            {passos[escala].map((passo) => (
              <figure key={passo} className="m-0 w-16">
                <div className="h-12 rounded-md border" style={{ background: `var(--color-${escala}-${passo})` }} />
                <figcaption className="mt-1 text-center text-xs tabular-nums">{passo}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

export const SuperficiesETexto: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {superficies.map(([fundo, texto]) => (
        <div key={fundo} className="rounded-lg border p-4" style={{ background: `var(--${fundo})`, color: `var(--${texto})` }}>
          <p className="font-semibold">{fundo}</p>
          <p className="text-sm">Texto em {texto}</p>
        </div>
      ))}
    </div>
  ),
}

export const Estados: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {familias.map((f) => (
        <div key={f} className="rounded-lg border p-4" style={{ background: `var(--${f}-subtle)`, borderColor: `var(--${f}-border)`, color: `var(--${f}-foreground)` }}>
          <p className="font-semibold capitalize">{f}</p>
          <p className="text-sm">Fundo {f}-subtle, borda {f}-border, texto {f}-foreground</p>
        </div>
      ))}
    </div>
  ),
}

export const TextoLinkEOverlay: Story = {
  render: () => (
    <div className="grid max-w-xl gap-3">
      <p>Texto em <code>foreground</code>.</p>
      <p className="text-muted-foreground">Texto em <code>muted-foreground</code>.</p>
      <p className="text-foreground-subtle">Texto em <code>foreground-subtle</code>, o mesmo do placeholder.</p>
      <p><a href="#estados" className="text-link underline hover:text-link-hover">Link em <code>link</code> e <code>link-hover</code></a>.</p>
      <p className="text-foreground-disabled" aria-disabled="true">Texto em <code>foreground-disabled</code>, sem exigência de contraste por estar desabilitado.</p>
      <figure className="m-0">
        <div className="relative h-16 overflow-hidden rounded-lg border bg-surface-raised">
          <div className="absolute inset-0 bg-overlay" aria-hidden="true" />
        </div>
        <figcaption className="mt-1 text-sm">Camada <code>overlay</code> sobre uma superfície. Sem texto em cima: quem usa o overlay coloca o conteúdo numa folha própria, como o Dialog e o Sheet.</figcaption>
      </figure>
    </div>
  ),
}
