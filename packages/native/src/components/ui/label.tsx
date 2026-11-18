import * as React from 'react'
import * as LabelPrimitive from '@rn-primitives/label'
import { cn } from '../../lib/utils'

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Text>) {
  return (
    <LabelPrimitive.Root>
      <LabelPrimitive.Text className={cn('font-sans-medium text-sm leading-none text-foreground', className)} {...props} />
    </LabelPrimitive.Root>
  )
}
