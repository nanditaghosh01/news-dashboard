import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs.jsx';
import ArticleList from '../components/ArticleList.jsx';
import { useNews } from '../hooks/useNews.js';
export default function Home() {
  const [category, setCategory] = useState('general');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { articles, loading, error, refetch } = useNews({ category, query });
  function handleSelectCategory(cat) {
    setCategory(cat);
    setSearchParams({}); // clear any active search when picking a category
  }
  return (
    <>
      <CategoryTabs active={category} onSelect={handleSelectCategory} />
      <main className="page">
        <h2 className="section-heading">
          {query ? `Results for "${query}"` : 'Top Headlines'}
        </h2>
        <ArticleList articles={articles} loading={loading} error={error} onRetry={refetch} />
      </main>
    </>
  );
}
