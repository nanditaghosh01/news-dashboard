import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getCached, setCached } from '../utils/cache.js';
const NEWS_API_BASE = 'https://newsapi.org/v2/top-headlines';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
export function useNews({ category, query }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheKey = `${category || 'general'}::${query || ''}`;
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    const cached = getCached(cacheKey);
    if (cached) {
      setArticles(cached);
      setLoading(false);
      return;
    }
    if (!API_KEY) {
      setError(
        'Missing NewsAPI key. Add VITE_NEWS_API_KEY to your .env file (see README).'
      );
      setLoading(false);
      return;
    }
    try {
      const params = {
        apiKey: API_KEY,
        language: 'en',
        pageSize: 12,
      };
      if (query) {
        params.q = query;
      } else {
        params.category = category || 'general';
        params.country = 'us';
      }
      const res = await axios.get(NEWS_API_BASE, { params });
      const results = (res.data.articles || []).filter((a) => a.title && a.title !== '[Removed]');
      setArticles(results);
      setCached(cacheKey, results);
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data?.message ||
            `NewsAPI request failed (status ${err.response.status}).`
        );
      } else if (err.request) {
        setError('Network error — could not reach NewsAPI. Check your connection.');
      } else {
        setError('Something went wrong while fetching the news.');
      }
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, category, query]);
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  return { articles, loading, error, refetch: fetchNews };
}
