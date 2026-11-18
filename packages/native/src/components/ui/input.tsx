import * as React from 'react'
import { TextInput } from 'react-native'
import { cn } from '../../lib/utils'
import { useThemeColors } from '../../lib/use-theme-colors'

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  invalid?: boolean
}

export function Input({ className, invalid, editable = true, ...props }: InputProps) {
  const cores = useThemeColors()
  return (
    <TextInput
      editable={editable}
      placeholderTextColor={cores.foregroundSubtle}
      aria-invalid={invalid}
      accessibilityState={{ disabled: !editable }}
      className={cn('min-h-touch w-full rounded-md border border-input bg-background px-3 font-sans text-base text-foreground', invalid && 'border-danger', !editable && 'opacity-50', className)}
      {...props}
    />
  )
}
