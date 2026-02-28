import './StateBadge.css';

/** @param {{ status: 'available'|'pilot'|'evaluation', label?: string }} props */
export default function StateBadge({ status, label }) {
  const stateClass =
    status === 'available'
      ? 'available'
      : status === 'pilot'
        ? 'pilot'
        : status === 'evaluation'
          ? 'evaluation'
          : '';
  return <span className={`state-badge ${stateClass}`}>{label || status}</span>;
}
