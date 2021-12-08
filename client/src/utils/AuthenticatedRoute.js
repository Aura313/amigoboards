import React from 'react';
import AuthService from '../Services/AuthenticationService';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

function AuthencatedRoute() {
  let location = useLocation();

  if (!AuthService.getCurrentUser()) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return <Outlet />;
}

export default AuthencatedRoute;
