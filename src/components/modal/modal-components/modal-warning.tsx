import { cva, VariantProps } from 'class-variance-authority';
import { Icon } from '../../icon/icon';
import '../modal.css';

const modalWarningVariants = cva('modal-warning', {
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

interface modalWarningProps extends VariantProps<typeof modalWarningVariants> {
  mode?: 'light' | 'dark'
  description: string

}

export function ModalWarning({ description, mode }: modalWarningProps) {
  return (
    <div className={modalWarningVariants({ mode })}>
      <Icon size={12} className='modal-icon' iconType='alert-circle'/>
      <p>{description}</p>
    </div>
  );
}
