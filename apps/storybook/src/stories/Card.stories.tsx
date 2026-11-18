import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Card', component: Card } satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const OrdemDeServico: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>OS 1042</CardTitle>
        <CardDescription>Gol 1.0 · placa ABC1D23</CardDescription>
      </CardHeader>
      <CardContent><Badge variant="info">Aguardando peça</Badge></CardContent>
      <CardFooter><Button size="sm">Mudar etapa</Button></CardFooter>
    </Card>
  ),
}
