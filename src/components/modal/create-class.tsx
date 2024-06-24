import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from './modal-components/modal-header'
import { ModalRow } from './modal-components/modal-row'
import { ModalWarning } from './modal-components/modal-warning'
import { ModalFooter } from './modal-components/modal-footer'

import { TextInput } from '../input/text-input'
import { SelectInput } from '../input/select-input'
import { DateInput } from '../input/date-input'
import { TimeInput } from '../input/time-input'
import './modal.css'

const createClassVariants = cva(
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

interface createClassProps extends VariantProps<typeof createClassVariants> {
  mode?: 'light' | 'dark'
  variant?: 'solid' | 'outline'
}

export function CreateClass({ mode, variant }: createClassProps) {
  return (
    <div className={createClassVariants({ mode })}>
      <ModalHeader
        title='Agendamento de aula'
        description='Agende uma aula manualmente e relacione a uma disciplina.'
        variant={variant}
        mode={mode}
      />

      <div className='modal-content'>
        <div className='body'>
          <ModalRow labels={['Nome do evento']} mode={mode}>
            <TextInput placeholder='Aula de Matemática' mode={mode} />
          </ModalRow>

          <ModalRow labels={['Disciplina', 'Turma']} mode={mode}>
            <SelectInput placeholder='Selecione a disciplina' mode={mode} />
            <SelectInput placeholder='Selecione a turma' mode={mode} />
          </ModalRow>

          <ModalRow labels={['Data', 'Horário']} mode={mode}>
            <DateInput mode={mode} />
            <TimeInput mode={mode} />
          </ModalRow>
        </div>

        <hr className='divider'/>
        <ModalWarning mode={mode} />
        <ModalFooter mode={mode} />
      </div>
    </div>
  )
}
