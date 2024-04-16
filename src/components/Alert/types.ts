export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type AlertEffect = 'light' | 'dark'

export interface AlertProps {
  type?: AlertType
  effect?: AlertEffect
  title?: string
  description?: string
  content?: string
  closable?: boolean
  closeText?: string
}

export interface AlertEmits {
  (e: 'close'): void
}

export interface AlertInstance {
  hide: () => void
}
