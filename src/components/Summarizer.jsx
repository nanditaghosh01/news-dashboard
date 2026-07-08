import { useState } from 'react';
import { summarizeWithGemini } from '../utils/gemini.js';
import { Spinner } from './StateBlocks.jsx';
import { saveSummary } from '../utils/cache.js';
export default function Summarizer({ article, articleId }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  async function handleSummarize() {
    setLoading(true);
    setError(null);
    try {
      const textToSummarize = article.content || article.description || article.title;
      const result = await summarizeWithGemini(textToSummarize);
      setSummary(result);
    } catch (err) {
      setError(err.message || 'Could not generate a summary right now.');
    } finally {
      setLoading(false);
    }
  }
  function handleSave() {
    saveSummary({
      articleId,
      title: article.title,
      source: article.source?.name,
      url: article.url,
      summary,
      savedAt: new Date().toISOString(),
    });
    setSaved(true);
  }
  return (
    <div>
      <div className="detail-actions">
        <button className="btn btn-accent" onClick={handleSummarize} disabled={loading}>
          {loading && <Spinner inline />}
          {loading ? 'Summarizing…' : summary ? 'Re-summarize' : 'Summarize'}
        </button>
        {summary && (
          <button className="btn btn-save" onClick={handleSave} disabled={saved}>
            {saved ? 'Saved ✓' : 'Save summary'}
          </button>
        )}
      </div>
      {error && <div className="error-block">{error}</div>}
      {summary && !error && (
        <div className="summary-box">
          <h3>AI Summary</h3>
          <ul>
            {summary
              .split('\n')
              .map((line) => line.replace(/^[\s*•-]+/, '').trim())
              .filter(Boolean)
              .map((line, i) => (
                <li key={i}>{line}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
