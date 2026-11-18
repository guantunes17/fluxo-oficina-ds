import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Badge', component: Badge } satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Padrão</Badge>
      <Badge variant="secondary">Secundário</Badge>
      <Badge variant="outline">Contorno</Badge>
      <Badge variant="neutral">Rascunho</Badge>
      <Badge variant="highlight">Construído pelo cliente</Badge>
      <Badge variant="info">Aguardando peça</Badge>
      <Badge variant="success">Respondeu 10:12</Badge>
      <Badge variant="warning">Aguardando há 5 h</Badge>
      <Badge variant="danger">Cancelada</Badge>
    </div>
  ),
}
