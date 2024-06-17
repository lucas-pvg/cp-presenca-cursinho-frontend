import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { Table } from './components/table/Table'
import { Class, classes } from './data/classes'
import './App.css'

function App() {
  const classData = classes.map((obj) => {
    return (Object.keys(obj).map((key) => obj[key as keyof Class]))
  })

  return (
    <div className='app-container'>
      <Navbar mode='light' />

      <div className='pages'>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Hello World</h1>

              <Table
                mode='light'
                clickable={true}
                header={['Aula', 'Horário', 'Turma', 'Column']}
                data={classData}
              />
            </>
           } />
          <Route path="/attendence" element={<h1>Presença</h1>} />
          <Route path="/teachers" element={<h1>Professores</h1>} />
          <Route path="/classes" element={<h1>Turmas</h1>} />
          <Route path="/metrics" element={<h1>Métricas</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
