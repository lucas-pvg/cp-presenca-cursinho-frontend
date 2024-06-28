import { cva, VariantProps } from 'class-variance-authority'
import './hero.css';
import { ComponentProps } from 'react';
import HeroIcon from '../../assets/hero.svg';

const HeroVariants = cva(
    'base-hero',
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

interface HeroProps extends ComponentProps<'header'>, VariantProps<typeof HeroVariants> {
    variant?: 'solid' | 'outline'
    mode?: 'light' | 'dark'
    heroTitle: string;
    heroDescription?: string;
    withImage?: boolean;
}


export const Hero = ({ heroTitle, heroDescription, withImage, variant, mode, ...props }: HeroProps) => {
    return (
        <header className={HeroVariants({variant, mode})} {...props}>
            <div className='hero-text'>
                <h1 className='hero-title'>{heroTitle ?? 'Hero title'}</h1>
                {heroDescription && <p>{heroDescription}</p>}
            </div>
            {withImage && 
                <div className='hero-icon'>
                    <img src={HeroIcon}/>
                </div>
            }
            
        </header>
    )
}