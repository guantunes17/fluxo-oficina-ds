import * as React from 'react'
import { cn } from '../../lib/utils'

export function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'flex h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-foreground-subtle disabled:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-surface-sunken aria-[invalid=true]:border-danger aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger',
        className,
      )}
      {...props}
    />
  )
}
