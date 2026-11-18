import * as React from 'react'
import { View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

interface ToastItem { id: number; title: string; description?: string }
type Ouvinte = (itens: ToastItem[]) => void

let itens: ToastItem[] = []
let proximoId = 1
const ouvintes = new Set<Ouvinte>()
const emitir = () => ouvintes.forEach((o) => o(itens))

/** Dispara um aviso temporário. Mesma assinatura do `toast` do pacote web. */
export function toast(title: string, opcoes: { description?: string; duration?: number } = {}) {
  const id = proximoId++
  itens = [...itens, { id, title, description: opcoes.description }]
  emitir()
  setTimeout(() => { itens = itens.filter((i) => i.id !== id); emitir() }, opcoes.duration ?? 4000)
  return id
}

/** Região de avisos. Monte uma vez na raiz do app, depois de todo o conteúdo. */
export function Toaster({ className }: { className?: string }) {
  const [lista, setLista] = React.useState<ToastItem[]>(itens)
  React.useEffect(() => {
    ouvintes.add(setLista)
    return () => { ouvintes.delete(setLista) }
  }, [])
  if (lista.length === 0) return null
  return (
    <View pointerEvents="none" accessibilityLiveRegion="polite" className={cn('absolute left-4 right-4 top-12 gap-2', className)}>
      {lista.map((t) => (
        <View key={t.id} className="rounded-lg border border-border bg-popover px-4 py-3 shadow-md">
          <Text className="font-sans-semibold text-sm text-popover-foreground">{t.title}</Text>
          {t.description ? <Text className="text-sm text-muted-foreground">{t.description}</Text> : null}
        </View>
      ))}
    </View>
  )
}
