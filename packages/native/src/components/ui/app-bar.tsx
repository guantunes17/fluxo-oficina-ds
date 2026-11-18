import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

export interface AppBarProps extends Omit<React.ComponentProps<typeof View>, 'children'> {
  title: React.ReactNode
  leading?: React.ReactNode
  actions?: React.ReactNode
}

/** Barra superior com título e ações. No aparelho, passe `className="pt-12"` para respeitar a área do entalhe. */
export function AppBar({ title, leading, actions, className, ...props }: AppBarProps) {
  return (
    <View className={cn('h-14 flex-row items-center gap-3 border-b border-border bg-background px-4', className)} {...props}>
      {leading}
      <Text accessibilityRole="header" numberOfLines={1} className="flex-1 font-sans-semibold text-lg">
        {title}
      </Text>
      {actions ? <View className="flex-row items-center gap-2">{actions}</View> : null}
    </View>
  )
}
