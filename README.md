# The Daily Wire — News Dashboard with AI Summarizer

A React + Vite news dashboard built for **Assignment 4: ReactJS + API + LLM**.
Pulls live headlines from NewsAPI and summarizes any article into 3 bullet
points using Google's Gemini API.

## Setup

```bash
npm install
cp .env.example .env
```

Then open `.env` and add your own keys:

```
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

- Get a free NewsAPI key at https://newsapi.org
- Get a free Gemini API key at https://ai.google.dev/gemini-api/docs

Run the dev server:

```bash
npm run dev
```

Then open http://localhost:5173

## What's implemented

**A. Frontend**
- Fixed navbar with logo, Home / My Summaries links, search bar (`Navbar.jsx`)
- Category tabs (Top Stories, Business, Tech, Sports, Health) that refetch from NewsAPI (`CategoryTabs.jsx`)
- Scrollable article card grid with thumbnail, source, hover highlight (`ArticleCard.jsx`, `ArticleList.jsx`)
- Full article detail view: title, image, source, author, date, "Read full article" link (`ArticleDetail.jsx`)
- Summarize button with loading/error states, calling Gemini directly from the browser (`Summarizer.jsx`, `utils/gemini.js`)

**B. API integration**
- NewsAPI calls via axios, parametrized by category or search keyword, with a spinner while loading (`hooks/useNews.js`)
- Graceful error handling — network failures and empty results show a custom message, never a browser `alert()`
- Gemini summarizer prompts: *"Summarize the following article in 3 concise bullet points"*
- **Bonus:** responses are cached in `sessionStorage` for 5 minutes per category/query to avoid redundant fetches (`utils/cache.js`)

**Saved summaries**
- Since there's no backend by default, "Save summary" stores entries in `sessionStorage`, viewable on the **My Summaries** page. This is a drop-in stand-in for the bonus MongoDB-backed backend described in the assignment (see below for how to wire that up for real).

## Project structure

```
src/
  components/    Navbar, CategoryTabs, ArticleCard, ArticleList, Summarizer, StateBlocks
  pages/         Home, ArticleDetail, SavedSummaries
  hooks/         useNews.js (NewsAPI fetching)
  utils/         gemini.js (LLM call), cache.js (sessionStorage helpers)
```

## Going further: the bonus Express/MongoDB backend

The assignment's bonus section (Part C, 80 pts) asks you to move the Gemini
call to a backend and persist saved summaries in MongoDB instead of
`sessionStorage`. That's a separate Node/Express project with:

- `db.js` — Mongo connection
- `models/user.model.js`, `models/savedArticle.model.js`
- `routes/auth.routes.js` (`/signup`, `/login`)
- `routes/user.routes.js` (`GET /saved`, `POST /saved`)
- `controllers/summarizer.controller.js` — moves the Gemini `fetch` call server-side so your API key never reaches the browser

If you want, this can be scaffolded next as a companion `server/` folder —
just ask and it'll be built out the same way this frontend was.
