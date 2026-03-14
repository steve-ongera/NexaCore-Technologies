import React from 'react'

/**
 * SectionHeader — consistent section title block.
 *
 * Props:
 *   tag       – { icon: 'bi-xxx', text: 'Label text' }
 *   title     – Main section heading (h2)
 *   subtitle  – Optional paragraph below heading
 *   center    – Boolean — center-align (default left)
 *   light     – Boolean — white text for dark backgrounds
 *   maxWidth  – Override max-width of centred subtitle (default 640px)
 */
export default function SectionHeader({
  tag,
  title,
  subtitle,
  center = false,
  light = false,
  maxWidth = 640,
}) {
  const titleStyle = light ? { color: 'var(--white)' } : {}
  const subtitleStyle = light ? { color: 'var(--gray-400)' } : {}

  return (
    <header
      className={`section-header ${center ? 'section-header--center' : ''}`}
      style={center ? { maxWidth, marginLeft: 'auto', marginRight: 'auto' } : {}}
    >
      {/* Tag pill */}
      {tag && (
        <div className="label-tag" aria-label={`Section category: ${tag.text}`}>
          <i className={`bi ${tag.icon || 'bi-star-fill'}`} aria-hidden="true" />
          <span>{tag.text}</span>
        </div>
      )}

      {/* Main heading */}
      <h2 style={titleStyle}>{title}</h2>

      {/* Accent divider — only on centred layout */}
      {center && (
        <div className="section-header__divider" aria-hidden="true" />
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="section-header__subtitle" style={subtitleStyle}>
          {subtitle}
        </p>
      )}
    </header>
  )
}