import { ComponentProps } from 'react'
import { TextInput } from './text-input'
import { DateInput } from './date-input'
import { TimeInput } from './time-input'
import { SelectInput } from './select-input'
import { EmailInput } from './email-input'

import './input.css'
import { PasswordInput } from './password-input'

interface inputProps extends ComponentProps<'input'> {
  mode?: 'light' | 'dark'
  type: 'text' | 'date' | 'time' | 'select' | 'email' | 'password'
  names?: Array<string>
  values?: Array<string>
}

export function Input({ mode, type, names, values, ...props }: inputProps) {
  switch(type) {
    case 'text':   return <TextInput mode={mode} {...props} />
    case 'select': return <SelectInput mode={mode} {...props} />
    case 'date':   return <DateInput mode={mode} {...props} />
    case 'time':   return <TimeInput names={names} values={values} mode={mode} {...props} />
    case 'email':  return <EmailInput mode={mode} {...props} />
    case 'password': return <PasswordInput mode={mode} {...props} />
  }
}
