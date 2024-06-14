// import { Router, Routes, Route } from 'react-router-dom'
import { LinkGroup } from './components/links/LinkGroup'
import './App.css'

function App() {
  return (
    <div className='app-container'>
      <h1>Hello World</h1>

      <LinkGroup
        mode='light'
        labels={['Aulas', 'Presença', 'Professores', 'Turmas', 'Métricas']}
        paths={['/', '/', '/']}
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
