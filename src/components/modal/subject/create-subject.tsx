import { useState } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from '../modal-components/modal-header'
import { ModalRow } from '../modal-components/modal-row'
import { ModalFooter } from '../modal-components/modal-footer'
import { Input } from '../../input/input'

import { SubjectCreateData } from '../../../data/models/subject.model'
import Services from '../../../services'
import '../modal.css'

const createSubjectVariants = cva(
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

interface createSubjectProps extends VariantProps<typeof createSubjectVariants> {
  className?: string
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  confirm: Function
  close: Function
  mainSubject?: string
  subjectID?: number
  onAnimationEnd: Function
}

export function CreateSubject({ mode, variant, confirm, close, mainSubject, subjectID, className, onAnimationEnd }: createSubjectProps) {
  const [ subjectData, setSubjectData ] = useState<SubjectCreateData>({
    name: '',
    mainSubject: mainSubject!
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSubjectData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = () => {
    subjectID

    ? Services.updateSubject(subjectID, subjectData)
    .then(res => {
      console.log(res)
      confirm()
      close()
    })
    .catch(err => { 
      console.log(err) 
    })

    : Services.createSubject(subjectData)
    .then(res => {
      console.log(res)
      confirm()
      close()
    })
    .catch(err => { 
      console.log(err) 
    })
  }

  return (
    <div className={className ? `modal ${className}` : 'modal'} onAnimationEnd={() => onAnimationEnd()}>
      <div className='modal-background' onClick={() => close()} />

      <div className={createSubjectVariants({ mode })}>
        <ModalHeader
          title='Criar frente'
          description='Crie uma frente na disciplina de Matemática'
          variant={variant}
          mode={mode}
        />

        <div className='modal-content'>
          <div className='content-body'>
            <form id='subject-form'>
              <ModalRow labels={['Nome da frente']} mode={mode} >
                <Input type='text' name='name' value={subjectData.name} placeholder='Matemática' mode={mode} onChange={handleChange} />
              </ModalRow>
            </form>
          </div>

          <ModalFooter mode={mode} confirm={() => handleSubmit()} close={() => close()} />
        </div>
      </div>
    </div>
  )
}
