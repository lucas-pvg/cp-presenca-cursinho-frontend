import { Routes, Route } from 'react-router-dom';
import './App.css';

import { HomePage } from './pages/home-page/HomePage';
import { LessonsPage } from './pages/lessons-page/lessons-page';
import { LessonDetailPage } from './pages/lesson-detail-page/lesson-detail-page';
import { SubjectPage } from './pages/subject-page/subject-page';
import { SubjectDetailPage } from './pages/subject-detail-page/subject-detail-page';
import { StudentClassPage } from './pages/student-class-page/StudentClassPage';
import { useState } from 'react';
import { LoginPage } from './pages/login-page/LoginPage';
import { ForgotPasswordPage } from './pages/forgot-password-page/ForgotPasswordPage';
import LoggedInLayout from './layouts/logged-in/LoggedInLayout';
import LoggedOutLayout from './layouts/logged-out/LoggedOutLayout';
import { UsersPage } from './pages/users-page/users-page';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<LoggedInLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="lessons/:lessonID" element={<LessonDetailPage />} />
          <Route path="subject" element={<SubjectPage />} />
          <Route path="subject/:subjectCode" element={<SubjectDetailPage />} />

          <Route
            path="attendence"
            element={<h1 className="center">Presença</h1>}
          />
          <Route path="users" element={<UsersPage />} />
          <Route
            path="metrics"
            element={<h1 className="center">Métricas</h1>}
          />
          <Route path="classes" element={<StudentClassPage />} />
        </Route>
      ) : (
        <Route path="/" element={<LoggedOutLayout />}>
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path=""
            element={
              <LoginPage
                onLogin={() => {
                  setIsLoggedIn(true);
                }}
              />
            }
          />
        </Route>
      )}
    </Routes>
  );
}

export default App;
