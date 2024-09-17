import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { ModalFooter } from './modal-components/modal-footer';
import { Input } from '../input/input';
import './modal.css';

const createStudentClassVariants = cva('base-modal input-modal', {
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

interface createClassProps
  extends VariantProps<typeof createStudentClassVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: () => void;
}

export function CreateStudentClass({
  mode,
  variant,
  close,
  className,
}: createClassProps) {
  const [studentClassData, setStudentClassData] = useState({
    name: '',
    modality: '',
    course: '',
    classroom: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStudentClassData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {};

  const handleClose = () => {
    close();
    setStudentClassData({
      name: '',
      modality: '',
      course: '',
      classroom: '',
      startTime: '',
      endTime: '',
    });
  };

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => handleClose()} />

      <div className={createStudentClassVariants({ mode })}>
        <ModalHeader
          title="Criar Turma"
          description="Crie uma turma e selecione os alunos que fazem parte dela."
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
            <form id="class-form" onSubmit={handleSubmit}>
              <ModalRow labels={['Turma']} mode={mode}>
                <Input
                  type="text"
                  name="name"
                  value={studentClassData.name}
                  placeholder="Turma"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>

              <ModalRow labels={['Modalidade', 'Curso']} mode={mode}>
                <Input
                  type="select"
                  name="modality"
                  value={studentClassData.modality}
                  placeholder="Selecione a modalidade"
                  mode={mode}
                  onChange={handleChange}
                />
                <Input
                  type="select"
                  name="course"
                  value={studentClassData.course}
                  placeholder="Selecione o curso"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>

              <ModalRow labels={['Sala', 'Horário']} mode={mode}>
                <Input
                  type="text"
                  name="classroom"
                  value={studentClassData.classroom}
                  mode={mode}
                  onChange={handleChange}
                />
                <Input
                  type="time"
                  names={['startTime', 'endTime']}
                  value={[studentClassData.startTime, studentClassData.endTime]}
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>
            </form>
          </div>

          <hr className="divider" />
          {/* <ModalWarning mode={mode} /> */}
          <ModalFooter
            type="submit"
            form="class-form"
            mode={mode}
            close={() => handleClose()}
          />
        </div>
      </div>
    </div>
  );
}
