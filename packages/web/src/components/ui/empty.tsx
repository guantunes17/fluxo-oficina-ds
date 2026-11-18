import * as React from 'react'
import { cn } from '../../lib/utils'

/** Lista ou tabela sem itens: diga o que falta e o que fazer. A ação é opcional. */
export function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty" role="status" className={cn('flex flex-col items-center gap-2 rounded-lg border border-dashed border-neutral-border p-6 text-center text-sm text-muted-foreground', className)} {...props} />
}
export function EmptyTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="empty-title" className={cn('font-medium text-foreground', className)} {...props} />
}
export function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="empty-description" className={className} {...props} />
}
export function EmptyAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-action" className={cn('mt-2', className)} {...props} />
}
