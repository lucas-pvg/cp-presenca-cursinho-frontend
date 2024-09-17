import { ComponentProps, useState } from 'react';
import { To, Link } from 'react-router-dom';
import { Switch } from '../switch/switch';
import './header.css';

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

      <Link to={to}>
        <h1>{'Topo da página'}</h1>
      </Link>
    </header>
  );
};
