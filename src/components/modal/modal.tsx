import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { ModalWarning } from './modal-components/modal-warning';
import { ModalFooter } from './modal-components/modal-footer';
import './modal.css';

const modalVariants = cva('base-modal', {
  variants: {
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

interface modalProps extends VariantProps<typeof modalVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: Function;
}

export function Modal({ mode, variant, close, className }: modalProps) {
  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => close()} />

      <div className={modalVariants({ mode })}>
        <ModalHeader
          title="Title"
          description="Description"
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
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
          <ModalWarning mode={mode} description='Aviso ou informação!' />
          <ModalFooter type='button' mode={mode} close={() => close()} />
        </div>
      </div>
    </div>
  );
}
