import { useEffect, useState } from 'react';
// import { useToastify } from '../../services/toastify';
import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import { OptionList } from '../../components/option-list/option-list';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/icon';
// import { SelectList } from '../../components/select-list/SelectList';
import { StudentClassModal } from '../../components/modal/student-class-modal';
import { TextCard } from '../../components/text-card/text-card';
import { Search } from '../../components/search/search';

// import { StudentSelect } from '../../data/models/student.model';
import { StudentClass } from '../../data/models/student-class.model';
import {
  StudentInterface,
  StudentFilters,
} from '../../data/models/student.model';
// import { User } from '../../data/models/user.model';
// import { userBasicInfoResponseMapper } from '../../data/mapper';
// import { formattedTime } from '../../data/mapper/studentclass.mapper';
import Services from '../../services';

import './student-class-page.css';

const StudentClassPageVariants = cva('student-class page', {
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

interface StudentClassPageProps
  extends VariantProps<typeof StudentClassPageVariants> {
  mode?: 'light' | 'dark';
}

export function StudentClassPage({ mode, ...props }: StudentClassPageProps) {
  // const toastify = useToastify()

  const [isStudentListOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update' | 'delete'>(
    'create'
  );
  const openModal = (type: 'create' | 'update' | 'delete') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  const [classIndex, setClassIndex] = useState(0);
  useEffect(() => {
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
        setClassIndex((prev) => (prev >= data.length ? 0 : prev));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [!isModalOpen]);

  const [studentsFiltered, setStudentsFiltered] = useState(
    Array<StudentInterface>
  );
  const [studentFilters, setStudentFilters] = useState<StudentFilters>({
    name: '',
    student_class: '',
  });

  const [students, setStudents] = useState(Array<StudentInterface>);
  useEffect(() => {
    studentClasses.length > 0 &&
      Services.listStudent({ student_class: studentClasses[classIndex].name })
        .then((data) => {
          setStudents(data);
          setStudentsFiltered(data);
          setStudentFilters({
            student_class: studentClasses[classIndex].name,
            name: '',
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }, [!isModalOpen, !isStudentListOpen, studentClasses, classIndex]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStudentFilters((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const filters = Object.fromEntries(
      Object.entries(studentFilters).filter(([_, v]) => v !== '')
    );

    Services.listStudent(filters)
      .then((data) => {
        setStudentsFiltered(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [users, setUsers] = useState(Array<User>);
  // useEffect(() => {
  //   Services.listUsers()
  //     .then((data) => {
  //       const studentUsers = data.filter((user) => user.role == 2)
  //       setUsers(studentUsers);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [!isStudentListOpen]);

  // const handleCheckboxChange = async (email: string) => {
  //   if (verifyIncluded(email)) {
  //     const student = students.find((student) => student.email == email)

  //     try {
  //       student && await Services.deleteStudent(student.id)
  //       toastify('success', 'Aluno removido com sucesso!')
  //     }
  //     catch (error) {
  //       toastify('failure', 'Não foi possível remover aluno\n' + error)
  //       console.log(error)
  //     }
  //   }

  //   else {
  //     const user = users.find((user) => user.email == email)

  //     try {
  //       user && await Services.createStudent({
  //         student_class: studentClasses[classIndex],
  //         user: userBasicInfoResponseMapper(user)
  //       })
  //       toastify('success', 'Aluno adicionado com sucesso!')
  //     }
  //     catch (error) {
  //       toastify('failure', 'Não foi possível adiconar aluno\n' + error)
  //       console.log(error)
  //     }
  //   }

  //   Services.listStudent({ student_class: studentClasses[classIndex].name })
  //     .then((data) => {
  //       setStudents(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const verifyIncluded = (email: string) => {
  //   return students.some((student) => student.email == email)
  // };

  return (
    <>
      <div className={StudentClassPageVariants({ mode })} {...props}>
        <Hero
          title="Turmas"
          description="Crie e edite suas turmas e gerencie seus alunos que pertencem a cada uma delas."
        />

        <CardMenu className="menu">
          <Card
            to=""
            label="Adicionar"
            mode="light"
            onClick={() => openModal('create')}
          />
          <Card to="" label="Métricas" mode="light" />
        </CardMenu>

        <div className="page-content">
          {studentClasses.length > 0 && (
            <div className="content">
              <div className="classes-header">
                <OptionList
                  labels={studentClasses.map((st) => st.name)}
                  index={classIndex}
                  setIndex={setClassIndex}
                />

                <Button variant="outline" onClick={() => openModal('update')}>
                  Editar
                </Button>
                <Button onClick={() => openModal('delete')}>Excluir</Button>
              </div>

              <div className="classes-info">
                <TextCard iconType="book" label="Curso">
                  {studentClasses?.[classIndex].course ?? 'Não definido'}
                </TextCard>
                <TextCard iconType="clipboard" label="Sala">
                  {studentClasses?.[classIndex].classroom ?? 'Não definido'}
                </TextCard>
                <TextCard iconType="calendar" label="Modalidade">
                  {studentClasses?.[classIndex].modalityFormat() ??
                    'Não definido'}
                </TextCard>
                <TextCard iconType="users" label="Alunos">
                  {students.length}
                </TextCard>
              </div>

              <div className="classes-table">
                <form
                  className="student-filters"
                  id="filter-student-form"
                  method="GET"
                  onSubmit={handleSubmit}
                >
                  <Search
                    name="name"
                    placeholder="Nome do Aluno"
                    value={studentFilters.name}
                    onChange={handleChange}
                  />

                  <Button type="submit" form="filter-student-form">
                    <Icon iconType="search" size={12} />
                  </Button>
                </form>

                <Table
                  mode="light"
                  itemsPerPage={8}
                  clickable={true}
                  header={['Nome do aluno']}
                >
                  {studentsFiltered.map((student) => {
                    return (
                      <TableRow key={student.id}>
                        <td>{student.fullName}</td>
                      </TableRow>
                    );
                  })}
                </Table>

                {/* <Button onClick={() => setIsStudentListOpen(true)}>
                  Adicionar Aluno
                </Button> */}
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <StudentClassModal
          mode="light"
          type={modalType}
          studentClass={studentClasses[classIndex]}
          close={() => setIsModalOpen(false)}
        />
      )}

      {/* {
        isStudentListOpen && (
        <SelectList
          users={users}
          verifyIncluded={verifyIncluded}
          handleListChange={handleCheckboxChange}
          confirm={() => setIsStudentListOpen(false)}
          close={() => setIsStudentListOpen(false)}
        />
        )
      } */}
    </>
  );
}
