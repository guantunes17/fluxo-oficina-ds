import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Kbd', component: Kbd } satisfies Meta<typeof Kbd>
export default meta
type Story = StoryObj<typeof meta>

export const Atalhos: Story = {
  render: () => (
    <p className="text-sm">Busque uma ordem com <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> e feche com <Kbd>Esc</Kbd>.</p>
  ),
}
