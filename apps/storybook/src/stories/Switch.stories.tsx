import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch, Label } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Switch', component: Switch } satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Opcoes: Story = {
  render: () => (
    <div className="grid max-w-sm gap-4">
      <div className="flex items-center justify-between gap-3"><Label htmlFor="s1">Avisar o cliente por WhatsApp</Label><Switch id="s1" defaultChecked /></div>
      <div className="flex items-center justify-between gap-3"><Label htmlFor="s2">Enviar lista ao fornecedor</Label><Switch id="s2" /></div>
      <div className="flex items-center justify-between gap-3"><Label htmlFor="s3">Opção bloqueada</Label><Switch id="s3" disabled /></div>
    </div>
  ),
}
