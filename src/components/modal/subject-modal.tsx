import { useState } from 'react';
import { useToastify } from '../../services/toastify';
import { CreateSubject } from './subject/create-subject';
import { EditSubject } from './subject/edit-subject';
import { DeleteSubject } from './subject/delete-subject';
import { Subject } from '../../data/models/subject.model';

import './modal.css';

interface SubjectProps {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  type: 'create' | 'update' | 'delete'
  mainSubject: string
  subject?: Subject
  close: () => void
}

export function SubjectModal({ mode, variant, type, mainSubject, subject, close }: SubjectProps) {
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
        <CreateSubject
          mode={mode}
          variant={variant}
          mainSubject={mainSubject}
          onSuccess={() => toastify('success', 'Frente criada com sucesso!')}
          onFailure={(err) => toastify('failure', 'Não foi possível criar a frente\n' + err)}
          close={handleClose}
        />
      }
      {
        type === 'update' &&
        <EditSubject
          mode={mode}
          variant={variant}
          subject={subject!}
          onSuccess={() => toastify('success', 'Frente editada com sucesso!')}
          onFailure={(err) => toastify('failure', 'Não foi possível editar a frente\n' + err)}
          close={handleClose}
        />
      }
      {
        type === 'delete' &&
        <DeleteSubject
          mode={mode}
          variant={variant}
          subject={subject!}
          onSuccess={() => toastify('success', 'Frente deletada com sucesso!')}
          onFailure={(err) => toastify('failure', 'Não foi possível deletar a frente\n' + err)}
          close={handleClose}
        />
      }
    </div>
  );
}
