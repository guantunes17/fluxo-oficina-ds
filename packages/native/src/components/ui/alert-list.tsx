import * as React from 'react'
import { View } from 'react-native'
import { Alert, AlertDescription, AlertTitle } from './alert'

export interface AlertItem {
  id: string
  tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'highlight'
  title: string
  description?: string
}

/** Lista de avisos do sistema, do mais grave para o mais leve. Quem chama já entrega na ordem certa. */
export function AlertList({ items, label = 'Avisos', ...props }: { items: AlertItem[]; label?: string } & Omit<React.ComponentProps<typeof View>, 'children'>) {
  return (
    <View accessibilityRole="list" accessibilityLabel={label} className="gap-2" {...props}>
      {items.map((a) => (
        <View key={a.id} accessibilityRole="listitem">
          <Alert variant={a.tone}>
            <AlertTitle>{a.title}</AlertTitle>
            {a.description ? <AlertDescription>{a.description}</AlertDescription> : null}
          </Alert>
        </View>
      ))}
    </View>
  )
}
