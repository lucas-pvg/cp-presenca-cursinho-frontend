import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './input.css'

const selectInputVariants = cva(
  'select-input input',
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

interface selectInputProps
  extends ComponentProps<'input'>, VariantProps<typeof selectInputVariants> {
    mode?: 'light' | 'dark'
}

export function SelectInput({ mode, ...props }: selectInputProps) {
  return (
    <div className={selectInputVariants({ mode })}>
      <input type='text' {...props} />
      <Icon className='input-icon' iconType='search' />
    </div>
  )
}
