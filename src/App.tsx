import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Header } from "./components/header/header";
import "./App.css";

import { HomePage } from './pages/home-page/HomePage'
import { LessonsPage } from './pages/lessons-page/lessons-page'
import { LessonDetailPage } from './pages/lesson-detail-page/lesson-detail-page'

function App() {
	const location = useLocation();

	return (
		<div className="app-container">
			<Navbar mode="light" />

			<div className="page-container">
				<Header to={location} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:lessonID" element={<LessonDetailPage />} />
          
          <Route path="/attendence" element={<h1 className='center'>Presença</h1>} />
          <Route path="/teachers" element={<h1 className='center'>Professores</h1>} />
          <Route path="/classes" element={<h1 className='center'>Turmas</h1>} />
          <Route path="/metrics" element={<h1 className='center'>Métricas</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
