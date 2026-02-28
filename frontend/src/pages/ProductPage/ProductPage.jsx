import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductBySlug, statusToLabel } from '../../data';
import StateBadge from '../../components/StateBadge';
import './ProductPage.css';

function ProductLogo({ logo, name }) {
  const display = logo?.url
    ? { type: 'img', src: logo.url, alt: name }
    : {
        type: 'text',
        text:
          logo?.text ??
          name
            .split(/\s/)
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
      };
  if (display.type === 'img') {
    return (
      <div className="detail-logo detail-logo-img">
        <img src={display.src} alt={display.alt} />
      </div>
    );
  }
  return <div className="detail-logo">{display.text}</div>;
}

export default function ProductPage() {
  const { id: slug } = useParams();
  const product = getProductBySlug(slug);

  useEffect(() => {
    if (product) document.title = `${product.name} – AI Engineering`;
    return () => {
      document.title = 'AI Engineering – Offerings';
    };
  }, [product]);

  if (!product) {
    return (
      <div className="detail-page">
        <div className="container">
          <Link to="/#products" className="back-link">
            ← Back to products
          </Link>
          <div className="page-message error">Product not found.</div>
        </div>
      </div>
    );
  }

  const { currentState, materials, actions } = product;

  return (
    <div className="detail-page">
      <div className="container">
        <Link to="/#products" className="back-link">
          ← Back to products
        </Link>

        <header className="detail-hero">
          <div className="detail-hero-top">
            <ProductLogo logo={product.logo} name={product.name} />
            <div className="detail-hero-meta">
              <StateBadge status={product.status} label={statusToLabel(product.status)} />
              {product.lastUpdated && (
                <span className="detail-hero-updated">Updated {product.lastUpdated}</span>
              )}
            </div>
          </div>
          <h1 className="detail-hero-title">{product.name}</h1>
          <p className="detail-hero-desc">{product.shortDescription}</p>
        </header>

        <div className="detail-grid">
          {product.details?.length > 0 && (
            <section className="detail-card detail-card-reveal">
              <h2 className="detail-card-title">What it offers</h2>
              <ul className="detail-list">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </section>
          )}

          {currentState && (
            <section className="detail-card detail-card-reveal">
              <h2 className="detail-card-title">Current state</h2>
              <dl className="detail-dl">
                <div className="detail-dl-row">
                  <dt>Eligibility</dt>
                  <dd>{currentState.eligibility}</dd>
                </div>
                <div className="detail-dl-row">
                  <dt>Access</dt>
                  <dd>{currentState.access}</dd>
                </div>
                {currentState.support != null && (
                  <div className="detail-dl-row">
                    <dt>Support</dt>
                    <dd>{currentState.support}</dd>
                  </div>
                )}
              </dl>
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
