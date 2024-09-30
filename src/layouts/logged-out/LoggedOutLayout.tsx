import React from 'react';
import './LoggedOutLayout.css';
import { Outlet } from 'react-router-dom';
import { Reading } from '../../components/cp-art/reading/Reading';

const LoggedOutLayout: React.FC = () => {
    return (
        <div className="layout-background">
            <div className="layout-content">
                <Outlet />
            </div>
            <Reading className="reading" />
        </div>
    );
};

export default LoggedOutLayout;