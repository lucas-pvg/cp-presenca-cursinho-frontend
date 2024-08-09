import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Table } from '../../components/table/Table'
import { TableRow } from '../../components/table/TableRow'
import { Switch } from '../../components/switch/switch'

import { Lesson } from '../../data/models/lesson.model'
import { CreateLesson } from '../../components/modal/create-lesson'
import Services from '../../services'

import './HomePage.css'

const HomePageVariants = cva(
  'home page',
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

interface HomePageProps extends VariantProps<typeof HomePageVariants> {
  mode?: 'light' | 'dark'
}

export function HomePage({ mode, ...props }: HomePageProps) {
  const [ lessons, setLessons ] = useState(Array<Lesson>)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    !isModalOpen &&
    Services.listLessonsWithDetails()
      .then((response) => {  
        setLessons(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [isModalOpen])

  const handleSwitchChange = (lesson: Lesson, index: number) => {
    Services.updateAttendanceRegistrability(lesson.id)
      .then(() => {
        setLessons((currentStateLessons) => {
          const updatedLessons = [ ...currentStateLessons ]

          updatedLessons[index] = new Lesson({
            ...updatedLessons[index],
            isAttendanceRegistrable: !lesson.isAttendanceRegistrable
          })

          return updatedLessons
        })
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
    <div className={HomePageVariants({ mode })} {...props}>
      <Hero 
        title='Bem-vindo, Lucas!'
        description='Acompanhe suas turmas e aulas e gerencie a presença de seus alunos.'
      />

      <CardMenu className='menu'>
        <Card to='' label='Agendar' mode='light' onClick={() => setIsModalOpen(true)} />
        <Card to='/lessons' label='Consultar' mode='light' />
        <Card to='/subject' label='Disciplinas' mode='light' />
      </CardMenu>

      <div className='page-content'>
        <div className='content'>
          <h5>Aulas de Hoje</h5>

          <Table mode='light' clickable={true} header={['Aula', 'Horário', 'Turma', 'Presença aberta?']}>
            {
              lessons.map((lesson, index) => (
                <TableRow key={lesson.id} onClick={() => nav(`/lessons/${lesson.id}`)}>
                  <td>{lesson.subject}</td>
                  <td>{lesson.startTimeFormat()}</td>
                  <td>{lesson.studentClass}</td>
                  <td>
                    <Switch
                      type='base'
                      mode={mode}
                      isActive={lesson.isAttendanceRegistrable}
                      handleChange={() => handleSwitchChange(lesson, index)}
                    />
                  </td>
                </TableRow>
              ))
            }
          </Table>
        </div>
      </div>
    </div>

    <CreateLesson className={isModalOpen ? 'modal-open' : 'modal-close'} mode='light' close={() => setIsModalOpen(false)} />
    </>
  )
}
