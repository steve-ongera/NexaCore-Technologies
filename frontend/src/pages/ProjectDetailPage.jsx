import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchProjectBySlug } from '../services/api'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjectBySlug(slug)
      .then(r => setProject(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{ paddingTop: 'var(--nav-h)' }}><Loader /></div>
  if (!project) return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon"><i className="bi bi-folder-x" /></div>
          <h3>Project Not Found</h3>
          <Link to="/portfolio" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Portfolio</Link>
        </div>
      </div>
    </div>
  )

  const techs = Array.isArray(project.technologies) ? project.technologies : []

  return (
    <>
      <SEOHead
        title={project.meta_title || project.title}
        description={project.meta_description || project.description?.slice(0, 160)}
        keywords={`${project.title}, NexaCore project, ${techs.join(', ')}`}
      />
      <PageHero
        title={project.title}
        subtitle={project.client ? `Client: ${project.client}` : ''}
        breadcrumbs={[{ label: 'Portfolio', href: '/portfolio' }, { label: project.title }]}
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 56, alignItems: 'start' }}>
            <div>
              {project.image_display && (
                <img src={project.image_display} alt={project.title}
                  style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: 36, objectFit: 'cover', maxHeight: 440 }} />
              )}
              <h2 style={{ marginBottom: 20 }}>{project.title}</h2>
              <p style={{ lineHeight: 1.85, whiteSpace: 'pre-line', color: 'var(--gray-600)' }}>{project.description}</p>
              {techs.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <h4 style={{ marginBottom: 14 }}>Technologies Used</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {techs.map((t, i) => <span key={i} className="tag" style={{ padding: '6px 14px', fontSize: '0.875rem' }}>{t}</span>)}
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
              <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 20 }}>
                <h4 style={{ marginBottom: 20 }}>Project Details</h4>
                {[
                  { label: 'Client', value: project.client, icon: 'bi-building' },
                  { label: 'Category', value: project.category_name, icon: 'bi-grid' },
                  { label: 'Status', value: project.status, icon: 'bi-circle-fill' },
                  { label: 'Completed', value: project.completed_at, icon: 'bi-calendar3' },
                ].filter(d => d.value).map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--gray-200)' }}>
                    <i className={`bi ${d.icon}`} style={{ color: 'var(--blue)', marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.label}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)', textTransform: 'capitalize' }}>{d.value}</div>
                    </div>
                  </div>
                ))}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                    <i className="bi bi-box-arrow-up-right" /> Visit Live Site
                  </a>
                )}
              </div>
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-xl)', padding: 28, color: 'var(--white)' }}>
                <h4 style={{ color: 'var(--white)', marginBottom: 12 }}>Like What You See?</h4>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', marginBottom: 20 }}>Let's build something just as impactful for you.</p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="bi bi-rocket-takeoff" /> Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  )
}