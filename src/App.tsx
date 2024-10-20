import { Routes, Route } from 'react-router-dom';
import LoggedInLayout from './layouts/logged-in/LoggedInLayout';
import LoggedOutLayout from './layouts/logged-out/LoggedOutLayout';

import { HomePage } from './pages/home-page/HomePage';
import { LessonsPage } from './pages/lessons-page/lessons-page';
import { LessonDetailPage } from './pages/lesson-detail-page/lesson-detail-page';
import { SubjectPage } from './pages/subject-page/subject-page';
import { SubjectDetailPage } from './pages/subject-detail-page/subject-detail-page';
import { ForgotPasswordPage } from './pages/forgot-password-page/ForgotPasswordPage';
import { LoginPage } from './pages/login-page/LoginPage';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { StudentClassPage } from './pages/student-class-page/student-class-page';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <ToastContainer />
      <Routes>
        {
          isLoggedIn 
          ? (
            <Route path="/" element={<LoggedInLayout onLogout={() => setIsLoggedIn(false)} />}>
              <Route index element={<HomePage />} />
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
            </Route>
          ) 
          : (
            <Route path="/" element={<LoggedOutLayout />}>
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route
                index
                element={
                  <LoginPage
                    onLogin={() => {
                      setIsLoggedIn(true);
                    }}
                  />
                }
              />
            </Route>
          )
        }
      </Routes>
    </>
  );
}

export default App;
