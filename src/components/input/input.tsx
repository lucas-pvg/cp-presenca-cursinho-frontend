import { ComponentProps } from 'react'
import { TextInput } from './text-input'
import { DateInput } from './date-input'
import { TimeInput } from './time-input'
import { SelectInput } from './select-input'
import './input.css'

interface inputProps extends ComponentProps<'input'> {
  mode?: 'light' | 'dark'
  type: 'text' | 'date' | 'time' | 'select'
}

export function Input({ mode, type, ...props }: inputProps) {
  switch(type) {
    case 'text':   return <TextInput mode={mode} {...props} />
    case 'date':   return <DateInput mode={mode} {...props} />
    case 'time':   return <TimeInput mode={mode} {...props} />
    case 'select': return <SelectInput mode={mode} {...props} />
  }
}
