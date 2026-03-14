import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import Loader from '../components/Loader'
import { fetchJobBySlug, submitApplication } from '../services/api'

export default function JobDetailPage() {
  const { slug } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', cover_letter: '', linkedin_url: '', portfolio_url: '' })
  const [resume, setResume] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetchJobBySlug(slug)
      .then(r => setJob(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!job) return
    setSubmitting(true)
    setStatus(null)
    try {
      await submitApplication({ ...form, job: job.id, resume })
      setStatus({ type: 'success', msg: 'Application submitted! We will review and reach out within 5 business days.' })
      setForm({ full_name: '', email: '', phone: '', cover_letter: '', linkedin_url: '', portfolio_url: '' })
      setResume(null)
    } catch {
      setStatus({ type: 'error', msg: 'Submission failed. Please try again or email careers@nexacore.co.ke' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div style={{ paddingTop: 'var(--nav-h)' }}><Loader /></div>
  if (!job) return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon"><i className="bi bi-briefcase" /></div>
          <h3>Job Not Found</h3>
          <Link to="/careers" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Careers</Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <SEOHead title={`${job.title} — ${job.department}`} description={job.description?.slice(0, 160)} keywords={`${job.title} Kenya, ${job.department} job Nairobi`} />
      <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--navy)', padding: '120px 0 64px' }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link to="/" style={{ color: 'var(--blue-light)' }}>Home</Link>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }} />
            <Link to="/careers" style={{ color: 'var(--blue-light)' }}>Careers</Link>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }} />
            <span style={{ color: 'var(--gray-400)' }}>{job.title}</span>
          </div>
          <h1 style={{ color: 'var(--white)', marginBottom: 16 }}>{job.title}</h1>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { icon: 'bi-building', val: job.department },
              { icon: 'bi-geo-alt', val: job.location },
              { icon: 'bi-clock', val: job.job_type?.replace('_', ' ') },
              job.salary_range && { icon: 'bi-currency-dollar', val: job.salary_range },
              job.deadline && { icon: 'bi-calendar', val: `Deadline: ${job.deadline}` },
            ].filter(Boolean).map((d, i) => (
              <span key={i} style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.8)', padding: '6px 14px', borderRadius: 999, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className={`bi ${d.icon}`} />{d.val}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'start' }}>
            <div>
              <h3 style={{ marginBottom: 20 }}>About This Role</h3>
              <p style={{ lineHeight: 1.85, whiteSpace: 'pre-line', color: 'var(--gray-600)', marginBottom: 32 }}>{job.description}</p>

              {job.responsibilities && (
                <>
                  <h4 style={{ marginBottom: 16 }}>Key Responsibilities</h4>
                  <div style={{ color: 'var(--gray-600)', lineHeight: 1.85, whiteSpace: 'pre-line', marginBottom: 32 }}>{job.responsibilities}</div>
                </>
              )}

              <h4 style={{ marginBottom: 16 }}>Requirements</h4>
              <div style={{ color: 'var(--gray-600)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{job.requirements}</div>
            </div>

            {/* Application Form */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
              <div className="form-card">
                <h4 style={{ marginBottom: 6 }}>Apply for This Position</h4>
                <p style={{ fontSize: '0.875rem', marginBottom: 24 }}>Fill out the form below. We review every application carefully.</p>

                {status && (
                  <div className={`form-message ${status.type}`}>
                    <i className={`bi ${status.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}`} style={{ marginRight: 8 }} />
                    {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" required />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input type="url" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="form-group">
                    <label>Portfolio / GitHub URL</label>
                    <input type="url" name="portfolio_url" value={form.portfolio_url} onChange={handleChange} placeholder="https://github.com/..." />
                  </div>
                  <div className="form-group">
                    <label>Resume / CV *</label>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} required style={{ padding: '8px 0' }} />
                  </div>
                  <div className="form-group">
                    <label>Cover Letter *</label>
                    <textarea name="cover_letter" value={form.cover_letter} onChange={handleChange} placeholder="Tell us why you're a great fit…" rows={4} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                    {submitting ? (
                      <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2, marginRight: 8 }} />Submitting…</>
                    ) : (
                      <><i className="bi bi-send" /> Submit Application</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}