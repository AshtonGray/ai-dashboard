/**
 * Local data for AI Engineering offerings (no backend).
 * Product and learning shapes match the canonical data structures.
 */

/** @param {'available'|'pilot'|'evaluation'} status */
export function statusToLabel(status) {
  if (status === 'available') return 'Available';
  if (status === 'pilot') return 'Pilot';
  if (status === 'evaluation') return 'Evaluation';
  return status ?? '';
}

export const products = [
  {
    type: 'product',
    slug: 'ai-platform',
    name: 'AI Platform',
    logo: { text: 'AP' },
    shortDescription:
      'Unified platform for training, deploying, and monitoring machine learning models at scale.',
    status: 'available',
    details: [
      'Supports multiple frameworks and runtimes',
      'End-to-end ML lifecycle from experiment to production',
      'Built-in monitoring and model registry',
    ],
    currentState: {
      eligibility: 'All engineering teams',
      access: 'Self-service via onboarding',
      support: 'Documentation and Slack channel',
    },
    materials: [
      { label: 'Evaluation notes', href: '#', gated: false },
      { label: 'Architecture overview', href: '#', gated: false },
    ],
    actions: [
      { label: 'Self-service onboarding', href: '#onboard', kind: 'primary' },
    ],
    lastUpdated: '2025-02-15',
  },
  {
    type: 'product',
    slug: 'ml-governance',
    name: 'ML Governance',
    logo: { text: 'MG' },
    shortDescription:
      'Policy, compliance, and model risk management for AI systems.',
    status: 'pilot',
    details: [
      'Track lineage, fairness, and explainability',
      'Policy enforcement and compliance reporting',
      'Model risk and validation workflows',
    ],
    currentState: {
      eligibility: 'Pilot teams by invitation',
      access: 'Request via pilot list',
      support: 'Dedicated pilot support',
    },
    materials: [
      { label: 'Pilot scope', href: '#', gated: true },
      { label: 'Evaluation notes', href: '#', gated: false },
    ],
    actions: [{ label: 'Join pilot list', href: '#pilot', kind: 'primary' }],
    lastUpdated: '2025-02-10',
  },
  {
    type: 'product',
    slug: 'ai-studio',
    name: 'AI Studio',
    logo: { text: 'AS' },
    shortDescription:
      'Notebooks, experiments, and quick prototypes with shared compute.',
    status: 'evaluation',
    details: [
      'Integrates with version control',
      'Shared GPU and CPU compute',
      'Experiment tracking and comparison',
    ],
    currentState: {
      eligibility: 'Under evaluation',
      access: 'Join waitlist',
      support: 'Limited documentation',
    },
    materials: [
      { label: 'Evaluation notes', href: '#', gated: false },
      { label: 'Feature comparison', href: '#', gated: false },
    ],
    actions: [{ label: 'Join pilot list', href: '#pilot', kind: 'primary' }],
    lastUpdated: '2025-02-01',
  },
];

export const learnings = [
  {
    type: 'learning',
    slug: 'ai-fundamentals',
    title: 'AI Engineering Fundamentals',
    status: 'available',
    overview:
      'Core concepts: data pipelines, model training, deployment, and monitoring. Hands-on labs and capstone project. From zero to production-ready in 8 weeks.',
    modules: [
      { title: 'Data & features', href: '#' },
      { title: 'Training & tuning', href: '#' },
      { title: 'Deployment', href: '#' },
      { title: 'Monitoring', href: '#' },
    ],
    materials: [
      { label: 'Syllabus', href: '#', gated: false },
      { label: 'Lab environment guide', href: '#', gated: false },
    ],
    actions: [{ label: 'Enroll', href: '#enroll', kind: 'primary' }],
    lastUpdated: '2025-02-12',
  },
  {
    type: 'learning',
    slug: 'advanced-ml-ops',
    title: 'Advanced MLOps',
    status: 'pilot',
    overview:
      'CI/CD for ML, feature stores, A/B testing, and incident response. For engineers who already ship models. Scale and automate in 6 weeks.',
    modules: [
      { title: 'CI/CD for ML', href: '#' },
      { title: 'Feature stores', href: '#' },
      { title: 'Experimentation', href: '#' },
      { title: 'Incident response', href: '#' },
    ],
    materials: [
      { label: 'Pilot curriculum', href: '#', gated: true },
    ],
    actions: [{ label: 'Join pilot list', href: '#pilot', kind: 'primary' }],
    lastUpdated: '2025-02-08',
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getLearningBySlug(slug) {
  return learnings.find((l) => l.slug === slug) ?? null;
}
