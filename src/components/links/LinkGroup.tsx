import { cva, VariantProps } from 'class-variance-authority'
import { Link } from './Link'
import './Link.css'

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
    mode: 'light' | 'dark'
    labels: Array<string>
    paths: Array<string>
}

export function LinkGroup({ variant, mode, labels, paths }: LinkGroupProps) {
  return (
    <div className={LinkGroupVariants({ variant })}>
      {
        labels.map((label, i) => {
          return (
            <Link mode={mode} key={i}>
              {label}
            </Link>
          )
        })
      }
    </div>
  )
}
