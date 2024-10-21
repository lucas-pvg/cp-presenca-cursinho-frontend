import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToastify } from '../../services/toastify'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { Card } from '../../components/card-menu/card'
import { Button } from '../../components/button/Button'
import { OptionList } from '../../components/option-list/option-list'
import { Input } from '../../components/input/input'
import { Icon } from '../../components/icon/icon'
import { SelectInput } from '../../components/select-input/select-input'
import { SubjectModal } from '../../components/modal/subject-modal'

import { Subject, MainSubject } from '../../data/models/subject.model'
import { StudentClass } from '../../data/models/student-class.model'
import { LessonRecurrencyInterface, LessonRecurrentDatetime, LessonRecurrentDatetimeRequest } from '../../data/models/recurrency.model'
import Services from '../../services'
import './subject-detail-page.css'

const SubjectDetailPageVariants = cva(
  'subject-detail page',
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

interface SubjectDetailPageProps extends VariantProps<typeof SubjectDetailPageVariants> {
  mode?: 'light' | 'dark'
}

export function SubjectDetailPage({ mode, ...props }: SubjectDetailPageProps) {
  const { subjectCode } = useParams()
  const mainSubject = MainSubject.find(ms => ms.id == subjectCode)!.name
  const toastify = useToastify()

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalType, setModalType ] = useState<'create' | 'update' | 'delete'>('create')
  const openModal = (type: 'create' | 'update' | 'delete') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const [ subjects, setSubjects ] = useState(Array<Subject>)
  const [ subjectIndex, setSubjectIndex ] = useState(0)
  useEffect(() => {
    subjectCode &&
    Services.listSubjectsFromMain(subjectCode)
      .then(data => {
        setSubjects(data)
        setSubjectIndex((prev) => prev >= data.length ? 0 : prev)
      })
      .catch(error => {
        console.log(error)
      })
  }, [!isModalOpen]);

  const hendleSubjectIndex = (subjectId: number) => {
    const index = subjects.findIndex((sub) => sub.id === subjectId)
    setSubjectIndex(index)
  }

  const [ studentClasses, setStudentClasses ] = useState(Array<StudentClass>);
  const [ classIndex, setClassIndex ] = useState(0);
  useEffect(() => {
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
        setClassIndex((prev) => prev >= data.length ? 0 : prev)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [!isModalOpen]);

  const [ recurrency, setRecurrency ] = useState<LessonRecurrencyInterface>()
  const [ lessonDatetimes, setLessonDatetimes ] = useState<LessonRecurrentDatetime[]>()
  const getDatetimes = () => {
    Services.listRecurrencyFromParams(subjects[subjectIndex].id, studentClasses[classIndex].id)
    .then(data => {
      setRecurrency(data)
      setLessonDatetimes(data.lessonDatetimes)
    })
    .catch(error => {
      setRecurrency(undefined)
      setLessonDatetimes(undefined)
      console.log(error)
    })
  }

  useEffect(() => {
    if (subjects.length > 0 && studentClasses. length > 0) {
      getDatetimes()
    }
  }, [subjects, subjectIndex, studentClasses, classIndex]);


  const createDatetime = async () => {
    let newDatetime: LessonRecurrentDatetimeRequest = {
      lesson_recurrency: recurrency!.id,
      start_datetime: new Date(),
      end_datetime: new Date(),
      day_of_week: 0
    }

    try {
      await Services.createRecurrentDatetime(newDatetime)
      toastify('success', 'Recorrência criada com sucesso!')
      getDatetimes()
    } catch (e) {
      toastify('failure', 'Não foi possível criar recorrência' + e)
      console.log(e)
    }
  }

  const deleteDatetime = async (datetimeId: number) => {
    try {
      await Services.deleteRecurrentDatetime(datetimeId)
      toastify('success', 'Recorrência deletada com sucesso!')
      getDatetimes()
    } catch (e) {
      toastify('failure', 'Não foi possível deletar recorrência' + e)
      console.log(e)
    }
  }

  const handleSubmit = async (datetime: LessonRecurrentDatetime) => {
    try {
      await Services.updateRecurrentDatetime(datetime)
      toastify('success', 'Recorrência editada com sucesso!')
      getDatetimes()
    } catch (e) {
      toastify('failure', 'Não foi possível editar recorrência' + e)
      console.log(e)
    }
  }

  const handleChange = (e: any) => {
    const { name, value, id } = e.target
    setLessonDatetimes((prevData) => {
      let data: Array<LessonRecurrentDatetime>

      if (prevData) {
        data = [...prevData]
        data[id] = new LessonRecurrentDatetime({...prevData[id], [name]: value})
        handleSubmit(data[id])
      }
      else data = []

      return data
    })
  }

  const handleTimeChange = (e: any) => {
    const { name, value, id } = e.target
    setLessonDatetimes((prevData) => {
      let data: Array<LessonRecurrentDatetime>
      let time: Date

      if (prevData) {
        let today:Date = new Date()
        let date_str = today.toLocaleDateString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'})

        data = [...prevData]
        time = new Date(Date.parse(`${date_str} ${value}`))
        data[id] = new LessonRecurrentDatetime({...prevData[id], [name]: time})
        handleSubmit(data[id])
      }
      else data = []

      return data
    })
  }

  return (
    <>
    <div className={SubjectDetailPageVariants({ mode })} {...props}>
      <Hero 
        title={mainSubject}
        description='Crie, edite e gerencie suas diferentes frentes e a frequência das suas aulas.'
      />

      <div className='page-content'>
        <div className='subject-menu'>
          { 
            subjects.map((sub) => {
              return (
                <Card 
                  to=''
                  label={sub.name}
                  key={sub.id}
                  variant={subjects[subjectIndex].id == sub.id ? 'primary' : 'secondary'}
                  onClick={() => hendleSubjectIndex(sub.id)}
                />
              )
            }) 
          }
    
          <Button onClick={() => openModal('create')}>Adicionar</Button>
        </div>

        <div className='vl' />
          
        <div className='subject-content'>
          <div className='classes-menu'>
            <OptionList
              labels={studentClasses.map((st) => st.name)}
              index={classIndex}
              setIndex={setClassIndex}
            />

            <Button variant='outline' onClick={() => openModal('update')}>Editar</Button>
            <Button onClick={() => openModal('delete')}>Excluir</Button>
          </div>

          <div className='schedule'>
            <div className='schedule-forms'>
              {
                lessonDatetimes?.map((datetime, i) => {
                  return (
                    <div className='schedule-row' key={datetime.id}>
                      <SelectInput label='Dia da Semana' id={`${i}`} name='dayOfWeek' value={datetime.dayOfWeek} onInput={handleChange}>
                        <option value={0}>Segunda</option>
                        <option value={1}>Terça</option>
                        <option value={2}>Quarta</option>
                        <option value={3}>Quinta</option>
                        <option value={4}>Sexta</option>
                        <option value={5}>Sábado</option>
                        <option value={6}>Domingo</option>
                      </SelectInput>
                      <Input label='Horário' id={`${i}`} type='time' names={['startDatetime', 'endDatetime']} values={[datetime.startTimeFormat(), datetime.endTimeFormat()]} onInput={handleTimeChange} />
                      <Icon className='delete-icon' iconType='x-circle' size={32} onClick={() => deleteDatetime(datetime.id)} />
                    </div>
                  )
                })
              }
            </div>
            <Button variant='outline' onClick={() => createDatetime()}>Nova Data</Button>
          </div>
        </div>
      </div>
    </div>

    {
      isModalOpen &&
      <SubjectModal
        mode="light"
        type={modalType}
        mainSubject={subjectCode!}
        subject={subjects[subjectIndex]}
        close={() => setIsModalOpen(false)}
      />
    }
    </>
  )
}
