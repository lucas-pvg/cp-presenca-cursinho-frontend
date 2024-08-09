import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon'
import './search.css'

const searchVariants = cva(
  'search',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      mode: 'light'
    }
  }
)

interface searchProps
  extends ComponentProps<'input'>, VariantProps<typeof searchVariants> {
    mode?: 'light' | 'dark'
}

export function Search({ mode, ...props }: searchProps) {
  return (
    <div className={searchVariants({ mode })}>
      <Icon className='input-icon' iconType='search' size={16} />
      <input type='text' {...props} />

      {/* <div onClick={}>
        <Icon className='clear-icon' iconType='x-circle' size={14} />
      </div> */}
    </div>
  )
}
