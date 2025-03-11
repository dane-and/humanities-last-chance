
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SearchPage from "./pages/SearchPage";
import TagsPage from "./pages/TagsPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Create ArticleCategory pages
import ArticlesBlog from "./pages/articles/ArticlesBlog";
import ArticlesInterviews from "./pages/articles/ArticlesInterviews";
import ArticlesReviews from "./pages/articles/ArticlesReviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tag/:tag" element={<TagsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Article category routes */}
          <Route path="/articles/blog" element={<ArticlesBlog />} />
          <Route path="/articles/interviews" element={<ArticlesInterviews />} />
          <Route path="/articles/reviews" element={<ArticlesReviews />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
