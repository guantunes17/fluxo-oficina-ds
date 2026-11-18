import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Sheet', component: Sheet } satisfies Meta<typeof Sheet>
export default meta
type Story = StoryObj<typeof meta>

const painel = (lado: 'right' | 'bottom') => (
  <SheetContent side={lado}>
    <SheetHeader><SheetTitle>Histórico de avisos</SheetTitle><SheetDescription>Mensagens enviadas ao cliente da OS 1042.</SheetDescription></SheetHeader>
    <p className="text-sm">17/11 14:05, Aguardando peça. Seu Gol está aguardando a chegada de uma peça.</p>
  </SheetContent>
)

export const Lateral: Story = {
  render: () => <Sheet defaultOpen><SheetTrigger asChild><Button variant="outline">Abrir histórico</Button></SheetTrigger>{painel('right')}</Sheet>,
  parameters: { layout: 'fullscreen' },
}
export const Inferior: Story = {
  render: () => <Sheet defaultOpen><SheetTrigger asChild><Button variant="outline">Abrir histórico</Button></SheetTrigger>{painel('bottom')}</Sheet>,
  parameters: { layout: 'fullscreen' },
}
