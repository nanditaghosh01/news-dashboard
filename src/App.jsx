import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import SavedSummaries from './pages/SavedSummaries.jsx';
export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/saved" element={<SavedSummaries />} />
      </Routes>
      <footer className="footer-note">The Daily Wire — built with React · NewsAPI · Gemini</footer>
    </div>
  );
}
