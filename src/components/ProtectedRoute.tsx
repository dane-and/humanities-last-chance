
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for auth to finish loading before checking
    if (!authLoading) {
      if (!isAuthenticated) {
        console.log('ProtectedRoute: User not authenticated, redirecting to login');
        // Redirect to login page
        navigate('/admin/login', { state: { from: window.location.pathname } });
      } else {
        console.log('ProtectedRoute: User is authenticated, allowing access');
      }
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin text-primary">Loading...</div>
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }
  
  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
