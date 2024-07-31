import { useState } from 'react';
import './switch.css'; // Arquivo CSS para estilização
import { FaSun, FaMoon } from 'react-icons/fa'; // Importa os ícones do React Icons

export const Switch = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <label className={`switch ${isActive ? 'active' : ''}`} onClick={toggleSwitch}>
      <input type="checkbox" onClick={(e) => e.stopPropagation()}/>
      <span className="slider">
        <span className='icon-container'>
        {isActive ? <FaMoon className="icon" /> : <FaSun className="icon" />}
        </span>
      </span>
    </label>
  );
}

