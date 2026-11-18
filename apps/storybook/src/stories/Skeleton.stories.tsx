import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardHeader, Skeleton } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Skeleton', component: Skeleton } satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

export const CarregandoTranscricao: Story = {
  render: () => (
    <Card className="max-w-sm" role="status" aria-busy="true" aria-label="Carregando a transcrição">
      <CardHeader><Skeleton className="h-5 w-40" /></CardHeader>
      <CardContent className="grid gap-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-4 w-2/3" /></CardContent>
    </Card>
  ),
}
