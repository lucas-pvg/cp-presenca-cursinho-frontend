import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './input.css'

const timeInputVariants = cva(
  'time-input input',
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

interface timeInputProps
  extends ComponentProps<'input'>, VariantProps<typeof timeInputVariants> {
    mode?: 'light' | 'dark'
}

export function TimeInput({ mode, ...props }: timeInputProps) {
  return (
    <div className={timeInputVariants({ mode })}>
      <div className='time'>
        <span>Das:</span>
        <input type='time' {...props} />
      </div>

      <div className='time'>
        <span>às:</span>
        <input type='time' {...props} />
      </div>
      
      <Icon className='input-icon' iconType='search' />
    </div>
  )
}
