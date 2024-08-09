import './switch.css'; // Arquivo CSS para estilização
import { FaSun, FaMoon } from 'react-icons/fa'; // Importa os ícones do React Icons
import { cva } from 'class-variance-authority';
import { IconType } from 'react-icons';

const switchVariants = cva(
  'switch',
  {
    variants: {
      type: {
        base: 'base',
        darkMode: 'night-mode'
      },
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      mode: 'light',
      type: 'base'
    }
  }
);

interface SwitchProps {
  mode?: 'light' | 'dark';
  type?: 'base' | 'darkMode'
  isActive: boolean;
  handleChange: () => void;
}

const getSwitchIcon = (isActive: boolean, type?: string): IconType => {
  switch(type) {
    case 'darkMode': 
      return isActive ? FaMoon : FaSun;
    default: 
      return isActive ? FaMoon : FaSun;
  }
}

export const Switch = ({mode, type, isActive, handleChange, ...props}: SwitchProps) => {
  const SwitchIcon = getSwitchIcon(isActive, type); 

  return (
    <label className={`${switchVariants({ mode, type })} ${isActive ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" onClick={handleChange}/>
      <span className="slider" {...props}>
        {type !== 'base' && (
          <span className='icon-container'>
            <SwitchIcon className='icon'/>
          </span>
        )}
      </span>
    </label>
  );
}

