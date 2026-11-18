import * as React from 'react'
import { Modal, Pressable, View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Text } from './text'

interface SheetContextValue { open: boolean; setOpen: (o: boolean) => void }
const SheetContext = React.createContext<SheetContextValue | null>(null)
function useSheet() {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error('Os componentes Sheet* precisam estar dentro de <Sheet>.')
  return ctx
}

export interface SheetProps { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; children?: React.ReactNode }

/** Folha que sobe da borda. No celular a posição padrão é a inferior. */
export function Sheet({ open, defaultOpen = false, onOpenChange, children }: SheetProps) {
  const [aberto, definir] = useControllable(open, defaultOpen, onOpenChange)
  return <SheetContext.Provider value={{ open: aberto, setOpen: definir }}>{children}</SheetContext.Provider>
}

export function SheetTrigger({ asChild, children, ...props }: React.ComponentProps<typeof Pressable> & { asChild?: boolean }) {
  const { setOpen } = useSheet()
  if (asChild && React.isValidElement<{ onPress?: () => void }>(children))
    return React.cloneElement(children, { onPress: () => setOpen(true) })
  return <Pressable accessibilityRole="button" onPress={() => setOpen(true)} {...props}>{children}</Pressable>
}

const sheetVariants = cva('gap-4 border-border bg-popover p-6', {
  variants: {
    side: {
      bottom: 'max-h-[85%] w-full rounded-t-xl border-t pb-8',
      right: 'h-full w-3/4 max-w-sm self-end border-l',
    },
  },
  defaultVariants: { side: 'bottom' },
})

export function SheetContent({ className, side, children }: { className?: string; children?: React.ReactNode } & VariantProps<typeof sheetVariants>) {
  const { open, setOpen } = useSheet()
  return (
    <Modal visible={open} transparent animationType={side === 'right' ? 'fade' : 'slide'} onRequestClose={() => setOpen(false)}>
      <Pressable accessibilityLabel="Fechar" onPress={() => setOpen(false)} className={cn('flex-1 bg-overlay', side === 'right' ? 'flex-row' : 'justify-end')}>
        <Pressable accessible={false} accessibilityViewIsModal className={cn(sheetVariants({ side }), className)}>
          {children}
          <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={() => setOpen(false)} className="min-h-touch items-center justify-center rounded-md border border-input">
            <Text className="font-sans-medium text-sm">Fechar</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
export function SheetHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('gap-1.5', className)} {...props} />
}
export function SheetTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text accessibilityRole="header" className={cn('font-sans-semibold text-lg text-popover-foreground', className)} {...props} />
}
export function SheetDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />
}
