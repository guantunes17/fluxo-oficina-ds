import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/HoverCard', component: HoverCard } satisfies Meta<typeof HoverCard>
export default meta
type Story = StoryObj<typeof meta>

export const PreviaDoCliente: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild><a href="#cliente" className="text-link underline hover:text-link-hover">Maria Souza</a></HoverCardTrigger>
      <HoverCardContent>
        <p className="text-label">Maria Souza</p>
        <p className="text-body-compact text-muted-foreground">Cliente desde 2021. Três ordens no último ano.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}
