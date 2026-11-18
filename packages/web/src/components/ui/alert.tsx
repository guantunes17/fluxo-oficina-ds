import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const alertVariants = cva('relative w-full rounded-lg border px-4 py-3 text-sm', {
  variants: {
    variant: {
      neutral: 'border-neutral-border bg-neutral-subtle text-neutral-foreground',
      highlight: 'border-highlight-border bg-highlight-subtle text-highlight-foreground',
      info: 'border-info-border bg-info-subtle text-info-foreground',
      success: 'border-success-border bg-success-subtle text-success-foreground',
      warning: 'border-warning-border bg-warning-subtle text-warning-foreground',
      danger: 'border-danger-border bg-danger-subtle text-danger-foreground',
    },
  },
  defaultVariants: { variant: 'info' },
})

export interface AlertProps extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {}

/** Erro e aviso urgente usam role="alert". Info e sucesso usam role="status". */
export function Alert({ className, variant, role, ...props }: AlertProps) {
  const papel = role ?? (variant === 'danger' || variant === 'warning' ? 'alert' : 'status')
  return <div data-slot="alert" role={papel} className={cn(alertVariants({ variant }), className)} {...props} />
}
export function AlertTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="alert-title" className={cn('mb-1 font-semibold leading-none', className)} {...props} />
}
export function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-description" className={cn('text-sm', className)} {...props} />
}
