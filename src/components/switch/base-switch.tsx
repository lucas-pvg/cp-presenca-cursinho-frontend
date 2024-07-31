import { useState } from 'react';
import './base-switch.css'; // Arquivo CSS para estilização

export const BaseSwitch = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <label className={`base-switch ${isActive ? 'active' : ''}`} onClick={toggleSwitch}>
      <input type="checkbox" onClick={(e) => e.stopPropagation()}/>
      <span className="base-slider">
      </span>
    </label>
  );
}

