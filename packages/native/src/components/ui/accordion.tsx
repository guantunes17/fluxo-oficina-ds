import * as React from 'react'
import { Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Text } from './text'

interface AccordionContextValue {
  abertos: string[]
  alternar: (value: string) => void
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const ItemContext = React.createContext<string | null>(null)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  const item = React.useContext(ItemContext)
  if (!ctx || item === null) throw new Error('Os componentes Accordion* precisam estar dentro de <Accordion> e <AccordionItem>.')
  return { ...ctx, item }
}

export interface AccordionProps extends React.ComponentProps<typeof View> {
  type?: 'single' | 'multiple'
  /** Só vale no tipo single: deixa fechar a seção aberta. */
  collapsible?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

/** Seções que abrem e fecham. A API segue a do web; aqui o valor é sempre uma lista. */
export function Accordion({ type = 'single', collapsible = false, value, defaultValue = [], onValueChange, className, ...props }: AccordionProps) {
  const [abertos, definir] = useControllable(value, defaultValue, onValueChange)
  const alternar = React.useCallback(
    (v: string) => {
      const aberto = abertos.includes(v)
      if (type === 'multiple') return definir(aberto ? abertos.filter((x) => x !== v) : [...abertos, v])
      if (aberto) return collapsible ? definir([]) : undefined
      definir([v])
    },
    [abertos, definir, type, collapsible],
  )
  return (
    <AccordionContext.Provider value={{ abertos, alternar }}>
      <View className={className} {...props} />
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, className, ...props }: React.ComponentProps<typeof View> & { value: string }) {
  return (
    <ItemContext.Provider value={value}>
      <View className={cn('border-b border-border', className)} {...props} />
    </ItemContext.Provider>
  )
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof Pressable>) {
  const { abertos, alternar, item } = useAccordion()
  const aberto = abertos.includes(item)
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: aberto }}
      onPress={() => alternar(item)}
      className={cn('min-h-touch flex-row items-center justify-between gap-3 py-3', className)}
      {...props}
    >
      <>{children}</>
      <Text className="text-sm text-foreground-subtle">{aberto ? '▴' : '▾'}</Text>
    </Pressable>
  )
}

export function AccordionContent({ className, ...props }: React.ComponentProps<typeof View>) {
  const { abertos, item } = useAccordion()
  if (!abertos.includes(item)) return null
  return <View className={cn('pb-4', className)} {...props} />
}
