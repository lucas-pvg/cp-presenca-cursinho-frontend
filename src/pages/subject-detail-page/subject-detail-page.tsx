import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cva, VariantProps } from 'class-variance-authority';
import { Hero } from '../../components/hero/hero';
import { Card } from '../../components/card-menu/card';
import { Button } from '../../components/button/Button';
import { OptionList } from '../../components/option-list/option-list';
import { Input } from '../../components/input/input';
import { SelectInput } from '../../components/select-input/select-input';

import { Subject, MainSubject } from '../../data/models/subject.model';
import Services from '../../services';
import './subject-detail-page.css';

const SubjectDetailPageVariants = cva('subject-detail page', {
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

interface SubjectDetailPageProps
  extends VariantProps<typeof SubjectDetailPageVariants> {
  mode?: 'light' | 'dark';
}

export function SubjectDetailPage({ mode, ...props }: SubjectDetailPageProps) {
  const { subjectCode } = useParams();
  const [mainSubject, setMainSubject] = useState<string>('Disciplina');
  const [subjects, setSubjects] = useState(Array<Subject>);

  useEffect(() => {
    subjectCode &&
      setMainSubject(MainSubject.find((ms) => ms.id == subjectCode)!.name);

    subjectCode &&
      Services.listSubjectsFromMain(subjectCode)
        .then((data) => {
          setSubjects(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [subjectCode]);

  return (
    <>
    <div className={SubjectDetailPageVariants({ mode })} {...props}>
      <Hero
        title={mainSubject}
        description="Crie, edite e gerencie suas diferentes frentes e a frequência das suas aulas."
      />

      <div className="page-content">
        <div className="subject-menu">
          {subjects.map((sub) => (
            <Card to="" label={sub.name} key={sub.id} />
          ))}
          <Button>Adicionar</Button>
        </div>

        <div className="vl" />

        <div className="subject-content">
          <div className="classes-menu">
            <OptionList labels={['Turma A', 'Turma B', 'Turma C', 'Turma D']} />
            <Button variant="outline">Editar</Button>
            <Button>Excluir</Button>
          </div>

          <div className="schedule">
            <div className="schedule-row">
              <SelectInput>
                <option>Segunda</option>
                <option>Terça</option>
                <option>Quarta</option>
                <option>Quinta</option>
                <option>Sexta</option>
                <option>Sábado</option>
                <option>Domingo</option>
              </SelectInput>
              <Input type="time" />
            </div>
            <div className="schedule-row">
              <SelectInput>
                <option>Segunda</option>
                <option>Terça</option>
                <option>Quarta</option>
                <option>Quinta</option>
                <option>Sexta</option>
                <option>Sábado</option>
                <option>Domingo</option>
              </SelectInput>
              <Input type="time" />
            </div>
            <div className="schedule-row">
              <SelectInput>
                <option>Segunda</option>
                <option>Terça</option>
                <option>Quarta</option>
                <option>Quinta</option>
                <option>Sexta</option>
                <option>Sábado</option>
                <option>Domingo</option>
              </SelectInput>
              <Input type="time" />
            </div>
            <Button variant='outline' onClick={() => newDatetime()}>Nova Data</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
