export function Spinner({ inline = false }) {
  return <span className={`spinner ${inline ? 'spinner-inline' : ''}`} role="status" aria-label="Loading" />;
}
export function LoadingBlock({ label = 'Fetching the latest headlines…' }) {
  return (
    <div className="state-block">
      <Spinner />
      <span>{label}</span>
    </div>
  );
}
export function ErrorBlock({ message, onRetry }) {
  return (
    <div className="state-block">
      <div className="error-block">{message}</div>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
export function EmptyBlock({ message = 'No articles found.' }) {
  return (
    <div className="state-block empty-block">
      <div className="empty-icon">—</div>
      <span>{message}</span>
    </div>
  );
}
