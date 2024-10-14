import { cva, VariantProps } from 'class-variance-authority';
import { IconCP } from '../cp-art/IconCP';
import { LinkGroup } from '../links/LinkGroup';
import { Reading } from '../cp-art/reading/Reading';
import './Navbar.css';

const NavbarVariants = cva('base-navbar', {
  variants: {
    minimized: {
      true: 'minimized',
      false: 'expanded',
    },
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    minimized: false,
    mode: 'light',
  },
});

interface NavbarProps extends VariantProps<typeof NavbarVariants> {
  minimized?: boolean;
  mode?: 'light' | 'dark';
}

export function Navbar({ minimized, mode }: NavbarProps) {
  return (
    <nav className={NavbarVariants({ minimized, mode })}>
      <div className="nav-content">
        <div className="logo">
          <IconCP type="icon" />
        </div>

        <LinkGroup
          mode={mode}
          labels={[
            'Aulas',
            'Disciplinas',
            'Alunos',
            'Turmas',
            'Usuários',
            'Métricas',
          ]}
          paths={[
            '/',
            '/subject',
            '/students',
            '/classes',
            '/users',
            '/metrics',
          ]}
          iconTypes={[
            'book',
            'clipboard',
            'user',
            'users',
            'coffee',
            'trending-up',
          ]}
          iconSize={16}
        />
      </div>

      <Reading />
    </nav>
  );
}
