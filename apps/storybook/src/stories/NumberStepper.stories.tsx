import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NumberStepper } from '@fluxo-oficina/web'

const meta = { title: 'Componentes/NumberStepper', component: NumberStepper } satisfies Meta<typeof NumberStepper>
export default meta
type Story = StoryObj<typeof meta>

function Exemplo() {
  const [v, setV] = React.useState(2)
  return <NumberStepper value={v} onChange={setV} label="disco de freio" />
}
export const QuantidadeDaPeca: Story = { args: { value: 2, onChange: () => {} }, render: () => <Exemplo /> }
