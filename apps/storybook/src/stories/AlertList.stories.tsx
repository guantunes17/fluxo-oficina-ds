import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertList } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/AlertList', component: AlertList } satisfies Meta<typeof AlertList>
export default meta
type Story = StoryObj<typeof meta>

export const Avisos: Story = {
  render: () => (
    <div className="max-w-xl">
      <AlertList
        items={[
          { id: '1', tone: 'danger', title: 'Sem conexão', description: 'O áudio não foi enviado. Conecte o celular e tente de novo.' },
          { id: '2', tone: 'warning', title: 'Fornecedor sem resposta', description: 'A Casa do Freio não respondeu há 5 horas.' },
          { id: '3', tone: 'success', title: 'Lista enviada', description: 'O gerente já pode pedir a cotação.' },
        ]}
      />
    </div>
  ),
}
