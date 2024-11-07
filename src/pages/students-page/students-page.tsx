import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { useCallback, useEffect, useState } from 'react';
import { User, UserRole } from '../../data/models/user.model';
import { Search } from '../../components/search/search';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import Services from '../../services';
import { ManualRegister } from '../../components/modal/manual-register';
import { BatchRegister } from '../../components/modal/batch-register/batch-register';
import { debounce } from '../../utils';
import { useToastify } from '../../services/toastify';

import './students-page.css';

const StudentsPageVariants = cva('students page', {
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

interface StudentsPageProps extends VariantProps<typeof StudentsPageVariants> {
  mode?: 'light' | 'dark';
}

export function StudentsPage({ mode, ...props }: StudentsPageProps) {
  const [isManualRegisterModalOpen, setIsManualRegisterModalOpen] =
    useState(false);
  const [isBatchRegisterModalOpen, setIsBatchRegisterModalOpen] =
    useState(false);

  const toast = useToastify();

  const [search, setSearch] = useState<string>('');
  const [students, setStudents] = useState<Array<User>>([]);

  useEffect(() => {
    !isManualRegisterModalOpen &&
      !isBatchRegisterModalOpen &&
      Services.listUsers({ role: UserRole.STUDENT })
        .then((response) => {
          setStudents(response);
        })
        .catch(() => toast('failure', 'Erro ao carregar alunos'));
  }, [isManualRegisterModalOpen, isBatchRegisterModalOpen]);

  const fetchFilteredUsers = (search: string) => {
    Services.listUsers({ search, role: UserRole.STUDENT })
      .then((response) => {
        setStudents(response);
      })
      .catch(() => toast('failure', 'Erro ao carregar alunos'));
  };

  const debouncedFetchFilteredUsers = useCallback(
    debounce(fetchFilteredUsers, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchFilteredUsers(value);
  };

  return (
    <>
      <div className={StudentsPageVariants({ mode })} {...props}>
        <Hero title="Alunos" description="Gerencie os alunos do sistema." />

        <CardMenu className="menu">
          <Card
            to=""
            label="Cadastrar manualmente"
            mode={mode}
            onClick={() => setIsManualRegisterModalOpen(true)}
          />
          <Card
            to=""
            label="Cadastrar em carga"
            mode={mode}
            onClick={() => setIsBatchRegisterModalOpen(true)}
          />
        </CardMenu>

        <div className="page-content">
          {students && (
            <>
              {/* TODO: arrumar componente para ficar na tela inteira */}
              <Search
                className="search-bar"
                value={search}
                onChange={handleSearchChange}
              />
              <div className="user-table">
                <Table
                  clickable={false}
                  header={['Nome', 'Sobrenome', 'E-mail']}
                >
                  {students.map((user) => {
                    return (
                      <TableRow
                        key={user.id}
                        style={{ cursor: 'context-menu' }}
                      >
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                      </TableRow>
                    );
                  })}
                </Table>
              </div>
            </>
          )}
        </div>
      </div>

      <ManualRegister
        className={isManualRegisterModalOpen ? 'modal-open' : 'modal-close'}
        mode={mode}
        onClose={() => setIsManualRegisterModalOpen(false)}
        isStudent
      />

      <BatchRegister
        className={isBatchRegisterModalOpen ? 'modal-open' : 'modal-close'}
        mode={mode}
        onClose={() => setIsBatchRegisterModalOpen(false)}
      />
    </>
  );
}
