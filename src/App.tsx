// import { Router, Routes, Route } from 'react-router-dom'
import { Table } from './components/table/Table'
import { Class, classes } from './data/classes'
import './App.css'

function App() {
  const classData = classes.map((obj) => {
    return (Object.keys(obj).map((key) => obj[key as keyof Class]))
  })

  return (
    <div className='app-container'>
      <h1>Hello World</h1>

      <Table
        mode='light'
        clickable={true}
        header={['Aula', 'Horário', 'Turma', 'Column']}
        data={classData}
      />

    </div>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </Router>
  )
}

export default App
