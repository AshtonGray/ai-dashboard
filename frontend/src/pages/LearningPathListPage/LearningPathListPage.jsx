import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LearningPathCard from '../../components/LearningPathCard';
import { getLearnings } from '../../api/client';
import './LearningPathListPage.css';

function matchLearning(query, learning) {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  const title = (learning.title || '').toLowerCase();
  const overview = (learning.overview || '').toLowerCase();
  const topics = (learning.modules || []).map((m) => m.title).join(' ').toLowerCase();
  return title.includes(q) || overview.includes(q) || topics.includes(q);
}

export default function LearningPathListPage() {
  const [search, setSearch] = useState('');
  const [learnings, setLearnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    getLearnings()
      .then((data) => { if (!cancelled) setLearnings(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load learning paths'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    return learnings.filter((l) => matchLearning(search, l));
  }, [learnings, search]);

  return (
    <div className="list-page">
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to home
        </Link>
        <header className="list-page-header">
          <h1 className="list-page-title">Learning Paths</h1>
          <p className="list-page-desc">
            Structured curricula to grow from fundamentals to advanced AI engineering.
          </p>
          <div className="list-page-search">
            <input
              type="search"
              placeholder="Search learning paths..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="list-search-input"
              aria-label="Search learning paths"
            />
          </div>
        </header>
        {loading ? (
          <p className="list-page-empty">Loading learning paths…</p>
        ) : error ? (
          <p className="list-page-empty error">{error}</p>
        ) : filtered.length > 0 ? (
          <div className="list-page-grid">
            {filtered.map((l) => (
              <LearningPathCard key={l.slug} learning={l} />
            ))}
          </div>
        ) : (
          <p className="list-page-empty">
            {search.trim() ? `No learning paths match "${search}".` : 'No learning paths available.'}
          </p>
        )}
      </div>
    </div>
  );
}
