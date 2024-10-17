// app/auth/layout.tsx
import React from 'react';
import './auth.css'; // Import your CSS for auth styles
import AuthSideBar from '@/components/sideBar/sideBar';


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="auth-layout">
            <div className="sidebar " >
            <AuthSideBar />
            </div>
            <div className="form-container">{children}</div>
           
        </div>
    );
};

export default AuthLayout;
