import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Link, To } from 'react-router-dom'
import './Button.css'


const ButtonVariants = cva(
  'base-button',
  {
    variants: {
      variant: {
        solid: 'solid',
        outline: 'outline',
        present: 'presence-button',
        absent: 'abscense-button'
      },
      mode: {
        dark: 'dark',
        light: 'light'
      }
    },
    defaultVariants: {
      variant: 'solid',
      mode: 'light'
    }
  }
)

interface ButtonProps
  extends ComponentProps<'button'>, VariantProps<typeof ButtonVariants> {
    to?: To
    variant?: 'solid' | 'outline' | 'present' | 'absent'
    mode?: 'light' | 'dark'
}

export function Button({ to, variant, mode, ...props }: ButtonProps) {
  if (to) {
    return (
      <Link to={to}>
        <button className={ButtonVariants({variant, mode})} {...props} />
      </Link>
    )
  }
  
  else return (    
    <button className={ButtonVariants({variant, mode})} {...props} />
  )
}
