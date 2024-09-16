import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { Table } from '../../components/table/Table';

import './PresencePage.css';
import React from 'react';
import { Button } from '../../components/button/Button';
import { TableRow } from '../../components/table/TableRow';
import { Student, students } from '../../data/mock/students.mock';

const PresencePageVariants = cva('presence page', {
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

interface PresencePageProps extends VariantProps<typeof PresencePageVariants> {
  mode?: 'light' | 'dark';
}

export const PresencePage = ({ mode, ...props }: PresencePageProps) => {
  const [studentsData, setStudentsData] =
    React.useState<Array<Student>>(students);

  // useEffect(() => {
  // 	setStudentsData(students);
  // });

  return (
    <div className={PresencePageVariants({ mode })} {...props}>
      <Hero
        title={'Consultar Presença'}
        description="Tenha acesso às informações de uma aula e à lista de presença gerada."
      />
      <div className="page-content">
        <Table mode={mode} header={['Nome do aluno', 'Presença']}>
          {studentsData.map((student, index) => (
            <TableRow key={index}>
              <td>{student.name}</td>
              <td>
                <Button
                  onClick={(e) => {
                    e.preventDefault();

                    const newPresence =
                      student.presence === 'ausente' ? 'presente' : 'ausente';

                    setStudentsData((prevStudents) => {
                      const newStudents = [...prevStudents];
                      newStudents[index] = {
                        ...newStudents[index],
                        presence: newPresence,
                      };
                      return newStudents;
                    });
                  }}
                  className={
                    student.presence === 'presente'
                      ? 'presence-check-button'
                      : 'abscense-button'
                  }
                >
                  {student.presence}
                </Button>
              </td>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};
