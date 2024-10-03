import { ComponentProps } from 'react';
import { TextInput } from './text-input';
import { DateInput } from './date-input';
import { TimeInput } from './time-input';
import { SelectInput } from './select-input';
import './input.css';

interface inputProps extends ComponentProps<'input'> {
  mode?: 'light' | 'dark'
  type: 'text' | 'date' | 'time' | 'select'
  names?: Array<string>
  values?: Array<string>
  label?: string
}

export function Input({ mode, type, names, values, label, ...props }: inputProps) {
  return (
    <div className='input-container'>
      {
        label && <h5>{label}</h5>
      }
      
      { type == 'text' && <TextInput mode={mode} {...props} /> }
      { type == 'select' && <SelectInput mode={mode} {...props} /> }
      { type == 'date' &&   <DateInput mode={mode} {...props} /> }
      { type == 'time' &&   <TimeInput names={names} values={values} mode={mode} {...props} /> }
    </div>
  )
}
