import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { Header } from '../../components/header/header';
import './LoggedInLayout.css';

const LoggedInLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar mode="light" />

      <div className="page-container">
        <Header to={location} />
        <Outlet />
      </div>
    </div>
  );
};

export default LoggedInLayout;
