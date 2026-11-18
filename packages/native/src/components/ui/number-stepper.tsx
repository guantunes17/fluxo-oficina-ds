import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Text } from './text'

export interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Nome do que está sendo contado, usado nos rótulos de acessibilidade. Ex.: "peça". */
  label?: string
  className?: string
}

export function NumberStepper({ value, onChange, min = 1, max = 99, step = 1, label = 'quantidade', className }: NumberStepperProps) {
  return (
    <View role="group" accessibilityLabel={label} className={cn('flex-row items-center gap-2', className)}>
      <Button variant="outline" size="icon" accessibilityLabel={`Diminuir ${label}`} disabled={value <= min} onPress={() => onChange(Math.max(min, value - step))}>
        <Text>−</Text>
      </Button>
      <Text accessibilityLiveRegion="polite" className="min-w-8 text-center font-sans-semibold" style={{ fontVariant: ['tabular-nums'] }}>
        {value}
      </Text>
      <Button variant="outline" size="icon" accessibilityLabel={`Aumentar ${label}`} disabled={value >= max} onPress={() => onChange(Math.min(max, value + step))}>
        <Text>+</Text>
      </Button>
    </View>
  )
}
