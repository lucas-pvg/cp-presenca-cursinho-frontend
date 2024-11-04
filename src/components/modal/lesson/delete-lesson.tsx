import { useNavigate } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import { ModalHeader } from '../modal-components/modal-header'
import { ModalRow } from '../modal-components/modal-row'
import { ModalFooter } from '../modal-components/modal-footer'
import { ModalWarning } from '../modal-components/modal-warning'

import { Lesson } from '../../../data/models/lesson.model'
import Services from '../../../services'
import '../modal.css'

const deleteLessonVariants = cva(
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

interface DeleteLessonProps extends VariantProps<typeof deleteLessonVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  lesson: Lesson
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function DeleteLesson({ mode, variant, lesson, onSuccess, onFailure, close }: DeleteLessonProps) {
  const navigate = useNavigate()
  const handleSubmit = () => {
    Services.deleteLesson(lesson.id)
      .then((res) => {
        onSuccess && onSuccess()
        console.log(res);
        navigate('/lessons')
        close();
      })
      .catch((err) => {
        onFailure && onFailure(err)
        console.log(err);
      });
  };

  return (
    <div className={deleteLessonVariants({ mode })}>
      <ModalHeader
        title="Deletar aula"
        variant={variant}
        mode={mode}
      />

      <div className="modal-content">
        <div className="content-body">
          <ModalRow labels={[]} mode={mode} >
            <p>{`Tem certeza que deseja deletar a aula ${lesson.name}?`}</p>
          </ModalRow>
        </div>

        <hr className="divider" />
        <ModalWarning mode={mode} description='Isso deletará apenas essa aula em específico.' />
        <ModalFooter
          mode={mode}
          confirm={() => handleSubmit()}
          close={() => close()}
        />
      </div>
    </div>
  );
}
