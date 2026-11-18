import * as React from 'react'
import { Image, View } from 'react-native'
import { cn } from '../../lib/utils'
import { Text } from './text'

/** Iniciais a partir do nome: "Carlos Mendes" vira "CM". */
export function initialsOf(name: string) {
  const partes = name.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return '?'
  const primeira = partes[0]![0]!
  const ultima = partes.length > 1 ? partes[partes.length - 1]![0]! : ''
  return (primeira + ultima).toUpperCase()
}

export interface AvatarProps extends Omit<React.ComponentProps<typeof View>, 'children'> {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

const tamanhos = { sm: 'size-8', md: 'size-10', lg: 'size-14' } as const
const textos = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg' } as const

/** Foto da pessoa, ou as iniciais quando não há foto. O nome vira o rótulo acessível. */
export function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps) {
  const [falhou, setFalhou] = React.useState(false)
  const mostrarFoto = !!src && !falhou
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={name} className={cn('items-center justify-center overflow-hidden rounded-full bg-accent', tamanhos[size], className)} {...props}>
      {mostrarFoto ? (
        <Image source={{ uri: src }} accessibilityElementsHidden onError={() => setFalhou(true)} className="size-full" />
      ) : (
        <Text className={cn('font-sans-semibold text-accent-foreground', textos[size])}>{initialsOf(name)}</Text>
      )}
    </View>
  )
}
