import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/?q=${encodeURIComponent(trimmed)}`);
  }
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">WIRE</span>
          <span className="brand-title">The Daily Wire</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Summaries
          </NavLink>
        </nav>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search headlines…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search articles"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}
