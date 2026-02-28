import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data';
import './ProductListPage.css';

function matchProduct(query, product) {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  const name = (product.name || '').toLowerCase();
  const desc = (product.shortDescription || '').toLowerCase();
  const details = (product.details || []).join(' ').toLowerCase();
  return name.includes(q) || desc.includes(q) || details.includes(q);
}

export default function ProductListPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => matchProduct(search, p));
  }, [search]);

  return (
    <div className="list-page">
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to home
        </Link>
        <header className="list-page-header">
          <h1 className="list-page-title">Products &amp; Tools</h1>
          <p className="list-page-desc">
            AI engineering products and platforms for building, deploying, and governing AI systems.
          </p>
          <div className="list-page-search">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="list-search-input"
              aria-label="Search products"
            />
          </div>
        </header>
        {filtered.length > 0 ? (
          <div className="list-page-grid">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="list-page-empty">
            {search.trim() ? `No products match "${search}".` : 'No products available.'}
          </p>
        )}
      </div>
    </div>
  );
}
