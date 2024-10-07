import { useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { ModalFooter } from './modal-components/modal-footer';
import { Input } from '../input/input';
import { SelectInput } from '../select-input/select-input';

import { LessonCreateData } from '../../data/models/lesson.model';
import { Subject } from '../../data/models/subject.model';
import { StudentClass } from '../../data/models/student-class.model';
import Services from '../../services';
import './modal.css';

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

interface createLessonProps extends VariantProps<typeof createLessonVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: Function;
}

export function CreateLesson({ mode, variant, close, className }: createLessonProps) {
  const [subjects, setSubjects] = useState(Array<Subject>);
  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  const [lessonData, setLessonData] = useState<LessonCreateData>({
    name: '',
    subject: 'default',
    studentClass: 'default',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    Services.listSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        console.log(error);
      });

    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    Services.createLesson(lessonData)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    close();
    setLessonData({
      name: '',
      subject: 'default',
      studentClass: 'default',
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => handleClose()} />

      <div className={createLessonVariants({ mode })}>
        <ModalHeader
          title="Agendamento de aula"
          description="Agende uma aula manualmente e relacione a uma disciplina."
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
            <form id="class-form" onSubmit={handleSubmit}>
              <ModalRow labels={['Nome do evento']} mode={mode}>
                <Input
                  type="text"
                  name="name"
                  value={lessonData.name}
                  placeholder="Aula de Matemática"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>

              <ModalRow labels={['Disciplina', 'Turma']} mode={mode}>
                <SelectInput
                  placeholder="-- Disciplina --"
                  name="subject"
                  value={lessonData.subject}
                  onChange={handleChange}
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
                />
                <Input
                  type="time"
                  names={['startTime', 'endTime']}
                  values={[lessonData.startTime, lessonData.endTime]}
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>
            </form>
          </div>

          <hr className="divider" />
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
