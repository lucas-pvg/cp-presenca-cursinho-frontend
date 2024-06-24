import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './input.css'

const dateInputVariants = cva(
  'date-input input',
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

interface dateInputProps
  extends ComponentProps<'input'>, VariantProps<typeof dateInputVariants> {
    mode?: 'light' | 'dark'
}

export function DateInput({ mode, ...props }: dateInputProps) {
  return (
    <div className={dateInputVariants({ mode })}>
      <input type='date' {...props} />
      <Icon className='input-icon' iconType='search' />
    </div>
  )
}
