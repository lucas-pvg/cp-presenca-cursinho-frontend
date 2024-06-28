import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import './Table.css'

const TableHeaderVariants = cva(
  'table-header',
  {
    variants: {
      clickable: {
        true: 'click',
        false: 'not-click'
      },
      mode: {
        light: 'light',
        dark: 'dark',
      }
    },
    defaultVariants: {
      mode: 'light',
      clickable: true
    }
  }
)

interface TableHeaderProps
  extends ComponentProps<'thead'>, VariantProps<typeof TableHeaderVariants> {
    mode?: 'light' | 'dark'
    clickable?: boolean
    headers: Array<string>
}

export function TableHeader({ mode, clickable, headers, ...props }: TableHeaderProps) {
  return (
    <thead className={TableHeaderVariants({ mode, clickable })} {...props}>
      <tr>
        {headers.map((h, i) => <th key={i}>{h}</th>)}
        <td className='icon'></td>
      </tr>
    </thead>
  )
}
