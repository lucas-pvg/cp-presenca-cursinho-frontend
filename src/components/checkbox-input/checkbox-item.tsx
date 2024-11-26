import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import './checkbox-input'

const checkboxItemVariants = cva(
  'checkbox-item',
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

interface CheckboxItemProps
  extends ComponentProps<'input'>, VariantProps<typeof checkboxItemVariants> {
    label: string
}

export function CheckboxItem({ label, mode, ...props }: CheckboxItemProps) {
  return (
    <label className={checkboxItemVariants({ mode })}>
      <input type='checkbox' {...props}/>
      { label }
    </label>
  )
}
