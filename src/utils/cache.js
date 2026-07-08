const CACHE_PREFIX = 'newsdash:cache:';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
export function getCached(key) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
export function setCached(key, data) {
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {}
}
const SAVED_KEY = 'newsdash:saved-summaries';
export function getSavedSummaries() {
  try {
    const raw = sessionStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
export function saveSummary(entry) {
  const list = getSavedSummaries();
  const next = [entry, ...list.filter((s) => s.articleId !== entry.articleId)];
  sessionStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}
export function removeSummary(articleId) {
  const next = getSavedSummaries().filter((s) => s.articleId !== articleId);
  sessionStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}
