import { cva, VariantProps } from 'class-variance-authority';
import { Button } from '../../button/Button';
import '../modal.css';

const modalFooterVariants = cva('modal-footer', {
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

interface modalFooterProps extends VariantProps<typeof modalFooterVariants> {
  mode?: 'light' | 'dark';
  type?: 'submit' | 'button';
  form?: string;
  close: Function;
}

export function ModalFooter({ mode, type, form, close }: modalFooterProps) {
  return (
    <div className={modalFooterVariants({ mode })}>
      {type == 'submit' ? (
        <Button type="submit" form={form} variant="solid" mode={mode}>
          Confirmar
        </Button>
      ) : (
        <Button type="button" variant="solid" mode={mode}>
          Confirmar
        </Button>
      )}

      <Button
        type="button"
        variant="outline"
        mode={mode}
        onClick={() => close()}
      >
        Cancelar
      </Button>
    </div>
  );
}
