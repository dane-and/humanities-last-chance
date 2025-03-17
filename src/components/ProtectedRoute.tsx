
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Temporarily bypassing authentication
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  console.log('ProtectedRoute: Temporarily bypassing authentication check');
  
  // Simply render children without any authentication check
  return <>{children}</>;
};

export default ProtectedRoute;
