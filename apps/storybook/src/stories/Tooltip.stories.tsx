import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Tooltip', component: Tooltip } satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>

export const Dica: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline" size="sm">Copiar placa</Button></TooltipTrigger>
        <TooltipContent>Copia a placa para a área de transferência</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
