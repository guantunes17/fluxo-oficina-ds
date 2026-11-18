import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusDot } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/StatusDot', component: StatusDot } satisfies Meta<typeof StatusDot>
export default meta
type Story = StoryObj<typeof meta>

export const Tons: Story = {
  render: () => (
    <div className="grid gap-2">
      <StatusDot tone="neutral" label="Rascunho" />
      <StatusDot tone="info" label="Em execução" />
      <StatusDot tone="success" label="Fornecedor respondeu" />
      <StatusDot tone="warning" label="Aguardando peça" />
      <StatusDot tone="danger" label="Sem conexão" />
      <StatusDot tone="highlight" label="Novo" />
    </div>
  ),
}
