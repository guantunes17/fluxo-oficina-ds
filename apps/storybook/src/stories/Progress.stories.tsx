import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Progress', component: Progress } satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

export const Tons: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      <Progress aria-label="Etapas da ordem" value={40} />
      <Progress aria-label="Peças recebidas" value={100} tone="success" />
      <Progress aria-label="Prazo consumido" value={75} tone="warning" />
      <Progress aria-label="Orçamento estourado" value={95} tone="danger" />
    </div>
  ),
}
