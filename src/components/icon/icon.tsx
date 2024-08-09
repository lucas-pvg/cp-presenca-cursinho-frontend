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

import './icon.css'

interface IconProps {
  className?: string;
  iconType: string;
  size?: number;
}

export const Icon = (props: IconProps) => {
  const classes = props.className ? `base-icon ${props.className}` : 'base-icon';

  switch (props.iconType) {
    case "activity" : return <Activity style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "airplay" : return <Airplay style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "alert-circle" : return <AlertCircle style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "alert-octagon" : return <AlertOctagon style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "alert-triangle" : return <AlertTriangle style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "align-center" : return <AlignCenter style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "align-justify" : return <AlignJustify style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-down-circle" : return <ArrowDownCircle style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-down-left" : return <ArrowDownLeft style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-down-right" : return <ArrowDownRight style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-down" : return <ArrowDown style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-left-circle" : return <ArrowLeftCircle style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-left" : return <ArrowLeft style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-right-circle" : return <ArrowRightCircle style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "arrow-right" : return <ArrowRight style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "book" : return <Book style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "calendar" : return <Calendar style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "chevron-down" : return <ChevronDown style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "chevrons-down" : return <ChevronsDown style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "chevron-left" : return <ChevronLeft style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />
    case "chevrons-left" : return <ChevronsLeft style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "chevron-right" : return <ChevronRight style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />
    case "chevrons-right" : return <ChevronsRight style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "chevron-up" : return <ChevronUp style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "chevrons-up" : return <ChevronsUp style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "clipboard" : return <Clipboard style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "clock" : return <Clock style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "file" : return <File style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "lock" : return <Lock style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "logout" : return <Logout style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "trash" : return <Trash style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "search" : return <Search style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "settings" : return <Settings style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "trending-up" : return <TrendingUp style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "user" : return <User style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "users" : return <Users style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "x" : return <X style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
    case "x-circle" : return <XCircle style={{ width: props.size || '24px', height: props.size || '24px' }} className={classes} />;
  }
}
