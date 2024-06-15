import { cva, VariantProps } from 'class-variance-authority'
import { LinkGroup } from '../links/LinkGroup'
import './Navbar.css'

const NavbarVariants = cva(
  'base-navbar',
  {
    variants: {
      minimized: {
        true: 'minimized',
        false: 'expanded'
      },
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      minimized: false,
      mode: 'light'
    }
  }
)

interface NavbarProps extends VariantProps<typeof NavbarVariants> {
  minimized?: boolean,
  mode?: 'light' | 'dark'
}

export function Navbar({ minimized, mode }: NavbarProps) {
  return (
    <nav className={NavbarVariants({ minimized, mode })}>
      <div className='nav-content'>
        <div className='logo' />

        <LinkGroup
          mode={mode}
          labels={['Aulas', 'Presença', 'Professores', 'Turmas', 'Métricas']}
          paths={['/', '/attendence', '/teachers', '/classes', '/metrics']}
        />
      </div>

      <div className='nav-image'/>
    </nav>
  )
}
