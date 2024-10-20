import { useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from '../modal-components/modal-header';
import { ModalRow } from '../modal-components/modal-row';
import { ModalFooter } from '../modal-components/modal-footer';
import { Input } from '../../input/input';
import { SelectInput } from '../../select-input/select-input';

import { LessonCreateData } from '../../../data/models/lesson.model';
import { Subject } from '../../../data/models/subject.model';
import { StudentClass } from '../../../data/models/student-class.model';
import Services from '../../../services';
import '../modal.css';

const createLessonVariants = cva('base-modal input-modal', {
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

interface CreateLessonProps extends VariantProps<typeof createLessonVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function CreateLesson({ mode, variant, onSuccess, onFailure, close }: CreateLessonProps) {
  const [subjects, setSubjects] = useState(Array<Subject>);0
  useEffect(() => {
    Services.listSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  useEffect(() => {
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [lessonData, setLessonData] = useState<LessonCreateData>({
    name: '',
    subject: '',
    studentClass: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    Services.createLesson(lessonData)
      .then((res) => {
        onSuccess && onSuccess()
        console.log(res);
        close();
      })
      .catch((err) => {
        onFailure && onFailure(err)
        console.log(err);
      });
  };

  return (
    <div className={createLessonVariants({ mode })}>
      <ModalHeader
        title="Agendar de aula"
        description="Agende uma aula manualmente e relacione a uma disciplina."
        variant={variant}
        mode={mode}
      />

      <div className="modal-content">
        <div className="content-body">
          <form action='' id="lesson-form" onSubmit={handleSubmit}>
            <ModalRow labels={['Nome do evento']} mode={mode}>
              <Input
                type="text"
                name="name"
                value={lessonData.name}
                placeholder="Aula de Matemática"
                mode={mode}
                onChange={handleChange}
                required
              />
            </ModalRow>

            <ModalRow labels={['Disciplina', 'Turma']} mode={mode}>
              <SelectInput
                placeholder="-- Disciplina --"
                name="subject"
                value={lessonData.subject}
                onChange={handleChange}
                required
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </SelectInput>

              <SelectInput
                placeholder="-- Turma --"
                name="studentClass"
                value={lessonData.studentClass}
                onChange={handleChange}
                required
              >
                {studentClasses.map((studentClass) => (
                  <option key={studentClass.id} value={studentClass.name}>
                    {studentClass.name}
                  </option>
                ))}
              </SelectInput>
            </ModalRow>

            <ModalRow labels={['Data', 'Horário']} mode={mode}>
              <Input
                type="date"
                name="date"
                value={lessonData.date}
                mode={mode}
                onChange={handleChange}
                required
              />
              <Input
                type="time"
                names={['startTime', 'endTime']}
                values={[lessonData.startTime, lessonData.endTime]}
                mode={mode}
                onChange={handleChange}
                required
              />
            </ModalRow>
          </form>
        </div>

        <hr className="divider" />
        <ModalFooter
          mode={mode}
          close={() => close()}
          form='lesson-form'
          type='submit'
        />
      </div>
    </div>
  );
}
