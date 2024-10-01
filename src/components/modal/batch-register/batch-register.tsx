import { cva, VariantProps } from 'class-variance-authority';
import './batch-register.css';
import { ModalHeader } from '../modal-components/modal-header';
import { DragAndDrop } from '../../drag-and-drop/DragAndDrop';
import { Button } from '../../button/Button';
import { useState } from 'react';
import { Icon } from '../../icon/icon';
import Services from '../../../services';
import { Oval } from 'react-loader-spinner';

const BatchRegisterVariants = cva('base-modal input-modal', {
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

interface BatchRegisterProps
  extends VariantProps<typeof BatchRegisterVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  onClose: () => void;
}

export function BatchRegister({
  mode,
  variant,
  onClose,
  className,
}: BatchRegisterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState({
    lines: 0,
    success: 0,
    errors: 0,
  });
  const [loading, setLoading] = useState(false);

  const onFileDrop = (files: File[]) => {
    setFile(files[0]);
    setFileInfo({
      lines: 0,
      success: 0,
      errors: 0,
    });
  };

  const onConfirm = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file as Blob);

    Services.registerMultipleUsers(formData)
      .then((response: any) => {
        console.log(response);
        setFileInfo({
          lines: response.total_lines,
          success: response.successful_count,
          errors: response.failed_count,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={onClose} />
      <div className={BatchRegisterVariants({ mode })}>
        <ModalHeader
          title="Cadastro em carga"
          description="Adicione vários usuários de uma única vez."
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
            {loading ? (
              <div className="loading-overlay">
                <Oval
                  color="var(--blue-base)"
                  secondaryColor="var(--blue-inverse)"
                  height={80}
                  width={80}
                />
              </div>
            ) : (
              <>
                <div className="content-container">
                  <DragAndDrop
                    mode={mode}
                    dropzoneProps={{
                      maxFiles: 1,
                      accept: {
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                          ['.xlsx'],
                      },
                    }}
                    onFileDrop={onFileDrop}
                    style={{ flex: file ? '1' : 'auto' }}
                  />
                  {file && (
                    <div className="file-info">
                      <p>Arquivo: {file.name}</p>
                      <div
                        className={`icon hash ${fileInfo.lines === 0 ? 'disabled' : ''}`}
                      >
                        <Icon iconType="hash" />
                        <div>
                          <p>{fileInfo.lines}</p>
                          <p>Linhas lidas</p>
                        </div>
                      </div>
                      <div
                        className={`icon check ${fileInfo.success === 0 ? 'disabled' : ''}`}
                      >
                        <Icon iconType="check" />
                        <div>
                          <p>{fileInfo.success}</p>
                          <p>Cadastros com sucesso</p>
                        </div>
                      </div>
                      <div
                        className={`icon x ${fileInfo.errors === 0 ? 'disabled' : ''}`}
                      >
                        <Icon iconType="x" />
                        <div>
                          <p>{fileInfo.errors}</p>
                          <p>Erros em cadastro</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <div className="button-group">
                    <Button
                      variant="solid"
                      mode={mode}
                      onClick={onConfirm}
                      disabled={loading}
                    >
                      Confirmar
                    </Button>
                    <Button
                      variant="outline"
                      mode={mode}
                      onClick={onClose}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                  </div>
                  <div className="button-right">
                    <Button variant="outline" mode={mode} disabled={loading}>
                      Baixar template
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
