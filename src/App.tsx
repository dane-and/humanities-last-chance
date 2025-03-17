
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { BASE_PATH } from "./lib/config";
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
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

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
          <BrowserRouter basename={BASE_PATH}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
