import { useState } from 'react' 
import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from './modal-components/modal-header'
import { ModalRow } from './modal-components/modal-row'
import { ModalFooter } from './modal-components/modal-footer'
import { Lesson } from '../../data/models/lesson.model'
import { deleteLesson } from '../../data/requests/lesson.requests'
import './modal.css'

const DeleteLessonVariants = cva(
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

interface DeleteLessonProps extends VariantProps<typeof DeleteLessonVariants> {
  className?: string
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
  lesson?: Lesson
  close: Function
}

export function DeleteLesson({ mode, variant, lesson, close, className }: DeleteLessonProps) {
  const handleDelete = () => {
    close()
    alert('EXCLUÍDO!')
    // deleteLesson(3)
    //   .then(response => {
    //     console.log(response)
    //     close()
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className='modal-background' onClick={() => close()} />

      <div className={DeleteLessonVariants({ mode })}>
        <ModalHeader
          title='Excluir aula'
          variant={variant}
          mode={mode}
        />

        <div className='modal-content'>
          <div className='content-body'>
              <ModalRow labels={[]} mode={mode}>
                <span>{`Deseja mesmo excluir ${'Aula de Geometria'}? Apenas essa aula será excluída.`}</span>
              </ModalRow>
          </div>

          <ModalFooter type='button' mode={mode} confirm={() => handleDelete()} close={() => close()} />
        </div>
      </div>
    </div>
  )
}
