import type { Meta, StoryObj } from '@storybook/react-vite'
import { OrderCard } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/OrderCard', component: OrderCard } satisfies Meta<typeof OrderCard>
export default meta
type Story = StoryObj<typeof meta>

export const Ordens: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <OrderCard number="OS 1042" vehicle="VW Gol 1.0 2019" plate="ABC1D23" customer="Maria Souza" stage="Aguardando peça" priority="high" mechanic="Carlos Mendes" />
      <OrderCard number="OS 1043" vehicle="Fiat Argo 2021" plate="QWE4R56" customer="João Lima" stage="Execução" stageTone="success" priority="low" />
    </div>
  ),
}
