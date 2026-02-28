import { Link } from 'react-router-dom';
import StateBadge from '../StateBadge';
import { statusToLabel } from '../../data';
import './LearningPathCard.css';

function LearningLogo({ title }) {
  const text = title
    .split(/\s/)
    .map((w) => w.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return <div className="card-logo">{text}</div>;
}

export default function LearningPathCard({ learning }) {
  const { slug, title, overview, status, lastUpdated } = learning;

  return (
    <article className="card">
      <Link to={`/learning-paths/${slug}`} className="card-link">
        <div className="card-head">
          <LearningLogo title={title} />
          <div className="card-meta">
            <StateBadge status={status} label={statusToLabel(status)} />
            {lastUpdated && <span className="card-updated">Updated {lastUpdated}</span>}
          </div>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{overview}</p>
        <span className="card-view-details">View details →</span>
      </Link>
    </article>
  );
}
