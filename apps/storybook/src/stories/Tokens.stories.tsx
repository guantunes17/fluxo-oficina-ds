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
  verde: ['50', '100', '200', '300', '600', '700', '800', '900', '950'],
  azul: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  vermelho: ['50', '100', '200', '300', '600', '700', '800', '900', '950'],
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

const papeis = [
  ['heading-page', 'Título de página'], ['heading-section', 'Título de seção'], ['heading-card', 'Título de cartão'],
  ['body', 'Corpo do texto'], ['body-compact', 'Corpo compacto'], ['label', 'Rótulo de campo'], ['label-compact', 'Rótulo compacto'],
  ['helper', 'Texto de ajuda'], ['caption', 'Legenda'], ['eyebrow', 'Sobretítulo'], ['code', 'ABC1D23'], ['data', '1.250,00'], ['data-strong', 'R$ 1.250,00'],
] as const

export const PapeisDeTipografia: Story = {
  render: () => (
    <div className="grid gap-3">
      {papeis.map(([papel, exemplo]) => (
        <div key={papel} className="flex items-baseline gap-4 border-b pb-2">
          <code className="w-36 shrink-0 text-xs text-muted-foreground">text-{papel}</code>
          <span className={`text-${papel} ${papel === 'eyebrow' ? 'uppercase' : ''} ${papel === 'code' ? 'font-mono' : ''} ${papel.startsWith('data') ? 'tabular-nums' : ''}`}>{exemplo}</span>
        </div>
      ))}
    </div>
  ),
}

export const SoftESurface: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {familias.map((f) => (
        <div key={f} className="grid grid-cols-3 overflow-hidden rounded-lg border text-sm" style={{ borderColor: `var(--${f}-border)`, color: `var(--${f}-foreground)` }}>
          <div className="p-3" style={{ background: `var(--${f}-surface)` }}>{f} surface</div>
          <div className="p-3" style={{ background: `var(--${f}-subtle)` }}>{f} subtle</div>
          <div className="p-3" style={{ background: `var(--${f}-soft)` }}>{f} soft</div>
        </div>
      ))}
    </div>
  ),
}

export const GraficosESidebar: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <figure key={n} className="m-0 w-16">
            <div className="h-12 rounded-md border" style={{ background: `var(--chart-${n})` }} />
            <figcaption className="mt-1 text-center text-xs">chart-{n}</figcaption>
          </figure>
        ))}
      </div>
      <nav aria-label="Exemplo de menu lateral" className="grid max-w-xs gap-1 rounded-lg border p-2" style={{ background: 'var(--sidebar)', borderColor: 'var(--sidebar-border)', color: 'var(--sidebar-foreground)' }}>
        <span className="rounded-md px-3 py-2 text-sm font-medium" style={{ background: 'var(--sidebar-primary)', color: 'var(--sidebar-primary-foreground)' }}>Ordens de serviço</span>
        <span className="rounded-md px-3 py-2 text-sm" style={{ background: 'var(--sidebar-accent)', color: 'var(--sidebar-accent-foreground)' }}>Cotações</span>
        <span className="rounded-md px-3 py-2 text-sm">Avisos</span>
      </nav>
    </div>
  ),
}
