import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import './Table.css'

const TableFooterVariants = cva(
  'table-footer',
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

interface TableFooterProps
  extends ComponentProps<'tfoot'>, VariantProps<typeof TableFooterVariants> {
    mode?: 'light' | 'dark'
    page: number
    setPage: Function
    maxPage: number
}

export function TableFooter({ mode, page, setPage, maxPage, ...props }: TableFooterProps) {
  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const firstPage = () => {
    setPage(1)
  }

  const lastPage = () => {
    setPage(maxPage)
  }

  return (
    <tfoot className={TableFooterVariants({ mode })} {...props}>
      <tr>
        <td colSpan={100}>
          <div className='footer-icons'>
            <div className='icon' onClick={firstPage}><span>{'<<'}</span></div>
            {
              page == 1
              ? <div className='icon'><span>{'<'}</span></div>
              : <div className='icon' onClick={prevPage}><span>{'<'}</span></div>
            }
            <div><span>Página {page} de {maxPage}</span></div>
            {
              page == maxPage
              ? <div className='icon'><span>{'>'}</span></div>
              : <div className='icon' onClick={nextPage}><span>{'>'}</span></div>
            }
            <div className='icon' onClick={lastPage}><span>{'>>'}</span></div>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}
