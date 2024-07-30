import { useState, useEffect } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from './modal-components/modal-header'
import { ModalRow } from './modal-components/modal-row'
import { ModalFooter } from './modal-components/modal-footer'
import { Input } from '../input/input'
import { SelectInput } from '../select-input/select-input'
import axios from 'axios';
import './modal.css'

const createClassVariants = cva(
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

interface createClassProps extends VariantProps<typeof createClassVariants> {
  className?: string
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  close: Function
}

export function CreateClass({ mode, variant, close, className }: createClassProps) {
  // const [ studentClasses, setStudentClasses ] = useState([])
  // const [ subjects, setSubjects ] = useState([])
  const [ lessonData, setLessonData ] = useState({
    name: '',
    subject: '',
    course_class: '',
    date: '',
    startTime: '',
    endTime: ''
  })

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => setUsers(res.data))
  //     .catch(err => {
  //       setError(err.message);
  //     })
  // }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setLessonData((prevData) => ({...prevData, [name]: value}))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let start_datetime: Date = new Date(`${lessonData.date}T${lessonData.startTime}`)
    let end_datetime: Date = new Date(`${lessonData.date}T${lessonData.endTime}`)

    axios.post('http://localhost:8000/lesson/', {
      name: lessonData.name,
      subject: lessonData.subject,
      course_class: lessonData.course_class,
      start_datetime: start_datetime,
      end_datetime: end_datetime
    })
    .then(res => {
      console.log(res)
      handleClose()
    })
    .catch(err => { console.log(err) })
  }

  const handleClose = () => {
    close()
    setLessonData(
      { name: '', subject: '', course_class: '', date: '', startTime: '', endTime: '' }
    )
  }

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className='modal-background' onClick={() => handleClose()} />

      <div className={createClassVariants({ mode })}>
        <ModalHeader
          title='Agendamento de aula'
          description='Agende uma aula manualmente e relacione a uma disciplina.'
          variant={variant}
          mode={mode}
        />

        <div className='modal-content'>
          <div className='content-body'>
            <form id='class-form' onSubmit={handleSubmit}>
              <ModalRow labels={['Nome do evento']} mode={mode} >
                <Input required type='text' name='name' value={lessonData.name} placeholder='Aula de Matemática' mode={mode} onChange={handleChange} />
              </ModalRow>

              <ModalRow labels={['Disciplina', 'Turma']} mode={mode}>
                <Input type='select' name='subject' value={lessonData.subject} placeholder='Selecione a disciplina' mode={mode} onChange={handleChange} />
                <Input type='select' name='course_class' value={lessonData.course_class} placeholder='Selecione a turma' mode={mode} onChange={handleChange} />
              </ModalRow>

              <ModalRow labels={['Data', 'Horário']} mode={mode}>
                <Input required type='date' name='date' value={lessonData.date} mode={mode} onChange={handleChange} />
                <Input required type='time' names={['startTime', 'endTime']} values={[lessonData.startTime, lessonData.endTime]} mode={mode} onChange={handleChange} />
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
