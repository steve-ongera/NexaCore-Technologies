import React, { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchTeam } from '../services/api'

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Sales', 'Support', 'Management', 'Security']

export default function TeamPage() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchTeam()
      .then(r => setTeam(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? team : team.filter(m => m.position?.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <SEOHead
        title="Our Team"
        description="Meet the talented engineers, designers, and consultants behind NexaCore Technologies — building digital solutions across East Africa."
        keywords="NexaCore team, software engineers Kenya, IT consultants Nairobi"
      />

      <PageHero
        title="Meet Our Team"
        subtitle="60+ passionate technologists united by a mission to power Africa's digital transformation."
        breadcrumbs={[{ label: 'Team' }]}
      />

      {/* Culture Highlight */}
      <section className="section-sm section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: 'bi-people-fill', value: '60+', label: 'Team Members' },
              { icon: 'bi-flag-fill', value: '5', label: 'Nationalities' },
              { icon: 'bi-mortarboard-fill', value: '80%', label: 'Certified Professionals' },
              { icon: 'bi-gender-ambiguous', value: '40%', label: 'Female Tech Staff' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 24 }}>
                <i className={`bi ${s.icon}`} style={{ fontSize: '1.8rem', color: 'var(--blue-light)', marginBottom: 12, display: 'block' }} />
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--blue-light), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '0.875rem', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {DEPARTMENTS.map(d => (
              <button key={d} onClick={() => setFilter(d)} className="btn"
                style={{ padding: '7px 18px', fontSize: '0.85rem', background: filter === d ? 'var(--blue)' : 'var(--gray-100)', color: filter === d ? 'var(--white)' : 'var(--gray-600)', border: filter === d ? 'none' : '1px solid var(--gray-200)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                {d}
              </button>
            ))}
          </div>

          {loading ? <Loader /> : filtered.length ? (
            <div className="team-grid">
              {filtered.map(m => (
                <div key={m.id} className="team-card">
                  <div className="team-photo">
                    {m.photo_display
                      ? <img src={m.photo_display} alt={m.name} loading="lazy" />
                      : <div className="team-photo-placeholder"><i className="bi bi-person-fill" /></div>
                    }
                    {m.is_leadership && (
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--blue)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                        Leadership
                      </div>
                    )}
                  </div>
                  <div className="team-body">
                    <h4>{m.name}</h4>
                    <p className="position">{m.position}</p>
                    {m.bio && <p>{m.bio.slice(0, 90)}…</p>}
                    <div className="team-socials">
                      {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>}
                      {m.twitter && <a href={m.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><i className="bi bi-twitter-x" /></a>}
                      {m.github && <a href={m.github} target="_blank" rel="noreferrer" aria-label="GitHub"><i className="bi bi-github" /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><i className="bi bi-people" /></div>
              <h3>{filter !== 'All' ? `No ${filter} members found` : 'Team profiles coming soon'}</h3>
              <p>Team information will appear here once added in the CMS.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner title="Join Our Growing Team" subtitle="We're always looking for talented engineers, designers, and consultants to join our mission." primaryLabel="View Open Roles" primaryHref="/careers" secondaryLabel="Contact HR" secondaryHref="/contact" />
    </>
  )
}