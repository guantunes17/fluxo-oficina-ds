import * as React from 'react'
import { Pressable } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { TextClassContext } from './text'

export const buttonVariants = cva('flex-row items-center justify-center gap-2 rounded-md active:opacity-80', {
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      outline: 'border border-input bg-background',
      ghost: '',
      destructive: 'bg-destructive',
    },
    size: {
      sm: 'min-h-touch px-3',
      md: 'min-h-touch px-4',
      lg: 'min-h-14 px-6',
      icon: 'h-touch w-touch',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export const buttonTextVariants = cva('font-sans-medium text-sm', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      destructive: 'text-destructive-foreground',
    },
    size: { sm: 'text-sm', md: 'text-sm', lg: 'text-base', icon: 'text-sm' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export interface ButtonProps extends React.ComponentProps<typeof Pressable>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, disabled, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size }), disabled && 'opacity-50', className)}
        {...props}
      />
    </TextClassContext.Provider>
  )
}
