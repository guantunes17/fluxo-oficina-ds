import * as React from 'react'
import * as SwitchPrimitive from '@rn-primitives/switch'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'

export interface SwitchProps extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'checked' | 'onCheckedChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

/** Liga e desliga uma opção na hora, sem botão de salvar. */
export function Switch({ className, checked, defaultChecked = false, onCheckedChange, disabled, ...props }: SwitchProps) {
  const [ligado, definir] = useControllable(checked, defaultChecked, onCheckedChange)
  return (
    <SwitchPrimitive.Root
      checked={ligado}
      onCheckedChange={definir}
      disabled={disabled}
      hitSlop={10}
      className={cn('h-7 w-12 justify-center rounded-full border-2 border-transparent', ligado ? 'bg-primary' : 'bg-border-strong', disabled && 'opacity-50', className)}
      {...props}
    >
      <SwitchPrimitive.Thumb asChild>
        <View className={cn('size-5 rounded-full bg-background', ligado ? 'ml-5' : 'ml-0.5')} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}
