import { useState } from 'react';
import { useToastify } from '../../services/toastify';
import { cva, VariantProps } from 'class-variance-authority';
import { CreateLesson } from './lesson/create-lesson';
import { EditLesson } from './lesson/edit-lesson';
import { DeleteLesson } from './lesson/delete-lesson';

import { Lesson } from '../../data/models/lesson.model';
import './modal.css';

const studentClassModalVariants = cva('base-modal input-modal', {
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

interface CreateLessonProps extends VariantProps<typeof studentClassModalVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  type: 'create' | 'update' | 'delete'
  lesson?: Lesson
  close: () => void
}

export function LessonModal({ mode, variant, type, lesson, close }: CreateLessonProps) {
  const [closingAnimation, setClosingAnimation] = useState(false)
  const toastify = useToastify()

  const handleClose = () => {
    setClosingAnimation(true)   
    setTimeout(() => close(), 200)
  };

  return (
    <div className={closingAnimation ? 'modal modal-close' : 'modal modal-open'}>
      <div className="modal-background" onClick={() => handleClose()} />
      {
        type === 'create' &&
        <CreateLesson
          mode={mode}
          variant={variant}
          onSuccess={() => toastify('success', 'Aula criada com sucesso!')}
          onFailure={(err) => toastify('failure', 'Não foi possível criar a aula\n' + err)}
          close={handleClose}
        />
      }
      {
        type === 'update' && lesson && 
        <EditLesson
          mode={mode}
          variant={variant}
          lesson={lesson}
          onSuccess={() => toastify('success', 'Aula editada com sucesso!')}
          onFailure={(err) => toastify('failure', 'Não foi possível editar a aula\n' + err)}
          close={handleClose} />
      }
      {
        type === 'delete' && lesson && 
        <DeleteLesson
          mode={mode}
          variant={variant}
          lesson={lesson}
          onSuccess={() => toastify('success', 'Aula deletada com sucesso!')}
          onFailure={(err) => toastify('failure', 'Não foi possível deletar a aula\n' + err)}
          close={handleClose} />
      }
    </div>
  );
}
