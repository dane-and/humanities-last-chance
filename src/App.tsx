
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { BASE_PATH } from "./lib/config";
import { ErrorBoundary } from "react-error-boundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SearchPage from "./pages/SearchPage";
import TagsPage from "./pages/TagsPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import ArticlePage from "./pages/ArticlePage";

// Create ArticleCategory pages
import ArticlesBlog from "./pages/articles/ArticlesBlog";
import ArticlesInterviews from "./pages/articles/ArticlesInterviews";
import ArticlesReviews from "./pages/articles/ArticlesReviews";

// Query client with better error handling - updated to use the correct API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      // Using the newer way to handle errors in @tanstack/react-query v5+
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
        }
      }
    },
  },
});

// Simple error fallback for the entire app
const AppErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex items-center justify-center min-h-screen flex-col p-4">
    <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
    <pre className="bg-gray-100 p-4 rounded mb-4 max-w-2xl overflow-auto text-sm">
      {error.message}
    </pre>
    <button 
      onClick={resetErrorBoundary} 
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Try again
    </button>
  </div>
);

const App = () => {
  // Update the title and meta description based on the current route
  useEffect(() => {
    // Set default title and description
    document.title = "Humanities Last Chance";
    
    // Update meta description to match title for consistent link previews
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Humanities Last Chance");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <BrowserRouter basename={BASE_PATH}>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* Admin routes - temporarily bypassing authentication */}
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/tag/:tag" element={<TagsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                {/* Article category routes */}
                <Route path="/articles/blog" element={<ArticlesBlog />} />
                <Route path="/articles/interviews" element={<ArticlesInterviews />} />
                <Route path="/articles/reviews" element={<ArticlesReviews />} />
                {/* Individual article route */}
                <Route path="/article/:slug" element={<ArticlePage />} />
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
