import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * PageHero — full-width dark hero for interior pages.
 *
 * Props:
 *   title       – Main H1 heading
 *   subtitle    – Optional paragraph below heading
 *   breadcrumbs – Array of { label, href? } — last item has no href
 *   tag         – Optional { icon, text } label above title
 *   actions     – Optional array of { label, href, icon, variant }
 *   bgVariant   – 'default' | 'blue' | 'cyan' (radial gradient tint)
 */
export default function PageHero({
  title,
  subtitle,
  breadcrumbs = [],
  tag,
  actions = [],
  bgVariant = 'default',
}) {
  const canvasRef = useRef(null)

  // Subtle particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const gradients = {
    default: 'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(37,99,235,.18) 0%, transparent 70%)',
    blue: 'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(37,99,235,.28) 0%, transparent 70%)',
    cyan: 'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(6,182,212,.25) 0%, transparent 70%)',
  }

  return (
    <section className="page-hero" aria-label="Page header">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: gradients[bgVariant] || gradients.default }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="page-hero__grid"
      />

      <div className="container">
        <div className="page-hero__content">

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol style={{ display: 'flex', alignItems: 'center', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
                <li>
                  <Link to="/" aria-label="Home">
                    <i className="bi bi-house-fill" style={{ fontSize: '0.8rem' }} />
                  </Link>
                </li>
                {breadcrumbs.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem', color: 'var(--gray-400)' }} aria-hidden="true" />
                    {b.href
                      ? <Link to={b.href}>{b.label}</Link>
                      : <span aria-current="page">{b.label}</span>
                    }
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Tag */}
          {tag && (
            <div className="label-tag page-hero__tag animate-fade-up">
              <i className={`bi ${tag.icon}`} aria-hidden="true" />
              {tag.text}
            </div>
          )}

          {/* Title */}
          <h1 className="page-hero__title animate-fade-up animate-delay-1">{title}</h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="page-hero__subtitle animate-fade-up animate-delay-2">{subtitle}</p>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="page-hero__actions animate-fade-up animate-delay-3">
              {actions.map((action, i) => (
                <Link
                  key={i}
                  to={action.href}
                  className={`btn btn-lg ${action.variant === 'outline' ? 'btn-outline-white' : 'btn-primary'}`}
                >
                  {action.icon && <i className={`bi ${action.icon}`} aria-hidden="true" />}
                  {action.label}
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}