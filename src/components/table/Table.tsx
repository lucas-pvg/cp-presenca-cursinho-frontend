import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import './Table.css'

const TableVariants = cva(
  'base-table',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark',
      }
    },
    defaultVariants: {
      mode: 'light',
    }
  }
)

interface TableProps 
  extends ComponentProps<'table'>,  VariantProps<typeof TableVariants> {
    mode?: 'light' | 'dark'
    clickable?: boolean
    header: Array<string>
    data: Array<Array<string>>
}

export function Table({ mode, clickable, header, data, ...props }: TableProps) {
  return (
    <table className={TableVariants({ mode })} {...props}>
      <TableHeader mode={mode} clickable={clickable} headers={header} />

      {
        data.map((row, i) => {
          return (
            <TableRow mode={mode} clickable={clickable} data={row} key={i} />
          )
        })
      }
    </table>
  )
}
