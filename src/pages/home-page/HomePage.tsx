import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import { Switch } from '../../components/switch/switch';
import { OptionList } from '../../components/option-list/option-list';
import { NextLesson } from '../../components/next-class/next-lesson';

import { Lesson } from '../../data/models/lesson.model';
import { StudentClass } from '../../data/models/student-class.model';
import { LessonModal } from '../../components/modal/lesson-modal';
import Services from '../../services';

import './HomePage.css';

const HomePageVariants = cva('home page', {
  variants: {
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

interface HomePageProps extends VariantProps<typeof HomePageVariants> {
  mode?: 'light' | 'dark';
}

export function HomePage({ mode, ...props }: HomePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update' | 'delete'>('create')
  const nav = useNavigate();

  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  const [classIndex, setClassIndex] = useState<number>(0);
  useEffect(() => {
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
        setClassIndex(0)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [lessons, setLessons] = useState(Array<Lesson>);
  useEffect(() => {
    !isModalOpen && (
      classIndex == 0

      ? Services.listLessonsWithDetails()
        .then((response) => {
          setLessons(sortLessons(response));
        })
        .catch((error) => {
          console.log(error);
        })
      
      : Services.listLessonsWithDetails({ student_class: studentClasses[classIndex-1].name})
      .then((response) => {
        setLessons(sortLessons(response));
      })
      .catch((error) => {
        console.log(error);
      })
    )
  }, [isModalOpen, classIndex]);

  const handleSwitchChange = (lesson: Lesson, index: number) => {
    Services.updateAttendanceRegistrability(lesson.id)
      .then(() => {
        setLessons((currentStateLessons) => {
          const updatedLessons = [...currentStateLessons];

          updatedLessons[index] = new Lesson({
            ...updatedLessons[index],
            isAttendanceRegistrable: !lesson.isAttendanceRegistrable,
          });

          return updatedLessons;
        });
      })
      .catch((error) => console.log(error));
  };

  const getNextLesson = (cls: StudentClass) => {
    const lesson = lessons.filter(lesson => {
      return lesson.studentClass === cls.name && lesson.endTime > new Date()
    })[0]

    if (lesson) return <NextLesson lesson={lesson} key={lesson.id} />
  }

  const sortLessons = (lessons: Array<Lesson>): Array<Lesson> => {
    const ended = lessons.filter((lesson) => lesson.status === 'ENDED')
    const notEnded = lessons.filter((lesson) => lesson.status !== 'ENDED')
    return [...notEnded, ...ended]
  }

  const openModal = (type: 'create' | 'update' | 'delete') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  return (
    <>
    {
      studentClasses &&
      (
        <div className={HomePageVariants({ mode })} {...props}>
          <Hero
            title="Bem-vindo, Lucas!"
            description="Acompanhe suas turmas e aulas e gerencie a presença de seus alunos."
          />

          <CardMenu className="menu">
            <Card
              to=""
              label="Agendar"
              mode="light"
              onClick={() => openModal('create')}
            />
            <Card to="/lessons" label="Consultar" mode="light" />
            <Card to="/subject" label="Disciplinas" mode="light" />
          </CardMenu>

          <div className="page-content">
            <div className="content">
              <OptionList
                labels={['Geral', ...studentClasses.map((cls) => cls.name)]}
                index={classIndex}
                setIndex={setClassIndex}
              />
              
              <div className='next-lesson-container'>
                <h5>Próximas Aulas</h5>

                <div className='next-lesson-menu'>
                  { classIndex == 0
                    ? (studentClasses.map(cls => getNextLesson(cls)))
                    : getNextLesson(studentClasses[classIndex-1])
                  }
                </div>
              </div>
              
              <div className='today-lesson-container'>
                <h5>Aulas de Hoje</h5>

                <Table
                  mode="light"
                  clickable={true}
                  header={['Aula', 'Horário', 'Turma', 'Presença aberta?']}
                >
                  { 
                    lessons.map((lesson, index) => (
                      <TableRow
                        key={lesson.id}
                        onClick={() => nav(`/lessons/${lesson.id}`)}
                        disabled={lesson.status === 'ENDED'}
                      >
                        <td>{lesson.name}</td>
                        <td>{lesson.startTimeFormat()}</td>
                        <td>{lesson.studentClass}</td>
                        <td>
                          <Switch
                            type="base"
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
        </div>
      )
    }
    
    {
      isModalOpen &&
      <LessonModal
        mode="light"
        type={modalType}
        close={() => setIsModalOpen(false)}
      />
    }
    </>
  );
}
