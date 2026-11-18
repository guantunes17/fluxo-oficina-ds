import * as React from 'react'
import { Modal, Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Button, type ButtonProps } from './button'
import { Text } from './text'

interface DialogContextValue { open: boolean; setOpen: (o: boolean) => void }
const DialogContext = React.createContext<DialogContextValue | null>(null)
function useDialog() {
  const ctx = React.useContext(DialogContext)
  if (!ctx) throw new Error('Os componentes Dialog* precisam estar dentro de <Dialog>.')
  return ctx
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/** Diálogo de confirmação. Pede uma decisão e não fecha ao tocar fora. */
export function Dialog({ open, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [aberto, definir] = useControllable(open, defaultOpen, onOpenChange)
  return <DialogContext.Provider value={{ open: aberto, setOpen: definir }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ asChild, children, ...props }: React.ComponentProps<typeof Pressable> & { asChild?: boolean }) {
  const { setOpen } = useDialog()
  if (asChild && React.isValidElement<{ onPress?: () => void }>(children))
    return React.cloneElement(children, { onPress: () => setOpen(true) })
  return <Pressable accessibilityRole="button" onPress={() => setOpen(true)} {...props}>{children}</Pressable>
}

export function DialogContent({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { open, setOpen } = useDialog()
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <View className="flex-1 items-center justify-center bg-neutro-950/50 p-4">
        <View accessibilityViewIsModal role="alertdialog" className={cn('w-full max-w-md gap-4 rounded-lg border border-border bg-popover p-6', className)}>
          {children}
        </View>
      </View>
    </Modal>
  )
}
export function DialogHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('gap-1.5', className)} {...props} />
}
export function DialogFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('gap-2', className)} {...props} />
}
export function DialogTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text accessibilityRole="header" className={cn('font-sans-semibold text-lg text-popover-foreground', className)} {...props} />
}
export function DialogDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />
}
export function DialogAction({ onPress, ...props }: ButtonProps) {
  const { setOpen } = useDialog()
  return <Button onPress={(e) => { onPress?.(e); setOpen(false) }} {...props} />
}
export function DialogCancel({ onPress, ...props }: ButtonProps) {
  const { setOpen } = useDialog()
  return <Button variant="outline" onPress={(e) => { onPress?.(e); setOpen(false) }} {...props} />
}
