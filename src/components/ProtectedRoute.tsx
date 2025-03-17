
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    console.log('ProtectedRoute: Current auth state:', { isAuthenticated, authLoading, path: location.pathname });
    
    if (!authLoading && !isAuthenticated) {
      console.log('ProtectedRoute: Access denied: Not authenticated, redirecting to login');
    } else if (!authLoading && isAuthenticated) {
      console.log('ProtectedRoute: Access granted: User is authenticated');
    }
  }, [isAuthenticated, authLoading, location.pathname]);

  // Show loading indicator while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to /admin from', location.pathname);
    return <Navigate to="/admin" state={{ from: location.pathname }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
