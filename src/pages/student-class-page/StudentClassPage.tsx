import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { CardMenu } from '../../components/card-menu/card-menu';
import { Card } from '../../components/card-menu/card';
import './StudentClassPage.css';
import { Table } from '../../components/table/Table';
import { OptionList } from '../../components/option-list/option-list';
import { Input } from '../../components/input/input';
import { TextCard } from '../../components/text-card/text-card';

const StudentClassPageVariants = cva('student-class page', {
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

interface StudentClassPageProps
  extends VariantProps<typeof StudentClassPageVariants> {
  mode?: 'light' | 'dark';
}

export function StudentClassPage({ mode, ...props }: StudentClassPageProps) {
  return (
    <div className={StudentClassPageVariants({ mode })} {...props}>
      <Hero title="Turmas" description="Crie, edite e gerencie suas turmas" />

      <CardMenu className="menu">
        <Card to="" label="Adicionar" mode="light" />
        <Card to="" label="Métricas" mode="light" />
      </CardMenu>

      <div className="student-class-page-content">
        <div className="column">
          <OptionList labels={['Turma 1', 'Turma 2', 'Turma 3', 'Turma 4']} />
          <div className="cards">
            <TextCard iconType="book" label="Curso">
              {}
            </TextCard>
            <TextCard iconType="clock" label="Horário">
              {}
            </TextCard>
            <TextCard iconType="clipboard" label="Sala">
              {}
            </TextCard>
            <TextCard iconType="users" label="Modalidade">
              {}
            </TextCard>
          </div>
        </div>
        <div className="column">
          <Input type={'text'} />
          <Table mode="light" clickable={true} header={['Aluno']} />
        </div>
      </div>
    </div>
  );
}
