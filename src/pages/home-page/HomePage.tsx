import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Table } from '../../components/table/Table'
import './HomePage.css'
import { useState } from 'react'
import { Switch } from '../../components/switch/switch'
import { lessonsMock } from '../../data/mock/lesson.mock'
import { Lesson } from '../../data/models/lesson.model'

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
  const [lessonsData, setLessonsData] = useState<Lesson[]>(lessonsMock);

  const createTableData = () => {
    return lessonsData.map((lesson, index) => [
      lesson.name,
      lesson.startDatetime.toDateString(),
      lesson.studentClass,
      <Switch 
        type='base'
        mode={mode}
        isActive={lesson.isAttendanceRegistrable}
        handleChange={() => {
          setLessonsData((currentStateLessons) => {
            const updatedLessons = [...currentStateLessons];
            updatedLessons[index] = {
              ...updatedLessons[index],
              isAttendanceRegistrable: !lesson.isAttendanceRegistrable
            }
            return updatedLessons;
          })
        }}
      />
    ])
  }

  return (
    <div className={HomePageVariants({ mode })} {...props}>
      <Hero 
        title='Bem-vindo, Lucas!'
        description='Acompanhe suas turmas e aulas e gerencie a presença de seus alunos.'
      />

      <CardMenu className='menu'>
        <Card to='' label='Agendar' mode='light' />
        <Card to='' label='Consultar' mode='light' />
        <Card to='' label='Disciplinas' mode='light' />
      </CardMenu>

      <div className='page-content'>
        <Table
          mode='light'
          clickable={true}
          header={['Aula', 'Horário', 'Turma', 'Presença aberta?']}
          data={createTableData()}
        />
      </div>
    </div>
  )
}
