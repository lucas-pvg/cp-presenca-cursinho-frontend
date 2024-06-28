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
import Clock from "../../assets/icons/style_guide/icon-clock.svg?react";
import File from "../../assets/icons/style_guide/icon-file.svg?react";
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
}

export const Icon = (props: IconProps) => {
  const classes = props.className ? `base-icon ${props.className}` : 'base-icon';

  switch (props.iconType) {
    case "activity" : return <Activity className={classes} />;
    case "airplay" : return <Airplay className={classes} />;
    case "alert-circle" : return <AlertCircle className={classes} />;
    case "alert-octagon" : return <AlertOctagon className={classes} />;
    case "alert-triangle" : return <AlertTriangle className={classes} />;
    case "align-center" : return <AlignCenter className={classes} />;
    case "align-justify" : return <AlignJustify className={classes} />;
    case "arrow-down-circle" : return <ArrowDownCircle className={classes} />;
    case "arrow-down-left" : return <ArrowDownLeft className={classes} />;
    case "arrow-down-right" : return <ArrowDownRight className={classes} />;
    case "arrow-down" : return <ArrowDown className={classes} />;
    case "arrow-left-circle" : return <ArrowLeftCircle className={classes} />;
    case "arrow-left" : return <ArrowLeft className={classes} />;
    case "arrow-right-circle" : return <ArrowRightCircle className={classes} />;
    case "arrow-right" : return <ArrowRight className={classes} />;
    case "book" : return <Book className={classes} />;
    case "calendar" : return <Calendar className={classes} />;
    case "chevron-down" : return <ChevronDown className={classes} />;
    case "chevrons-down" : return <ChevronsDown className={classes} />;
    case "chevron-left" : return <ChevronLeft className={classes} />
    case "chevrons-left" : return <ChevronsLeft className={classes} />;
    case "chevron-right" : return <ChevronRight className={classes} />
    case "chevrons-right" : return <ChevronsRight className={classes} />;
    case "chevron-up" : return <ChevronUp className={classes} />;
    case "chevrons-up" : return <ChevronsUp className={classes} />;
    case "clock" : return <Clock className={classes} />;
    case "file" : return <File className={classes} />;
    case "logout" : return <Logout className={classes} />;
    case "trash" : return <Trash className={classes} />;
    case "search" : return <Search className={classes} />;
    case "settings" : return <Settings className={classes} />;
    case "trending-up" : return <TrendingUp className={classes} />;
    case "user" : return <User className={classes} />;
    case "users" : return <Users className={classes} />;
    case "x" : return <X className={classes} />;
    case "x-circle" : return <XCircle className={classes} />;
  }
}
