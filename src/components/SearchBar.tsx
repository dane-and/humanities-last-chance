
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '@/lib/articles';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { articles } = useArticles();

  // Debounce the search query to avoid excessive filtering
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-focus input when opening search
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Memoized search function
  const searchArticles = useCallback(() => {
    if (debouncedQuery.length > 2 && articles) {
      const searchResults = articles.filter(article => 
        article.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        (article.tags && article.tags.some(tag => 
          tag.toLowerCase().includes(debouncedQuery.toLowerCase())
        ))
      ).slice(0, 5); // Limit to 5 results for better UX
      
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, articles]);

  // Search articles based on debounced query
  useEffect(() => {
    searchArticles();
  }, [debouncedQuery, searchArticles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const navigateToArticle = (slug: string) => {
    navigate(`/article/${slug}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={cn('relative', className)}>
      {isOpen ? (
        <div className="relative animate-fade-in">
          <form onSubmit={handleSearch}>
            <div className="flex">
              <Input
                ref={inputRef}
                className="w-full md:w-64 pr-10 h-9 focus:ring-primary"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          {results.length > 0 && (
            <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg z-50 overflow-hidden animate-fade-in">
              <ul className="py-1">
                {results.map((article) => (
                  <li 
                    key={article.id}
                    className="px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => navigateToArticle(article.slug)}
                  >
                    <div className="font-medium truncate">{article.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 60)}...
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(true)}
          aria-label="Search"
          className="h-8 w-8 min-h-0 min-w-0 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <Search className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
