import { cva, VariantProps } from 'class-variance-authority';
import Services from '../../services';
import './modal.css';
import { ModalHeader } from './modal-components/modal-header';
import { ModalRow } from './modal-components/modal-row';
import { Input } from '../input/input';
import { useEffect, useState } from 'react';
import {
  CreateUserData,
  mapRoleToString,
  UserRole,
} from '../../data/models/user.model';
import { ModalFooter } from './modal-components/modal-footer';
import { SelectInput } from '../select-input/select-input';
import { toast } from 'react-toastify';
import { getEnumValues } from '../../utils';
import { StudentClass } from '../../data/models/student-class.model';

const ManualRegisterVariants = cva('base-modal input-modal', {
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

interface ManualRegisterProps
  extends VariantProps<typeof ManualRegisterVariants> {
  className?: string;
  mode?: 'light' | 'dark';
  variant?: 'solid' | 'outline';
  onClose: () => void;
  isStudent?: boolean;
}

export function ManualRegister({
  mode,
  variant,
  onClose,
  className,
  isStudent,
}: ManualRegisterProps) {
  const [userData, setUserData] = useState<CreateUserData>({
    first_name: '',
    last_name: '',
    email: '',
    role: isStudent ? UserRole.STUDENT : UserRole.OTHERS,
    student_class: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    Services.registerUser(userData)
      .then(() => {
        toast.success('Usuário cadastrado com sucesso!');
        onClose();
      })
      .catch((error) => {
        toast.error(`Erro: ${error}`);
      });
  };

  const handleClose = () => {
    onClose();
    setUserData({
      first_name: '',
      last_name: '',
      email: '',
      role: isStudent ? UserRole.STUDENT : UserRole.OTHERS,
      student_class: undefined,
    });
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const [studentClasses, setStudentClasses] = useState<StudentClass[]>([]);
  useEffect(() => {
    if (isStudent) {
      Services.listStudentClasses()
        .then((response) => {
          setStudentClasses(response);
        })
        .catch(() => toast.error('Erro ao carregar turmas'));
    }
  }, [isStudent]);

  return (
    <div className={className ? `modal ${className}` : 'modal'}>
      <div className="modal-background" onClick={() => handleClose()} />
      <div className={ManualRegisterVariants({ mode })}>
        <ModalHeader
          title="Cadastro manual"
          description="Inserir um usuário manualmente no sistema."
          variant={variant}
          mode={mode}
        />

        <div className="modal-content">
          <div className="content-body">
            <form id="class-form" onSubmit={handleSubmit}>
              <ModalRow labels={['Nome', 'Sobrenome']} mode={mode}>
                <Input
                  required
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  placeholder="Nome"
                  mode={mode}
                  onChange={handleChange}
                />
                <Input
                  required
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  placeholder="Sobrenome"
                  mode={mode}
                  onChange={handleChange}
                />
              </ModalRow>

              {isStudent ? (
                <ModalRow labels={['Email', 'Turma']} mode={mode}>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={userData.email}
                    placeholder="Email"
                    mode={mode}
                    onChange={handleChange}
                  />
                  <SelectInput
                    placeholder="Turma"
                    name="studentClass"
                    value={userData.student_class}
                    onChange={(e) => {
                      e.preventDefault();
                      setUserData((prevData) => ({
                        ...prevData,
                        student_class: parseInt(e.target.value),
                      }));
                    }}
                  >
                    {studentClasses.map((studentClass) => (
                      <option key={studentClass.id} value={studentClass.id}>
                        {studentClass.name}
                      </option>
                    ))}
                  </SelectInput>
                </ModalRow>
              ) : (
                <ModalRow labels={['Email', 'Cargo']} mode={mode}>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={userData.email}
                    placeholder="Email"
                    mode={mode}
                    onChange={handleChange}
                  />
                  <SelectInput
                    placeholder="Cargo"
                    name="role"
                    value={userData.role}
                    onChange={(e) => {
                      e.preventDefault();
                      setUserData((prevData) => ({
                        ...prevData,
                        role: parseInt(e.target.value),
                      }));
                    }}
                  >
                    {getEnumValues(UserRole).map((role: UserRole) => (
                      <option key={role} value={role}>
                        {mapRoleToString(role)}
                      </option>
                    ))}
                  </SelectInput>
                </ModalRow>
              )}
            </form>
          </div>

          <hr className="divider" />
          <ModalFooter
            type="submit"
            form="class-form"
            mode={mode}
            close={() => handleClose()}
          />
        </div>
      </div>
    </div>
  );
}
