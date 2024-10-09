import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from '../modal-components/modal-header'
import { ModalRow } from '../modal-components/modal-row'
import { ModalFooter } from '../modal-components/modal-footer'
import { ModalWarning } from '../modal-components/modal-warning'

import { StudentClass } from '../../../data/models/student-class.model'
import Services from '../../../services'
import '../modal.css'

const deleteStudentClassVariants = cva(
  'base-modal',
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

interface deleteStudentClassProps extends VariantProps<typeof deleteStudentClassVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  studentClass: StudentClass
  close: () => void;
}

export function DeleteStudentClass({ mode, variant, studentClass, close }: deleteStudentClassProps) {
  const handleSubmit = () => {
    Services.deleteStudentClass(studentClass.id)
    .then(res => {
      console.log(res)
      close()
    })
    .catch(err => { 
      console.log(err) 
    })
  }

  return (
    <div className={deleteStudentClassVariants({ mode })}>
      <ModalHeader
        title='Deletar Turma'
        variant={variant}
        mode={mode}
      />

      <div className='modal-content'>
        <div className='content-body'>
          <ModalRow labels={[]} mode={mode} >
            <p>{`Tem certeza que deseja deletar a turma ${studentClass.name}?`}</p>
          </ModalRow>
        </div>

        <hr className='divider'/>
        <ModalWarning mode={mode} description='Isso deletará todas as aulas marcadas para essa turma!' />
        <ModalFooter mode={mode} confirm={() => handleSubmit()} close={() => close()} />
      </div>
    </div>
)
}
