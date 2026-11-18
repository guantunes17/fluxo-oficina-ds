import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertAction, Button, Disclosure, Empty, EmptyAction, EmptyDescription, EmptyTitle, Progress } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Empty, Disclosure e ações' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const EstadoVazio: Story = {
  render: () => (
    <Empty className="max-w-md"><EmptyTitle>Nenhuma peça na lista</EmptyTitle><EmptyDescription>Adicione por voz.</EmptyDescription><EmptyAction><Button variant="outline">Adicionar peça por voz</Button></EmptyAction></Empty>
  ),
}
export const NotaRecolhida: Story = {
  render: () => <Disclosure className="max-w-md" summary="Nota do protótipo">A taxa de acerto da transcrição ainda não foi testada.</Disclosure>,
}
export const AvisoComDesfazer: Story = {
  render: () => <Alert variant="neutral" className="max-w-md">Peça removida: Filtro de óleo.<AlertAction><Button size="sm" variant="outline">Desfazer</Button><Button size="sm" variant="ghost-destructive">Cancelar serviço</Button></AlertAction></Alert>,
}
export const ProgressoIndeterminado: Story = {
  render: () => <div className="max-w-md"><Progress value={null} aria-label="Transcrevendo o áudio" /></div>,
}
