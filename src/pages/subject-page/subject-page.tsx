import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { Card } from '../../components/card-menu/card'

import { MainSubject } from '../../data/models/subject.model'
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
          {
            MainSubject.map((mainSubject, i) => <Card key={i} to={`/subject/${mainSubject.id}`} label={mainSubject.name} variant='primary' mode='light' />)
          }
        </div>
      </div>
    </div>
  )
}
