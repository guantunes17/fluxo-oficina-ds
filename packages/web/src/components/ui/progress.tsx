import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const indicador = cva('h-full rounded-full transition-all', {
  variants: {
    tone: { primary: 'bg-primary', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger' },
  },
  defaultVariants: { tone: 'primary' },
})

export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root>, VariantProps<typeof indicador> {}

/** Barra de progresso. Sempre dê um aria-label que diga o que está andando. */
export function Progress({ className, value = 0, tone, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root data-slot="progress" value={value} className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-sunken', className)} {...props}>
      <ProgressPrimitive.Indicator className={indicador({ tone })} style={{ width: `${value ?? 0}%` }} />
    </ProgressPrimitive.Root>
  )
}
