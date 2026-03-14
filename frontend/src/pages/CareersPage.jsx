import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import Loader from '../components/Loader'
import { fetchJobs } from '../services/api'

const PERKS = [
  { icon: 'bi-laptop', title: 'Modern Equipment', text: 'Latest MacBooks, dual monitors, and all the tools you need to do your best work.' },
  { icon: 'bi-airplane', title: 'Work From Anywhere', text: 'Hybrid and remote-first culture. We care about outcomes, not office attendance.' },
  { icon: 'bi-graph-up', title: 'Fast Growth', text: 'Structured career ladders and monthly promotions for top performers.' },
  { icon: 'bi-book', title: 'Learning Budget', text: 'KES 60,000/year per person for courses, certifications, and conferences.' },
  { icon: 'bi-heart-pulse', title: 'Health Insurance', text: 'Comprehensive medical, dental, and mental health coverage for you and family.' },
  { icon: 'bi-trophy', title: 'Recognition', text: 'Quarterly awards, bonuses, and team celebrations for outstanding work.' },
]

export default function CareersPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [dept, setDept] = useState('all')

  useEffect(() => {
    fetchJobs()
      .then(r => setJobs(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const departments = ['all', ...new Set(jobs.map(j => j.department))]
  const filtered = dept === 'all' ? jobs : jobs.filter(j => j.department === dept)

  return (
    <>
      <SEOHead
        title="Careers at NexaCore"
        description="Join NexaCore Technologies — Kenya's leading IT company. Explore open positions in software engineering, cybersecurity, sales, design, and more."
        keywords="careers NexaCore, jobs IT Kenya, software engineer Nairobi, tech jobs Kenya"
      />
      <PageHero
        title="Build Your Career at NexaCore"
        subtitle="Join 60+ technologists shaping the digital future of East Africa. We hire for talent, drive, and curiosity."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* Perks */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeader center light tag={{ icon: 'bi-stars', text: 'Why NexaCore' }} title="Life at NexaCore" subtitle="We invest in people as much as in technology." />
          <div className="features-grid">
            {PERKS.map((p, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon"><i className={`bi ${p.icon}`} /></div>
                <div><h4>{p.title}</h4><p>{p.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section">
        <div className="container">
          <SectionHeader center tag={{ icon: 'bi-briefcase', text: 'Open Roles' }} title="Current Openings" subtitle="Don't see a perfect fit? Send us your CV anyway — we always want to hear from great people." />

          {/* Department filter */}
          {departments.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
              {departments.map(d => (
                <button key={d} onClick={() => setDept(d)} className="btn"
                  style={{ padding: '8px 20px', fontSize: '0.875rem', background: dept === d ? 'var(--blue)' : 'var(--gray-100)', color: dept === d ? 'var(--white)' : 'var(--gray-600)', border: dept === d ? 'none' : '1px solid var(--gray-200)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          )}

          {loading ? <Loader /> : filtered.length ? (
            <div className="jobs-list">
              {filtered.map(job => (
                <Link key={job.id} to={`/careers/${job.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="job-card">
                    <div className="job-info">
                      <h3>{job.title}</h3>
                      <div className="job-tags">
                        <span className="job-tag"><i className="bi bi-building" />{job.department}</span>
                        <span className="job-tag"><i className="bi bi-geo-alt" />{job.location}</span>
                        <span className="job-tag"><i className="bi bi-clock" />{job.job_type.replace('_', ' ')}</span>
                        {job.salary_range && <span className="job-tag"><i className="bi bi-currency-dollar" />{job.salary_range}</span>}
                        {job.deadline && <span className="job-tag"><i className="bi bi-calendar" />Deadline: {job.deadline}</span>}
                      </div>
                    </div>
                    <div className="btn btn-outline" style={{ flexShrink: 0 }}>
                      Apply Now <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><i className="bi bi-briefcase" /></div>
              <h3>No open positions right now</h3>
              <p>We're not actively hiring but always open to great talent. Send your CV to <a href="mailto:careers@nexacore.co.ke" style={{ color: 'var(--blue)' }}>careers@nexacore.co.ke</a></p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'var(--gray-100)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: 12 }}>Don't See Your Role?</h3>
          <p style={{ marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>Send us a speculative application — we'll reach out when a suitable opening arises.</p>
          <a href="mailto:careers@nexacore.co.ke" className="btn btn-primary btn-lg">
            <i className="bi bi-envelope" /> Send Your CV
          </a>
        </div>
      </section>
    </>
  )
}