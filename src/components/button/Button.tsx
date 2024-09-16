import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Link, To } from 'react-router-dom';
import './Button.css';

const ButtonVariants = cva('base-button', {
  variants: {
    variant: {
      solid: 'solid',
      outline: 'outline',
    },
    mode: {
      dark: 'dark',
      light: 'light',
    },
    fullWidth: {
      true: 'full-width',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
    mode: 'light',
    fullWidth: false,
  },
});

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof ButtonVariants> {
  to?: To;
  variant?: 'solid' | 'outline';
  mode?: 'light' | 'dark';
  fullWidth?: boolean;
}

export function Button({
  to,
  variant,
  mode,
  fullWidth,
  ...props
}: ButtonProps) {
  if (to) {
    return (
      <Link to={to}>
        <button
          className={ButtonVariants({ variant, mode, fullWidth })}
          {...props}
        />
      </Link>
    );
  } else
    return (
      <button
        className={ButtonVariants({ variant, mode, fullWidth })}
        {...props}
      />
    );
}
