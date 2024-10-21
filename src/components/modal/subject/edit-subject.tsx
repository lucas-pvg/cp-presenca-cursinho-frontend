import { useState } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from '../modal-components/modal-header'
import { ModalRow } from '../modal-components/modal-row'
import { ModalFooter } from '../modal-components/modal-footer'
import { Input } from '../../input/input'

import { Subject, SubjectCreateData } from '../../../data/models/subject.model'
import Services from '../../../services'
import '../modal.css'

const editSubjectVariants = cva(
  'base-modal input-modal',
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

interface EditSubjectProps extends VariantProps<typeof editSubjectVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  subject: Subject
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function EditSubject({ mode, variant, subject, onSuccess, onFailure, close  }: EditSubjectProps) {
  const [ subjectData, setSubjectData ] = useState<SubjectCreateData>({
    name: '',
    mainSubject: subject.mainSubject
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSubjectData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    Services.updateSubject(subject.id, subjectData)
    .then(res => {
      onSuccess && onSuccess()
      console.log(res)
      close()
    })
    .catch(err => { 
      onFailure && onFailure(err)
      console.log(err)  
    })
  }

  return (
    <div className={editSubjectVariants({ mode })}>
      <ModalHeader
        title='Editar frente'
        description={`Edite o nome da frente ${subject.name}`}
        variant={variant}
        mode={mode}
      />

      <div className='modal-content'>
        <div className='content-body'>
          <form id='edit-subject-form' onSubmit={handleSubmit}>
            <ModalRow labels={['Nome da frente']} mode={mode} >
              <Input type='text' name='name' value={subjectData.name} placeholder='Geometria' mode={mode} onChange={handleChange} />
            </ModalRow>
          </form>
        </div>

        <ModalFooter mode={mode} type='submit' form='edit-subject-form' close={() => close()} />
      </div>
    </div>
  )
}
