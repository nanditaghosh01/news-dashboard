import ArticleCard from './ArticleCard.jsx';
import { LoadingBlock, ErrorBlock, EmptyBlock } from './StateBlocks.jsx';
export default function ArticleList({ articles, loading, error, onRetry }) {
  if (loading) return <LoadingBlock />;
  if (error) return <ErrorBlock message={error} onRetry={onRetry} />;
  if (!articles.length) return <EmptyBlock message="No articles found. Try a different category or search term." />;
  return (
    <div className="article-grid">
      {articles.map((article, i) => (
        <ArticleCard key={i} article={article} articleId={i} />
      ))}
    </div>
  );
}
