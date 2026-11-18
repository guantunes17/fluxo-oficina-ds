import * as React from 'react'
import { View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Text, TextClassContext } from './text'

export const alertVariants = cva('w-full rounded-lg border px-4 py-3', {
  variants: {
    variant: {
      neutral: 'border-neutral-border bg-neutral-subtle',
      highlight: 'border-highlight-border bg-highlight-subtle',
      info: 'border-info-border bg-info-subtle',
      success: 'border-success-border bg-success-subtle',
      warning: 'border-warning-border bg-warning-subtle',
      danger: 'border-danger-border bg-danger-subtle',
    },
  },
  defaultVariants: { variant: 'info' },
})

const alertTextVariants = cva('text-sm', {
  variants: {
    variant: { neutral: 'text-neutral-foreground', highlight: 'text-highlight-foreground', info: 'text-info-foreground', success: 'text-success-foreground', warning: 'text-warning-foreground', danger: 'text-danger-foreground' },
  },
  defaultVariants: { variant: 'info' },
})

export interface AlertProps extends React.ComponentProps<typeof View>, VariantProps<typeof alertVariants> {}

/** Erro e aviso urgente anunciam como alerta. Informação e sucesso anunciam de forma educada. */
export function Alert({ className, variant, ...props }: AlertProps) {
  const urgente = variant === 'danger' || variant === 'warning'
  return (
    <TextClassContext.Provider value={alertTextVariants({ variant })}>
      <View
        accessible
        accessibilityRole={urgente ? 'alert' : undefined}
        accessibilityLiveRegion={urgente ? 'assertive' : 'polite'}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  )
}
export function AlertTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('mb-1 font-sans-semibold leading-none', className)} {...props} />
}
export function AlertDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm', className)} {...props} />
}
