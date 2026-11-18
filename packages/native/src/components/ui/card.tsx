import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

export function Card({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('rounded-lg border border-border bg-card', className)} {...props} />
}
export function CardHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('gap-1.5 p-5', className)} {...props} />
}
export function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text accessibilityRole="header" className={cn('font-sans-semibold text-lg leading-none text-card-foreground', className)} {...props} />
}
export function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />
}
export function CardContent({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('p-5 pt-0', className)} {...props} />
}
export function CardFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex-row items-center gap-2 p-5 pt-0', className)} {...props} />
}
