// ── PortfolioPage ────────────────────────────────────────
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchProjects } from '../services/api'

const STATUS_FILTERS = ['all', 'completed', 'ongoing']

export default function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then(r => setProjects(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  return (
    <>
      <SEOHead
        title="Portfolio"
        description="Explore NexaCore Technologies' portfolio of delivered projects — ERP systems, school portals, government websites, SACCO platforms, mobile apps and more."
        keywords="NexaCore portfolio, software projects Kenya, ERP delivered, school portal, SACCO system Kenya"
      />
      <PageHero
        title="Our Portfolio"
        subtitle="500+ projects delivered across software, infrastructure, and digital transformation."
        breadcrumbs={[{ label: 'Portfolio' }]}
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {STATUS_FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className="btn"
                style={{ padding: '8px 20px', fontSize: '0.875rem', background: filter === f ? 'var(--blue)' : 'var(--gray-100)', color: filter === f ? 'var(--white)' : 'var(--gray-600)', border: filter === f ? 'none' : '1px solid var(--gray-200)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {loading ? <Loader /> : filtered.length ? (
            <div className="projects-grid">
              {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><i className="bi bi-folder" /></div>
              <h3>No projects yet</h3>
              <p>Portfolio items will appear here once added in the CMS.</p>
            </div>
          )}
        </div>
      </section>
      <CTABanner title="Want to Be Our Next Success Story?" primaryLabel="Start a Project" />
    </>
  )
}