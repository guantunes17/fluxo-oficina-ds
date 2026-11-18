import * as React from 'react'
import { Badge } from './badge'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { PriorityBadge, type Priority } from './priority-badge'
import { cn } from '../../lib/utils'

export interface OrderCardProps extends Omit<React.ComponentProps<typeof Card>, 'children'> {
  /** Número da ordem de serviço, por exemplo "OS 1042". */
  number: string
  vehicle: string
  plate: string
  customer: string
  stage: string
  stageTone?: React.ComponentProps<typeof Badge>['variant']
  priority?: Priority
  mechanic?: string
}

/** Cartão da ordem de serviço. A placa e o cliente ficam sempre visíveis, porque o veículo é a identidade. */
export function OrderCard({ number, vehicle, plate, customer, stage, stageTone = 'info', priority, mechanic, className, ...props }: OrderCardProps) {
  return (
    <Card data-slot="order-card" className={cn('w-full max-w-sm', className)} {...props}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-heading-card">{number}</CardTitle>
          <Badge variant={stageTone}>{stage}</Badge>
        </div>
        <p className="text-body-compact text-muted-foreground">{vehicle}</p>
      </CardHeader>
      <CardContent className="grid gap-2">
        <p className="font-mono text-sm font-medium tracking-wide text-foreground">{plate}</p>
        <p className="text-body-compact text-foreground">{customer}</p>
        <div className="flex flex-wrap items-center gap-2">
          {priority ? <PriorityBadge priority={priority} /> : null}
          {mechanic ? <span className="text-helper text-muted-foreground">Mecânico: {mechanic}</span> : null}
        </div>
      </CardContent>
    </Card>
  )
}
