import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Search } from '../../components/search/search'
import { Table } from '../../components/table/Table'
import { TableRow } from '../../components/table/TableRow'

import { Lesson } from '../../data/models/lesson.model'
import { CreateLesson } from '../../components/modal/create-lesson'
import Services from '../../services'

import './lessons-page.css'

const LessonsPageVariants = cva(
  'lessons page',
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

interface LessonsPageProps extends VariantProps<typeof LessonsPageVariants> {
  mode?: 'light' | 'dark'
}

export function LessonsPage({ mode, ...props }: LessonsPageProps) {
  const [ lessons, setLessons ] = useState(Array<Lesson>)
  const [ filtered, setFiltered ] = useState(Array<Lesson>)
  const [ search, setSearch ] = useState<string>('')
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const nav = useNavigate()
  
  useEffect(() => {
    !isModalOpen &&
    Services.listLessonsWithDetails()
      .then(data => {
        setLessons(data)
        setFiltered(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [isModalOpen]);

  const filterLesson = (e: any) => {
    setSearch(e.target.value)
    if (e.target.value == '') {
      setFiltered(lessons)
    } else {
      setFiltered(lessons.filter((lesson) => lesson.name.includes(e.target.value)))
    }
  }

  return (
    <>
    <div className={LessonsPageVariants({ mode })} {...props}>
      <Hero 
        title='Consultar aulas'
        description='Veja as suas aulas que foram agendadas dentro do período de 1 mês.'
      />

      <CardMenu className='menu'>
        <Card to='' label='Agendar' mode='light' onClick={() => setIsModalOpen(true)} />
        <Card to='/subject' label='Disciplinas' mode='light' />
      </CardMenu>

      <div className='page-content'>
        {
          filtered && <div className='lesson-table'>
            <Search value={search} onChange={filterLesson} />
            <Table clickable={true} header={['Aula', 'Data', 'Hora', 'Turma']}>
              {
                filtered.map((lesson) => { return (
                  <TableRow key={lesson.id} onClick={() => nav(`/lessons/${lesson.id}`)}>
                    <td>{lesson.name}</td>
                    <td>{lesson.dateFormat('medium')}</td>
                    <td>{lesson.startTimeFormat()}</td>
                    <td>{lesson.studentClass}</td>
                  </TableRow>
                )})
              }
            </Table>
          </div>
        }
      </div>
    </div>

    <CreateLesson className={isModalOpen ? 'modal-open' : 'modal-close'} mode='light' close={() => setIsModalOpen(false)} />
    </>
  )
}
