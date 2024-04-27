import type { Placement } from '@floating-ui/vue'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  offset?: number
  manual?: boolean
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
