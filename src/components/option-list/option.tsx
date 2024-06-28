import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import './option.css'

const optionVariants = cva(
  'base-option',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      },
      active: {
        true: 'active',
        false: ''
      }
    },
    defaultVariants: {
      mode: 'light',
      active: false
    }
  }
)

interface OptionProps
  extends ComponentProps<'button'>, VariantProps<typeof optionVariants> {
    mode?: 'light' | 'dark'
    active?: boolean
}

export function Option({ active, mode, ...props }: OptionProps) {
  return (
    <button className={optionVariants({ mode, active })} {...props}>
      <span>{props.children}</span>
      <hr/>
    </button>
  )
}
