
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Access denied: Not authenticated, redirecting to login');
    } else {
      console.log('Access granted: User is authenticated');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect to the login page with the intended destination
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
