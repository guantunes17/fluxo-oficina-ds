import * as React from 'react'
import { View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const indicador = cva('h-full rounded-full', {
  variants: { tone: { primary: 'bg-primary', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger' } },
  defaultVariants: { tone: 'primary' },
})

export interface ProgressProps extends Omit<React.ComponentProps<typeof View>, 'children'>, VariantProps<typeof indicador> {
  value?: number
}

/** Barra de progresso. Sempre dê um accessibilityLabel que diga o que está andando. */
export function Progress({ className, value = 0, tone, ...props }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: v }}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-sunken', className)}
      {...props}
    >
      <View className={indicador({ tone })} style={{ width: `${v}%` }} />
    </View>
  )
}
