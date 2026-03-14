import React from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="404 — Page Not Found" />
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '40px 24px', paddingTop: 'var(--nav-h)' }}>
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{ fontSize: '10rem', fontFamily: 'var(--font-head)', fontWeight: 800, background: 'linear-gradient(135deg, var(--blue), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, opacity: 0.15 }}>
            404
          </div>
          <i className="bi bi-wifi-off" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '4rem', color: 'var(--blue-light)' }} />
        </div>
        <h1 style={{ color: 'var(--white)', marginBottom: 16 }}>Page Not Found</h1>
        <p style={{ color: 'var(--gray-400)', maxWidth: 480, marginBottom: 40, fontSize: '1.05rem' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <i className="bi bi-house" /> Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline-white btn-lg">
            <i className="bi bi-headset" /> Contact Support
          </Link>
        </div>
        <div style={{ marginTop: 56, display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Services', href: '/services', icon: 'bi-grid' },
            { label: 'Portfolio', href: '/portfolio', icon: 'bi-collection' },
            { label: 'Blog', href: '/blog', icon: 'bi-newspaper' },
            { label: 'Careers', href: '/careers', icon: 'bi-briefcase' },
          ].map((l, i) => (
            <Link key={i} to={l.href} style={{ color: 'var(--gray-400)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue-glow)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}>
              <i className={`bi ${l.icon}`} />{l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}