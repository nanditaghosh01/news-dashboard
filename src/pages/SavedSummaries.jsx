import { useState, useEffect } from 'react';
import { getSavedSummaries, removeSummary } from '../utils/cache.js';
import { EmptyBlock } from '../components/StateBlocks.jsx';
export default function SavedSummaries() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getSavedSummaries());
  }, []);
  function handleRemove(articleId) {
    setItems(removeSummary(articleId));
  }
  return (
    <main className="page">
      <h2 className="section-heading">My Summaries</h2>
      {items.length === 0 ? (
        <EmptyBlock message="You haven't saved any summaries yet. Open an article and hit Summarize → Save summary." />
      ) : (
        <div className="saved-list">
          {items.map((item) => (
            <div className="saved-item" key={item.articleId + item.savedAt}>
              <div className="saved-item-header">
                <span className="saved-item-title">{item.title}</span>
                <span className="saved-item-date">
                  {new Date(item.savedAt).toLocaleString()}
                </span>
              </div>
              <div className="article-source">{item.source}</div>
              <div className="summary-box" style={{ marginTop: 10 }}>
                <ul>
                  {item.summary
                    .split('\n')
                    .map((l) => l.replace(/^[\s*•-]+/, '').trim())
                    .filter(Boolean)
                    .map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                </ul>
              </div>
              <div className="detail-actions" style={{ marginTop: 12, marginBottom: 0 }}>
                {item.url && (
                  <a className="btn btn-outline" href={item.url} target="_blank" rel="noreferrer">
                    Read article ↗
                  </a>
                )}
                <button className="remove-btn" onClick={() => handleRemove(item.articleId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
