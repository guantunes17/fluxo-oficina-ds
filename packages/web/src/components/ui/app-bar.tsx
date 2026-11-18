import * as React from 'react'
import { cn } from '../../lib/utils'

export interface AppBarProps extends Omit<React.ComponentProps<'header'>, 'title'> {
  title: React.ReactNode
  leading?: React.ReactNode
  actions?: React.ReactNode
}

/** Barra superior fixa com título e ações. Uma por página. */
export function AppBar({ title, leading, actions, className, ...props }: AppBarProps) {
  return (
    <header data-slot="app-bar" className={cn('sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4', className)} {...props}>
      {leading}
      <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  )
}
