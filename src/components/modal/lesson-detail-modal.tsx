import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { Input } from '../input/input';
import { ModalFooter } from './modal-components/modal-footer';
import { useState } from 'react';
import { Switch } from '../switch/switch';
import { Lesson } from '../../data/models/lesson.model';
import Services from '../../services';

const classDetailVariants = cva('base-modal input-modal', {
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

interface classDetailProps extends VariantProps<typeof classDetailVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: () => void;
  data: Lesson;
}

export const LessonDetailModal = ({
  mode,
  variant,
  close,
  className,
  data,
}: classDetailProps) => {
  const max_lenght = 10;
  const [lessonData, setLessonData] = useState(data);

  const handlePasskeyChange = (e: any) => {
    const { name, value } = e.target;
    const input = e.target.value;
    if (input.length <= max_lenght) {
      setLessonData(
        (prevData) =>
          new Lesson({
            ...prevData,
            [name]: value,
          })
      );
    }
  };

  const handleSubmit = () => {
    // TODO: remover console.log's
    Services.updateLessonPasskey(lessonData.passkey, lessonData.id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleClose = () => {
    close();
  };

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => handleClose()} />

      <div className={classDetailVariants({ mode })}>
        <ModalHeader
          title="Detalhes da aula"
          description="Consulte as informações da aula"
          variant={variant}
          mode={mode}
        />
        <div className="modal-content">
          <div className="content-body">
            <form id="class-form" onSubmit={handleSubmit}>
              <ModalRow
                labels={['Disciplina', 'Horário de aula', 'Curso']}
                mode={mode}
              >
                <p>{lessonData.subject.name}</p>
                <p>{lessonData.startTimeFormat()}</p>
                <p>{lessonData.course}</p>
              </ModalRow>

              <ModalRow
                labels={[
                  'Turma',
                  'Horário de abertura e fechamento',
                  'Presença aberta',
                ]}
                mode={mode}
              >
                <p>{lessonData.studentClass.name}</p>
                <div>
                  <p>{lessonData.startAttendanceFormat()}</p>
                  <p>{lessonData.endAttendanceFormat()}</p>
                </div>

                <Switch
                  type="base"
                  isActive={lessonData.isAttendanceRegistrable}
                  handleChange={() => {
                    Services.updateAttendanceRegistrability(lessonData.id)
                      .then(() => {
                        setLessonData(
                          (currentStateLesson) =>
                            new Lesson({
                              ...currentStateLesson,
                              isAttendanceRegistrable:
                                !currentStateLesson.isAttendanceRegistrable,
                            })
                        );
                      })
                      .catch((error) => console.log(error));
                  }}
                />
              </ModalRow>

              <ModalRow labels={['Palavra chave']} mode={mode}>
                <Input
                  type="text"
                  name="passkey"
                  value={lessonData.passkey}
                  mode={mode}
                  onChange={handlePasskeyChange}
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
};
