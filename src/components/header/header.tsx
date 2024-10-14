import { ComponentProps, useState } from 'react';
import { To } from 'react-router-dom';
import { Switch } from '../switch/switch';
import './header.css';
import Services from '../../services';
import { toast } from 'react-toastify';

interface HeaderProps extends ComponentProps<'header'> {
  to: To;
}

export const Header = ({ to, ...props }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="base-header" {...props}>
      {/* TODO: adicionar dark mode */}
      <Switch
        isActive={isDarkMode}
        handleChange={() => {
          setIsDarkMode(!isDarkMode);
        }}
        type="darkMode"
      />

      <div
        onClick={() => {
          const refreshToken = localStorage.getItem('refresh');
          if (refreshToken) {
            Services.logout({ refresh: refreshToken })
              .then(() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/';
              })
              .catch(() => toast.error('Erro ao realizar logout'));
          } else {
            toast.error('Erro ao recuperar token de autenticação');
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <h1>{'Logout'}</h1>
      </div>
    </header>
  );
};
