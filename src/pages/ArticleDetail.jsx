import { useLocation, useParams, Link } from 'react-router-dom';
import Summarizer from '../components/Summarizer.jsx';
import { EmptyBlock } from '../components/StateBlocks.jsx';
export default function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const article = location.state?.article;
  if (!article) {
    return (
      <main className="page">
        <Link to="/" className="back-link">
          ← Back to headlines
        </Link>
        <EmptyBlock message="This article's details aren't available — head back and open it from the list." />
      </main>
    );
  }
  return (
    <main className="page detail-wrap">
      <Link to="/" className="back-link">
        ← Back to headlines
      </Link>
      <span className="article-source">{article.source?.name || 'Unknown source'}</span>
      <h1 className="detail-title">{article.title}</h1>
      <div className="detail-meta">
        {article.author && <span>By {article.author}</span>}
        {article.publishedAt && (
          <span>{new Date(article.publishedAt).toLocaleString()}</span>
        )}
      </div>
      {article.urlToImage && (
        <img className="detail-image" src={article.urlToImage} alt="" />
      )}
      <p className="detail-description">{article.description || article.content}</p>
      <div className="detail-actions">
        <a className="btn btn-primary" href={article.url} target="_blank" rel="noreferrer">
          Read full article ↗
        </a>
      </div>
      <Summarizer article={article} articleId={id} />
    </main>
  );
}
