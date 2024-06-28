import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../../icon/icon'
import '../modal.css'

const modalWarningVariants = cva(
  'modal-warning',
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

interface modalWarningProps extends VariantProps<typeof modalWarningVariants> {
  mode?: 'light' | 'dark'
}

export function ModalWarning({ mode }: modalWarningProps) {
  return (
    <div className={modalWarningVariants({ mode })}>
      <Icon className='modal-icon' iconType='alert-circle'/>
      <p>Informação ou aviso</p>
    </div>
  )
}
