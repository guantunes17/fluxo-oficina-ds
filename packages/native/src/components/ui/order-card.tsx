import * as React from 'react'
import { View } from 'react-native'
import { Badge } from './badge'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { PriorityBadge, type Priority } from './priority-badge'
import { Text } from './text'
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
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <View className="flex-row items-start justify-between gap-2">
          <CardTitle className="flex-1 text-heading-card">{number}</CardTitle>
          <Badge variant={stageTone}><Text>{stage}</Text></Badge>
        </View>
        <Text className="text-body-compact text-muted-foreground">{vehicle}</Text>
      </CardHeader>
      <CardContent className="gap-2">
        <Text className="font-sans-medium text-sm tracking-wide">{plate}</Text>
        <Text className="text-body-compact">{customer}</Text>
        <View className="flex-row flex-wrap items-center gap-2">
          {priority ? <PriorityBadge priority={priority} /> : null}
          {mechanic ? <Text className="text-helper text-muted-foreground">{`Mecânico: ${mechanic}`}</Text> : null}
        </View>
      </CardContent>
    </Card>
  )
}
