import { ComponentProps } from 'react';
import { Zombie } from '../cp-art/zombie/Zombie';
import './hero.css';

interface HeroProps extends ComponentProps<'div'> {
  title: string;
  description?: string;
}

export const Hero = ({ title, description, ...props }: HeroProps) => {
  return (
    <div className={'base-hero'} {...props}>
      <div className='hero-text'>
        <h3 className='hero-title'>{title ?? 'Hero title'}</h3>
        {description && <p className='hero-description'>{description}</p>}
      </div>

      <Zombie />
    </div>
  )
}