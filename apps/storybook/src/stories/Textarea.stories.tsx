import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea, Label } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/Textarea', component: Textarea } satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {
  render: () => (
    <div className="grid max-w-md gap-2">
      <Label htmlFor="obs">Observação do mecânico</Label>
      <Textarea id="obs" placeholder="Descreva o barulho, quando acontece e onde" />
    </div>
  ),
}
export const ComErro: Story = {
  render: () => (
    <div className="grid max-w-md gap-2">
      <Label htmlFor="obs-erro">Observação do mecânico</Label>
      <Textarea id="obs-erro" aria-invalid="true" aria-describedby="obs-erro-msg" defaultValue="" />
      <p id="obs-erro-msg" className="text-helper text-danger-foreground">Escreva ao menos uma frase para o gerente entender o problema.</p>
    </div>
  ),
}
