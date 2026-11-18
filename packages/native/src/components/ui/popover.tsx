import * as React from 'react'
import { Modal, Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'

interface PopoverContextValue { open: boolean; setOpen: (o: boolean) => void }
const PopoverContext = React.createContext<PopoverContextValue | null>(null)
function usePopover() {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) throw new Error('Os componentes Popover* precisam estar dentro de <Popover>.')
  return ctx
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/** Painel de apoio aberto por um botão. No celular ele abre numa camada em tela, no lugar do balão do web. */
export function Popover({ open, defaultOpen = false, onOpenChange, children }: PopoverProps) {
  const [aberto, setOpen] = useControllable(open, defaultOpen, onOpenChange)
  return <PopoverContext.Provider value={{ open: aberto, setOpen }}>{children}</PopoverContext.Provider>
}

export function PopoverTrigger({ children, ...props }: React.ComponentProps<typeof Pressable>) {
  const { open, setOpen } = usePopover()
  return (
    <Pressable accessibilityRole="button" aria-expanded={open} onPress={() => setOpen(true)} {...props}>
      {children}
    </Pressable>
  )
}

export function PopoverContent({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { open, setOpen } = usePopover()
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable accessibilityLabel="Fechar" onPress={() => setOpen(false)} className="flex-1 items-center justify-center bg-overlay p-6">
        <Pressable accessible={false} className={cn('w-full max-w-sm rounded-lg border border-border bg-popover p-4', className)}>
          <View>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
