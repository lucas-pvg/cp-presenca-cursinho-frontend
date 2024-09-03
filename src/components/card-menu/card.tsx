import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import './card.css'

const cardVariants = cva(
  'base-card',
  {
    variants: {
      variant: {
        primary: 'primary',
        secondary: 'secondary'
      },
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      variant: 'secondary',
      mode: 'light'
    }
  }
)

interface CardProps
  extends ComponentProps<typeof Link>, VariantProps<typeof cardVariants> {
    variant?: 'primary' | 'secondary'
    mode?: 'light' | 'dark'
    label: string
}

export function Card({ label, variant, mode, ...props }: CardProps) {
  return (
    <Link className={cardVariants({ mode, variant })} {...props}>
      <h5>{label}</h5>
    </Link>
  )
}
