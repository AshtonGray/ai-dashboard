import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import CloudCursorBackground from '../CloudCursorBackground';
import './Layout.css';

export default function Layout() {
  return (
    <>
      <CloudCursorBackground />
      <div className="layout-content">
        <Header />
        <main className="layout-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
