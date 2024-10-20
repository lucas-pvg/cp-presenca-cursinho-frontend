import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { Links } from '../links/Links';

// import { Switch } from '../switch/switch';
import './header.css';

interface HeaderProps extends ComponentProps<'header'> {
  onLogout: () => void
}

export const Header = ({ onLogout, ...props }: HeaderProps) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate()
  const handleLoggout = () => {
    onLogout && onLogout()
    navigate('/')
  }

  return (
    <header className="base-header" {...props}>
      {/* TODO: adicionar dark mode */}
      {/* <Switch
        isActive={isDarkMode}
        handleChange={() => {
          setIsDarkMode(!isDarkMode);
        }}
        type="darkMode"
      /> */}

      <Links
        mode='dark'
        to={'/'}
        iconType='logout'
        iconSize={16}
        state='inactive'
        onClick={handleLoggout}
      >
        <p>Logout</p>
      </Links>
    </header>
  );
};
