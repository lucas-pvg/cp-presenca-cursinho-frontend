import { Children, ComponentProps, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { TableHeader } from './TableHeader';
import { TableFooter } from './TableFooter';
import './Table.css';

const TableVariants = cva('base-table', {
  variants: {
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

interface TableProps
  extends ComponentProps<'table'>,
    VariantProps<typeof TableVariants> {
  mode?: 'light' | 'dark';
  clickable?: boolean;
  header: Array<string>;
  onClick?: () => void;
}

export function Table({
  mode,
  clickable,
  header,
  onClick,
  ...props
}: TableProps) {
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(Children.count(props.children) / 10);

  return (
    <table className={TableVariants({ mode })} {...props}>
      <TableHeader mode={mode} clickable={clickable} headers={header} />

      <tbody>
        {Children.toArray(props.children).slice((page - 1) * 10, page * 10)}
      </tbody>

      <TableFooter
        mode={mode}
        page={page}
        setPage={setPage}
        maxPage={maxPage}
      />
    </table>
  );
}
