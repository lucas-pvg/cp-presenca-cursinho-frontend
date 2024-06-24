import { cva, VariantProps } from 'class-variance-authority'
import { Button } from '../../button/Button'
import '../modal.css'

const modalFooterVariants = cva(
  'modal-footer',
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

interface modalFooterProps extends VariantProps<typeof modalFooterVariants> {
  mode?: 'light' | 'dark'
}

export function ModalFooter({ mode }: modalFooterProps) {
  return (
    <div className={modalFooterVariants({ mode })} >
      <Button variant='solid' mode={mode}>Confirm</Button>
      <Button variant='outline' mode={mode}>Cancel</Button>
    </div>
  )
}
