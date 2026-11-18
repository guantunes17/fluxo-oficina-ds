import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppBar, Button } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/AppBar', component: AppBar, args: { title: 'Minhas ordens de serviço' }, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof AppBar>
export default meta
type Story = StoryObj<typeof meta>

export const ComAcoes: Story = { args: { actions: <Button size="sm" variant="outline">Atualizar</Button> } }
export const SoTitulo: Story = {}
