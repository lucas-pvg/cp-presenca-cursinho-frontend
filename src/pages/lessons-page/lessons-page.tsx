import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Table } from '../../components/table/Table'
import { Class, classes } from '../../data/mock/classes.mock'
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
  const classData = classes.map((obj) => {
    return (Object.keys(obj).map((key) => obj[key as keyof Class]))
  })

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
        <Table
          mode='light'
          clickable={true}
          header={['Aula', 'Horário', 'Turma', 'Column']}
          data={classData}
        />
      </div>
    </div>
  )
}
