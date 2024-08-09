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
import { LessonDetailModal } from '../../components/modal/lesson-detail-modal'
import { TableRow } from '../../components/table/TableRow'

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalLessonData, setModalLessonData] = useState<Lesson>(lessonsMock[0]);

  return (
    <>
      <div className={HomePageVariants({ mode })} {...props}>
        <Hero 
          title='Bem-vindo, Lucas!'
          description='Acompanhe suas turmas e aulas e gerencie a presença de seus alunos.'
        />

        <CardMenu className='menu'>
          <Card to='' label='Agendar' mode='light' />
          <Card to='/lessons' label='Consultar' mode='light' />
          <Card to='' label='Disciplinas' mode='light' />
        </CardMenu>

        <div className='page-content'>
          <Table
            mode='light'
            clickable={true}
            header={['Aula', 'Horário', 'Turma', 'Presença aberta?']}
          >
            {lessonsData.map((lesson, index) => (
              <TableRow 
                key={index} 
                onClick={(e) => {
                  e.preventDefault();

                  setModalLessonData(lessonsData[index]);
                  setIsModalOpen(true);
                }}
              >
                <td>{lesson.subject.name}</td>
                <td>{lesson.startTimeFormat()}</td>
                <td>{lesson.studentClass.name}</td>
                <td>
                  <Switch 
                    type='base'
                    mode={mode}
                    isActive={lesson.isAttendanceRegistrable}
                    handleChange={() => {
                      setLessonsData((currentStateLessons) => {
                        const updatedLessons = [...currentStateLessons];
                        updatedLessons[index] = new Lesson({
                          ...updatedLessons[index],
                          isAttendanceRegistrable: !lesson.isAttendanceRegistrable
                        })
                        return updatedLessons;
                      })
                    }}
                  />
                </td>
              </TableRow>
              ))
            }
          </Table>
        </div>
      </div>

      {isModalOpen && (
          <LessonDetailModal 
            className={isModalOpen ? "modal-open" : "modal-close"}
            data={modalLessonData}
            close={() => {
              setIsModalOpen(false);
            }}
          />
        )}
    </>
  )
}
