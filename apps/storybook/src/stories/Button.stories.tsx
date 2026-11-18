import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Button', component: Button, args: { children: 'Salvar etapa' } } satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Salvar etapa</Button>
      <Button variant="secondary">Voltar</Button>
      <Button variant="outline">Cancelar serviço</Button>
      <Button variant="ghost">Dispensar</Button>
      <Button variant="destructive">Cancelar OS 1042</Button>
    </div>
  ),
}
export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon" aria-label="Gravar">●</Button>
    </div>
  ),
}
export const Desabilitado: Story = { args: { disabled: true } }
