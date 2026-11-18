import * as React from 'react'
import { Modal, Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Text } from './text'

interface MenuContextValue { open: boolean; setOpen: (o: boolean) => void }
const MenuContext = React.createContext<MenuContextValue | null>(null)
function useMenu() {
  const ctx = React.useContext(MenuContext)
  if (!ctx) throw new Error('Os componentes DropdownMenu* precisam estar dentro de <DropdownMenu>.')
  return ctx
}

export interface DropdownMenuProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/** Menu de ações. No celular ele abre numa folha em tela, igual à lista do Select. */
export function DropdownMenu({ open, defaultOpen = false, onOpenChange, children }: DropdownMenuProps) {
  const [aberto, setOpen] = useControllable(open, defaultOpen, onOpenChange)
  return <MenuContext.Provider value={{ open: aberto, setOpen }}>{children}</MenuContext.Provider>
}

export function DropdownMenuTrigger({ children, ...props }: React.ComponentProps<typeof Pressable>) {
  const { open, setOpen } = useMenu()
  return (
    <Pressable accessibilityRole="button" aria-haspopup="menu" aria-expanded={open} onPress={() => setOpen(true)} {...props}>
      {children}
    </Pressable>
  )
}

export function DropdownMenuContent({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { open, setOpen } = useMenu()
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable accessibilityLabel="Fechar o menu" onPress={() => setOpen(false)} className="flex-1 justify-end bg-overlay">
        <Pressable accessible={false} className={cn('rounded-t-xl border-t border-border bg-popover p-2 pb-6', className)}>
          <View accessibilityRole="menu" className="gap-0.5">{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export interface DropdownMenuItemProps extends Omit<React.ComponentProps<typeof Pressable>, 'children'> {
  destructive?: boolean
  onSelect?: () => void
  children: string
}

export function DropdownMenuItem({ className, destructive, onSelect, children, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useMenu()
  return (
    <Pressable
      accessibilityRole="menuitem"
      onPress={() => {
        onSelect?.()
        setOpen(false)
      }}
      className={cn('min-h-touch flex-row items-center rounded-sm px-3 active:bg-accent', className)}
      {...props}
    >
      <Text className={cn('text-base text-popover-foreground', destructive && 'text-danger-foreground')}>{children}</Text>
    </Pressable>
  )
}

export function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('px-3 py-1.5 font-sans-medium text-xs text-muted-foreground', className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('my-1 h-px bg-border', className)} {...props} />
}
