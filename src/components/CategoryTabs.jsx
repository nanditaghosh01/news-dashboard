const CATEGORIES = ['general', 'business', 'technology', 'sports', 'health'];
const LABELS = {
  general: 'Top Stories',
  business: 'Business',
  technology: 'Tech',
  sports: 'Sports',
  health: 'Health',
};
export default function CategoryTabs({ active, onSelect }) {
  return (
    <div className="tabs-bar">
      <div className="tabs-inner">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${active === cat ? 'active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            {LABELS[cat]}
          </button>
        ))}
      </div>
    </div>
  );
}
