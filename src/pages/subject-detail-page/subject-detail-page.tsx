import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { Card } from '../../components/card-menu/card'
import { Button } from '../../components/button/Button'
import { OptionList } from '../../components/option-list/option-list'
import { Input } from '../../components/input/input'
import './subject-detail-page.css'

const SubjectDetailPageVariants = cva(
  'subject-detail page',
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

interface SubjectDetailPageProps extends VariantProps<typeof SubjectDetailPageVariants> {
  mode?: 'light' | 'dark'
}

export function SubjectDetailPage({ mode, ...props }: SubjectDetailPageProps) {
  return (
    <div className={SubjectDetailPageVariants({ mode })} {...props}>
      <Hero 
        title='Matemática'
        description='Crie, edite e gerencie suas diferentes frentes e a frequência das suas aulas.'
      />

      <div className='page-content'>
        <div className='subject-menu'>
          <Card to='' label='Frente 1' />
          <Card to='' label='Frente 2' />
          <Card to='' label='Frente 3' />
          <Card to='' label='Frente 4' />
          <Button>Adicionar</Button>
        </div>

        <div className='vl' />
          
        <div className='subject-content'>
          <div className='classes-menu'>
            <OptionList labels={['Turma A', 'Turma B', 'Turma C', 'Turma D']} />
            <Button variant='outline'>Editar</Button>
            <Button>Excluir</Button>
          </div>

          <div className='schedule'>
            <div className='schedule-row'>
              <Input type='select' />
              <Input type='time' />
            </div>
            <div className='schedule-row'>
              <Input type='select' />
              <Input type='time' />
            </div>
            <div className='schedule-row'>
              <Input type='select' />
              <Input type='time' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
