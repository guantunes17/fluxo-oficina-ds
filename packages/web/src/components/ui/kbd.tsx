import * as React from 'react'
import { cn } from '../../lib/utils'

/** Tecla de atalho, para o painel desktop. No celular não existe equivalente. */
export function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-border-strong bg-surface-sunken px-1 font-mono text-xs text-foreground', className)}
      {...props}
    />
  )
}
