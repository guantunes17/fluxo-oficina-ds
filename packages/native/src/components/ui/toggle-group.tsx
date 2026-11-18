import * as React from 'react'
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { TextClassContext } from './text'

const itemVariants = cva('items-center justify-center', {
  variants: {
    variant: {
      default: 'min-h-touch rounded-md px-3',
      card: 'min-h-14 w-full items-start justify-center rounded-lg border border-border bg-background px-4',
    },
  },
  defaultVariants: { variant: 'default' },
})

const ToggleGroupContext = React.createContext<VariantProps<typeof itemVariants> & { valor?: string }>({ variant: 'default' })

export interface ToggleGroupProps extends VariantProps<typeof itemVariants> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

/** Escolha única entre opções. Nesta versão só `type="single"`, o caso do protótipo. */
export function ToggleGroup({ className, variant, value, defaultValue = '', onValueChange, children }: ToggleGroupProps) {
  const [atual, definir] = useControllable(value, defaultValue, onValueChange)
  return (
    <ToggleGroupContext.Provider value={{ variant, valor: atual }}>
      <ToggleGroupPrimitive.Root
        type="single"
        value={atual}
        onValueChange={(v) => definir(v ?? '')}
        className={cn(variant === 'card' ? 'gap-2' : 'flex-row gap-2', className)}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  )
}

export function ToggleGroupItem({ className, value, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const { variant, valor } = React.useContext(ToggleGroupContext)
  const ligado = valor === value
  return (
    <TextClassContext.Provider value={cn('text-sm', ligado ? 'font-sans-semibold text-accent-foreground' : 'text-foreground')}>
      <ToggleGroupPrimitive.Item value={value} className={cn(itemVariants({ variant }), ligado && (variant === 'card' ? 'border-primary bg-accent' : 'bg-accent'), className)} {...props} />
    </TextClassContext.Provider>
  )
}
