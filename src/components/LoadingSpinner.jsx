import './LoadingSpinner.css';

/**
 * Modern loading indicator for data fetched from the backend.
 * Use variant="hero" for hero/full-width areas, variant="section" for sections, variant="page" for full list pages.
 */
export default function LoadingSpinner({ message = 'Loading…', variant = 'section' }) {
  return (
    <div
      className={`loading-spinner loading-spinner--${variant}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="loading-spinner__ring">
        <span className="loading-spinner__dot" />
        <span className="loading-spinner__dot" />
        <span className="loading-spinner__dot" />
      </div>
      <p className="loading-spinner__message">{message}</p>
    </div>
  );
}
