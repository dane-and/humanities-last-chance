
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_CONFIG } from '@/lib/config';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is already authenticated on mount
  useEffect(() => {
    // Debug log to verify context initialization
    console.log('AuthProvider initialized');
    
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      console.log('Found existing auth in localStorage');
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    console.log('Login attempt with credentials', { usernameProvided: !!username, passwordProvided: !!password });
    
    // Check username and password against config values
    if (username === AUTH_CONFIG.ADMIN_USERNAME && password === AUTH_CONFIG.ADMIN_PASSWORD) {
      console.log('Login successful');
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
      return true;
    }
    console.log('Login failed: invalid credentials');
    return false;
  };

  const logout = () => {
    console.log('Logging out');
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
