import * as React from 'react'
import { Badge } from './badge'
import { Text } from './text'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

const config = {
  low: { variant: 'neutral', label: 'Baixa', marca: '▽' },
  medium: { variant: 'info', label: 'Média', marca: '◇' },
  high: { variant: 'warning', label: 'Alta', marca: '△' },
  urgent: { variant: 'danger', label: 'Urgente', marca: '▲' },
} as const

export interface PriorityBadgeProps extends Omit<React.ComponentProps<typeof Badge>, 'variant' | 'children'> {
  priority: Priority
}

/** Prioridade da ordem. Leva texto e um símbolo, para não depender só da cor. */
export function PriorityBadge({ priority, ...props }: PriorityBadgeProps) {
  const c = config[priority]
  return (
    <Badge variant={c.variant} accessibilityLabel={`Prioridade ${c.label.toLowerCase()}`} {...props}>
      <Text>{`${c.marca} ${c.label}`}</Text>
    </Badge>
  )
}
