import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const ponto = cva('inline-block size-2.5 shrink-0 rounded-full', {
  variants: {
    tone: { neutral: 'bg-neutral', info: 'bg-info', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', highlight: 'bg-highlight' },
  },
  defaultVariants: { tone: 'neutral' },
})

export interface StatusDotProps extends Omit<React.ComponentProps<'span'>, 'children'>, VariantProps<typeof ponto> {
  /** Texto ao lado do ponto. A cor nunca é o único sinal, então o texto é obrigatório. */
  label: string
}

export function StatusDot({ tone, label, className, ...props }: StatusDotProps) {
  return (
    <span data-slot="status-dot" className={cn('inline-flex items-center gap-2 text-sm text-foreground', className)} {...props}>
      <span aria-hidden className={ponto({ tone })} />
      {label}
    </span>
  )
}
