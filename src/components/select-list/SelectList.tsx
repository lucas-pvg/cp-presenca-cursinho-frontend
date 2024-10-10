import { cva, VariantProps } from 'class-variance-authority';
import { StudentSelect } from '../../data/models/student.model';
import { ModalFooter } from '../modal/modal-components/modal-footer';
import { ModalHeader } from '../modal/modal-components/modal-header';
import { ModalRow } from '../modal/modal-components/modal-row';
import './SelectList.css';

const selectListVariants = cva(
  'base-modal input-modal select-list',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
  defaultVariants: {
    mode: 'light',
  },
});

interface ListProps extends VariantProps<typeof selectListVariants> {
  items: StudentSelect[];
  verifyIncluded: (id: number) => boolean;
  handleListChange: (id: number) => void;
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: () => void;
  confirm: () => void;
}

export function SelectList({
  items,
  mode,
  variant,
  close,
  verifyIncluded,
  handleListChange,
  className,
  confirm,
}: ListProps) {
  const handleClose = () => {
    close();
  };

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => handleClose()} />

      <div className={selectListVariants({ mode })}>
        <ModalHeader
          title="Alunos"
          description="Adicione os alunos que farão parte da presente turma."
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
            {items.map((item) => (
              <div key={item.id}>
                <ModalRow labels={['Nome']} mode={mode}>
                  <div className="row-content">
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={verifyIncluded(item.id)}
                      onChange={() => handleListChange(item.id)}
                    />
                    <label htmlFor={`item-${item.id}`}>{item.name}</label>
                  </div>
                </ModalRow>
              </div>
            ))}
          </div>

          <hr className="divider" />
          {/* <ModalWarning mode={mode} /> */}
          <ModalFooter
            form="class-form"
            mode={mode}
            close={() => handleClose()}
            confirm={confirm}
          />
        </div>
      </div>
    </div>
  );
}
