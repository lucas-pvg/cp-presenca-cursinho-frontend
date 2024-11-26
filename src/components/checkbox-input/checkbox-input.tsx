import { ComponentProps, useState } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { CheckboxItem } from './checkbox-item';
import { Icon } from '../icon/icon';
import './checkbox-input.css'

const checkboxInputVariants = cva('checkbox-input', {
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

interface CheckboxInputProps 
  extends ComponentProps<'input'>, VariantProps<typeof checkboxInputVariants> {
  mode?: 'light' | 'dark'
  placeholder?: string
  title?: string
  objects: Array<any>
  label: string
  id: string
  selected: number[]
}

export function CheckboxInput({ mode, placeholder, title, objects, label, id, selected, ...props }: CheckboxInputProps) {
  const [ active, setActive ] = useState(false)

  return (
    <div className="input-container" >
      { title && <h5>{title}</h5> }

      <div 
        className={[checkboxInputVariants({ mode }), active && 'active'].join(' ')} 
        onClick={() => setActive(prev => !prev)}
      >
        { placeholder && <p>{ placeholder }</p> }
        <Icon className="input-icon" iconType="chevron-down" size={16} />
      </div>

      {
        active &&
        <div className='dropdown'>
          {
            objects.map(obj => {
              return (
                <CheckboxItem
                  label={obj[label]}
                  value={obj[id]}
                  checked={selected.includes(obj[id])}
                  key={obj[id]}
                  { ...props }   
                />
              )
            })
          }
        </div>
      }

    </div>
  )
}
