import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/DropdownMenu', component: DropdownMenu } satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>

export const AcoesDaOrdem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Ações da ordem</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>OS 1042</DropdownMenuLabel>
        <DropdownMenuItem>Mudar etapa</DropdownMenuItem>
        <DropdownMenuItem>Pedir cotação</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Cancelar ordem</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
