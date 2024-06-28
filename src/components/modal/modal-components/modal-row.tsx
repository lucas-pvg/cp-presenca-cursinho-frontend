import { Children, ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import '../modal.css'

const modalRowVariants = cva(
  'modal-row',
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

interface modalRowProps 
  extends ComponentProps<'div'>, VariantProps<typeof modalRowVariants> {
    mode?: 'light' | 'dark'
    labels: Array<string>
}

export function ModalRow({ mode, labels, ...props }: modalRowProps) {
  return (
    <div className={modalRowVariants({ mode })}>
      {
        props.children && Children.map(props.children, (child, i) => {
          return (
            <div className='col' key={i}>
              <h6 className='title'>{labels[i]}</h6>
              <div className='description'>{child}</div>
            </div>
          )
        })
      }
    </div>
  )
}
