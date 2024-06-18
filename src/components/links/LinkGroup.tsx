import { cva, VariantProps } from 'class-variance-authority'
import { useLocation } from 'react-router-dom'
import { Links } from './Links'
import './Links.css'

const LinkGroupVariants = cva(
  'base-link-group',
  {
    variants: {
      variant: {
        vertical: 'vertical',
        horizontal: 'horizontal'
      }
    },
    defaultVariants: {
      variant: 'vertical',
    }
  }
)

interface LinkGroupProps
  extends VariantProps<typeof LinkGroupVariants> {
    variant?: 'vertical' | 'horizontal'
    mode?: 'light' | 'dark'
    labels: Array<string>
    paths: Array<string>
}

export function LinkGroup({ variant, mode, labels, paths }: LinkGroupProps) {
  const location = useLocation()

  return (
    <div className={LinkGroupVariants({ variant })}>
      {
        labels.map((label, i) => {
          return (
            <Links 
              mode={mode}
              to={paths[i]} 
              state={location.pathname === paths[i] ? 'active' : 'inactive'} 
              key={i}
            >
              {label}
            </Links>
          )
        })
      }
    </div>
  )
}