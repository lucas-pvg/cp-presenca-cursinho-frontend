import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { useCallback, useEffect, useState } from 'react';
import { mapRoleToString, User, UserRole } from '../../data/models/user.model';
import { Search } from '../../components/search/search';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import Services from '../../services';
import { ManualRegister } from '../../components/modal/manual-register';
import { BatchRegister } from '../../components/modal/batch-register/batch-register';
import { debounce } from '../../utils';
import { useToastify } from '../../services/toastify';

import './teachers-page.css';

const TeachersPageVariants = cva('teachers page', {
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

interface TeachersPageProps extends VariantProps<typeof TeachersPageVariants> {
  mode?: 'light' | 'dark';
}

export function TeachersPage({ mode, ...props }: TeachersPageProps) {
  const [isManualRegisterModalOpen, setIsManualRegisterModalOpen] =
    useState(false);
  const [isBatchRegisterModalOpen, setIsBatchRegisterModalOpen] =
    useState(false);

  const toast = useToastify();

  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    !isManualRegisterModalOpen &&
      !isBatchRegisterModalOpen &&
      Services.listUsers({
        role__in: `${UserRole.ADMIN},${UserRole.TEACHER},${UserRole.OTHERS}`,
      })
        .then((response) => {
          setUsers(response);
        })
        .catch(() => toast('failure', 'Erro ao carregar usuários'));
  }, [isManualRegisterModalOpen, isBatchRegisterModalOpen]);

  const fetchFilteredUsers = (search: string) => {
    Services.listUsers({
      search,
      role__in: `${UserRole.ADMIN},${UserRole.TEACHER},${UserRole.OTHERS}`,
    })
      .then((response) => {
        setUsers(response);
      })
      .catch(() => toast('failure', 'Erro ao carregar usuários'));
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
      <div className={TeachersPageVariants({ mode })} {...props}>
        <Hero
          title="Professores"
          description="Gerencie os professores e administradores do sistema."
        />

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
          {users && (
            <>
              <Search
                className="search-bar"
                value={search}
                onChange={handleSearchChange}
              />
              <div className="user-table">
                <Table
                  clickable={false}
                  header={['Nome', 'Sobrenome', 'E-mail', 'Cargo']}
                >
                  {users.map((user) => {
                    return (
                      <TableRow
                        key={user.id}
                        style={{ cursor: 'context-menu' }}
                        clickable={false}
                      >
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{mapRoleToString(user.role)}</td>
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
      />

      <BatchRegister
        className={isBatchRegisterModalOpen ? 'modal-open' : 'modal-close'}
        mode={mode}
        onClose={() => setIsBatchRegisterModalOpen(false)}
      />
    </>
  );
}
