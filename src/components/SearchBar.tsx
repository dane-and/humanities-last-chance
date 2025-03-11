
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '@/lib/articles';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { articles } = useArticles();

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

  // Search articles based on query
  useEffect(() => {
    if (query.length > 2 && articles) {
      const searchResults = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        (article.tags && article.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        ))
      ).slice(0, 5); // Limit to 5 results for better UX
      
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, articles]);

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
    <div ref={searchRef} className={`relative ${className}`}>
      {isOpen ? (
        <div className="relative">
          <form onSubmit={handleSearch}>
            <div className="flex">
              <Input
                className="w-full pr-10"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          {results.length > 0 && (
            <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg z-50 overflow-hidden">
              <ul className="py-1">
                {results.map((article) => (
                  <li 
                    key={article.id}
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => navigateToArticle(article.slug)}
                  >
                    <div className="font-medium">{article.title}</div>
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
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
