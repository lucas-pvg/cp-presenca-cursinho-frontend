import { cva, VariantProps } from 'class-variance-authority';
import { DropDownItem } from './dropdown-iten/dropdown-item';
import './dropdown.css';
import { ComponentProps } from 'react';

const DropDownVariants = cva('base-dropdown', {
  variants: {
    mode: {
      dark: 'dark',
      light: 'light',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

interface DropDownProps
  extends ComponentProps<'div'>,
    VariantProps<typeof DropDownVariants> {
  mode?: 'light' | 'dark';
}

export const DropDown = ({ mode, ...props }: DropDownProps) => {
  return (
    <div className={DropDownVariants({ mode })} {...props}>
      <ul className="dropdown-list">
        <DropDownItem icon={'icon-book'} body={'Meu perfil'} />
        <DropDownItem icon={'icon-users'} body={'Trocar de conta'} />
        <DropDownItem icon={'icon-users'} body={'Logout'} />
      </ul>
    </div>
  );
};
