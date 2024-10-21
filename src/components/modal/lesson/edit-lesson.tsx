import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from '../modal-components/modal-header';
import { ModalRow } from '../modal-components/modal-row';
import { ModalFooter } from '../modal-components/modal-footer';
import { Input } from '../../input/input';

import { Lesson, LessonCreateData } from '../../../data/models/lesson.model';
import Services from '../../../services';
import '../modal.css';

const editLessonVariants = cva('base-modal input-modal', {
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

interface EditLessonProps extends VariantProps<typeof editLessonVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  lesson: Lesson
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function EditLesson({ mode, variant, lesson, onSuccess, onFailure, close }: EditLessonProps) {
  const [lessonData, setLessonData] = useState<LessonCreateData>(lesson.toDict());

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({ ...prevData, [name]: value }));
    console.log(lessonData)
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    Services.updateLesson(lesson.id, lessonData)
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
    <div className={editLessonVariants({ mode })}>
      <ModalHeader
        title="Editar aula"
        description="Edite os parâmetros de uma aula já agendada."
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

            <ModalRow labels={['Presença', 'Palavra-chave']} mode={mode}>
              <Input
                type="time"
                names={['attendanceStart', 'attendanceEnd']}
                values={[lessonData.attendanceStart!, lessonData.attendanceEnd!]}
                mode={mode}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name='passkey'
                value={lessonData.passkey}
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
