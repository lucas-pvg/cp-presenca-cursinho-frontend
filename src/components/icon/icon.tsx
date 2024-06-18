import { Link, To } from "react-router-dom";

import Activity from "../../assets/icons/style_guide/icon-activity.svg";
import Airplay from "../../assets/icons/style_guide/icon-airplay.svg";
import AlertCircle from "../../assets/icons/style_guide/icon-alert-circle.svg";
import AlertOctagon from "../../assets/icons/style_guide/icon-alert-octagon.svg";
import AlertTriangle from "../../assets/icons/style_guide/icon-alert-triangle.svg";
import AlignCenter from "../../assets/icons/style_guide/icon-align-center.svg";
import AlignJustify from "../../assets/icons/style_guide/icon-align-justify.svg";
import ArrowDownCircle from "../../assets/icons/style_guide/icon-arrow-down-circle.svg";
import ArrowDownLeft from "../../assets/icons/style_guide/icon-arrow-down-left.svg";
import ArrowDownRight from "../../assets/icons/style_guide/icon-arrow-down-right.svg";
import ArrowDown from "../../assets/icons/style_guide/icon-arrow-down.svg";
import ArrowLeftCircle from "../../assets/icons/style_guide/icon-arrow-left-circle.svg";
import ArrowLeft from "../../assets/icons/style_guide/icon-arrow-left.svg";
import ArrowRightCircle from "../../assets/icons/style_guide/icon-arrow-right-circle.svg";
import ArrowRight from "../../assets/icons/style_guide/icon-arrow-right.svg";
import ChevronLeft from "../../assets/icons/style_guide/icon-chevron-left.svg";
import ChevronRight from "../../assets/icons/style_guide/icon-chevron-right.svg";
import ChevronDown from "../../assets/icons/style_guide/icon-chevron-down.svg";
import File from "../../assets/icons/style_guide/icon-file.svg";
import IconBook from "../../assets/icons/style_guide/icon-book.svg";
import IconUsers from "../../assets/icons/style_guide/icon-users.svg";
import Logout from "../../assets/icons/style_guide/icon-log-out.svg";
import Trash from "../../assets/icons/style_guide/icon-trash.svg";
import Search from "../../assets/icons/style_guide/icon-search.svg";
import User from "../../assets/icons/style_guide/icon-user.svg";
import X from "../../assets/icons/style_guide/icon-x.svg";
import XCircle from "../../assets/icons/style_guide/icon-x-circle.svg";

interface IconProps {
    className?: string;
    iconType: string;
    to: To;
}

export const Icon = (props: IconProps) => {
    const classes = props.to ? `icon ${props.className}` : `icon disabled-link ${props.className}`;

    switch (props.iconType) {
        case "activity" : return <Link className={classes} to={props.to}><img src={Activity}/></Link>;
        case "airplay" : return <Link className={classes} to={props.to}><img src={Airplay}/></Link>;
        case "alert-circle" : return <Link className={classes} to={props.to}><img src={AlertCircle} /></Link>;
        case "alert-octagon" : return <Link className={classes} to={props.to}><img src={AlertOctagon} /></Link>;
        case "alert-triangle" : return <Link className={classes} to={props.to}><img src={AlertTriangle} /></Link>;
        case "align-center" : return <Link className={classes} to={props.to}><img src={AlignCenter} /></Link>;
        case "align-justify" : return <Link className={classes} to={props.to}><img src={AlignJustify} /></Link>;
        case "arrow-down-circle" : return <Link className={classes} to={props.to}><img src={ArrowDownCircle} /></Link>;
        case "arrow-down-left" : return <Link className={classes} to={props.to}><img src={ArrowDownLeft} /></Link>;
        case "arrow-down-right" : return <Link className={classes} to={props.to}><img src={ArrowDownRight} /></Link>;
        case "arrow-down" : return <Link className={classes} to={props.to}><img src={ArrowDown} /></Link>;
        case "arrow-left-circle" : return <Link className={classes} to={props.to}><img src={ArrowLeftCircle} /></Link>;
        case "arrow-left" : return <Link className={classes} to={props.to}><img src={ArrowLeft} /></Link>;
        case "arrow-right-circle" : return <Link className={classes} to={props.to}><img src={ArrowRightCircle} /></Link>;
        case "arrow-right" : return <Link className={classes} to={props.to}><img src={ArrowRight} /></Link>;
        case "chevron-left" : return <Link className={classes} to={props.to}><img src={ChevronLeft} /></Link>
        case "chevron-right" : return <Link className={classes} to={props.to}><img src={ChevronRight} /></Link>
        case "chevron-down" : return <Link className={classes} to={props.to}><img src={ChevronDown} /></Link>
        case "file" : return <Link className={classes} to={props.to}><img src={File} /></Link>
        case "icon-book" : return <Link className={classes} to={props.to}><img src={IconBook}/></Link>
        case "icon-users" : return <Link className={classes} to={props.to}><img src={IconUsers}/></Link>
        case "logout" : return <Link className={classes} to={props.to}><img src={Logout} /></Link>
        case "trash" : return <Link className={classes} to={props.to}><img src={Trash} /></Link>
        case "search" : return <Link className={classes} to={props.to}><img src={Search} /></Link>
        case "user" : return <Link className={classes} to={props.to}><img src={User} /></Link>
        case "x" : return <Link className={classes} to={props.to}><img src={X}/></Link>
        case "x-circle" : return <Link className={classes} to={props.to}><img src={XCircle} /></Link>
    }
}