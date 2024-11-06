import { To, useNavigate } from 'react-router-dom';
import { Icon } from '../../icon/icon';

import './dropdown-item.css';

interface DropDownItemProps {
  icon: string;
  body: string;
  to?: To;
}

export const DropDownItem = (props: DropDownItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="item-container">
      <Icon
        className="dropdown-icon"
        iconType={props.icon}
        size={14}
        onClick={() => {
          navigate(props.to as string);
        }}
      />
      <p className="body">{props.body}</p>
    </div>
  );
};
