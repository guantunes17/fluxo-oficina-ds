import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, Label } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Checkbox', component: Checkbox } satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>

const fornecedores = [['f1', 'Auto Peças Horizonte', true], ['f2', 'Distribuidora Norte Peças', true], ['f3', 'Elétrica Central', false]] as const

export const SelecaoDeFornecedores: Story = {
  render: () => (
    <div className="grid gap-3">
      {fornecedores.map(([id, nome, marcado]) => (
        <div key={id} className="flex items-center gap-2"><Checkbox id={id} defaultChecked={marcado} /><Label htmlFor={id}>{nome}</Label></div>
      ))}
      <div className="flex items-center gap-2"><Checkbox id="off" disabled /><Label htmlFor="off">Desabilitado</Label></div>
    </div>
  ),
}
