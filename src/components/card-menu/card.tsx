import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import './card.css';

const cardVariants = cva('base-card', {
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

interface CardProps
  extends ComponentProps<typeof Link>,
    VariantProps<typeof cardVariants> {
  mode?: 'light' | 'dark';
  label: string;
}

export function Card({ label, mode, ...props }: CardProps) {
  return (
    <Link className={cardVariants({ mode })} {...props}>
      <h5>{label}</h5>
    </Link>
  );
}
