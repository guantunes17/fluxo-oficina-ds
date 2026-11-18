import * as React from 'react'
import * as CheckboxPrimitive from '@rn-primitives/checkbox'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Text } from './text'

export interface CheckboxProps extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'checked' | 'onCheckedChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({ className, checked, defaultChecked = false, onCheckedChange, disabled, ...props }: CheckboxProps) {
  const [marcado, definir] = useControllable(checked, defaultChecked, onCheckedChange)
  return (
    <CheckboxPrimitive.Root
      checked={marcado}
      onCheckedChange={definir}
      disabled={disabled}
      hitSlop={12}
      className={cn('size-5 shrink-0 items-center justify-center rounded-sm border border-input bg-background', marcado && 'border-primary bg-primary', disabled && 'opacity-50', className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Text className="font-sans-bold text-xs leading-none text-primary-foreground">✓</Text>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
