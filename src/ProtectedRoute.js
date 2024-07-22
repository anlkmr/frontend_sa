import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken')); 
console.log("issshshsh",isAuthenticated, Component);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;