import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/Hero';
import ProductCard from '../../components/ProductCard';
import LearningPathCard from '../../components/LearningPathCard';
import { products, learnings } from '../../data';
import './HomePage.css';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <section className="section" id="products">
        <div className="container">
          <h2 className="section-title">Products &amp; Tools</h2>
          <div className="cards-grid">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="learning-paths">
        <div className="container">
          <h2 className="section-title">Learning Paths</h2>
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
