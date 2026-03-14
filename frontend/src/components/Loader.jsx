import React from 'react'

/**
 * Loader — loading state indicator.
 *
 * Props:
 *   message  – Text below spinner
 *   variant  – 'page' | 'inline' | 'overlay' | 'skeleton'
 *   count    – Number of skeleton cards to render (variant='skeleton')
 */
export default function Loader({ message = 'Loading…', variant = 'page', count = 3 }) {

  if (variant === 'inline') {
    return (
      <div className="loader-inline" role="status" aria-live="polite">
        <div className="spinner spinner--sm" aria-hidden="true" />
        <span>{message}</span>
      </div>
    )
  }

  if (variant === 'overlay') {
    return (
      <div className="loader-overlay" role="status" aria-live="polite" aria-label={message}>
        <div className="loader-overlay__box">
          <div className="loader-brand" aria-hidden="true">
            <div className="logo-icon"><i className="bi bi-cpu-fill" /></div>
          </div>
          <div className="spinner" aria-hidden="true" />
          <p>{message}</p>
        </div>
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className="skeleton-grid" aria-busy="true" aria-label="Loading content…">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton--image" />
            <div className="skeleton-card__body">
              <div className="skeleton skeleton--line skeleton--short" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line skeleton--medium" />
              <div className="skeleton skeleton--line skeleton--short" style={{ marginTop: 16 }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default: 'page'
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label={message}>
      {/* Branded logo */}
      <div className="loader-brand" aria-hidden="true">
        <div className="logo-icon logo-icon--lg">
          <i className="bi bi-cpu-fill" />
        </div>
      </div>

      {/* Spinner */}
      <div className="spinner" aria-hidden="true" />

      {/* Message */}
      <p className="loader-message">{message}</p>
    </div>
  )
}