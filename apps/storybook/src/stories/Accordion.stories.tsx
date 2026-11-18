import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Accordion', component: Accordion } satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj<typeof meta>

export const Secoes: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="pecas" className="max-w-md">
      <AccordionItem value="pecas"><AccordionTrigger>Peças da cotação</AccordionTrigger><AccordionContent>Pastilha de freio dianteira e disco ventilado.</AccordionContent></AccordionItem>
      <AccordionItem value="fornecedores"><AccordionTrigger>Fornecedores consultados</AccordionTrigger><AccordionContent>Casa do Freio, Auto Peças Brasil e Distribuidora Sul.</AccordionContent></AccordionItem>
      <AccordionItem value="avisos"><AccordionTrigger>Avisos enviados ao cliente</AccordionTrigger><AccordionContent>Dois avisos por WhatsApp nesta ordem.</AccordionContent></AccordionItem>
    </Accordion>
  ),
}
