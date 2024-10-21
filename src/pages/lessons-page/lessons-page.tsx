import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { Search } from '../../components/search/search';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import { Input } from '../../components/input/input';
import { SelectInput } from '../../components/select-input/select-input';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/icon';

import { Lesson } from '../../data/models/lesson.model';
import { LessonFilters } from '../../data/models/lesson.model';
import { LessonModal } from '../../components/modal/lesson-modal';
import { Subject } from '../../data/models/subject.model';
import { StudentClass } from '../../data/models/student-class.model';
import Services from '../../services';

import './lessons-page.css';

const LessonsPageVariants = cva('lessons page', {
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

interface LessonsPageProps extends VariantProps<typeof LessonsPageVariants> {
  mode?: 'light' | 'dark';
}

export function LessonsPage({ mode, ...props }: LessonsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const [lessons, setLessons] = useState(Array<Lesson>);
  useEffect(() => {
    !isModalOpen &&
    Services.listLessonsWithDetails()
      .then((data) => {
        setLessons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isModalOpen]);

  const [subjects, setSubjects] = useState(Array<Subject>);
  useEffect(() => {
    Services.listSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  useEffect(() => {
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [lessonFilters, setLessonFilters] = useState<LessonFilters>({
    name: '',
    subject: '',
    student_class: '',
    start_datetime__gte: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLessonFilters((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const filters = Object.fromEntries(Object.entries(lessonFilters).filter(([_, v]) => v !== ''));
    Services.listLessonsWithDetails(filters)
      .then((data) => {
        setLessons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const resetFilters = () => {
    setLessonFilters({
      name: '',
      subject: '',
      student_class: '',
      start_datetime__gte: '',
    })

    Services.listLessonsWithDetails()
      .then((data) => {
        setLessons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (

    <>
      <div className={LessonsPageVariants({ mode })} {...props}>
        <Hero
          title="Consultar aulas"
          description="Veja todas as suas aulas que foram agendadas dentro de um período de 6 meses."
        />

        <CardMenu className="menu">
          <Card
            to=""
            label="Agendar"
            mode="light"
            onClick={() => setIsModalOpen(true)}
          />
          <Card to="/subject" label="Disciplinas" mode="light" />
        </CardMenu>

        <div className="page-content">
          <div className='filter-container'>
            <form className='filters' id='filter-lesson-form' method='GET' onSubmit={handleSubmit}>
              <Search
                className='search'
                name="name"
                placeholder="Nome da Aula"
                value={lessonFilters.name}
                onChange={handleChange}
              />

              <SelectInput
                placeholder="-- Turma --"
                name="student_class"
                value={lessonFilters.student_class}
                onChange={handleChange}
              >
                {studentClasses.map((studentClass) => (
                  <option key={studentClass.id} value={studentClass.name}>
                    {studentClass.name}
                  </option>
                ))}
              </SelectInput>


              <SelectInput
                placeholder="-- Disciplina --"
                name="subject"
                value={lessonFilters.subject}
                onChange={handleChange}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </SelectInput>

              <Input
                type="date"
                name="start_datetime__gte"
                value={lessonFilters.start_datetime__gte}
                mode={mode}
                onChange={handleChange}
              />
            </form>

            <div className='buttons'>
              <Button type='submit' form='filter-lesson-form'>
                <Icon iconType='search' size={16} />
              </Button>

              <Button onClick={resetFilters}>
                <Icon iconType='x' size={16} />
              </Button>
            </div>
          </div>
          

          <div className="lesson-table">
            <Table
              clickable={true}
              header={['Aula', 'Data', 'Hora', 'Turma', 'Matéria']}
            >
              {
                lessons.map((lesson) => {
                  return (
                    <TableRow
                      key={lesson.id}
                      onClick={() => nav(`/lessons/${lesson.id}`)}
                    >
                      <td>{lesson.name}</td>
                      <td>{lesson.dateFormat('medium')}</td>
                      <td>{lesson.startTimeFormat()}</td>
                      <td>{lesson.studentClass}</td>
                      <td>{lesson.subject}</td>
                    </TableRow>
                  );
                })
              }
            </Table>
          </div>
        </div>
      </div>

      {
        isModalOpen &&
        <LessonModal
          mode="light"
          type='create'
          close={() => setIsModalOpen(false)}
        />
      }
    </>
  );
}
