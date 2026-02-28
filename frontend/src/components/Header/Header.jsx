import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="site-logo">
          AI Engineering
        </Link>
        <nav className="nav-links">
          <Link to="/#products">Products</Link>
          <Link to="/#learning-paths">Learning Paths</Link>
        </nav>
      </div>
    </header>
  );
}
