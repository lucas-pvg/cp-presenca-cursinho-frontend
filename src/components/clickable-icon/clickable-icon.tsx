import Activity from '../../assets/icons/style_guide/icon-activity.svg?react';
import Airplay from '../../assets/icons/style_guide/icon-airplay.svg?react';
import AlertCircle from '../../assets/icons/style_guide/icon-alert-circle.svg?react';
import AlertOctagon from '../../assets/icons/style_guide/icon-alert-octagon.svg?react';
import AlertTriangle from '../../assets/icons/style_guide/icon-alert-triangle.svg?react';
import AlignCenter from '../../assets/icons/style_guide/icon-align-center.svg?react';
import AlignJustify from '../../assets/icons/style_guide/icon-align-justify.svg?react';
import ArrowDownCircle from '../../assets/icons/style_guide/icon-arrow-down-circle.svg?react';
import ArrowDownLeft from '../../assets/icons/style_guide/icon-arrow-down-left.svg?react';
import ArrowDownRight from '../../assets/icons/style_guide/icon-arrow-down-right.svg?react';
import ArrowDown from '../../assets/icons/style_guide/icon-arrow-down.svg?react';
import ArrowLeftCircle from '../../assets/icons/style_guide/icon-arrow-left-circle.svg?react';
import ArrowLeft from '../../assets/icons/style_guide/icon-arrow-left.svg?react';
import ArrowRightCircle from '../../assets/icons/style_guide/icon-arrow-right-circle.svg?react';
import ArrowRight from '../../assets/icons/style_guide/icon-arrow-right.svg?react';
import Book from '../../assets/icons/style_guide/icon-book.svg?react';
import Calendar from '../../assets/icons/style_guide/icon-calendar.svg?react';
import ChevronDown from '../../assets/icons/style_guide/icon-chevron-down.svg?react';
import ChevronsDown from '../../assets/icons/style_guide/icon-chevrons-down.svg?react';
import ChevronLeft from '../../assets/icons/style_guide/icon-chevron-left.svg?react';
import ChevronsLeft from '../../assets/icons/style_guide/icon-chevrons-left.svg?react';
import ChevronRight from '../../assets/icons/style_guide/icon-chevron-right.svg?react';
import ChevronsRight from '../../assets/icons/style_guide/icon-chevrons-right.svg?react';
import ChevronUp from '../../assets/icons/style_guide/icon-chevron-up.svg?react';
import ChevronsUp from '../../assets/icons/style_guide/icon-chevrons-up.svg?react';
import Clock from '../../assets/icons/style_guide/icon-clock.svg?react';
import Coffee from "../../assets/icons/style_guide/icon-coffee.svg?react";
import File from '../../assets/icons/style_guide/icon-file.svg?react';
import Logout from '../../assets/icons/style_guide/icon-log-out.svg?react';
import Trash from '../../assets/icons/style_guide/icon-trash.svg?react';
import Search from '../../assets/icons/style_guide/icon-search.svg?react';
import Settings from '../../assets/icons/style_guide/icon-settings.svg?react';
import TrendingUp from '../../assets/icons/style_guide/icon-trending-up.svg?react';
import User from '../../assets/icons/style_guide/icon-user.svg?react';
import Users from '../../assets/icons/style_guide/icon-users.svg?react';
import X from '../../assets/icons/style_guide/icon-x.svg?react';
import XCircle from '../../assets/icons/style_guide/icon-x-circle.svg?react';

import { Link, To } from 'react-router-dom';
import './clickable-icon.css';

interface ClickableIconProps {
  className?: string;
  iconType: string;
  to: To;
}

export const ClickableIcon = (props: ClickableIconProps) => {
  const classes = props.className
    ? `clickable-icon ${props.className}`
    : 'clickable-icon';

  switch (props.iconType) {
    case 'activity':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Activity className={classes} />
        </Link>
      );
    case 'airplay':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Airplay className={classes} />
        </Link>
      );
    case 'alert-circle':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <AlertCircle className={classes} />
        </Link>
      );
    case 'alert-octagon':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <AlertOctagon className={classes} />
        </Link>
      );
    case 'alert-triangle':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <AlertTriangle className={classes} />
        </Link>
      );
    case 'align-center':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <AlignCenter className={classes} />
        </Link>
      );
    case 'align-justify':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <AlignJustify className={classes} />
        </Link>
      );
    case 'arrow-down-circle':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowDownCircle className={classes} />
        </Link>
      );
    case 'arrow-down-left':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowDownLeft className={classes} />
        </Link>
      );
    case 'arrow-down-right':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowDownRight className={classes} />
        </Link>
      );
    case 'arrow-down':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowDown className={classes} />
        </Link>
      );
    case 'arrow-left-circle':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowLeftCircle className={classes} />
        </Link>
      );
    case 'arrow-left':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowLeft className={classes} />
        </Link>
      );
    case 'arrow-right-circle':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowRightCircle className={classes} />
        </Link>
      );
    case 'arrow-right':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ArrowRight className={classes} />
        </Link>
      );
    case 'book':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Book className={classes} />
        </Link>
      );
    case 'calendar':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Calendar className={classes} />
        </Link>
      );
    case 'chevron-down':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronDown className={classes} />
        </Link>
      );
    case 'chevrons-down':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronsDown className={classes} />
        </Link>
      );
    case 'chevron-left':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronLeft className={classes} />
        </Link>
      );
    case 'chevrons-left':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronsLeft className={classes} />
        </Link>
      );
    case 'chevron-right':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronRight className={classes} />
        </Link>
      );
    case 'chevrons-right':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronsRight className={classes} />
        </Link>
      );
    case 'chevron-up':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronUp className={classes} />
        </Link>
      );
    case 'chevrons-up':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <ChevronsUp className={classes} />
        </Link>
      );
    case 'clock':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Clock className={classes} />
        </Link>
      );
    case "coffee": return (
      <Link className="clickable-icon-container" to={props.to}>
        <Coffee className={classes} />;
      </Link>
    );
    case 'file':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <File className={classes} />
        </Link>
      );
    case 'logout':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Logout className={classes} />
        </Link>
      );
    case 'trash':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Trash className={classes} />
        </Link>
      );
    case 'search':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Search className={classes} />
        </Link>
      );
    case 'settings':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Settings className={classes} />
        </Link>
      );
    case 'trending-up':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <TrendingUp className={classes} />
        </Link>
      );
    case 'user':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <User className={classes} />
        </Link>
      );
    case 'users':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <Users className={classes} />
        </Link>
      );
    case 'x':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <X className={classes} />
        </Link>
      );
    case 'x-circle':
      return (
        <Link className="clickable-icon-container" to={props.to}>
          <XCircle className={classes} />
        </Link>
      );
  }
};
