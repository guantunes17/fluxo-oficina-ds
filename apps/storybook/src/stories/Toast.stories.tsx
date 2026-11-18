import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Toaster, toast } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Toast', component: Toaster } satisfies Meta<typeof Toaster>
export default meta
type Story = StoryObj<typeof meta>

export const Notificacao: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast('Cotação respondida na OS 1042', { description: 'Toque para abrir a ordem.' })}>Disparar notificação</Button>
    </>
  ),
}
