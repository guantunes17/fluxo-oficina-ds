import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Separator', component: Separator } satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

export const Direcoes: Story = {
  render: () => (
    <div className="max-w-sm">
      <p className="font-semibold">OS 1042</p>
      <p className="text-sm text-muted-foreground">Gol 1.0 · ABC1D23</p>
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3 text-sm"><span>Peças</span><Separator orientation="vertical" /><span>Cotação</span><Separator orientation="vertical" /><span>Avisos</span></div>
    </div>
  ),
}
