import { useColorScheme } from 'nativewind'
import { theme } from '@fluxo-oficina/tokens/native'

/** Cores do tema atual, para as props que não aceitam classe (placeholderTextColor, ícones). */
export function useThemeColors() {
  const { colorScheme } = useColorScheme()
  return theme.colors[colorScheme === 'dark' ? 'dark' : 'light']
}
