import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, requireBlogAccess = false }) => {
  const { token, user } = useContext(AppContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireBlogAccess && !user?.canPostBlog) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
