import { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ModalHeader } from '../modal-components/modal-header';
import { ModalRow } from '../modal-components/modal-row';
import { ModalFooter } from '../modal-components/modal-footer';
import { Input } from '../../input/input';

import {
  SubjectCreateData,
  MainSubject,
} from '../../../data/models/subject.model';
import Services from '../../../services';
import '../modal.css';

const createSubjectVariants = cva('base-modal input-modal', {
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

interface createSubjectProps
  extends VariantProps<typeof createSubjectVariants> {
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  mainSubject: string;
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  close: () => void;
}

export function CreateSubject({
  mode,
  variant,
  mainSubject,
  onSuccess,
  onFailure,
  close,
}: createSubjectProps) {
  const [subjectData, setSubjectData] = useState<SubjectCreateData>({
    name: '',
    mainSubject: mainSubject,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Services.createSubject(subjectData)
      .then((res) => {
        onSuccess && onSuccess();
        console.log(res);
        close();
      })
      .catch((err) => {
        onFailure && onFailure(err);
        console.log(err);
      });
  };

  const getMainSubjectName = () => {
    return MainSubject.filter((main) => main.id === mainSubject)[0].name;
  };

  return (
    <div className={createSubjectVariants({ mode })}>
      <ModalHeader
        title="Criar frente"
        description={`Crie uma frente na disciplina de ${getMainSubjectName()}`}
        variant={variant}
        mode={mode}
      />

      <div className="modal-content">
        <div className="content-body">
          <form id="subject-form" onSubmit={handleSubmit}>
            <ModalRow labels={['Nome da frente']} mode={mode}>
              <Input
                type="text"
                name="name"
                value={subjectData.name}
                placeholder="Geometria"
                mode={mode}
                onChange={handleChange}
                required
              />
            </ModalRow>
          </form>
        </div>

        <ModalFooter
          mode={mode}
          type="submit"
          form="subject-form"
          close={() => close()}
        />
      </div>
    </div>
  );
}
