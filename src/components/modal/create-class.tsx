import { FormEvent, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { ModalWarning } from './modal-components/modal-warning';
import { ModalFooter } from './modal-components/modal-footer';
import { Input } from '../input/input';
import axios from 'axios';
import './modal.css';

const createClassVariants = cva('base-modal input-modal', {
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

interface createClassProps extends VariantProps<typeof createClassVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  close: Function;
}

export function CreateClass({
  mode,
  variant,
  close,
  className,
}: createClassProps) {
  const [classData, setClassData] = useState({
    name: '',
    subject: '',
    course_class: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let start_datetime: Date = new Date(
      `${classData.date}T${classData.startTime}`
    );
    let end_datetime: Date = new Date(`${classData.date}T${classData.endTime}`);

    axios
      .post('http://localhost:8000/lesson/', {
        name: classData.name,
        subject: classData.subject,
        course_class: classData.course_class,
        start_datetime: start_datetime,
        end_datetime: end_datetime,
      })
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
    setClassData({
      name: '',
      subject: '',
      course_class: '',
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => handleClose()} />

      <div className={createClassVariants({ mode })}>
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
                  value={classData.name}
                  placeholder="Aula de Matemática"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>

              <ModalRow labels={['Disciplina', 'Turma']} mode={mode}>
                <Input
                  type="select"
                  name="subject"
                  value={classData.subject}
                  placeholder="Selecione a disciplina"
                  mode={mode}
                  onChange={handleChange}
                />
                <Input
                  type="select"
                  name="course_class"
                  value={classData.course_class}
                  placeholder="Selecione a turma"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>

              <ModalRow labels={['Data', 'Horário']} mode={mode}>
                <Input
                  type="date"
                  name="date"
                  value={classData.date}
                  mode={mode}
                  onChange={handleChange}
                />
                <Input
                  type="time"
                  names={['startTime', 'endTime']}
                  values={[classData.startTime, classData.endTime]}
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
