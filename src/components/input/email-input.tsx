import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './input.css'

const emailInputVariants = cva(
  'email-input input',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      mode: 'light'
    }
  }
)

interface emailInputProps
  extends ComponentProps<'input'>, VariantProps<typeof emailInputVariants> {
    mode?: 'light' | 'dark'
}

export function EmailInput({ mode, ...props }: emailInputProps) {
  return (
    <div className={emailInputVariants({ mode })}>
      <Icon className='input-icon' iconType='at-sign' size={16} />
      <input type="email" {...props} />
    </div>
  )
}
