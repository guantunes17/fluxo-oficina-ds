import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../lib/utils'

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-2', className)} {...props} />
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn('aspect-square size-5 rounded-full border border-input bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary', className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="size-2.5 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

/** Opção grande, tocável, com o texto dentro. Use quando a escolha é a ação principal (ex.: etapa da OS no celular). */
export function RadioCardItem({ className, children, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-card-item"
      className={cn('flex min-h-[3.25rem] w-full items-center rounded-lg border border-border-strong bg-background px-4 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:font-semibold', className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}
