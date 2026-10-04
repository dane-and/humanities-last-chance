import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ScrollToTop from './components/ScrollToTop';
import Portfolio from './Portfolio';

export default function App() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } } }));
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div className="p-12 text-center"><h1>Something went wrong.</h1><p>Please reload the page and try again.</p></div>}>
        <BrowserRouter basename={import.meta.env.VITE_BASE_URL || '/'}>
          <ScrollToTop />
          <Portfolio />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
