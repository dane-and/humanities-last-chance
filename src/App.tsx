import React, { lazy, Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from './components/ui/sonner';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Portfolio from './Portfolio';

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

export default function App() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } } }));
  return <QueryClientProvider client={queryClient}><TooltipProvider><AuthProvider><Toaster /><Sonner /><ErrorBoundary fallback={<div className="p-12 text-center"><h1>Something went wrong.</h1><p>Please reload the page and try again.</p></div>}><BrowserRouter basename={import.meta.env.VITE_BASE_URL || '/'}><ScrollToTop /><Suspense fallback={<p className="p-12" role="status">Loading…</p>}><Routes><Route path="/admin" element={<Navigate to="/admin/login" replace />} /><Route path="/admin/login" element={<AdminLogin />} /><Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /><Route path="/*" element={<Portfolio />} /></Routes></Suspense></BrowserRouter></ErrorBoundary></AuthProvider></TooltipProvider></QueryClientProvider>;
}
