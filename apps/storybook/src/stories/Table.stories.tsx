import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Table', component: Table } satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Comparativo: Story = {
  render: () => (
    <Table>
      <TableCaption>Respostas da cotação da OS 1042</TableCaption>
      <TableHeader><TableRow><TableHead>Fornecedor</TableHead><TableHead>Preço total</TableHead><TableHead>Prazo</TableHead><TableHead>Resposta</TableHead></TableRow></TableHeader>
      <TableBody>
        <TableRow><TableCell className="font-medium">Auto Peças Horizonte</TableCell><TableCell className="tabular-nums">R$ 612,00</TableCell><TableCell>2 dias</TableCell><TableCell><Badge variant="success">Respondeu 10:12</Badge></TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Distribuidora Norte Peças</TableCell><TableCell className="tabular-nums">R$ 574,00</TableCell><TableCell>4 dias</TableCell><TableCell><Badge variant="success">Respondeu 10:12</Badge></TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Casa do Freio</TableCell><TableCell className="text-muted-foreground">sem resposta</TableCell><TableCell className="text-muted-foreground">sem resposta</TableCell><TableCell><Badge variant="warning">Aguardando há 5 h</Badge></TableCell></TableRow>
      </TableBody>
    </Table>
  ),
}
