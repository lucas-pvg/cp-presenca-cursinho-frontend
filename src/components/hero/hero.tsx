import { ComponentProps } from 'react';
import { Zombie } from '../cp-art/zombie/Zombie';
import './hero.css';

interface HeroProps extends ComponentProps<'div'> {
  title: string;
  description?: string;
  minimized?: boolean
}

export const Hero = ({ title, description, minimized=false,  ...props }: HeroProps) => {
  return (
    <div className={'base-hero'} {...props}>
      <div className="hero-text">
        <h3 className="hero-title">{title ?? 'Hero title'}</h3>
        { 
          description
          ? <p className="hero-description">{description}</p>
          : props.children
        }
      </div>

      { !minimized && <Zombie /> }
    </div>
  );
};
