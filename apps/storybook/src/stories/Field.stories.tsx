import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Field, FieldControl, FieldHint, FieldLabel, FieldMessage, Input, maskPlaca, maskTelefone } from '@fluxo-oficina/web'
import { useState } from 'react'

const meta = { title: 'Componentes/Field', component: Field } satisfies Meta<typeof Field>
export default meta
type Story = StoryObj<typeof meta>

export const ComErro: Story = {
  render: () => (
    <div className="grid max-w-sm gap-4">
      <Field><FieldLabel>Nome do cliente</FieldLabel><FieldControl><Input placeholder="Ex.: Ana Ribeiro" /></FieldControl><FieldHint>Como o cliente quer ser chamado.</FieldHint></Field>
      <Field invalid><FieldLabel>Placa</FieldLabel><FieldControl><Input defaultValue="ABC" /></FieldControl><FieldMessage>A placa tem 7 caracteres, por exemplo ABC1D23.</FieldMessage></Field>
    </div>
  ),
}

export const ComMascara: Story = {
  render: () => {
    const [tel, setTel] = useState('')
    const [placa, setPlaca] = useState('')
    return (
      <div className="grid max-w-sm gap-4">
        <Field><FieldLabel>Telefone</FieldLabel><FieldControl><Input inputMode="tel" value={tel} onChange={(e) => setTel(maskTelefone(e.target.value))} placeholder="(11) 90000-0000" /></FieldControl></Field>
        <Field><FieldLabel>Placa</FieldLabel><FieldControl><Input value={placa} onChange={(e) => setPlaca(maskPlaca(e.target.value))} placeholder="ABC1D23" /></FieldControl></Field>
        <Button disabled>Abrir ordem de serviço</Button>
      </div>
    )
  },
}
