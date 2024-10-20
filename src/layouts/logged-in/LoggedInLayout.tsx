import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { Header } from '../../components/header/header';
import './LoggedInLayout.css';

interface LoggedInProps {
  onLogout: () => void
}

const LoggedInLayout = ({ onLogout }: LoggedInProps) => {
  // const location = useLocation();

  return (
    <div className="app-container">
      <Navbar mode="light" />

      <div className="page-container">
        <Header onLogout={onLogout} />
        <Outlet />
      </div>
    </div>
  );
};

export default LoggedInLayout;
