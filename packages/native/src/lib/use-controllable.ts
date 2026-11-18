import * as React from 'react'

/**
 * Estado controlado ou não controlado, no mesmo padrão do web (`value` e `defaultValue`).
 * Os primitivos nativos só aceitam `value`, então os componentes usam este gancho para manter a API igual.
 */
export function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [interno, setInterno] = React.useState<T>(defaultValue)
  const controlado = value !== undefined
  const atual = controlado ? (value as T) : interno
  const definir = React.useCallback(
    (v: T) => {
      if (!controlado) setInterno(v)
      onChange?.(v)
    },
    [controlado, onChange],
  )
  return [atual, definir] as const
}
