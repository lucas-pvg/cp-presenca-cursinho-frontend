import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './text-card.css'

const TextCardVariants = cva(
  'text-card',
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

interface TextCardProps
  extends ComponentProps<'div'>, VariantProps<typeof TextCardVariants> {
    mode?: 'light' | 'dark'
    label?: string
    iconType?: string
}

export function TextCard({ mode, label, iconType, ...props }: TextCardProps) {
  return (
    <div className={TextCardVariants({ mode })} {...props}>
      <div className='header'>
        { iconType && <Icon iconType={iconType} size={16} /> }
        { label && <h6>{label}</h6> }        
      </div>
      <p>{ props.children }</p>
    </div>
  )
}
