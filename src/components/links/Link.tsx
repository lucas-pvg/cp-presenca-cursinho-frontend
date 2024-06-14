import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import Icon from '../../assets/icon-book.svg?react'
import './Link.css'

const LinkVariants = cva(
  'base-link',
  {
    variants: {
      state: {
        active: 'active',
        inactive: 'inactive'
      },
      icon: {
        true: 'icon',
        false: 'no-icon'
      },
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      state: 'inactive',
      icon: true,
      mode: 'light'
    }
  }
)

interface LinkProps
  extends ComponentProps<'a'>, VariantProps<typeof LinkVariants> {
    state?: 'active' | 'inactive'
    mode?: 'light' | 'dark'
    icon?: boolean
}

export function Link({state, mode, icon, ...props }: LinkProps) {
  return (
    <a className={LinkVariants({ state, mode, icon })} {...props}>
      <Icon />
      {props.children}
    </a>
  )
}
