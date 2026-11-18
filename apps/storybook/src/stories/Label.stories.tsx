import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, Label } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Label', component: Label } satisfies Meta<typeof Label>
export default meta
type Story = StoryObj<typeof meta>

export const ComCampo: Story = {
  render: () => (
    <div className="flex items-center gap-2"><Checkbox id="termo" /><Label htmlFor="termo">Avisar o cliente a cada etapa</Label></div>
  ),
}
