import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import './App.css'

function App() {
  return (
    <div className='app-container'>
      <Navbar mode='light' />

      <div className='pages'>
        <h1>Hello World</h1>

        {/* <LinkGroup
          mode='light'
          labels={['Aulas', 'Presença', 'Professores', 'Turmas', 'Métricas']}
          paths={['/', '/', '/', '/', '/']}
        /> */}

        <Routes>
          <Route path="/" element={<></>} />
        </Routes>
      </div>
    </div>


  )
}

export default App
