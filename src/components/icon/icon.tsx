import Activity from "../../assets/icons/style_guide/icon-activity.svg?react";
import Airplay from "../../assets/icons/style_guide/icon-airplay.svg?react";
import AlertCircle from "../../assets/icons/style_guide/icon-alert-circle.svg?react";
import AlertOctagon from "../../assets/icons/style_guide/icon-alert-octagon.svg?react";
import AlertTriangle from "../../assets/icons/style_guide/icon-alert-triangle.svg?react";
import AlignCenter from "../../assets/icons/style_guide/icon-align-center.svg?react";
import AlignJustify from "../../assets/icons/style_guide/icon-align-justify.svg?react";
import ArrowDownCircle from "../../assets/icons/style_guide/icon-arrow-down-circle.svg?react";
import ArrowDownLeft from "../../assets/icons/style_guide/icon-arrow-down-left.svg?react";
import ArrowDownRight from "../../assets/icons/style_guide/icon-arrow-down-right.svg?react";
import ArrowDown from "../../assets/icons/style_guide/icon-arrow-down.svg?react";
import ArrowLeftCircle from "../../assets/icons/style_guide/icon-arrow-left-circle.svg?react";
import ArrowLeft from "../../assets/icons/style_guide/icon-arrow-left.svg?react";
import ArrowRightCircle from "../../assets/icons/style_guide/icon-arrow-right-circle.svg?react";
import ArrowRight from "../../assets/icons/style_guide/icon-arrow-right.svg?react";
import AtSign from '../../assets/icons/style_guide/icon-at-sign.svg?react';
import Book from "../../assets/icons/style_guide/icon-book.svg?react";
import Calendar from "../../assets/icons/style_guide/icon-calendar.svg?react";
import ChevronDown from "../../assets/icons/style_guide/icon-chevron-down.svg?react";
import ChevronsDown from "../../assets/icons/style_guide/icon-chevrons-down.svg?react";
import ChevronLeft from "../../assets/icons/style_guide/icon-chevron-left.svg?react";
import ChevronsLeft from "../../assets/icons/style_guide/icon-chevrons-left.svg?react";
import ChevronRight from "../../assets/icons/style_guide/icon-chevron-right.svg?react";
import ChevronsRight from "../../assets/icons/style_guide/icon-chevrons-right.svg?react";
import ChevronUp from "../../assets/icons/style_guide/icon-chevron-up.svg?react";
import ChevronsUp from "../../assets/icons/style_guide/icon-chevrons-up.svg?react";
import Clipboard from "../../assets/icons/style_guide/icon-clipboard.svg?react";
import Clock from "../../assets/icons/style_guide/icon-clock.svg?react";
import Coffee from "../../assets/icons/style_guide/icon-coffee.svg?react";
import File from "../../assets/icons/style_guide/icon-file.svg?react";
import Lock from "../../assets/icons/style_guide/icon-lock.svg?react";
import Logout from "../../assets/icons/style_guide/icon-log-out.svg?react";
import Trash from "../../assets/icons/style_guide/icon-trash.svg?react";
import Search from "../../assets/icons/style_guide/icon-search.svg?react";
import Settings from "../../assets/icons/style_guide/icon-settings.svg?react";
import TrendingUp from "../../assets/icons/style_guide/icon-trending-up.svg?react";
import User from "../../assets/icons/style_guide/icon-user.svg?react";
import Users from "../../assets/icons/style_guide/icon-users.svg?react";
import X from "../../assets/icons/style_guide/icon-x.svg?react";
import XCircle from "../../assets/icons/style_guide/icon-x-circle.svg?react";

import { MouseEventHandler } from "react";
import './icon.css'

interface IconProps {
  id?: string;
  className?: string;
  iconType: string;
  size?: number;
  onClick?: MouseEventHandler;
}

export const Icon = (props: IconProps) => {
  const classes = props.className
    ? `base-icon ${props.className}`
    : 'base-icon';

  switch (props.iconType) {
    case "activity" : return <Activity id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "airplay" : return <Airplay id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "alert-circle" : return <AlertCircle id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "alert-octagon" : return <AlertOctagon id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "alert-triangle" : return <AlertTriangle id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "align-center" : return <AlignCenter id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "align-justify" : return <AlignJustify id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-down-circle" : return <ArrowDownCircle id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-down-left" : return <ArrowDownLeft id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-down-right" : return <ArrowDownRight id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-down" : return <ArrowDown id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-left-circle" : return <ArrowLeftCircle id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-left" : return <ArrowLeft id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-right-circle" : return <ArrowRightCircle id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "arrow-right" : return <ArrowRight id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case 'at-sign': return <AtSign id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "book" : return <Book id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "calendar" : return <Calendar id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "chevron-down" : return <ChevronDown id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "chevrons-down" : return <ChevronsDown id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "chevron-left" : return <ChevronLeft id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />
    case "chevrons-left" : return <ChevronsLeft id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "chevron-right" : return <ChevronRight id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />
    case "chevrons-right" : return <ChevronsRight id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "chevron-up" : return <ChevronUp id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "chevrons-up" : return <ChevronsUp id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "clipboard" : return <Clipboard id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "clock" : return <Clock id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "coffee" : return <Coffee id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "file" : return <File id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "lock" : return <Lock id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "logout" : return <Logout id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "trash" : return <Trash id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "search" : return <Search id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "settings" : return <Settings id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "trending-up" : return <TrendingUp id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "user" : return <User id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "users" : return <Users id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "x" : return <X id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
    case "x-circle" : return <XCircle id={props.id} style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} onClick={props.onClick} />;
  }
};
