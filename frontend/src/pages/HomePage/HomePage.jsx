import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import ProductCard from '../../components/ProductCard';
import LearningPathCard from '../../components/LearningPathCard';
import { getProducts, getLearnings } from '../../api/client';
import './HomePage.css';

export default function HomePage() {
  const { hash } = useLocation();
  const [products, setProducts] = useState([]);
  const [learnings, setLearnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    Promise.all([getProducts(), getLearnings()])
      .then(([productsData, learningsData]) => {
        if (!cancelled) {
          setProducts(productsData);
          setLearnings(learningsData);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load offerings');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  if (loading) {
    return (
      <>
        <Hero />
        <div className="container">
          <p className="page-message">Loading offerings…</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Hero />
        <div className="container">
          <p className="page-message error">{error}</p>
          <p className="page-message-hint">Ensure the backend is running on port 5000.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero />
      <section className="section" id="products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Products &amp; Tools</h2>
            <Link to="/products" className="section-view-all">View all →</Link>
          </div>
          <div className="cards-grid">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="learning-paths">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Learning Paths</h2>
            <Link to="/learning-paths" className="section-view-all">View all →</Link>
          </div>
          <div className="cards-grid">
            {learnings.map((lp) => (
              <LearningPathCard key={lp.slug} learning={lp} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
