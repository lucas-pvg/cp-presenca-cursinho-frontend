import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import './Table.css'

const TableRowVariants = cva(
  'table-row',
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

interface TableRowProps
  extends ComponentProps<'tr'>, VariantProps<typeof TableRowVariants> {
    mode?: 'light' | 'dark'
    clickable?: boolean
    data: Array<string>
}

export function TableRow({ data, mode, clickable, ...props }: TableRowProps) {
  return (
    <tr className={TableRowVariants({ mode, clickable })} {...props}>
      {data.map((d, i) => <td key={i}>{d}</td>)}
      <td className='icon'>{'>'}</td>
    </tr>
  )
}
