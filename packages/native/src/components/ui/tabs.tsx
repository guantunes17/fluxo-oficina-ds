import * as React from 'react'
import * as TabsPrimitive from '@rn-primitives/tabs'
import { Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Text, TextClassContext } from './text'

export interface TabsProps extends Omit<React.ComponentProps<typeof TabsPrimitive.Root>, 'value' | 'onValueChange'> {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
}

const TabsValueContext = React.createContext<string>('')

export function Tabs({ className, value, defaultValue, onValueChange, ...props }: TabsProps) {
  const [atual, definir] = useControllable(value, defaultValue, onValueChange)
  return (
    <TabsValueContext.Provider value={atual}>
      <TabsPrimitive.Root value={atual} onValueChange={definir} className={cn('gap-3', className)} {...props} />
    </TabsValueContext.Provider>
  )
}
export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn('h-touch flex-row items-center rounded-md bg-muted p-1', className)} {...props} />
}
export function TabsTrigger({ className, value, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const ativa = React.useContext(TabsValueContext) === value
  return (
    <TextClassContext.Provider value={cn('font-sans-medium text-sm', ativa ? 'text-foreground' : 'text-muted-foreground')}>
      <TabsPrimitive.Trigger value={value} className={cn('min-h-9 flex-1 items-center justify-center rounded-sm px-3', ativa && 'bg-background', className)} {...props} />
    </TextClassContext.Provider>
  )
}
export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn(className)} {...props} />
}

export interface BottomTabsItem { value: string; label: string }
export interface BottomTabsProps {
  items: BottomTabsItem[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

/** Barra de navegação inferior do app. Cada item tem pelo menos 52 pt de altura. */
export function BottomTabs({ items, value, onValueChange, className }: BottomTabsProps) {
  return (
    <View accessibilityRole="tablist" className={cn('flex-row gap-2 border-t border-border bg-background px-4 py-2', className)}>
      {items.map((item) => {
        const ativa = item.value === value
        return (
          <Pressable
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            onPress={() => onValueChange(item.value)}
            className={cn('min-h-[52px] flex-1 items-center justify-center rounded-md', ativa ? 'bg-primary' : 'border border-input bg-background')}
          >
            <Text className={cn('font-sans-medium text-sm', ativa ? 'text-primary-foreground' : 'text-foreground')}>{item.label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
