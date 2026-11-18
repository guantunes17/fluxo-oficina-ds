import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriorityBadge } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/PriorityBadge', component: PriorityBadge } satisfies Meta<typeof PriorityBadge>
export default meta
type Story = StoryObj<typeof meta>

export const Niveis: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PriorityBadge priority="low" />
      <PriorityBadge priority="medium" />
      <PriorityBadge priority="high" />
      <PriorityBadge priority="urgent" />
    </div>
  ),
}
