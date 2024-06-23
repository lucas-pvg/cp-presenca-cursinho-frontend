import { cva, VariantProps } from 'class-variance-authority'
import { Link, To } from 'react-router-dom';
import './header.css';
import { ComponentProps } from 'react';
import { Switch } from '../switch/switch';

const HeaderVariants = cva(
    'base-header',
    {
        variants: {
        variant: {
            solid: 'solid',
            outline: 'outline'
        },
        mode: {
            dark: 'dark',
            light: 'light'
        }
        },
        defaultVariants: {
        variant: 'solid',
        mode: 'light'
        }
    }
)

interface HeaderProps extends ComponentProps<'header'>, VariantProps<typeof HeaderVariants> {
    title?: string;
    subtitle?: string;
    to: To 
    variant?: 'solid' | 'outline'
    mode?: 'light' | 'dark'
}


export const Header = ({ title, to, subtitle, variant, mode, ...props }: HeaderProps) => {
    return (
        <header className={HeaderVariants({variant, mode})} {...props}>
            <div className='first-row'>
                 <div className='toggle'>
                    <Switch />
                </div>
                <div className='profile'>
                    <Link to={to}>
                        <h1>{'Topo da página'}</h1>
                    </Link>
                </div>
            </div>
            <div className='second-row'>
                <h1 className='header-title'>{title}</h1>
                <h4 className='header-subtitle'>{subtitle}</h4>
            </div>
           
        </header>
    )
}