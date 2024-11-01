import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { TextCard } from '../../components/text-card/text-card';
import { Search } from '../../components/search/search';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import { Switch } from '../../components/switch/switch';
import { Button } from '../../components/button/Button';
import { Alert } from '../../components/alert/alert';

import { Lesson } from '../../data/models/lesson.model';
import { StudentInterface } from '../../data/models/student.model';
import Services from '../../services';
import './lesson-detail-page.css';

const LessonDetailPageVariants = cva('lesson-detail page', {
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

interface LessonDetailPageProps
  extends VariantProps<typeof LessonDetailPageVariants> {
  mode?: 'light' | 'dark';
}

export function LessonDetailPage({ mode, ...props }: LessonDetailPageProps) {
  const [search, setSearch] = useState<string>('');
  const [lesson, setLesson] = useState<Lesson>();
  const [students, setStudents] = useState(Array<StudentInterface>);
  const [attendance, setAttendance] = useState<boolean>(false);
  const { lessonID } = useParams();

  const [alert, setAlert] = useState<boolean>(false);
  const [isAnimationEnded, setIsAnimationEnded] = useState(true);

  useEffect(() => {
    lessonID &&
      Services.retrieveLesson(parseInt(lessonID))
        .then((data) => {
          setLesson(data);
          setAttendance(data.isAttendanceRegistrable);
        })
        .catch((error) => {
          console.log(error);
        });

    lessonID &&
      Services.listStudent()
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [lessonID]);

  const filterLesson = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSwitchChange = () => {
    lesson &&
      Services.updateAttendanceRegistrability(lesson.id)
        .then(() => {
          setLesson(() => {
            const updatedLesson = new Lesson({
              ...lesson,
              isAttendanceRegistrable: !lesson.isAttendanceRegistrable,
            });

            setAttendance(!lesson.isAttendanceRegistrable);
            setIsAnimationEnded(false);
            setAlert(true);
            return updatedLesson;
          });
        })
        .catch((error) => console.log(error));
  };

  const changeAttendance = (e: any) => {
    console.log('PRESSED');
    const { id } = e.target;
    console.log(id);

    setStudents((prev_students) => {
      const student_data = [...prev_students];
      const i = student_data.findIndex((student) => student.id == id);
      student_data[i].isPresent = !student_data[i].isPresent;
      console.log(student_data[i].isPresent);

      return student_data;
    });
  };

  return (
    <>
      <div
        className={LessonDetailPageVariants({ mode })}
        {...props}
        onClick={() => setIsAnimationEnded(true)}
      >
        <Hero
          title={`${lesson?.name}`}
          description={`${lesson?.subject} • ${lesson?.studentClass}`}
        />

        <CardMenu className="menu">
          <Card to="" label="Editar" mode="light" />
          <Card to="" label="Excluir" mode="light" />
        </CardMenu>

        <div className="page-content">
          <div className="info">
            <h5>Informações</h5>

            <div className="cards">
              <TextCard iconType="calendar" label="Data">
                {lesson?.dateFormat('short')}
              </TextCard>
              <TextCard
                iconType="clock"
                label="Horário"
              >{`${lesson?.startTimeFormat(false)} - ${lesson?.endTimeFormat()}`}</TextCard>
              <TextCard
                iconType="clipboard"
                label="Presença"
              >{`${lesson?.startAttendanceFormat(false)} - ${lesson?.endAttendanceFormat()}`}</TextCard>
              <TextCard iconType="lock" label="Palavra-chave">
                {lesson?.passkey}
              </TextCard>
            </div>
          </div>

          <div className="lesson-table">
            <div className="header">
              <Search value={search} onChange={filterLesson} />

              <div className="switch-content">
                <p>Presença aberta?</p>

                <Switch
                  type="base"
                  mode={mode}
                  isActive={lesson?.isAttendanceRegistrable}
                  handleChange={() => handleSwitchChange()}
                />
              </div>
            </div>

            <Table
              variant={attendance ? 'attendance' : 'base'}
              mode="light"
              clickable={true}
              header={['Nome do aluno', 'Presença']}
            >
              {students.map((student) => {
                return (
                  <TableRow key={student.id}>
                    <td>{student.name}</td>
                    {attendance ? (
                      <td>
                        {student.isPresent ? (
                          <Button
                            id={`${student.id}`}
                            variant="present"
                            onClick={changeAttendance}
                          >
                            Presente
                          </Button>
                        ) : (
                          <Button
                            id={`${student.id}`}
                            variant="absent"
                            onClick={changeAttendance}
                          >
                            Ausente
                          </Button>
                        )}
                      </td>
                    ) : (
                      <td>{student.isPresent ? 'Presente' : 'Ausente'}</td>
                    )}
                  </TableRow>
                );
              })}
            </Table>
          </div>
        </div>
      </div>

      {alert && attendance ? (
        <Alert
          animation={isAnimationEnded ? 'close' : 'open'}
          close={() => setIsAnimationEnded(true)}
          onAnimationEnd={() => {
            if (isAnimationEnded) () => setAlert(false);
          }}
        >
          A presença está aberta! Os alunos já podem marcar sua presença pelo
          app.
        </Alert>
      ) : (
        <Alert
          animation={isAnimationEnded ? 'close' : 'open'}
          close={() => setIsAnimationEnded(true)}
          onAnimationEnd={() => {
            if (isAnimationEnded) () => setAlert(false);
          }}
        >
          A marcação de presença foi encerrada! Abra novamente caso queira
          controlar a presença dos alunos.
        </Alert>
      )}
    </>
  );
}
