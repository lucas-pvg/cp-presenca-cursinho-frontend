import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { Card } from '../../components/card-menu/card'
import { Button } from '../../components/button/Button'
import { OptionList } from '../../components/option-list/option-list'
import { Input } from '../../components/input/input'
import { Icon } from '../../components/icon/icon'
import { SelectInput } from '../../components/select-input/select-input'
import { CreateSubject } from '../../components/modal/subject/create-subject'
import { DeleteSubject } from '../../components/modal/subject/delete-subject'

import { Subject, MainSubject } from '../../data/models/subject.model'
import Services from '../../services'
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
  const { subjectCode } = useParams()
  const [ mainSubject, setMainSubject ] = useState<string>('Disciplina')
  const [ subjects, setSubjects ] = useState(Array<Subject>)
  const [ selected, setSelected ] = useState<Subject>()
  const [ ClassSelected, setClassSelected ] = useState<number>(1)

  const [ isCreateOpen, setIsCreateOpen ] = useState(false)
  const [ isEditOpen, setIsEditOpen ] = useState(false)
  const [ isDeleteOpen, setIsDeleteOpen ] = useState(false)
  const [ isAnimationEnded, setIsAnimationEnded ] = useState(true)
  const [ isModalConfirm, setIsModalConfirm ] = useState(true)

  useEffect(() => {
    subjectCode && isModalConfirm && 
    setMainSubject(MainSubject.find(ms => ms.id == subjectCode)!.name)

    subjectCode && isModalConfirm &&
    Services.listSubjectsFromMain(subjectCode)
      .then(data => {
        setSubjects(data)
        setIsModalConfirm(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [subjectCode, isModalConfirm, selected]);

  return (
    <>
    <div className={SubjectDetailPageVariants({ mode })} {...props}>
      <Hero 
        title={mainSubject}
        description='Crie, edite e gerencie suas diferentes frentes e a frequência das suas aulas.'
      />

      <div className='page-content'>
        <div className='subject-menu'>
          { 
            subjects.map((sub) => {
              return (
                <Card 
                  to=''
                  label={sub.name}
                  key={sub.id}
                  variant={selected?.id == sub.id ? 'primary' : 'secondary'}
                  onClick={() => setSelected(sub)}
                />
              )
            }) 
          }
    
          <Button onClick={() => {setIsCreateOpen(true); setIsAnimationEnded(false)}}>Adicionar</Button>
        </div>

        <div className='vl' />
          
        <div className='subject-content'>
          <div className='classes-menu'>
            <OptionList labels={['Turma A', 'Turma B', 'Turma C', 'Turma D']} />
            <Button variant='outline' onClick={() => {setIsEditOpen(true); setIsAnimationEnded(false)}}>Editar</Button>
            <Button onClick={() => {setIsDeleteOpen(true); setIsAnimationEnded(false)}}>Excluir</Button>
          </div>

          <div className='schedule'>
            <div className='schedule-forms'>
              <div className='schedule-row'>
                <SelectInput label='Dia da Semana' name='dayOfWeek'>
                  <option value={0}>Segunda</option>
                  <option value={1}>Terça</option>
                  <option value={2}>Quarta</option>
                  <option value={3}>Quinta</option>
                  <option value={4}>Sexta</option>
                  <option value={5}>Sábado</option>
                  <option value={6}>Domingo</option>
                </SelectInput>
                <Input label='Horário' type='time' names={['startDatetime', 'endDatetime']} />
                <Icon className='delete-icon' iconType='x-circle' size={32}/>
              </div>
            </div>
            <Button variant='outline'>Nova Data</Button>
          </div>
        </div>
      </div>
    </div>

    {
      isCreateOpen &&
      <CreateSubject 
        className={isAnimationEnded ? 'modal-close' : 'modal-open'}
        mainSubject={subjectCode}
        confirm={() => setIsModalConfirm(true)}
        close={() => setIsAnimationEnded(true)}
        onAnimationEnd={() => {if (isAnimationEnded) setIsCreateOpen(false)}}
        mode='light'
      />
    }

    {
      isEditOpen &&
      <CreateSubject 
        className={isAnimationEnded ? 'modal-close' : 'modal-open'}
        mainSubject={subjectCode}
        subjectID={selected!.id}
        confirm={() => setIsModalConfirm(true)}
        close={() => setIsAnimationEnded(true)}
        onAnimationEnd={() => {if (isAnimationEnded) setIsEditOpen(false)}}
        mode='light'
      />
    }

    {
      isDeleteOpen && selected &&
      <DeleteSubject
        className={isAnimationEnded ? 'modal-close' : 'modal-open'}
        subjectID={selected.id}
        subjectName={selected.name}
        confirm={() => {setIsModalConfirm(true)}}
        close={() => setIsAnimationEnded(true)}
        onAnimationEnd={() => {if (isAnimationEnded) {setIsDeleteOpen(false)}}}
        mode='light'
      />
    }
    </>
  )
}
