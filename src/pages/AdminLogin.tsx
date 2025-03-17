
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AUTH_CONFIG } from '@/lib/config';
import { Loader2 } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, authLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from || '/admin/dashboard';

  useEffect(() => {
    console.log('AdminLogin: Rendered with auth state:', { isAuthenticated, authLoading });
    console.log('AdminLogin: Redirect destination after login:', from);
    
    // Wait for auth to finish loading before checking
    if (!authLoading) {
      if (isAuthenticated) {
        console.log('AdminLogin: Already authenticated, redirecting to', from);
        navigate(from);
      } else {
        console.log('AdminLogin: Not authenticated, showing login form');
        
        // Debug info about the default credentials for development
        if (process.env.NODE_ENV === 'development') {
          console.log('Development mode - default credentials:', { 
            username: AUTH_CONFIG.ADMIN_USERNAME, 
            password: 'Use the password from AUTH_CONFIG'
          });
        }
      }
    }
  }, [isAuthenticated, authLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { username });
    
    setIsLoading(true);
    
    try {
      if (login(username, password)) {
        toast.success('Login successful');
        console.log('AdminLogin: Login successful, navigating to', from);
        navigate(from);
      } else {
        toast.error('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
        <div className="w-full max-w-md space-y-6 bg-background p-8 rounded-lg shadow-lg border border-border">
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Checking authentication status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-md space-y-6 bg-background p-8 rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to manage content</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              disabled={isLoading}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          <a href="/" className="hover:underline">Back to homepage</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
