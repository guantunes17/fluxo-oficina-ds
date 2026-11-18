import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../lib/utils'

/** Iniciais a partir do nome: "Carlos Mendes" vira "CM". */
export function initialsOf(name: string) {
  const partes = name.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return '?'
  const primeira = partes[0]![0]!
  const ultima = partes.length > 1 ? partes[partes.length - 1]![0]! : ''
  return (primeira + ultima).toUpperCase()
}

export interface AvatarProps extends Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, 'children'> {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

const tamanhos = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-14 text-lg' } as const

/** Foto da pessoa, ou as iniciais quando não há foto. O nome vira o rótulo acessível. */
export function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root data-slot="avatar" role="img" aria-label={name} className={cn('relative inline-flex shrink-0 overflow-hidden rounded-full', tamanhos[size], className)} {...props}>
      {src ? <AvatarPrimitive.Image src={src} alt="" className="size-full object-cover" /> : null}
      <AvatarPrimitive.Fallback aria-hidden className="flex size-full items-center justify-center bg-accent font-semibold text-accent-foreground">
        {initialsOf(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
