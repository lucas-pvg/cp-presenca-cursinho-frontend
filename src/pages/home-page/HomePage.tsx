import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Table } from '../../components/table/Table'
import { TableRow } from '../../components/table/TableRow'
import { classes } from '../../data/mock/classes.mock'
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
  return (
    <div className={HomePageVariants({ mode })} {...props}>
      <Hero 
        title='Bem-vindo, Lucas!'
        description='Acompanhe suas turmas e aulas e gerencie a presença de seus alunos.'
      />

      <CardMenu className='menu'>
        <Card to='' label='Agendar' mode='light' />
        <Card to='/lessons' label='Consultar' mode='light' />
        <Card to='/subject' label='Disciplinas' mode='light' />
      </CardMenu>

      <div className='page-content'>
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
  )
}
