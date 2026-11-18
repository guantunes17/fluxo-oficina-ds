import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Tabs', component: Tabs } satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

export const Secoes: Story = {
  render: () => (
    <Tabs defaultValue="os" className="max-w-md">
      <TabsList aria-label="Seções do painel">
        <TabsTrigger value="os">Ordens</TabsTrigger>
        <TabsTrigger value="cotacao">Cotações</TabsTrigger>
        <TabsTrigger value="avisos">Avisos</TabsTrigger>
      </TabsList>
      <TabsContent value="os">Quadro de ordens por etapa.</TabsContent>
      <TabsContent value="cotacao">Pedidos e respostas dos fornecedores.</TabsContent>
      <TabsContent value="avisos">Histórico de avisos enviados.</TabsContent>
    </Tabs>
  ),
}
