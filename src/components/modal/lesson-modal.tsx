import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { CreateLesson } from './lesson/create-lesson';
import { useToastify } from '../../services/toastify';

// import { Lesson } from '../../data/models/lesson.model';
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
  // lesson?: Lesson
  close: () => void
}

export function LessonModal({ mode, variant, type, close }: CreateLessonProps) {
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
        // type === 'update' && studentClass && <EditStudentClass mode={mode} variant={variant} studentClass={studentClass} close={handleClose} /> ||
        // type === 'delete' && studentClass && <DeleteStudentClass mode={mode} variant={variant} studentClass={studentClass} close={handleClose} />
      }
    </div>
  );
}
