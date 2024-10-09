import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from '../modal-components/modal-header';
import { ModalRow } from '../modal-components/modal-row';
import { ModalFooter } from '../modal-components/modal-footer';
import { Input } from '../../input/input';
import { SelectInput } from '../../select-input/select-input';

import { StudentClass, StudentClassInterface } from '../../../data/models/student-class.model';
import Services from '../../../services';
import '../modal.css';

const editStudentClassVariants = cva('base-modal input-modal', {
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

interface createClassProps extends VariantProps<typeof editStudentClassVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  studentClass: StudentClass
  close: () => void;
}

export function EditStudentClass({ mode, studentClass, variant, close }: createClassProps) {
  const [studentClassData, setStudentClassData] = useState<StudentClassInterface>(studentClass.toDict());

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStudentClassData((prev) => ({...prev!, [name]: value}))
  };

  const handleSubmit = () => {
    studentClassData?.id &&
    Services.updateStudentClass(studentClassData.id, studentClassData)
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={editStudentClassVariants({ mode })}>
      <ModalHeader
        title="Editar Turma"
        description="Edite os parâmetros e as propriedades de uma turma."
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
                value={studentClassData?.name}
                placeholder="Nome da turma"
                mode={mode}
                onChange={handleChange}
              />

              <SelectInput
                placeholder="-- Modalidade --"
                name="modality"
                value={studentClassData?.modality ?? 'default'}
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
                value={studentClassData?.course}
                placeholder="Nome do curso"
                mode={mode}
                onChange={handleChange}
              />

              <Input
                type="text"
                name="classroom"
                value={studentClassData?.classroom}
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
          close={() => close()}
        />
      </div>
    </div>
  );
}
