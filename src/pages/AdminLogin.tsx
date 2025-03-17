
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated on mount
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
    
    // Debug log to verify component rendering
    console.log('Admin login page rendered');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { username });
    
    if (login(username, password)) {
      toast({
        title: 'Success',
        description: 'You have been logged in.',
        variant: 'default',
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid username or password. Please try again.',
        variant: 'destructive',
      });
    }
  };

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
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Login
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
