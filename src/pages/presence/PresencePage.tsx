import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { Table } from '../../components/table/Table';
import { Student, students } from '../../data/students';


import './PresencePage.css';

export const PresencePage = () => {
    return (
        <div className='presence-container'>
            <div className='presence-header'>
                <Header to={''} />
                <Hero heroTitle={'Consultar Presença'} heroDescription='Tenha acesso às informações de uma aula e à lista de presença gerada.'/>
            </div>
            <div className='presence-body'>
                <div className='presence-table'>
                    <Table header={['Nome do aluno', 'Presença']} data={studentsData} />
                </div>
            </div>
        </div>
    )
}

const studentsData = students.map((obj) => {
    return (Object.keys(obj).map((key) => obj[key as keyof Student]))
  })



