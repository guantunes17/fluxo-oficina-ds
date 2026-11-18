import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Select', component: Select } satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>

const etapas = ['Diagnóstico', 'Aguardando peça', 'Aprovação do cliente', 'Execução', 'Pronto']

export const Fechado: Story = {
  render: () => (
    <div className="max-w-xs">
      <Select defaultValue="Aguardando peça">
        <SelectTrigger aria-label="Etapa"><SelectValue /></SelectTrigger>
        <SelectContent>{etapas.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  ),
}
export const Aberto: Story = {
  render: () => (
    <div className="h-72 max-w-xs">
      <Select defaultOpen defaultValue="Execução">
        <SelectTrigger aria-label="Etapa"><SelectValue /></SelectTrigger>
        <SelectContent>{etapas.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  ),
}
