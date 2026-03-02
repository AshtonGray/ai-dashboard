import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../api/client';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    getProducts()
      .then((data) => { if (!cancelled) setProducts(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load products'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => matchProduct(search, p));
  }, [products, search]);

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
        {loading ? (
          <p className="list-page-empty">Loading products…</p>
        ) : error ? (
          <p className="list-page-empty error">{error}</p>
        ) : filtered.length > 0 ? (
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
