import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import { useEffect, useState } from 'react';
import { User } from '../../data/models/user.model';
import { Search } from '../../components/search/search';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';
import Services from '../../services';
import { ManualRegister } from '../../components/modal/manual-register';

const UsersPageVariants = cva('users page', {
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

interface UsersPageProps extends VariantProps<typeof UsersPageVariants> {
  mode?: 'light' | 'dark';
}

export function UsersPage({ mode, ...props }: UsersPageProps) {
  const [isManualRegisterModalOpen, setIsManualRegisterModalOpen] =
    useState(false);
  const [isBatchRegisterModalOpen, setIsBatchRegisterModalOpen] =
    useState(false);

  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState(Array<User>);
  const [users, setUsers] = useState(Array<User>);

  useEffect(() => {
    !isManualRegisterModalOpen &&
      !isBatchRegisterModalOpen &&
      Services.listUsers()
        .then((response) => {
          setUsers(response);
          setFilteredUsers(response);
        })
        .catch((error) => console.log(error));
  }, [isManualRegisterModalOpen, isBatchRegisterModalOpen]);

  const filterUsers = (e: any) => {
    setSearch(e.target.value);
    if (e.target.value == '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.firstName.includes(e.target.value) ||
            user.lastName.includes(e.target.value)
        )
      );
    }
  };

  return (
    <>
      <div className={UsersPageVariants({ mode })} {...props}>
        <Hero
          title="Usuários"
          description="Gerencie os professores e alunos do sistema."
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
          {filteredUsers && (
            <>
              {/* TODO: arrumar componente para ficar na tela inteira */}
              <Search
                className="search-bar"
                value={search}
                onChange={filterUsers}
              />
              <div className="user-table">
                <Table
                  clickable={true}
                  header={['Nome', 'Sobrenome', 'E-mail', 'Cargo']}
                >
                  {filteredUsers.map((user) => {
                    return (
                      <TableRow key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
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
    </>
  );
}
