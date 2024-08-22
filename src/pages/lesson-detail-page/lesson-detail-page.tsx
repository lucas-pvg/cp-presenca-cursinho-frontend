import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { TextCard } from '../../components/text-card/text-card'
import { Search } from '../../components/search/search'
import { Table } from '../../components/table/Table'
import { TableRow } from '../../components/table/TableRow'
import { Switch } from '../../components/switch/switch'

import { classes } from '../../data/mock/classes.mock'
import { Lesson } from '../../data/models/lesson.model'
import Services from '../../services'
import './lesson-detail-page.css'


const LessonDetailPageVariants = cva(
  'lesson-detail page',
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

interface LessonDetailPageProps extends VariantProps<typeof LessonDetailPageVariants> {
  mode?: 'light' | 'dark'
}

export function LessonDetailPage({ mode, ...props }: LessonDetailPageProps) {
  const [ search, setSearch ] = useState<string>('')
  const [ lesson, setLesson ] = useState<Lesson>()
  const { lessonID } = useParams()

  useEffect(() => {
    lessonID &&
    Services.retrieveLesson(parseInt(lessonID))
      .then(data => {
        setLesson(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [lessonID]);

  const filterLesson = (e:any) => {
    setSearch(e.target.value)
  }

  const handleSwitchChange = () => {
    lesson &&
    Services.updateAttendanceRegistrability(lesson.id)
      .then(() => {
        setLesson(() => {
          const updatedLesson = new Lesson({
            ...lesson,
            isAttendanceRegistrable: !lesson.isAttendanceRegistrable
          })

          return updatedLesson
        })
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={LessonDetailPageVariants({ mode })} {...props}>
      <Hero 
        title={`${lesson?.name}`}
        description={`${lesson?.subject} • ${lesson?.studentClass}`}
      />

      <CardMenu className='menu'>
        <Card to='' label='Editar' mode='light' />
        <Card to='' label='Excluir' mode='light' />
      </CardMenu>

      <div className='page-content'>
        <div className='info'>
          <h5>Informações</h5>

          <div className='cards'>
            <TextCard iconType='calendar' label='Data'>{lesson?.dateFormat('short')}</TextCard>
            <TextCard iconType='clock' label='Horário'>{`${lesson?.startTimeFormat(false)} - ${lesson?.endTimeFormat()}`}</TextCard>
            <TextCard iconType='clipboard' label='Presença'>{`${lesson?.startAttendanceFormat(false)} - ${lesson?.endAttendanceFormat()}`}</TextCard>
            <TextCard iconType='lock' label='Palavra-chave'>{lesson?.passkey}</TextCard>
          </div>
        </div>
        
        <div className='lesson-table'>
          <div className='header'>
            <Search value={search} onChange={filterLesson} />

            <div className='switch-content'>
              <p>Presença aberta?</p>

              <Switch
                type='base'
                mode={mode}
                isActive={lesson?.isAttendanceRegistrable}
                handleChange={() => handleSwitchChange()}
              />
            </div>
          </div>
          

          <Table mode='light' clickable={true} header={['Aula', 'Horário', 'Turma', 'Column']}>
            {
              classes.map((lesson, i) => { return (
                <TableRow key={i}>
                  <td>{lesson.aula}</td>
                  <td>{lesson.horario}</td>
                  <td>{lesson.turma}</td>
                  <td>{lesson.column}</td>
                </TableRow>
              )})
            }
          </Table>
        </div>
      </div>
    </div>
  )
}
