// import { Router, Routes, Route } from 'react-router-dom'
import { Button } from './components/button/Button'
import './App.css'

function App() {
  return (
    <div className='app-container'>
      <h1>Hello World</h1>

      <Button variant='solid' mode='dark' to=''>
        Button
      </Button>
    </div>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </Router>
  )
}

export default App
