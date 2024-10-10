import { ComponentProps } from 'react';
import { TextInput } from './text-input';
import { DateInput } from './date-input';
import { TimeInput } from './time-input';
import { EmailInput } from './email-input';

import './input.css';
import { PasswordInput } from './password-input';

interface inputProps extends ComponentProps<'input'> {
  mode?: 'light' | 'dark';
  type: 'text' | 'date' | 'time' | 'select' | 'email' | 'password';
  names?: Array<string>;
  values?: Array<string>;
  label?: string;
}

export function Input({
  mode,
  type,
  names,
  values,
  label,
  ...props
}: inputProps) {
  return (
    <div className="input-container">
      {label && <h5>{label}</h5>}

      {type == 'text' && <TextInput mode={mode} {...props} />}
      {type == 'date' && <DateInput mode={mode} {...props} />}
      {type == 'time' && (
        <TimeInput names={names} values={values} mode={mode} {...props} />
      )}
      {type == 'email' && <EmailInput mode={mode} {...props} />}
      {type == 'password' && <PasswordInput mode={mode} {...props} />}
    </div>
  );
}
