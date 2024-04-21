import type { Placement } from '@floating-ui/vue'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}
