import { To } from 'react-router-dom';
import { Icon } from '../../icon/icon';

import './dropdown-item.css';

interface DropDownItemProps {
  icon: string;
  body: string;
  to?: To;
}

export const DropDownItem = (props: DropDownItemProps) => {
  return (
    <div className="item-container">
      <Icon
        className="dropdown-icon"
        iconType={props.icon}
        to={props.to ? props.to : ''}
        size={14}
      />
      <p className="body">{props.body}</p>
    </div>
  );
};
