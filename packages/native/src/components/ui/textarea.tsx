import * as React from 'react'
import { TextInput } from 'react-native'
import { cn } from '../../lib/utils'
import { useThemeColors } from '../../lib/use-theme-colors'

export interface TextareaProps extends React.ComponentProps<typeof TextInput> {
  invalid?: boolean
}

export function Textarea({ className, invalid, editable = true, ...props }: TextareaProps) {
  const cores = useThemeColors()
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      editable={editable}
      placeholderTextColor={cores.foregroundSubtle}
      aria-invalid={invalid}
      accessibilityState={{ disabled: !editable }}
      className={cn('min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-base text-foreground', invalid && 'border-danger', !editable && 'opacity-50', className)}
      {...props}
    />
  )
}
