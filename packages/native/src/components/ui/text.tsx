import * as React from 'react'
import { Text as RNText } from 'react-native'
import { cn } from '../../lib/utils'

/** Classe de texto herdada de quem envolve o texto (Button, Badge, Alert). Evita repetir a cor em cada filho. */
export const TextClassContext = React.createContext<string | undefined>(undefined)

export function Text({ className, ...props }: React.ComponentProps<typeof RNText>) {
  const herdada = React.useContext(TextClassContext)
  return <RNText className={cn('font-sans text-base text-foreground', herdada, className)} {...props} />
}
