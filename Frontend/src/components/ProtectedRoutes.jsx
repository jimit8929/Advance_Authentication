import { getData } from '@/context/userContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = getData();   // ✅ call the hook properly

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
