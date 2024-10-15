// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/admin-login" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
