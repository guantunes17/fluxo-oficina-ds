import * as React from 'react'
import { View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Text } from './text'

const ponto = cva('size-2.5 shrink-0 rounded-full', {
  variants: {
    tone: { neutral: 'bg-neutral', info: 'bg-info', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', highlight: 'bg-highlight' },
  },
  defaultVariants: { tone: 'neutral' },
})

export interface StatusDotProps extends Omit<React.ComponentProps<typeof View>, 'children'>, VariantProps<typeof ponto> {
  /** Texto ao lado do ponto. A cor nunca é o único sinal, então o texto é obrigatório. */
  label: string
}

export function StatusDot({ tone, label, className, ...props }: StatusDotProps) {
  return (
    <View accessible accessibilityLabel={label} className={cn('flex-row items-center gap-2', className)} {...props}>
      <View importantForAccessibility="no" className={ponto({ tone })} />
      <Text className="text-sm">{label}</Text>
    </View>
  )
}
