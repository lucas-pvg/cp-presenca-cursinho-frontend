import { ComponentProps } from 'react';
import './card.css';

interface cardMenuProps extends ComponentProps<'div'> {
  className?: string;
}

export function CardMenu({ className, ...props }: cardMenuProps) {
  const classes = className ? `${className} card-menu` : 'card-menu';

  return <div className={classes} {...props} />;
}
