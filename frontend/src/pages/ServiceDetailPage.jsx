import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchServiceBySlug, fetchServices } from '../services/api'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchServiceBySlug(slug)
      .then(r => {
        setService(r.data)
        return fetchServices({ is_featured: true })
      })
      .then(r => {
        const all = r.data.results || r.data
        setRelated(all.filter(s => s.slug !== slug).slice(0, 3))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{ paddingTop: 'var(--nav-h)' }}><Loader /></div>

  if (!service) return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon"><i className="bi bi-exclamation-circle" /></div>
          <h3>Service Not Found</h3>
          <p>This service page is unavailable or has been moved.</p>
          <Link to="/services" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Services</Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <SEOHead
        title={service.meta_title || service.title}
        description={service.meta_description || service.tagline}
        keywords={`${service.title} Kenya, NexaCore ${service.title}`}
      />

      <PageHero
        title={service.title}
        subtitle={service.tagline}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 56, alignItems: 'start' }}>
            {/* Main Content */}
            <div>
              {service.image_display && (
                <img src={service.image_display} alt={service.title}
                  style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: 36, objectFit: 'cover', maxHeight: 400 }} />
              )}
              <div className="label-tag" style={{ marginBottom: 16 }}>
                <i className={`bi ${service.icon || 'bi-gear'}`} />{service.category_name}
              </div>
              <h2 style={{ marginBottom: 20 }}>{service.title}</h2>
              <div style={{ color: 'var(--gray-600)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {service.description}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-xl)', padding: 32, color: 'var(--white)', marginBottom: 24 }}>
                <h4 style={{ color: 'var(--white)', marginBottom: 20 }}>Ready to get started?</h4>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: 24 }}>
                  Tell us about your project and we'll respond within 24 hours with a free consultation.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="bi bi-envelope" /> Request a Quote
                </Link>
                <a href="tel:+254700000000" className="btn btn-outline-white" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                  <i className="bi bi-telephone" /> Call Us Now
                </a>
              </div>

              {/* Related services */}
              {related.length > 0 && (
                <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
                  <h5 style={{ marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-600)' }}>Related Services</h5>
                  {related.map(r => (
                    <Link key={r.id} to={`/services/${r.slug}`} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--gray-200)', alignItems: 'center', color: 'var(--navy)' }}>
                      <div style={{ width: 36, height: 36, background: 'var(--white)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', fontSize: '1rem', flexShrink: 0 }}>
                        <i className={`bi ${r.icon}`} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)' }}>{r.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}