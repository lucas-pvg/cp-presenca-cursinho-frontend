import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './input.css'

const textInputVariants = cva(
  'text-input input',
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

interface textInputProps
  extends ComponentProps<'input'>, VariantProps<typeof textInputVariants> {
    mode?: 'light' | 'dark'
}

export function TextInput({ mode, ...props }: textInputProps) {
  return (
    <div className={textInputVariants({ mode })}>
      <Icon className='input-icon' iconType='align-justify' size={16} />
      <input {...props} />
    </div>
  )
}
