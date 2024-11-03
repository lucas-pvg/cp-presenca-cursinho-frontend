import { cva, VariantProps } from 'class-variance-authority';
import { Button } from '../../button/Button';
import '../modal.css';
import { Oval } from 'react-loader-spinner';

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
  close: () => void;
  confirm?: () => void;
  isLoading?: boolean;
}

export function ModalFooter({
  mode,
  type,
  form,
  close,
  confirm,
  isLoading = false,
}: modalFooterProps) {
  return (
    <div className={modalFooterVariants({ mode })}>
      {type == 'submit' ? (
        <Button type="submit" form={form} variant="solid" mode={mode}>
          {isLoading ? (
            <Oval
              color="var(--blue-inverse)"
              secondaryColor="#FFFFFF"
              height={20}
              width={20}
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          ) : (
            'Confirmar'
          )}
        </Button>
      ) : (
        <Button type="button" variant="solid" mode={mode} onClick={confirm}>
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
