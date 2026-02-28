import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components';
import {
  HomePage,
  ProductListPage,
  ProductPage,
  LearningPathListPage,
  LearningPathPage,
} from '../pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products">
          <Route index element={<ProductListPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="learning-paths">
          <Route index element={<LearningPathListPage />} />
          <Route path=":id" element={<LearningPathPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
