import { Header } from '../../components/header/header';
import { Table } from '../../components/table/Table';
import { Student, students } from '../../data/students';


import './PresencePage.css';

export const PresencePage = () => {
    return (
        <div className='presence-container'>
            <Header to={''} title={'Controle de Presença'} subtitle='Tenha acesso às informações de uma aula e à lista de presença gerada.'/>
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



