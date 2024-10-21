import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import './Table.css';

const TableRowVariants = cva('table-row', {
  variants: {
    clickable: {
      true: 'click',
      false: 'not-click',
    },
    disabled: {
      true: 'disabled',
      false: 'enabled'
    },
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    mode: 'light',
    clickable: true,
    disabled: false
  },
});

interface TableRowProps
  extends ComponentProps<'tr'>,
    VariantProps<typeof TableRowVariants> {
  mode?: 'light' | 'dark';
  clickable?: boolean;
}

export function TableRow({ mode, clickable, disabled, ...props }: TableRowProps) {
  return (
    <tr className={TableRowVariants({ mode, clickable, disabled })} {...props}>
      {props.children}
      <td className="icon">{'>'}</td>
    </tr>
  );
}
