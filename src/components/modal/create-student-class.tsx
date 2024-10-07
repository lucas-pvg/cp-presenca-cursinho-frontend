import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { ModalFooter } from './modal-components/modal-footer';
import { Input } from '../input/input';
import { SelectInput } from '../select-input/select-input';

import { StudentClassRequest } from '../../data/models/student-class.model';
import Services from '../../services';
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

interface createClassProps extends VariantProps<typeof createStudentClassVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: () => void;
}

export function CreateStudentClass({ mode, variant, close }: createClassProps) {
  const [closingAnimation, setClosingAnimation] = useState(false)
  const [studentClassData, setStudentClassData] = useState<StudentClassRequest>({
    name: '',
    modality: '',
    course: '',
    classroom: '',
    subjects: [1, 3]
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStudentClassData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(studentClassData)
    Services.createStudentClass(studentClassData)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setClosingAnimation(true)
    setTimeout(() => close(), 200);
  };

  return (
    <div className={closingAnimation ? 'modal modal-close' : 'modal modal-open'}>
      <div className="modal-background" onClick={() => handleClose()} />

      <div className={createStudentClassVariants({ mode })}>
        <ModalHeader
          title="Criar Turma"
          description="Crie uma turma para, posteriormente, selecionar os alunos que fazem parte dela."
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
            <form id="class-form" onSubmit={handleSubmit}>
              <ModalRow labels={['Nome da Turma', 'Modalidade']} mode={mode}>
                <Input
                  type="text"
                  name="name"
                  value={studentClassData.name}
                  placeholder="Nome da turma"
                  mode={mode}
                  onChange={handleChange}
                />

                <SelectInput
                  placeholder="-- Modalidade --"
                  name="modality"
                  value={studentClassData.modality}
                  onChange={handleChange}
                >
                  <option value='ON'>Online</option>
                  <option value='IN'>Presencial</option>
                </SelectInput>
              </ModalRow>

              <ModalRow labels={['Nome do Curso', 'Sala']} mode={mode}>
                <Input
                  type="text"
                  name="course"
                  value={studentClassData.course}
                  placeholder="Nome do curso"
                  mode={mode}
                  onChange={handleChange}
                />

                <Input
                  type="text"
                  name="classroom"
                  value={studentClassData.classroom}
                  placeholder="Sala"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>
            </form>
          </div>

          <hr className="divider" />
          <ModalFooter
            mode={mode}
            confirm={() => handleSubmit()}
            close={() => handleClose()}
          />
        </div>
      </div>
    </div>
  );
}
