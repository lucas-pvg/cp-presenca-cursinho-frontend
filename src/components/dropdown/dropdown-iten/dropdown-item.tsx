import { To } from "react-router-dom";
import { Icon } from "../../icon/icon";

import './dropdown-item.css';

interface DropDownItemProps {
    icon: string;
    body: string;
    to?: To;
}

export const DropDownItem = (props: DropDownItemProps) => {
    return (
        <div className="item-container">
            <Icon iconType={props.icon} to={props.to ? props.to : ''} />
            <p className="body">{props.body}</p>
        </div>
    );
}