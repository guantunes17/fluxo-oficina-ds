import * as React from 'react'
import * as RadioGroupPrimitive from '@rn-primitives/radio-group'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'

export interface RadioGroupProps extends Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, 'value' | 'onValueChange'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function RadioGroup({ className, value, defaultValue = '', onValueChange, ...props }: RadioGroupProps) {
  const [atual, definir] = useControllable(value, defaultValue, onValueChange)
  return <RadioGroupPrimitive.Root value={atual} onValueChange={definir} className={cn('gap-2', className)} {...props} />
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      hitSlop={12}
      className={cn('aspect-square size-5 items-center justify-center rounded-full border border-input bg-background', props.disabled && 'opacity-50', className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="items-center justify-center">
        <View className="size-2.5 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
