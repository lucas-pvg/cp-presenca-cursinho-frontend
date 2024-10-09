import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Header } from './components/header/header';

import { HomePage } from './pages/home-page/HomePage';
import { LessonsPage } from './pages/lessons-page/lessons-page';
import { LessonDetailPage } from './pages/lesson-detail-page/lesson-detail-page';
import { SubjectPage } from './pages/subject-page/subject-page';
import { SubjectDetailPage } from './pages/subject-detail-page/subject-detail-page';
import { StudentClassPage } from './pages/student-class-page/student-class-page';

import './App.css';

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
          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/subject/:subjectCode" element={<SubjectDetailPage />} />
          <Route path="/classes" element={<StudentClassPage />} />

          <Route
            path="/students"
            element={<h1 className="center">Alunos</h1>}
          />
          <Route
            path="/teachers"
            element={<h1 className="center">Professores</h1>}
          />
          <Route
            path="/metrics"
            element={<h1 className="center">Métricas</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
