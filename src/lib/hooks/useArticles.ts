
import { useEffect, useState } from 'react';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { Article } from '@/lib/types/article';

// Utility to normalize tags - now simpler since we're using string[] in Sanity
function normalizeTags(rawTags: (string | null | undefined)[]): string[] {
  return rawTags
    .filter((tag): tag is string => tag !== null && tag !== undefined)
    .filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Get all articles rather than filtering by tag at this stage
        const rawArticles = await getArticlesFromStorage();
        const processedArticles = rawArticles.map((article: any) => ({
          ...article,
          tags: normalizeTags(article.tags ?? []),
        }));
        setArticles(processedArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return { articles, isLoading };
}
