import React, { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Rough read-time estimate.
 * Average adult reads ~200 words/min.
 */
function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.ceil(words / 200))
  return `${mins} min read`
}

/**
 * BlogCard — article preview card.
 *
 * Props:
 *   post    – { id, slug, title, excerpt, cover_display, author_name, author_photo,
 *               published_at, category_name, tags, content }
 *   variant – 'default' | 'featured' (larger hero-style card)
 */
export default function BlogCard({ post, variant = 'default' }) {
  const [imgError, setImgError] = useState(false)
  const {
    slug,
    title,
    excerpt,
    cover_display,
    author_name,
    author_photo,
    published_at,
    category_name,
    tags = [],
    content = '',
  } = post

  const date = published_at
    ? new Date(published_at).toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  const readTime = estimateReadTime(content || excerpt || '')
  const postTags = Array.isArray(tags) ? tags : []

  if (variant === 'featured') {
    return (
      <article className="blog-card blog-card--featured" aria-label={`Article: ${title}`}>
        <Link to={`/blog/${slug}`} className="blog-card__img-link" aria-hidden="true" tabIndex={-1}>
          <div className="blog-img blog-img--featured">
            {cover_display && !imgError ? (
              <img src={cover_display} alt={title} loading="lazy" onError={() => setImgError(true)} />
            ) : (
              <div className="blog-img__placeholder"><i className="bi bi-newspaper" /></div>
            )}
          </div>
        </Link>
        <div className="blog-card__body blog-card__body--featured">
          {category_name && <div className="blog-category">{category_name}</div>}
          <h2>
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h2>
          <p>{excerpt}</p>
          <div className="blog-meta">
            {author_name && (
              <span className="blog-meta__author">
                {author_photo && !imgError
                  ? <img src={author_photo} alt={author_name} className="blog-meta__avatar" />
                  : <i className="bi bi-person-circle" aria-hidden="true" />
                }
                {author_name}
              </span>
            )}
            {date && <span><i className="bi bi-calendar3" aria-hidden="true" /> {date}</span>}
            <span><i className="bi bi-clock" aria-hidden="true" /> {readTime}</span>
          </div>
          <Link to={`/blog/${slug}`} className="btn btn-primary" style={{ marginTop: 16 }}>
            Read Article <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="blog-card" aria-label={`Article: ${title}`}>
      {/* Cover */}
      <Link to={`/blog/${slug}`} className="blog-card__img-link" aria-hidden="true" tabIndex={-1}>
        <div className="blog-img">
          {cover_display && !imgError ? (
            <img
              src={cover_display}
              alt={`Cover image for ${title}`}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="blog-img__placeholder" aria-hidden="true">
              <i className="bi bi-newspaper" />
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="blog-body">
        {category_name && (
          <div className="blog-category" aria-label={`Category: ${category_name}`}>
            {category_name}
          </div>
        )}

        <h3>
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>

        {excerpt && <p>{excerpt}</p>}

        {/* Tags */}
        {postTags.length > 0 && (
          <div className="blog-tags" role="list" aria-label="Article tags">
            {postTags.slice(0, 3).map((t, i) => (
              <span key={i} className="tag" style={{ fontSize: '0.72rem' }} role="listitem">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="blog-meta">
          {author_name && (
            <span className="blog-meta__author">
              <i className="bi bi-person" aria-hidden="true" /> {author_name}
            </span>
          )}
          {date && (
            <span>
              <i className="bi bi-calendar3" aria-hidden="true" /> {date}
            </span>
          )}
          <span aria-label={`Estimated reading time: ${readTime}`}>
            <i className="bi bi-clock" aria-hidden="true" /> {readTime}
          </span>
        </div>
      </div>
    </article>
  )
}