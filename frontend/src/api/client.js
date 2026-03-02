import axios from 'axios';

// In production, use relative paths since frontend is served from same domain.
// In development, use the configured API URL or default to localhost.
const API_BASE_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** @param {'available'|'pilot'|'evaluation'} status */
export function statusToLabel(status) {
  if (status === 'available') return 'Available';
  if (status === 'pilot') return 'Pilot';
  if (status === 'evaluation') return 'Evaluation';
  return status ?? '';
}

export async function getProducts(config) {
  const { data } = await api.get('/api/products', config);
  return data;
}

export async function getProduct(slug, config) {
  const { data } = await api.get(`/api/products/${encodeURIComponent(slug)}`, config);
  return data;
}

export async function getLearnings(config) {
  const { data } = await api.get('/api/learning-paths', config);
  return data;
}

export async function getLearning(slug, config) {
  const { data } = await api.get(`/api/learning-paths/${encodeURIComponent(slug)}`, config);
  return data;
}

export async function healthCheck() {
  const { data } = await api.get('/api/health');
  return data;
}
