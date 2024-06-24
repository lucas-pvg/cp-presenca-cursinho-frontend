import { cva, VariantProps } from 'class-variance-authority'
import '../modal.css'

const modalHeaderVariants = cva(
  'modal-header',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      },
      variant: {
        solid: 'solid',
        outline: 'outline'
      }
    },
    defaultVariants: {
      mode: 'light',
      variant: 'solid'
    }
  }
)

interface modalHeaderProps extends VariantProps<typeof modalHeaderVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  title: string
  description?: string
}

export function ModalHeader({ mode, variant, title, description }: modalHeaderProps) {
  return (
    <div className={modalHeaderVariants({ mode, variant })}>
      <h4 className='title'>{title}</h4>
      { description && <p className='description'>{description}</p> }
    </div>
  )
}
