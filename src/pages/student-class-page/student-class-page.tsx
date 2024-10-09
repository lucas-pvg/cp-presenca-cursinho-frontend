import { useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import { OptionList } from '../../components/option-list/option-list';
import { Button } from '../../components/button/Button';
// import { SelectList } from '../../components/select-list/SelectList';
import { StudentClassModal } from '../../components/modal/student-class-modal';
import { TextCard } from '../../components/text-card/text-card';
import { Input } from '../../components/input/input';

import { students } from '../../data/mock/students-select';
// import { StudentSelect } from '../../data/models/student.model';
import { StudentClass } from '../../data/models/student-class.model';
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
  // const [open, setOpen] = useState(false);
  // const [openAdd, setOpenAdd] = useState(false);
  // const [selectedIds, setSelectedIds] = useState([0]);
  // const [selectedStudents, setSelectedStudents] = useState<StudentSelect[]>([]);

  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  const [classIndex, setClassIndex] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update' | 'delete'>('create')

  useEffect(() => {
    !modalState &&
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
        setClassIndex((prev) => prev >= data.length ? 0 : prev)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalState]);

  const openModal = (type: 'create' | 'update' | 'delete') => {
    setModalType(type)
    setModalState(true)
  }

  // const handleCheckboxChange = (id: number) => {
  //   setSelectedIds((prevSelectedIds) => {
  //     if (prevSelectedIds.includes(id)) {
  //       return prevSelectedIds.filter((selectedId) => selectedId !== id);
  //     } else {
  //       return [...prevSelectedIds, id];
  //     }
  //   });
  // };

  // const verifyIncluded = (id: number) => {
  //   return selectedIds.includes(id);
  // };

  // const confirm = () => {
  //   setSelectedStudents([]);
  //   selectedIds.sort((a, b) => a - b);
  //   selectedIds.forEach((id) => {
  //     const student = students.find((student) => student.id === id) ?? null;
  //     setSelectedStudents((prevSelectedStudents) => {
  //       return student
  //         ? [...prevSelectedStudents, student]
  //         : [...prevSelectedStudents];
  //     });
  //   });
  //   setOpenAdd(false);
  // };

  return (
    <>
    <div className={StudentClassPageVariants({ mode })} {...props}>
      <Hero
        title="Turmas"
        description="Crie e edite suas turmas e gerencie seus alunos que pertencem a cada uma delas." />

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
        {
          studentClasses.length > 0 &&
          <div className='content'>
            <div className='classes-header'>
              <OptionList
                labels={studentClasses.map((st) => st.name)}
                index={classIndex}
                setIndex={setClassIndex}
              />

              <Button variant='outline' onClick={() => openModal('update')}>Editar</Button>
              <Button onClick={() => openModal('delete')}>Excluir</Button>
            </div>

            <div className='classes-info'>
              <TextCard iconType='book' label='Curso'>{studentClasses?.[classIndex].course ?? 'Não definido'}</TextCard>
              <TextCard iconType='clipboard' label='Sala'>{studentClasses?.[classIndex].classroom ?? 'Não definido'}</TextCard>
              <TextCard iconType='calendar' label='Modalidade'>{studentClasses?.[classIndex].modalityFormat() ?? 'Não definido'}</TextCard>
              <TextCard iconType='users' label='Alunos'>{8}</TextCard>
            </div>

            <div className='classes-table'>
              <Input type='text' />

              <Table mode='light' itemsPerPage={8} clickable={true} header={['Nome do aluno']}>
                {
                  students.map((student) => { return (
                    <TableRow key={student.id}>
                      <td>{student.name}</td>
                    </TableRow>
                  )})
                }
              </Table>

              <Button>Adicionar Aluno</Button>
            </div>
          </div>
        }
          
        
        
        


        {/* {studentClasses.length > 0 && (
        )}
        <div className="column">
          <Table mode="light" clickable={true} header={['Aluno', 'id']}>
            {selectedStudents.map((student, index) => (
              <TableRow key={index}>
                <td>{student.name}</td>
                <td>{student.id}</td>
              </TableRow>
            ))}
          </Table>
          
          <div className="center">
            <Button onClick={() => setOpenAdd(true)}>
              {'Adicionar aluno'}
            </Button>
            <SelectList
              className={openAdd ? 'modal-open' : 'modal-close'}
              close={() => setOpenAdd(false)}
              items={students}
              verifyIncluded={verifyIncluded}
              handleListChange={handleCheckboxChange}
              confirm={confirm}
            />
            <CreateStudentClass
              className={open ? 'modal-open' : 'modal-close'}
              mode="light"
              close={() => setOpen(false)}
            />
          </div>
        </div> */}
      </div>
    </div>

    {
      modalState && 
      <StudentClassModal
        mode="light"
        type={modalType}
        studentClass={studentClasses[classIndex]}
        close={() => setModalState(false)}
      />
    }
    </>
  );
}
