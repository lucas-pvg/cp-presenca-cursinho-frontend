import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import Icon from '../../assets/icon-book.svg?react'
import './Links.css'

const LinksVariants = cva(
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

interface LinksProps
  extends ComponentProps<typeof Link>, VariantProps<typeof LinksVariants> {
    state?: 'active' | 'inactive'
    mode?: 'light' | 'dark'
    icon?: boolean
}

export function Links({state, mode, icon, ...props }: LinksProps) {
  return (
    <Link className={LinksVariants({ state, mode, icon })} {...props}>
      <Icon />
      {props.children}
    </Link>
  )
}
