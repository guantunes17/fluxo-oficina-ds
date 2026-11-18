import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'
import { Label } from './label'

interface FieldContexto { id: string; erro: boolean }
const FieldContext = React.createContext<FieldContexto | null>(null)
function useField() {
  const c = React.useContext(FieldContext)
  if (!c) throw new Error('FieldLabel, FieldControl e FieldMessage ficam dentro de <Field>.')
  return c
}

/** Agrupa rótulo, controle, dica e mensagem de erro e liga os ids para o leitor de tela. */
export function Field({ className, invalid = false, ...props }: React.ComponentProps<'div'> & { invalid?: boolean }) {
  const id = React.useId()
  return (
    <FieldContext.Provider value={{ id, erro: invalid }}>
      <div data-slot="field" className={cn('grid gap-1', className)} {...props} />
    </FieldContext.Provider>
  )
}
export function FieldLabel(props: React.ComponentProps<typeof Label>) {
  const { id } = useField()
  return <Label htmlFor={id} {...props} />
}
/** Passa id, aria-invalid e aria-describedby ao único filho (Input, SelectTrigger, Textarea). */
export function FieldControl(props: React.ComponentProps<typeof Slot>) {
  const { id, erro } = useField()
  return <Slot id={id} aria-invalid={erro ? true : undefined} aria-describedby={`${id}-dica ${id}-erro`} {...props} />
}
export function FieldHint({ className, ...props }: React.ComponentProps<'p'>) {
  const { id } = useField()
  return <p id={`${id}-dica`} data-slot="field-hint" className={cn('text-helper text-muted-foreground', className)} {...props} />
}
/** Só aparece com invalid. role="alert" anuncia o erro assim que ele surge. */
export function FieldMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { id, erro } = useField()
  if (!erro) return null
  return <p id={`${id}-erro`} role="alert" data-slot="field-message" className={cn('text-helper text-danger-foreground', className)} {...props} />
}
