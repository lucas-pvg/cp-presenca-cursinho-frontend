import { useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from '../modal-components/modal-header';
import { ModalRow } from '../modal-components/modal-row';
import { ModalFooter } from '../modal-components/modal-footer';
import { Input } from '../../input/input';
import { SelectInput } from '../../select-input/select-input';
import { CheckboxInput } from '../../checkbox-input/checkbox-input';

import { Subject } from '../../../data/models/subject.model';
import { StudentClassRequest } from '../../../data/models/student-class.model';
import Services from '../../../services';
import '../modal.css';

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
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function CreateStudentClass({ mode, variant, close, onSuccess, onFailure, }: createClassProps) {
  const [studentClassData, setStudentClassData] = useState<StudentClassRequest>(
    {
      name: '',
      modality: '',
      course: '',
      classroom: '',
      subjects: [],
    }
  );

  const [subjects, setSubjects] = useState<Subject[]>([])
  useEffect(() => {
    Services.listSubjects()
      .then((data) => {
        setSubjects(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setStudentClassData((prevData) => ({
      ...prevData,
      [name as keyof StudentClassRequest]: type === "checkbox"
        ? checked
          ? [...(prevData[name as 'subjects']), parseInt(value)]
          : (prevData[name as 'subjects']).filter(id => id != parseInt(value))
        : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()

    Services.createStudentClass(studentClassData)
      .then((res) => {
        onSuccess && onSuccess();
        console.log(res);
        close();
      })
      .catch((err) => {
        onFailure && onFailure(err);
        console.log(err);
      });
  };

  return (
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
            <ModalRow labels={['Nome da Turma']} mode={mode}>
              <Input
                type="text"
                name="name"
                value={studentClassData.name}
                placeholder="Nome da turma"
                mode={mode}
                onChange={handleChange}
                required
              />
            </ModalRow>

            <ModalRow labels={['Modalidade', 'Frentes']} mode={mode}>
              <SelectInput
                placeholder="-- Modalidade --"
                name="modality"
                value={studentClassData.modality ?? 'default'}
                onChange={handleChange}
                required
              >
                <option value="ON">Online</option>
                <option value="IN">Presencial</option>
              </SelectInput>

              <CheckboxInput
                placeholder='Escolha as frentes'
                name='subjects'
                objects={subjects}
                label='name'
                id='id'
                selected={studentClassData.subjects}
                onChange={handleChange}
              />
            </ModalRow>

            <ModalRow labels={['Nome do Curso', 'Sala']} mode={mode}>
              <Input
                type="text"
                name="course"
                value={studentClassData.course}
                placeholder="Nome do curso"
                mode={mode}
                onChange={handleChange}
                required
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
          type='submit'
          form='class-form'
          close={() => close()}
        />
      </div>
    </div>
  );
}
