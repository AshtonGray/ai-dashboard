import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLearning, statusToLabel } from '../../api/client';
import StateBadge from '../../components/StateBadge';
import './LearningPathPage.css';

export default function LearningPathPage() {
  const { id: slug } = useParams();
  const [learning, setLearning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setError(null);
    getLearning(slug)
      .then((data) => { if (!cancelled) setLearning(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load learning path'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (learning) document.title = `${learning.title} – AI Engineering`;
    return () => {
      document.title = 'AI Engineering – Offerings';
    };
  }, [learning]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="container">
          <Link to="/learning-paths" className="back-link">← Back to learning paths</Link>
          <p className="page-message">Loading learning path…</p>
        </div>
      </div>
    );
  }

  if (error || !learning) {
    return (
      <div className="detail-page">
        <div className="container">
          <Link to="/learning-paths" className="back-link">← Back to learning paths</Link>
          <div className="page-message error">{error || 'Learning path not found.'}</div>
        </div>
      </div>
    );
  }

  const { modules, materials, actions } = learning;

  return (
    <div className="detail-page">
      <div className="container">
        <Link to="/learning-paths" className="back-link">
          ← Back to learning paths
        </Link>

        <header className="detail-hero">
          <div className="detail-hero-meta">
            <StateBadge status={learning.status} label={statusToLabel(learning.status)} />
            {learning.lastUpdated && (
              <span className="detail-hero-updated">Updated {learning.lastUpdated}</span>
            )}
          </div>
          <h1 className="detail-hero-title">{learning.title}</h1>
          <p className="detail-hero-desc">{learning.overview}</p>
        </header>

        <div className="detail-grid">
          {modules?.length > 0 && (
            <section className="detail-card detail-card-modules detail-card-reveal">
              <h2 className="detail-card-title">Curriculum</h2>
              <ul className="detail-modules-list">
                {modules.map((mod, i) => (
                  <li key={i}>
                    {mod.href ? (
                      <a href={mod.href}>{mod.title}</a>
                    ) : (
                      <span>{mod.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {materials?.length > 0 && (
            <section className="detail-card detail-card-reveal">
              <h2 className="detail-card-title">Materials</h2>
              <ul className="detail-materials">
                {materials.map((m, i) => (
                  <li key={i}>
                    <a href={m.href}>{m.label}</a>
                    {m.gated && <span className="material-gated">Gated</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {actions?.length > 0 && (
            <section className="detail-card detail-card-actions detail-card-reveal">
              <h2 className="detail-card-title">Get started</h2>
              <div className="detail-actions">
                {actions.map((a, i) => (
                  <a
                    key={i}
                    href={a.href}
                    className={a.kind === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'}
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
