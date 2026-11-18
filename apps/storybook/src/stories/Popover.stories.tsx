import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverContent, PopoverTrigger, Button } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Popover', component: Popover } satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>

export const Detalhes: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Ver prazo</Button></PopoverTrigger>
      <PopoverContent>
        <p className="text-label">Prazo estimado</p>
        <p className="text-body-compact text-muted-foreground">Três dias úteis após a aprovação do cliente.</p>
      </PopoverContent>
    </Popover>
  ),
}
