import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from '../modal-components/modal-header'
import { ModalRow } from '../modal-components/modal-row'
import { ModalFooter } from '../modal-components/modal-footer'
import { ModalWarning } from '../modal-components/modal-warning'

import { Subject } from '../../../data/models/subject.model'
import Services from '../../../services'
import '../modal.css'

const deleteSubjectVariants = cva(
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

interface DeleteSubjectProps extends VariantProps<typeof deleteSubjectVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  subject: Subject
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function DeleteSubject({ mode, variant, subject, onSuccess, onFailure, close }: DeleteSubjectProps) {
  const handleSubmit = () => {
    Services.deleteSubject(subject.id)
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
    <div className={deleteSubjectVariants({ mode })}>
      <ModalHeader
        title='Deletar frente'
        variant={variant}
        mode={mode}
      />

      <div className='modal-content'>
        <div className='content-body'>
          <ModalRow labels={[]} mode={mode} >
            <p>{`Tem certeza que deseja deletar a frente ${subject.name}?`}</p>
          </ModalRow>
        </div>

        <hr className='divider'/>
        <ModalWarning mode={mode} description='Isso deletará todas as aulas marcadas para essa frente!' />
        <ModalFooter mode={mode} confirm={() => handleSubmit()} close={() => close()} />
      </div>
    </div>
  )
}
