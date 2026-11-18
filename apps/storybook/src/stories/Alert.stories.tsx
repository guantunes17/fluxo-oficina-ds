import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertDescription, AlertTitle } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Alert', component: Alert } satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>

export const Estados: Story = {
  render: () => (
    <div className="grid max-w-xl gap-3">
      <Alert variant="info"><AlertTitle>Etapa salva</AlertTitle><AlertDescription>O cliente recebe um aviso por WhatsApp.</AlertDescription></Alert>
      <Alert variant="success"><AlertTitle>Lista enviada</AlertTitle><AlertDescription>O gerente já pode pedir a cotação.</AlertDescription></Alert>
      <Alert variant="warning"><AlertTitle>Fornecedor sem resposta</AlertTitle><AlertDescription>A Casa do Freio não respondeu há 5 horas.</AlertDescription></Alert>
      <Alert variant="danger"><AlertTitle>Sem conexão</AlertTitle><AlertDescription>O áudio não foi enviado. Conecte o celular e tente de novo.</AlertDescription></Alert>
    </div>
  ),
}
