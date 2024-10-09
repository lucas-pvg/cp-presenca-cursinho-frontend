import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { CreateStudentClass } from './student-class/create-student-class';
import { EditStudentClass } from './student-class/edit-student-class';
import { DeleteStudentClass } from './student-class/delete-student-class';

import { StudentClass } from '../../data/models/student-class.model';
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

interface createClassProps extends VariantProps<typeof studentClassModalVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  type: 'create' | 'update' | 'delete'
  studentClass: StudentClass
  close: () => void
}

export function StudentClassModal({ mode, variant, type, studentClass, close }: createClassProps) {
  const [closingAnimation, setClosingAnimation] = useState(false)

  const handleClose = () => {
    setClosingAnimation(true)   
    setTimeout(() => close(), 200)
  };

  return (
    <div className={closingAnimation ? 'modal modal-close' : 'modal modal-open'}>
      <div className="modal-background" onClick={() => handleClose()} />
      {
        type === 'create' && <CreateStudentClass mode={mode} variant={variant} close={handleClose} /> ||
        type === 'update' && studentClass && <EditStudentClass mode={mode} variant={variant} studentClass={studentClass} close={handleClose} /> ||
        type === 'delete' && studentClass && <DeleteStudentClass mode={mode} variant={variant} studentClass={studentClass} close={handleClose} />
      }
    </div>
  );
}

