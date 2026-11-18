import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

/**
 * Lista de linhas com colunas, no lugar da Table do web. No celular uma tabela larga rola mal,
 * então cada linha é um bloco de células com rótulo. A API espelha a do web: Header, Row, Head, Cell.
 */
export function DataList({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View accessibilityRole="list" className={cn('w-full', className)} {...props} />
}
export function DataListHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex-row border-b border-border px-3 py-2', className)} {...props} />
}
export function DataListRow({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View accessibilityRole="none" className={cn('min-h-touch flex-row items-center border-b border-border px-3 py-2.5', className)} {...props} />
}
export function DataListHead({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('flex-1 font-sans-medium text-sm text-muted-foreground', className)} {...props} />
}
export function DataListCell({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('flex-1 text-sm', className)} {...props} />
}
