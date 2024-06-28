import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './Links.css'

const LinksVariants = cva(
  'base-link',
  {
    variants: {
      state: {
        active: 'active',
        inactive: 'inactive'
      },
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      state: 'inactive',
      mode: 'light'
    }
  }
)

interface LinksProps
  extends ComponentProps<typeof Link>, VariantProps<typeof LinksVariants> {
    state?: 'active' | 'inactive'
    mode?: 'light' | 'dark'
    iconType?: string
}

export function Links({state, mode, iconType, ...props }: LinksProps) {
  
  return (
    <Link className={LinksVariants({ state, mode })} {...props}>
      <div className='link-content'>
        {
          iconType && <Icon iconType={iconType} />
        }
        {props.children}
      </div>

      <hr />
    </Link>
  )
}
