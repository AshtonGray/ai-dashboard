import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components';
import { HomePage, ProductPage, LearningPathPage } from '../pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="learning-paths/:id" element={<LearningPathPage />} />
      </Route>
    </Routes>
  );
}
