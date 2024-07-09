import { cva, VariantProps } from "class-variance-authority"
import { ModalHeader } from "./modal-components/modal-header"
import { ModalRow } from "./modal-components/modal-row"
import { Input } from "../input/input"
import { ModalFooter } from "./modal-components/modal-footer"
import { useState } from "react"
import { BaseSwitch } from "../switch/base-switch"

const classDetailVariants = cva(
  'base-modal input-modal',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      mode: 'light'
    }
  }
)

interface classDetailProps extends VariantProps<typeof classDetailVariants> {
  className?: string
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  close: () => void;
}

export const LessonDetailModal = ({ mode, variant, close, className }: classDetailProps) => {
  const max_lenght = 10;
  const [ lessonData, setLessonData ] = useState({
    name: '', 
    subject: '', 
    date: new Date(), 
    class: '', 
    course_class: '', 
    startTime: new Date(), 
    endTime: new Date(),
    passkey: ''
  });

  const handlePasskeyChange = (e: any) => {
    const { name, value } = e.target;
    const input = e.target.value;
    if (input.length <= max_lenght) {
      setLessonData((prevData) => ({...prevData, [name]: value}));
    }
  };

  const handleSubmit = () => {

  }

  const handleClose = () => {
    close();
  }

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className='modal-background' onClick={() => handleClose()} />

      <div className={classDetailVariants({ mode })}>
      <ModalHeader
        title='Detalhes da aula'
        description='Consulte as informações da aula'
        variant={variant}
        mode={mode}
      />
      <div className='modal-content'>
          <div className='content-body'>
            <form id='class-form' onSubmit={handleSubmit}>
              <ModalRow labels={['Disciplina', 'Horário de aula', 'Curso']} mode={mode} >
                <p>{lessonData.subject}</p>
                <p>{lessonData.date.toDateString()}</p>
                <p>{lessonData.course_class}</p>
              </ModalRow>

              <ModalRow labels={['Turma', 'Horário de abertura e fechamento', 'Presença aberta']} mode={mode}>
                <p>{lessonData.subject}</p>
                <div>
                  <p>{lessonData.startTime.toDateString()}</p>
                  <p>{lessonData.endTime.toDateString()}</p>
                </div>
                
                <BaseSwitch />
              </ModalRow>

              <ModalRow labels={['Palavra chave']} mode={mode}>
                <Input type='text' name='passkey' value={lessonData.passkey} mode={mode} onChange={handlePasskeyChange} />
              </ModalRow>
            </form>
          </div>

          <hr className='divider'/>
          <ModalFooter type='submit' form='class-form' mode={mode} close={() => handleClose()} />
        </div>
      </div>
    </div>
  )
}