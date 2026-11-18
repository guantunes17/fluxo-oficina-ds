import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ListItemProps extends Omit<React.ComponentProps<'button'>, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Selo ou valor à direita do título, como a etapa da ordem. */
  trailing?: React.ReactNode
}

/** Linha pressável de uma lista, como a ordem de serviço. É um botão de verdade, com foco e teclado. */
export function ListItem({ title, description, trailing, className, type = 'button', ...props }: ListItemProps) {
  return (
    <button
      data-slot="list-item"
      type={type}
      className={cn('flex min-h-14 w-full flex-col gap-0.5 rounded-lg border bg-card px-4 py-3 text-left text-card-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50', className)}
      {...props}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-semibold">{title}</span>
        {trailing ? <span className="shrink-0">{trailing}</span> : null}
      </span>
      {description ? <span className="text-sm text-muted-foreground">{description}</span> : null}
    </button>
  )
}
