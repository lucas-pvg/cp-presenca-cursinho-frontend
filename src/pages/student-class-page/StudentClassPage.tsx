import { cva, VariantProps } from "class-variance-authority";
import { Hero } from "../../components/hero/hero";
import { CardMenu } from "../../components/card-menu/card-menu";
import { Card } from "../../components/card-menu/card";
import './StudentClassPage.css';
import { Table } from "../../components/table/Table";
import { OptionList } from "../../components/option-list/option-list";
import { Button } from "../../components/button/Button";
import { useEffect, useState } from "react";
import { SelectList } from "../../components/select-list/SelectList";
import { students } from "../../data/mock/students-select";
import { StudentSelect } from "../../data/models/student.model";
import { CreateStudentClass } from "../../components/modal/create-student-class";
import { TextCard } from "../../components/text-card/text-card";
import { TableRow } from "../../components/table/TableRow";
import Services from "../../services";
import { StudentClass } from "../../data/models/class.model";
import { formattedTime } from "../../data/mapper/studentclass.mapper";

const StudentClassPageVariants = cva(
  'student-class page', 
  {
    variants: {
      mode: {
        light: 'light', 
        dark: 'dark',
      }
    },
    defaultVariants: {
      mode: 'light'
    }
  }
)

interface StudentClassPageProps extends VariantProps<typeof StudentClassPageVariants> {
  mode?: 'light' | 'dark'
}

export function StudentClassPage({mode, ...props}: StudentClassPageProps) {
  const [ open, setOpen ] = useState(false)
  const [ openAdd, setOpenAdd ] = useState(false)
  const [ selectedIds, setSelectedIds ] = useState([0]);
  const [ selectedStudents, setSelectedStudents ] = useState<StudentSelect[]>([]);
  const [ studentClasses, setStudentClasses] = useState<StudentClass[]>([]);
  const [ index, setIndex ] = useState(0);

  useEffect(() => {
    Services.listStudentClasses()
      .then(data => {
        setStudentClasses(data)
      })
      .catch(error => {
        console.log(error);
      }) 
  }, [])

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const verifyIncluded = (id: number) => {
    return selectedIds.includes(id);
  }

  const confirm = () => {
    setSelectedStudents([]);
    selectedIds.sort((a,b) => a - b);
    selectedIds.forEach((id) => {
      const student = students.find(student => student.id === id) ?? null;
      setSelectedStudents(prevSelectedStudents => {
        return student ? [...prevSelectedStudents, student] : [...prevSelectedStudents];
      })
    })
    setOpenAdd(false)
  }

  return (
    <div className={StudentClassPageVariants({ mode })} {...props}>
      <Hero 
        title='Turmas'
        description='Crie, edite e gerencie suas turmas'
      />

      <CardMenu className='menu'>
        <Card to='' label='Adicionar' mode='light' onClick={() => setOpen(true)}/>
        <Card to='' label='Métricas' mode='light' />
      </CardMenu>

      <div className='student-class-page-content'>
        {studentClasses.length > 0 && <div className='column'>
          <OptionList labels={studentClasses.map(st => st.name)} setIndex={setIndex}/>
          <div className='cards'>
            <TextCard iconType='book' label='Curso'>{studentClasses?.[index].course ?? ''}</TextCard>
            <TextCard iconType='clock' label='Horário'>{`${formattedTime(studentClasses?.[index].startDateTime.getHours(), studentClasses?.[index].startDateTime.getMinutes())} - ${formattedTime(studentClasses?.[index].endDateTime.getHours(), studentClasses?.[index].endDateTime.getMinutes())}`}</TextCard>
            <TextCard iconType='clipboard' label='Sala'>{studentClasses?.[index].classroom ?? ''}</TextCard>
            <TextCard iconType='users' label='Modalidade'>{studentClasses?.[index].modality ?? ''}</TextCard>
          </div>
        </div>}
        <div className='column'>
          <Table
            mode='light'
            clickable={true}
            header={['Aluno', 'id']}
          >
            {selectedStudents.map((student, index) => (
              <TableRow key={index}>
                <td>{student.name}</td>
                <td>{student.id}</td>
              </TableRow>
            ))}
          </Table>
          <div className="center">
            <Button onClick={() => setOpenAdd(true)}>{'Adicionar aluno'}</Button>
            <SelectList 
            className={openAdd ? 'modal-open' : 'modal-close'} 
            close={() => setOpenAdd(false)} items={students} 
            verifyIncluded={verifyIncluded} 
            handleListChange={handleCheckboxChange}
            confirm={confirm}
            />
            <CreateStudentClass className={open ? 'modal-open' : 'modal-close'} mode='light' close={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  )
}
