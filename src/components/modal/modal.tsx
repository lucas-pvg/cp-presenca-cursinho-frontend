import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from './modal-components/modal-header'
import { ModalRow } from './modal-components/modal-row'
import { ModalWarning } from './modal-components/modal-warning'
import { ModalFooter } from './modal-components/modal-footer'
import './modal.css'

const modalVariants = cva(
  'base-modal',
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

interface modalProps extends VariantProps<typeof modalVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
}

export function Modal({ mode, variant }: modalProps) {
  return (
    <div className={modalVariants({ mode })}>
      <ModalHeader
        title='Title'
        description='Description'
        variant={variant}
        mode={mode}
      />

      <div className='modal-content'>
        <div className='body'>
          <ModalRow labels={['Title', 'Title', 'Title']} mode={mode}>
            <span>Description</span>
            <span>Description</span>
            <span>Description</span>
          </ModalRow>
          <ModalRow labels={['Title', 'Title', 'Title']} mode={mode}>
            <span>Description</span>
            <span>Description</span>
            <span>Description</span>
          </ModalRow>
          <ModalRow labels={['Title', 'Title', 'Title']} mode={mode}>
            <span>Description</span>
            <span>Description</span>
            <span>Description</span>
          </ModalRow>
        </div>

        <hr className='divider'/>
        <ModalWarning mode={mode} />
        <ModalFooter mode={mode} />
      </div>
    </div>
  )
}
