import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { Header } from '../../components/header/header';
import './LoggedInLayout.css';
import { useAuth } from '../../context/useAuth';
import { toast } from 'react-toastify';

const LoggedInLayout = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      toast.error('Verifique os dados e tente novamente!');
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    isLoggedIn() && (
      <div className="app-container">
        <Navbar mode="light" />
        <div className="page-container">
          <Header onLogout={logout} />
          <Outlet />
        </div>
      </div>
    )
  );
};

export default LoggedInLayout;
