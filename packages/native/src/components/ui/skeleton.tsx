import * as React from 'react'
import { Animated, View } from 'react-native'
import { cn } from '../../lib/utils'

/** Bloco de carregamento com pulso. Esconde-se dos leitores de tela: o contêiner anuncia o estado. */
export function Skeleton({ className, ...props }: React.ComponentProps<typeof View>) {
  const opacidade = React.useRef(new Animated.Value(1)).current
  React.useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(opacidade, { toValue: 0.5, duration: 800, useNativeDriver: true }),
        Animated.timing(opacidade, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    )
    animacao.start()
    return () => animacao.stop()
  }, [opacidade])
  return (
    <Animated.View style={{ opacity: opacidade }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
      <View className={cn('rounded-md bg-muted', className)} {...props} />
    </Animated.View>
  )
}
