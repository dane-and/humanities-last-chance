
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_CONFIG } from '@/lib/config';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  authLoading: boolean;
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
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  
  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      console.log('AuthProvider: checking authentication state');
      setAuthLoading(true);
      
      try {
        const auth = localStorage.getItem('admin-auth');
        if (auth === 'true') {
          console.log('AuthProvider: Found existing auth in localStorage, setting authenticated state');
          setIsAuthenticated(true);
        } else {
          console.log('AuthProvider: No auth found in localStorage, user is not authenticated');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('AuthProvider: Error checking authentication', error);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = (username: string, password: string): boolean => {
    console.log('Login attempt with credentials', { usernameProvided: !!username, passwordProvided: !!password });
    
    // Check username and password against config values
    if (username === AUTH_CONFIG.ADMIN_USERNAME && password === AUTH_CONFIG.ADMIN_PASSWORD) {
      console.log('Login successful');
      
      try {
        localStorage.setItem('admin-auth', 'true');
        setIsAuthenticated(true);
        toast.success('Successfully logged in as admin');
        return true;
      } catch (error) {
        console.error('Failed to set auth in localStorage:', error);
        toast.error('Login succeeded but failed to save session');
        return false;
      }
    }
    
    console.log('Login failed: invalid credentials');
    return false;
  };

  const logout = () => {
    console.log('Logging out');
    try {
      localStorage.removeItem('admin-auth');
      setIsAuthenticated(false);
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to complete logout');
    }
  };

  // Debug log to show current authentication state on any changes
  useEffect(() => {
    console.log('Authentication state changed:', { isAuthenticated, authLoading });
  }, [isAuthenticated, authLoading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
