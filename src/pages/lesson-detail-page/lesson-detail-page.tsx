import { useState } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { TextCard } from '../../components/text-card/text-card'
import { Search } from '../../components/search/search'
import { Table } from '../../components/table/Table'
import { TableRow } from '../../components/table/TableRow'

import { classes } from '../../data/mock/classes.mock'
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

  const filterLesson = (e:any) => {
    setSearch(e.target.value)
  }

  return (
    <div className={LessonDetailPageVariants({ mode })} {...props}>
      <Hero 
        title='Aula de Matemática'
        description='Matemática • Turma 1'
      />

      <CardMenu className='menu'>
        <Card to='' label='Editar' mode='light' />
        <Card to='' label='Excluir' mode='light' />
      </CardMenu>

      <div className='page-content'>
        <div className='info'>
          <h5>Informações</h5>
          <div className='cards'>
            <TextCard iconType='align-justify' label='Modalidade'>MODALIDADE</TextCard>
            <TextCard iconType='align-justify' label='Modalidade'>MODALIDADE</TextCard>
            <TextCard iconType='align-justify' label='Modalidade'>MODALIDADE</TextCard>
            <TextCard iconType='align-justify' label='Modalidade'>MODALIDADE</TextCard>
          </div>
        </div>
        
        <div className='lesson-table'>
          <Search value={search} onChange={filterLesson} />
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
