import * as React from 'react'
import { Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

export interface ListItemProps extends Omit<React.ComponentProps<typeof Pressable>, 'children'> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Selo ou valor à direita do título, como a etapa da ordem. */
  trailing?: React.ReactNode
}

/** Linha pressável de uma lista, como a ordem de serviço. */
export function ListItem({ title, description, trailing, className, ...props }: ListItemProps) {
  return (
    <Pressable accessibilityRole="button" className={cn('min-h-14 w-full gap-0.5 rounded-lg border border-border bg-surface-raised px-4 py-3 active:bg-accent', className)} {...props}>
      <View className="flex-row items-center justify-between gap-2">
        <Text className="flex-1 font-sans-semibold text-card-foreground">{title}</Text>
        {trailing ? <View className="shrink-0">{trailing}</View> : null}
      </View>
      {description ? <Text className="text-sm text-muted-foreground">{description}</Text> : null}
    </Pressable>
  )
}
