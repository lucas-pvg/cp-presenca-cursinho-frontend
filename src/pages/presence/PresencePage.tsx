import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { Table } from '../../components/table/Table';
import { Student, students } from '../../data/students';

import './PresencePage.css';

const PresencePageVariants = cva(
    'presence page',
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

  interface PresencePageProps extends VariantProps<typeof PresencePageVariants> {
    mode?: 'light' | 'dark'
  }

export const PresencePage = ({ mode, ...props}: PresencePageProps) => {
    return (
        <div className={PresencePageVariants({ mode })} {...props}>
            <Hero title={'Consultar Presença'} description='Tenha acesso às informações de uma aula e à lista de presença gerada.'/>
            <div className='page-content'>
                <Table header={['Nome do aluno', 'Presença']} data={studentsData} />
            </div>
        </div>
    )
}

const studentsData = students.map((obj) => {
    return (Object.keys(obj).map((key) => obj[key as keyof Student]))
  })



