import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Avatar', component: Avatar } satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Carlos Mendes" size="sm" />
      <Avatar name="Carlos Mendes" />
      <Avatar name="Ana Paula Souza" size="lg" />
    </div>
  ),
}
