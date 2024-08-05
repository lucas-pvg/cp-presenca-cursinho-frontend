import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Header } from "./components/header/header";
import { CreateClass } from "./components/modal/create-class";
import { Button } from "./components/button/Button";
import "./App.css";

import { HomePage } from './pages/home-page/HomePage'
import { LessonsPage } from './pages/lessons-page/lessons-page'
import { LessonDetailPage } from './pages/lesson-detail-page/lesson-detail-page'

function App() {
	const location = useLocation();
	const [open, setOpen] = useState(false);

	return (
		<div className="app-container">
			<Navbar mode="light" />

			<div className="page-container">
				<Header to={location} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lesson-detail" element={<LessonDetailPage />} />
          
          <Route path="/attendence" element={<h1 className='center'>Presença</h1>} />
          <Route path="/teachers" element={<h1 className='center'>Professores</h1>} />
          <Route path="/classes" element={
            <LessonDetailPage />
            // <h1 className='center'>Turmas</h1>
          } />
          <Route path="/metrics" element={
            <div className='center'>
              <Button onClick={() => setOpen(true)}>Open Modal</Button>
              <CreateClass className={open ? 'modal-open' : 'modal-close'} mode='light' close={() => setOpen(false)} />
            </div>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App;
