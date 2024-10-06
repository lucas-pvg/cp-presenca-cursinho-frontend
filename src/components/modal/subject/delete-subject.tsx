import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from '../modal-components/modal-header'
import { ModalRow } from '../modal-components/modal-row'
import { ModalFooter } from '../modal-components/modal-footer'
import { ModalWarning } from '../modal-components/modal-warning'

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

interface deleteSubjectProps extends VariantProps<typeof deleteSubjectVariants> {
  className?: string
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  confirm: Function
  close: Function
  subjectID: number
  subjectName: string
  onAnimationEnd: Function
}

export function DeleteSubject({ mode, variant, confirm, close, subjectID, subjectName, className, onAnimationEnd }: deleteSubjectProps) {
  const handleSubmit = () => {
    Services.deleteSubject(subjectID)
    .then(res => {
      console.log(res)
      confirm()
      handleClose()
    })
    .catch(err => { 
      console.log(err) 
    })
  }

  const handleClose = () => {
    close()
  }

  return (
    <div className={className ? `modal ${className}` : 'modal'} onAnimationEnd={() => onAnimationEnd()}>
      <div className='modal-background' onClick={() => handleClose()} />

      <div className={deleteSubjectVariants({ mode })}>
        <ModalHeader
          title='Deletar frente'
          variant={variant}
          mode={mode}
        />

        <div className='modal-content'>
          <div className='content-body'>
            <ModalRow labels={[]} mode={mode} >
              <p>{`Tem certeza que deseja deletar a frente ${subjectName}?`}</p>
            </ModalRow>
          </div>

          <hr className='divider'/>
          <ModalWarning mode={mode} description='Isso deletará todas as aulas marcadas para essa frente!' />
          <ModalFooter mode={mode} confirm={() => handleSubmit()} close={() => handleClose()} />
        </div>
      </div>
    </div>
  )
}
