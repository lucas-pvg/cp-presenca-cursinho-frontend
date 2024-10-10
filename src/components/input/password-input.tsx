import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Icon } from '../icon/icon';
import './input.css';

const passwordInputVariants = cva('email-input input', {
  variants: {
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

interface passwordInputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof passwordInputVariants> {
  mode?: 'light' | 'dark';
}

export function PasswordInput({ mode, ...props }: passwordInputProps) {
  return (
    <div className={passwordInputVariants({ mode })}>
      <Icon className="input-icon" iconType="lock" size={16} />
      <input type="password" {...props} />
    </div>
  );
}
