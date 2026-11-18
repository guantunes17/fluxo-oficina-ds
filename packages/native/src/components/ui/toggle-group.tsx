import * as React from 'react'
import { Pressable, View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { TextClassContext } from './text'

const itemVariants = cva('items-center justify-center active:opacity-80', {
  variants: {
    variant: {
      default: 'min-h-touch rounded-md px-3',
      card: 'min-h-14 w-full items-start justify-center rounded-lg border border-border bg-background px-4',
    },
  },
  defaultVariants: { variant: 'default' },
})

interface ToggleGroupContextValue extends VariantProps<typeof itemVariants> {
  valor: string
  escolher: (v: string) => void
}
const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({ variant: 'default', valor: '', escolher: () => {} })

export interface ToggleGroupProps extends VariantProps<typeof itemVariants> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
  accessibilityLabel?: string
}

/**
 * Escolha única entre opções, anunciada como grupo de botões de opção (radio).
 * Escrito sem o primitivo porque, no react-native-web, o primitivo marca `aria-checked` num botão, o que não é válido.
 */
export function ToggleGroup({ className, variant, value, defaultValue = '', onValueChange, children, accessibilityLabel }: ToggleGroupProps) {
  const [atual, definir] = useControllable(value, defaultValue, onValueChange)
  return (
    <ToggleGroupContext.Provider value={{ variant, valor: atual, escolher: definir }}>
      <View role="radiogroup" accessibilityLabel={accessibilityLabel} className={cn(variant === 'card' ? 'gap-2' : 'flex-row gap-2', className)}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps extends Omit<React.ComponentProps<typeof Pressable>, 'onPress'> {
  value: string
}

export function ToggleGroupItem({ className, value, disabled, ...props }: ToggleGroupItemProps) {
  const { variant, valor, escolher } = React.useContext(ToggleGroupContext)
  const ligado = valor === value
  return (
    <TextClassContext.Provider value={cn('text-sm', ligado ? 'font-sans-semibold text-accent-foreground' : 'text-foreground')}>
      <Pressable
        role="radio"
        aria-checked={ligado}
        accessibilityState={{ checked: ligado, disabled: !!disabled }}
        disabled={disabled}
        onPress={() => escolher(value)}
        className={cn(itemVariants({ variant }), ligado && (variant === 'card' ? 'border-primary bg-accent' : 'bg-accent'), disabled && 'opacity-50', className)}
        {...props}
      />
    </TextClassContext.Provider>
  )
}
