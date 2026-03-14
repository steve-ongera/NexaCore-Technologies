import React from 'react'
import { Link } from 'react-router-dom'

/**
 * ServiceCard — displays a single service in the grid.
 *
 * Props:
 *   service – { id, slug, title, tagline, description, icon, category_name, is_featured }
 *   variant – 'default' | 'dark' | 'minimal'
 */
export default function ServiceCard({ service, variant = 'default' }) {
  const {
    slug,
    title,
    tagline,
    description,
    icon = 'bi-gear',
    category_name,
    is_featured,
  } = service

  const excerpt = tagline || (description?.length > 110 ? description.slice(0, 110) + '…' : description)

  if (variant === 'dark') {
    return (
      <Link to={`/services/${slug}`} className="service-card service-card--dark">
        <div className="service-card__icon service-card__icon--glow">
          <i className={`bi ${icon}`} aria-hidden="true" />
        </div>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <span className="service-card__arrow">
          Explore <i className="bi bi-arrow-right" aria-hidden="true" />
        </span>
      </Link>
    )
  }

  if (variant === 'minimal') {
    return (
      <Link to={`/services/${slug}`} className="service-card service-card--minimal">
        <i className={`bi ${icon} service-card--minimal__icon`} aria-hidden="true" />
        <span>{title}</span>
        <i className="bi bi-chevron-right" aria-hidden="true" />
      </Link>
    )
  }

  return (
    <article className="service-card" aria-label={`Service: ${title}`}>
      {/* Featured badge */}
      {is_featured && (
        <div className="service-card__badge" aria-label="Featured service">
          <i className="bi bi-star-fill" aria-hidden="true" /> Featured
        </div>
      )}

      {/* Icon */}
      <div className="service-icon" aria-hidden="true">
        <i className={`bi ${icon}`} />
      </div>

      {/* Category */}
      {category_name && (
        <span className="service-card__category">{category_name}</span>
      )}

      {/* Content */}
      <h3>{title}</h3>
      <p>{excerpt}</p>

      {/* CTA */}
      <Link
        to={`/services/${slug}`}
        className="read-more"
        aria-label={`Learn more about ${title}`}
      >
        Learn More <i className="bi bi-arrow-right" aria-hidden="true" />
      </Link>
    </article>
  )
}