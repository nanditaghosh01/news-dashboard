const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_KEY}`;
export async function summarizeWithGemini(text) {
  if (!GEMINI_KEY) {
    throw new Error(
      'Missing Gemini key. Add VITE_GEMINI_API_KEY to your .env file (see README).'
    );
  }
  const prompt = `Summarize the following article in 3 concise bullet points:\n\n${text}`;
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || `Gemini request failed (status ${res.status}).`);
  }
  const data = await res.json();
  const summaryText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!summaryText) {
    throw new Error('Gemini returned an empty response.');
  }
  return summaryText;
}
