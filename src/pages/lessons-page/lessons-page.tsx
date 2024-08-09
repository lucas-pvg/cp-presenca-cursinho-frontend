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
import './lessons-page.css'
import Services from '../../services'

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
  const nav = useNavigate()
  
  useEffect(() => {
    Services.listLessonsWithDetails()
      .then(data => {
        setLessons(data)
        setFiltered(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);


  const filterLesson = (e: any) => {
    setSearch(e.target.value)
    if (e.target.value == '') {
      setFiltered(lessons)
    } else {
      setFiltered(lessons.filter((lesson) => lesson.name.includes(e.target.value)))
    }
  }

  return (
    <div className={LessonsPageVariants({ mode })} {...props}>
      <Hero 
        title='Consultar aulas'
        description='Veja as suas aulas que foram agendadas dentro do período de 1 mês.'
      />

      <CardMenu className='menu'>
        <Card to='' label='Agendar' mode='light' />
        <Card to='' label='Disciplinas' mode='light' />
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
                    <td>{lesson.studentClass.name}</td>
                  </TableRow>
                )})
              }
            </Table>
          </div>
        }
      </div>
    </div>
  )
}
