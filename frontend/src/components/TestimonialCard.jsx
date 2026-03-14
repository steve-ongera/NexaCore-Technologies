import React, { useState } from 'react'

/**
 * TestimonialCard — client review card.
 *
 * Props:
 *   t – { client_name, client_position, client_company, photo_display,
 *          content, rating, service_title }
 *   variant – 'default' | 'compact'
 */
export default function TestimonialCard({ t, variant = 'default' }) {
  const [imgError, setImgError] = useState(false)
  const {
    client_name = 'Anonymous',
    client_position,
    client_company,
    photo_display,
    content,
    rating = 5,
    service_title,
  } = t

  const initials = client_name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const stars = Math.min(5, Math.max(1, Math.round(rating)))

  if (variant === 'compact') {
    return (
      <blockquote className="testimonial-card testimonial-card--compact">
        <div className="stars" aria-label={`${stars} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={i < stars ? 'bi bi-star-fill' : 'bi bi-star'}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="testimonial-text">"{content}"</p>
        <footer className="testimonial-author">
          <div className="testimonial-avatar" aria-hidden="true">
            {photo_display && !imgError ? (
              <img src={photo_display} alt={client_name} onError={() => setImgError(true)} />
            ) : (
              initials
            )}
          </div>
          <div className="testimonial-info">
            <cite>{client_name}</cite>
            {client_position && <span>{client_position}</span>}
          </div>
        </footer>
      </blockquote>
    )
  }

  return (
    <blockquote className="testimonial-card" aria-label={`Testimonial from ${client_name}`}>
      {/* Quote mark */}
      <div className="testimonial-card__quote" aria-hidden="true">"</div>

      {/* Star rating */}
      <div
        className="stars"
        role="img"
        aria-label={`Rated ${stars} out of 5 stars`}
      >
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={i < stars ? 'bi bi-star-fill' : 'bi bi-star'}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Service tag */}
      {service_title && (
        <div className="testimonial-service" aria-label={`About service: ${service_title}`}>
          <i className="bi bi-check-circle-fill" aria-hidden="true" />
          {service_title}
        </div>
      )}

      {/* Content */}
      <p className="testimonial-text">{content}</p>

      {/* Author */}
      <footer className="testimonial-author">
        <div className="testimonial-avatar" aria-hidden="true">
          {photo_display && !imgError ? (
            <img
              src={photo_display}
              alt={client_name}
              onError={() => setImgError(true)}
            />
          ) : (
            <span aria-hidden="true">{initials}</span>
          )}
        </div>
        <div className="testimonial-info">
          <cite className="testimonial-name">{client_name}</cite>
          {(client_position || client_company) && (
            <span className="testimonial-role">
              {[client_position, client_company].filter(Boolean).join(', ')}
            </span>
          )}
        </div>
        {/* Verified badge */}
        <div className="testimonial-verified" aria-label="Verified client">
          <i className="bi bi-patch-check-fill" aria-hidden="true" />
        </div>
      </footer>
    </blockquote>
  )
}