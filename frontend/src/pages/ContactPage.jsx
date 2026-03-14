import React, { useState } from 'react'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import { submitContactForm } from '../services/api'

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'software', label: 'Software Development' },
  { value: 'erp', label: 'ERP / Management System' },
  { value: 'bulk_sms', label: 'Bulk SMS / API' },
  { value: 'networking', label: 'Networking / CCTV' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'support', label: 'Technical Support' },
  { value: 'quote', label: 'Request a Quote' },
  { value: 'career', label: 'Career Inquiry' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', company: '', subject: 'general', message: '' })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    try {
      await submitContactForm(form)
      setStatus({ type: 'success', msg: "Message received! We'll respond within 24 hours." })
      setForm({ full_name: '', email: '', phone: '', company: '', subject: 'general', message: '' })
    } catch {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again or call us directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with NexaCore Technologies. Request a quote, book a free IT consultation, or reach our support team. Based in Nairobi, Kenya."
        keywords="contact NexaCore, IT consultation Kenya, software quote Nairobi, tech support Kenya"
      />

      <PageHero
        title="Get in Touch"
        subtitle="Have a project in mind? Need technical support? We'd love to hear from you. Expect a response within 24 hours."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <h3 style={{ marginBottom: 8 }}>Let's Start a Conversation</h3>
              <p style={{ marginBottom: 36 }}>
                Whether you're a startup, SME, university, government body, or enterprise — our team is ready to help you build, scale, and secure your digital operations.
              </p>

              <div className="contact-item">
                <div className="contact-icon"><i className="bi bi-geo-alt-fill" /></div>
                <div>
                  <h5>Head Office</h5>
                  <p>Upper Hill Business Park, 4th Floor<br />Nairobi, Kenya</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="bi bi-telephone-fill" /></div>
                <div>
                  <h5>Phone & WhatsApp</h5>
                  <p><a href="tel:+254700000000" style={{ color: 'var(--blue)' }}>+254 700 000 000</a></p>
                  <p><a href="tel:+254711000000" style={{ color: 'var(--blue)' }}>+254 711 000 000</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="bi bi-envelope-fill" /></div>
                <div>
                  <h5>Email</h5>
                  <p><a href="mailto:info@nexacore.co.ke" style={{ color: 'var(--blue)' }}>info@nexacore.co.ke</a></p>
                  <p><a href="mailto:support@nexacore.co.ke" style={{ color: 'var(--blue)' }}>support@nexacore.co.ke</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="bi bi-clock-fill" /></div>
                <div>
                  <h5>Working Hours</h5>
                  <p>Monday – Friday: 8:00 AM – 6:00 PM EAT</p>
                  <p>Saturday: 9:00 AM – 1:00 PM EAT</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ marginTop: 32 }}>
                <h5 style={{ marginBottom: 16, fontFamily: 'var(--font-head)', fontWeight: 700 }}>Quick Connect</h5>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '10px 18px' }}>
                    <i className="bi bi-whatsapp" style={{ color: '#25d366' }} /> WhatsApp
                  </a>
                  <a href="tel:+254700000000" className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '10px 18px' }}>
                    <i className="bi bi-telephone" /> Call Now
                  </a>
                </div>
              </div>

              <div className="contact-social">
                {[
                  { href: 'https://linkedin.com', icon: 'bi-linkedin' },
                  { href: 'https://twitter.com', icon: 'bi-twitter-x' },
                  { href: 'https://facebook.com', icon: 'bi-facebook' },
                  { href: 'https://instagram.com', icon: 'bi-instagram' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-btn">
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>

              {/* Regional Offices */}
              <div style={{ marginTop: 36, padding: 24, background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)' }}>
                <h5 style={{ marginBottom: 16, fontFamily: 'var(--font-head)', fontWeight: 700 }}>Regional Offices</h5>
                {[
                  { flag: '🇺🇬', city: 'Kampala, Uganda', tel: '+256 700 000 000' },
                  { flag: '🇹🇿', city: 'Dar es Salaam, Tanzania', tel: '+255 700 000 000' },
                ].map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>{o.flag}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--navy)' }}>{o.city}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{o.tel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-card">
              <h3 style={{ marginBottom: 8 }}>Send Us a Message</h3>
              <p style={{ marginBottom: 28, fontSize: '0.9rem' }}>Fill out the form and our team will get back to you within one business day.</p>

              {status && (
                <div className={`form-message ${status.type}`}>
                  <i className={`bi ${status.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}`} style={{ marginRight: 8 }} />
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Jane Mwangi" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" />
                  </div>
                  <div className="form-group">
                    <label>Company / Organisation</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp Ltd" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    {SUBJECT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project, goals, timeline, and budget…" rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                  {submitting ? (
                    <><span className="spinner" style={{ width: 20, height: 20, borderWidth: 2, marginRight: 8 }} />Sending…</>
                  ) : (
                    <><i className="bi bi-send-fill" /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-sm" style={{ background: 'var(--gray-100)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: 12 }}>Have a Common Question?</h3>
          <p style={{ marginBottom: 24 }}>Browse our FAQs for quick answers about our services, pricing, and process.</p>
          <a href="/faqs" className="btn btn-outline btn-lg">
            <i className="bi bi-question-circle" /> Visit FAQs
          </a>
        </div>
      </section>
    </>
  )
}