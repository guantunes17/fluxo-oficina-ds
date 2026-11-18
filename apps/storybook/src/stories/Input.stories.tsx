import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, Label } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Input', component: Input } satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const ComRotulo: Story = {
  render: () => (
    <div className="grid max-w-sm gap-4">
      <div className="grid gap-1.5"><Label htmlFor="placa">Placa</Label><Input id="placa" placeholder="ABC1D23" /></div>
      <div className="grid gap-1.5"><Label htmlFor="cliente">Nome do cliente</Label><Input id="cliente" defaultValue="Marcos Teixeira" /></div>
      <div className="grid gap-1.5"><Label htmlFor="erro">Contato</Label><Input id="erro" aria-invalid="true" aria-describedby="erro-msg" defaultValue="(11) 9" /><p id="erro-msg" className="text-sm text-danger-foreground">Informe o telefone com DDD.</p></div>
      <div className="grid gap-1.5"><Label htmlFor="off">Desabilitado</Label><Input id="off" disabled defaultValue="Somente leitura" /></div>
    </div>
  ),
}
