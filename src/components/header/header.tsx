import { ComponentProps } from 'react';
import { To, Link } from 'react-router-dom';
import { Switch } from '../switch/switch';
import './header.css';

interface HeaderProps extends ComponentProps<'header'> {
  to: To
}

export const Header = ({ to, ...props }: HeaderProps) => {
  return (
    <header className='base-header' {...props}>
      <Switch />

      <Link to={to}>
          <h1>{'Topo da página'}</h1>
      </Link>
    </header>
  )
}
