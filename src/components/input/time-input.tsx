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
    names: Array<string>
    values?: Array<string>
}

export function TimeInput({ mode, names, values, ...props }: timeInputProps) {
  return (
    <div className={timeInputVariants({ mode })}>
      <div className='time'>
        <span>Das</span>
        <input name={names[0]} value={values && values[0]} type='time' {...props} />
        <span>às</span>
        <input name={names[1]} value={values && values[1]} type='time' {...props} />
      </div>
      
      <Icon className='input-icon' iconType='clock' />
    </div>
  )
}
