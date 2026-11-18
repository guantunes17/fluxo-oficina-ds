import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { theme } from '@fluxo-oficina/tokens/native'

// Os papéis de tipografia (text-heading-page, text-label...) são tamanhos de fonte, não cores.
// Sem isto o tailwind-merge os trata como cor e apaga a cor do texto (text-foreground).
const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-size': [{ text: Object.keys(theme.role) }] } },
})

/** Junta classes condicionais e resolve conflitos do Tailwind (a última vence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
