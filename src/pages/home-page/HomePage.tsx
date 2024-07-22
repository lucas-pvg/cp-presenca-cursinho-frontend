import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Table } from '../../components/table/Table'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { Switch } from '../../components/switch/switch'
import { lessonsMock } from '../../data/mock/lesson.mock'
import { Lesson } from '../../data/models/lesson.model'
import { LessonDetailModal } from '../../components/modal/lesson-detail-modal'
import { formatTime } from '../../utils/datetime'
import Services from '../../services'

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

  useEffect(() => {
    Services.listLessons()
      .then((response) => {
        setLessonsData(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const createTableData = () => {
    return lessonsData.map((lesson, index) => [
      lesson.subject,
      formatTime(lesson.startDatetime),
      lesson.studentClass,
      <Switch 
        type='base'
        mode={mode}
        isActive={lesson.isAttendanceRegistrable}
        handleChange={() => {
          Services.updateAttendanceRegistrability(lesson.id)
            .then(() => {
              setLessonsData((currentStateLessons) => {
                const updatedLessons = [...currentStateLessons];
                updatedLessons[index] = {
                  ...updatedLessons[index],
                  isAttendanceRegistrable: !lesson.isAttendanceRegistrable
                }
                return updatedLessons;
              })
            })
            .catch((error) => { console.log(error) })
        }}
      />
    ])
  }

  const onTableClick = (index: number) => {
    setModalLessonData(lessonsData[index]);
    setIsModalOpen(true);
  }

  return (
    <>
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
            onRowClick={onTableClick}
          />
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
