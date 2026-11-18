import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const itemVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'h-10 rounded-md px-3 hover:bg-accent data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        card: 'min-h-12 w-full justify-start rounded-lg border bg-background px-4 text-left hover:bg-accent data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:font-semibold',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const ToggleGroupContext = React.createContext<VariantProps<typeof itemVariants>>({ variant: 'default' })

export function ToggleGroup({ className, variant, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof itemVariants>) {
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('flex gap-2', variant === 'card' && 'flex-col', className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

export function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const { variant } = React.useContext(ToggleGroupContext)
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(itemVariants({ variant }), className)} {...props} />
}
