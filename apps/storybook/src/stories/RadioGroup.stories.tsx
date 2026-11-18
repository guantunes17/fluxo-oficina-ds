import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label, RadioGroup, RadioGroupItem } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/RadioGroup', component: RadioGroup } satisfies Meta<typeof RadioGroup>
export default meta
type Story = StoryObj<typeof meta>

export const EscolhaDoFornecedor: Story = {
  render: () => (
    <RadioGroup defaultValue="norte" aria-label="Fornecedor">
      <div className="flex items-center gap-2"><RadioGroupItem value="horizonte" id="r1" /><Label htmlFor="r1">Auto Peças Horizonte, R$ 612,00, 2 dias</Label></div>
      <div className="flex items-center gap-2"><RadioGroupItem value="norte" id="r2" /><Label htmlFor="r2">Distribuidora Norte Peças, R$ 574,00, 4 dias</Label></div>
    </RadioGroup>
  ),
}
