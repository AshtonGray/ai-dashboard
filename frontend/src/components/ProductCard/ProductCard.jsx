import { Link } from 'react-router-dom';
import StateBadge from '../StateBadge';
import { statusToLabel } from '../../api/client';
import './ProductCard.css';

function ProductLogo({ logo, name }) {
  const display = logo?.url
    ? { type: 'img', src: logo.url, alt: name }
    : { type: 'text', text: logo?.text ?? name.split(/\s/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() };
  if (display.type === 'img') {
    return (
      <div className="card-logo card-logo-img">
        <img src={display.src} alt={display.alt} />
      </div>
    );
  }
  return <div className="card-logo">{display.text}</div>;
}

export default function ProductCard({ product }) {
  const { slug, name, shortDescription, status, lastUpdated } = product;

  return (
    <article className="card">
      <Link to={`/products/${slug}`} className="card-link">
        <div className="card-head">
          <ProductLogo logo={product.logo} name={name} />
          <div className="card-meta">
            <StateBadge status={status} label={statusToLabel(status)} />
            {lastUpdated && <span className="card-updated">Updated {lastUpdated}</span>}
          </div>
        </div>
        <h3 className="card-title">{name}</h3>
        <p className="card-desc">{shortDescription}</p>
        <span className="card-view-details">View details →</span>
      </Link>
    </article>
  );
}
