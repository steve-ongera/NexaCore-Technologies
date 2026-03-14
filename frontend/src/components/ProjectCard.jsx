import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const STATUS_CONFIG = {
  completed: { label: 'Completed', color: 'var(--green)', bg: 'rgba(16,185,129,.1)' },
  ongoing: { label: 'In Progress', color: 'var(--orange)', bg: 'rgba(249,115,22,.1)' },
  upcoming: { label: 'Upcoming', color: 'var(--blue-light)', bg: 'rgba(59,130,246,.1)' },
}

/**
 * ProjectCard — portfolio project thumbnail card.
 *
 * Props:
 *   project – { id, slug, title, description, client, technologies, image_display, status, category_name }
 */
export default function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false)
  const {
    slug,
    title,
    description,
    client,
    technologies = [],
    image_display,
    status = 'completed',
    category_name,
  } = project

  const techs = Array.isArray(technologies) ? technologies : []
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.completed
  const excerpt = description?.length > 100 ? description.slice(0, 100) + '…' : description

  return (
    <article className="project-card" aria-label={`Project: ${title}`}>
      {/* Image */}
      <div className="project-img">
        {image_display && !imgError ? (
          <img
            src={image_display}
            alt={`${title} project screenshot`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-img__placeholder" aria-hidden="true">
            <i className="bi bi-window-stack" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="project-overlay" aria-hidden="true">
          <Link
            to={`/portfolio/${slug}`}
            className="btn btn-sm btn-white"
            tabIndex={-1}
          >
            View Case Study <i className="bi bi-arrow-right" />
          </Link>
        </div>

        {/* Status pill */}
        <div
          className="project-status"
          style={{ background: statusCfg.bg, color: statusCfg.color }}
          aria-label={`Status: ${statusCfg.label}`}
        >
          <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }} aria-hidden="true" />
          {statusCfg.label}
        </div>
      </div>

      {/* Body */}
      <div className="project-body">
        {/* Tech stack */}
        {techs.length > 0 && (
          <div className="project-tags" role="list" aria-label="Technologies used">
            {techs.slice(0, 4).map((t, i) => (
              <span key={i} className="tag" role="listitem">{t}</span>
            ))}
            {techs.length > 4 && (
              <span className="tag tag--more">+{techs.length - 4}</span>
            )}
          </div>
        )}

        <h3>
          <Link to={`/portfolio/${slug}`} className="project-card__title-link">
            {title}
          </Link>
        </h3>

        {excerpt && <p>{excerpt}</p>}

        {/* Footer meta */}
        <div className="project-meta">
          <span className="project-meta__client" aria-label={`Client: ${client}`}>
            {client && <><i className="bi bi-building" aria-hidden="true" /> {client}</>}
          </span>
          {category_name && (
            <span className="tag" style={{ fontSize: '0.72rem' }}>{category_name}</span>
          )}
        </div>
      </div>
    </article>
  )
}