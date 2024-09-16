import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Icon } from '../icon/icon';
import './select-input.css';

const selectInputVariants = cva('select-input', {
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

interface selectInputProps
  extends ComponentProps<'select'>,
    VariantProps<typeof selectInputVariants> {
  mode?: 'light' | 'dark';
  placeholder?: string;
}

export function SelectInput({
  mode,
  placeholder,
  label,
  ...props
}: selectInputProps) {
  return (
    <div className={selectInputVariants({ mode })}>
      <select {...props}>
        {placeholder && (
          <option disabled value="default">
            {placeholder}
          </option>
        )}
        {props.children}
      </select>
      <Icon className="input-icon" iconType="chevron-down" size={16} />
    </div>
  );
}
