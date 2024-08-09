import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { Card } from '../../components/card-menu/card'
import './subject-page.css'

const SubjectPageVariants = cva(
  'subject page',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      mode: 'light'
    }
  }
)

interface SubjectPageProps extends VariantProps<typeof SubjectPageVariants> {
  mode?: 'light' | 'dark'
}

export function SubjectPage({ mode, ...props }: SubjectPageProps) {
  return (
    <div className={SubjectPageVariants({ mode })} {...props}>
      <Hero 
        title='Disciplinas'
        description='Crie, edite e gerencie suas diferentes frentes e a frequência das suas aulas.'
      />

      <div className='page-content'>
        <div className='subject-grid'>
          <Card to='/subject/CA' label='Atualidades' variant='primary' mode='light' />
          <Card to='/subject/BI' label='Biologia' variant='primary' mode='light' />
          <Card to='/subject/PL' label='Filosofia' variant='primary' mode='light' />
          <Card to='/subject/PH' label='Física' variant='primary' mode='light' />
          <Card to='/subject/GE' label='Geografia' variant='primary' mode='light' />
          <Card to='/subject/HI' label='História' variant='primary' mode='light' />
          <Card to='/subject/MT' label='Matemática' variant='primary' mode='light' />
          <Card to='/subject/PT' label='Português' variant='primary' mode='light' />
          <Card to='/subject/CH' label='Química' variant='primary' mode='light' />
        </div>
      </div>
    </div>
  )
}
