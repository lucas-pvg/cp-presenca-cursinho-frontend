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

import { classes } from '../../data/mock/classes.mock';
import { Lesson } from '../../data/models/lesson.model';
import './lesson-detail-page.css';
import Services from '../../services';

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
  const { lessonID } = useParams();

  useEffect(() => {
    lessonID &&
      Services.retrieveLesson(parseInt(lessonID))
        .then((data) => {
          setLesson(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const filterLesson = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className={LessonDetailPageVariants({ mode })} {...props}>
      <Hero
        title={`${lesson?.name}`}
        description={`${lesson?.subject.name} • ${lesson?.studentClass.name}`}
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
            >{`${lesson?.startTimeFormat()} - ${lesson?.endTimeFormat()}`}</TextCard>
            <TextCard
              iconType="clipboard"
              label="Presença"
            >{`${lesson?.startAttendanceFormat()} - ${lesson?.endAttendanceFormat()}`}</TextCard>
            <TextCard iconType="lock" label="Palavra-chave">
              {lesson?.passkey}
            </TextCard>
          </div>
        </div>

        <div className="lesson-table">
          <Search value={search} onChange={filterLesson} />
          <Table
            mode="light"
            clickable={true}
            header={['Aula', 'Horário', 'Turma', 'Column']}
          >
            {classes.map((lesson, i) => {
              return (
                <TableRow key={i}>
                  <td>{lesson.aula}</td>
                  <td>{lesson.horario}</td>
                  <td>{lesson.turma}</td>
                  <td>{lesson.column}</td>
                </TableRow>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}
