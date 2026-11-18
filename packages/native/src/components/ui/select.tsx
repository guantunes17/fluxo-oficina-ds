import * as React from 'react'
import { Modal, Pressable, View } from 'react-native'
import { cn } from '../../lib/utils'
import { useControllable } from '../../lib/use-controllable'
import { Text } from './text'

interface SelectContextValue {
  value: string
  setValue: (v: string) => void
  open: boolean
  setOpen: (o: boolean) => void
  labels: Record<string, string>
  registrar: (value: string, label: string) => void
  placeholder?: string
}
const SelectContext = React.createContext<SelectContextValue | null>(null)
function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error('Os componentes Select* precisam estar dentro de <Select>.')
  return ctx
}

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  defaultOpen?: boolean
  children?: React.ReactNode
}

/**
 * Lista de escolha única. No celular a lista abre numa folha em tela (Modal), no lugar do popover do web.
 * As opções ficam montadas e escondidas enquanto a lista está fechada, para o gatilho mostrar o rótulo do valor.
 */
export function Select({ value, defaultValue = '', onValueChange, defaultOpen = false, children }: SelectProps) {
  const [atual, definir] = useControllable(value, defaultValue, onValueChange)
  const [open, setOpen] = React.useState(defaultOpen)
  const [labels, setLabels] = React.useState<Record<string, string>>({})
  const registrar = React.useCallback((v: string, l: string) => setLabels((prev) => (prev[v] === l ? prev : { ...prev, [v]: l })), [])
  const ctx = React.useMemo(
    () => ({ value: atual, setValue: (v: string) => { definir(v); setOpen(false) }, open, setOpen, labels, registrar }),
    [atual, definir, open, labels, registrar],
  )
  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>
}

export function SelectTrigger({ className, children, accessibilityLabel, ...props }: React.ComponentProps<typeof Pressable>) {
  const { open, setOpen, value, labels } = useSelect()
  // O nome acessível precisa conter o texto visível (o valor escolhido), então o rótulo do campo vem junto dele.
  const rotulo = value ? (labels[value] ?? value) : undefined
  const nome = accessibilityLabel ? (rotulo ? `${accessibilityLabel}, ${rotulo}` : accessibilityLabel) : undefined
  return (
    <Pressable
      accessibilityLabel={nome}
      accessibilityRole="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      onPress={() => setOpen(true)}
      className={cn('min-h-touch w-full flex-row items-center justify-between gap-2 rounded-md border border-input bg-background px-3', className)}
      {...props}
    >
      <>{children}</>
      <Text className="text-muted-foreground">▾</Text>
    </Pressable>
  )
}

export function SelectValue({ placeholder = 'Selecione', className }: { placeholder?: string; className?: string }) {
  const { value, labels } = useSelect()
  const rotulo = value ? (labels[value] ?? value) : undefined
  return <Text className={cn('flex-1 text-base', !rotulo && 'text-muted-foreground', className)}>{rotulo ?? placeholder}</Text>
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  const { open, setOpen } = useSelect()
  return (
    <>
      {/* Montadas e escondidas: registram o rótulo de cada opção. */}
      {open ? null : <View style={{ display: 'none' }}>{children}</View>}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable accessibilityLabel="Fechar a lista" onPress={() => setOpen(false)} className="flex-1 justify-end bg-neutro-950/50">
          <Pressable accessible={false} className="max-h-[70%] rounded-t-xl border-t border-border bg-popover p-2 pb-6">
            <View accessibilityRole="menu" className="gap-0.5">{children}</View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

export function SelectItem({ value, children, className }: { value: string; children: string; className?: string }) {
  const { value: atual, setValue, registrar } = useSelect()
  React.useEffect(() => registrar(value, children), [registrar, value, children])
  const marcado = atual === value
  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityState={{ selected: marcado }}
      onPress={() => setValue(value)}
      className={cn('min-h-touch flex-row items-center gap-2 rounded-sm px-3 active:bg-accent', marcado && 'bg-accent', className)}
    >
      <Text className="w-4 text-center text-sm">{marcado ? '✓' : ''}</Text>
      <Text className="flex-1 text-base text-popover-foreground">{children}</Text>
    </Pressable>
  )
}

