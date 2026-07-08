import { useNavigate } from 'react-router-dom';
const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="#e9e4d8"/><text x="50%" y="50%" font-family="monospace" font-size="12" fill="#a9832f" text-anchor="middle">NO IMAGE</text></svg>`
  );
export default function ArticleCard({ article, articleId }) {
  const navigate = useNavigate();
  function openArticle() {
    navigate(`/article/${articleId}`, { state: { article } });
  }
  return (
    <article className="article-card"onClick={openArticle}role="button"tabIndex={0}onKeyDown={(e) => e.key === 'Enter' && openArticle()}>
      <span className="wire-stamp">
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'undated'}
      </span>
      <img className="article-thumb"src={article.urlToImage || FALLBACK_IMG} alt=""onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}/>
      <div className="article-body">
        <span className="article-source">{article.source?.name || 'Unknown source'}</span>
        <h3 className="article-title">{article.title}</h3>
      </div>
    </article>
  );
}
