import * as React from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './button'

export interface NumberStepperProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Nome do que está sendo contado, usado nos rótulos acessíveis. Ex.: "peça". */
  label?: string
}

export function NumberStepper({ value, onChange, min = 1, max = 99, step = 1, label = 'quantidade', className, ...props }: NumberStepperProps) {
  return (
    <div data-slot="number-stepper" role="group" aria-label={label} className={cn('inline-flex items-center gap-2', className)} {...props}>
      <Button variant="outline" size="icon" aria-label={`Diminuir ${label}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - step))}>
        <Minus aria-hidden="true" />
      </Button>
      <output aria-live="polite" className="min-w-8 text-center font-semibold tabular-nums">{value}</output>
      <Button variant="outline" size="icon" aria-label={`Aumentar ${label}`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + step))}>
        <Plus aria-hidden="true" />
      </Button>
    </div>
  )
}
