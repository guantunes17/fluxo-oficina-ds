import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Dialog, DialogAction, DialogCancel, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Dialog', component: Dialog } satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>

const conteudo = (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Cancelar a OS 1042?</DialogTitle>
      <DialogDescription>A OS sai do painel como cancelada. A regra de cobrança ainda não está definida.</DialogDescription>
    </DialogHeader>
    <DialogFooter><DialogCancel>Manter OS</DialogCancel><DialogAction>Cancelar OS 1042</DialogAction></DialogFooter>
  </DialogContent>
)

export const Fechado: Story = {
  render: () => <Dialog><DialogTrigger asChild><Button variant="outline">Cancelar serviço</Button></DialogTrigger>{conteudo}</Dialog>,
}
export const Aberto: Story = {
  render: () => <Dialog defaultOpen><DialogTrigger asChild><Button variant="outline">Cancelar serviço</Button></DialogTrigger>{conteudo}</Dialog>,
  parameters: { layout: 'fullscreen' },
}
