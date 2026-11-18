import * as React from 'react'
import { View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { TextClassContext } from './text'

export const badgeVariants = cva('flex-row items-center self-start rounded-full border px-2.5 py-0.5', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary',
      secondary: 'border-transparent bg-secondary',
      outline: 'border-border',
      neutral: 'border-neutral-border bg-neutral-subtle',
      highlight: 'border-highlight-border bg-highlight-subtle',
      info: 'border-info-border bg-info-subtle',
      success: 'border-success-border bg-success-subtle',
      warning: 'border-warning-border bg-warning-subtle',
      danger: 'border-danger-border bg-danger-subtle',
    },
  },
  defaultVariants: { variant: 'default' },
})

export const badgeTextVariants = cva('font-sans-medium text-xs', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      outline: 'text-foreground',
      neutral: 'text-neutral-foreground',
      highlight: 'text-highlight-foreground',
      info: 'text-info-foreground',
      success: 'text-success-foreground',
      warning: 'text-warning-foreground',
      danger: 'text-danger-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface BadgeProps extends React.ComponentProps<typeof View>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <View className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  )
}
