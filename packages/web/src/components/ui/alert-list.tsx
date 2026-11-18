import * as React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'

export interface AlertItem {
  id: string
  tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'highlight'
  title: string
  description?: string
}

/** Lista de avisos do sistema, do mais grave para o mais leve. Quem chama já entrega na ordem certa. */
export function AlertList({ items, label = 'Avisos', ...props }: { items: AlertItem[]; label?: string } & Omit<React.ComponentProps<'ul'>, 'children'>) {
  return (
    <ul aria-label={label} className="grid list-none gap-2 p-0" {...props}>
      {items.map((a) => (
        <li key={a.id}>
          <Alert variant={a.tone}>
            <AlertTitle>{a.title}</AlertTitle>
            {a.description ? <AlertDescription>{a.description}</AlertDescription> : null}
          </Alert>
        </li>
      ))}
    </ul>
  )
}
