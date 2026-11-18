import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, ListItem } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/ListItem', component: ListItem, args: { title: 'OS 1042' } } satisfies Meta<typeof ListItem>
export default meta
type Story = StoryObj<typeof meta>

export const OrdemDeServico: Story = {
  render: () => (
    <div className="grid max-w-md gap-2">
      <ListItem title="OS 1040" description="Onix 1.0 · QWE4R56" trailing={<Badge variant="info">Diagnóstico</Badge>} />
      <ListItem title="OS 1042" description="Gol 1.0 · ABC1D23" trailing={<Badge variant="warning">Aguardando peça</Badge>} />
      <ListItem title="OS 1044" description="Corolla 2.0 · KLM5N67" trailing={<Badge variant="success">Execução</Badge>} />
    </div>
  ),
}
