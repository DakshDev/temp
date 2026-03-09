import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const AdminProtectedRoute = ({ children }) => {
  const { adminToken } = useContext(AppContext);
  const location = useLocation();

  if (!adminToken) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
