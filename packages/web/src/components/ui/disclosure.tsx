import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Nota recolhida (<details>): conteúdo de apoio que não deve competir com a tela. Nasce fechada. */
export function Disclosure({ className, summary, children, ...props }: Omit<React.ComponentProps<'details'>, 'summary'> & { summary: React.ReactNode }) {
  return (
    <details data-slot="disclosure" className={cn('group rounded-lg border border-neutral-border bg-neutral-surface px-4 py-2 text-sm text-neutral-foreground', className)} {...props}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {summary}
        <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  )
}
