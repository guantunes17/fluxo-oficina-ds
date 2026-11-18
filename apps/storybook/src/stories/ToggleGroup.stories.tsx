import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/ToggleGroup', component: ToggleGroup } satisfies Meta<typeof ToggleGroup>
export default meta
type Story = StoryObj<typeof meta>

const etapas = ['Diagnóstico', 'Aguardando peça', 'Aprovação do cliente', 'Execução', 'Pronto']

export const Cartao: Story = {
  render: () => (
    <ToggleGroup type="single" variant="card" defaultValue="Execução" aria-label="Nova etapa" className="max-w-sm">
      {etapas.map((e) => <ToggleGroupItem key={e} value={e}>{e}</ToggleGroupItem>)}
    </ToggleGroup>
  ),
}
export const Padrao: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="dia" aria-label="Período">
      <ToggleGroupItem value="dia">Dia</ToggleGroupItem>
      <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
      <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
    </ToggleGroup>
  ),
}
