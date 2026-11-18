import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground',
      outline: 'border-border text-foreground',
      info: 'border-info-border bg-info-subtle text-info-foreground',
      success: 'border-success-border bg-success-subtle text-success-foreground',
      warning: 'border-warning-border bg-warning-subtle text-warning-foreground',
      danger: 'border-danger-border bg-danger-subtle text-danger-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface BadgeProps extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}
