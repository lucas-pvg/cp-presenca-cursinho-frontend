import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './alert.css'

const alertVariants = cva(
  'base-alert',
  {
    variants: {
      animation: {
        open: 'alert-open',
        close: 'alert-close'
      },
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      animation: 'close',
      mode: 'light'
    }
  }
)

interface AlertProps
  extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {
    animation?: 'open' | 'close'
    mode?: 'light' | 'dark'
    close: Function
}

export function Alert({ animation, mode, close, ...props }: AlertProps) {
  return (
    <div className={alertVariants({ mode, animation })} {...props}>
      <Icon className='close-alert-icon' iconType='x' size={16} onClick={() => close()} />

      <div className='alert-content'>
        <p>
          { props.children }
        </p>
      </div>
    </div>
  )
}
