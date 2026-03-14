import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SERVICE_LINKS = [
  { label: 'Software Development', href: '/services/software-development' },
  { label: 'ERP & Management Systems', href: '/services/erp-management-systems' },
  { label: 'Bulk SMS & API', href: '/services/bulk-sms-api' },
  { label: 'Android Development', href: '/services/android-development' },
  { label: 'School & University Portals', href: '/services/school-portals' },
  { label: 'SACCO Systems', href: '/services/sacco-systems' },
  { label: 'Government Websites', href: '/services/government-websites' },
  { label: 'Networking & CCTV', href: '/services/networking-cctv' },
  { label: 'Cybersecurity', href: '/cybersecurity' },
  { label: 'Digital Marketing', href: '/digital-marketing' },
]

const COMPANY_LINKS = [
  { label: 'About NexaCore', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
]

const SOCIAL_LINKS = [
  { icon: 'bi-linkedin', href: 'https://linkedin.com/company/nexacore-technologies', label: 'LinkedIn', color: '#0a66c2' },
  { icon: 'bi-twitter-x', href: 'https://twitter.com/nexacoretech', label: 'X (Twitter)', color: '#fff' },
  { icon: 'bi-facebook', href: 'https://facebook.com/nexacoretech', label: 'Facebook', color: '#1877f2' },
  { icon: 'bi-instagram', href: 'https://instagram.com/nexacoretech', label: 'Instagram', color: '#e1306c' },
  { icon: 'bi-youtube', href: 'https://youtube.com/@nexacoretech', label: 'YouTube', color: '#ff0000' },
  { icon: 'bi-whatsapp', href: 'https://wa.me/254700000000', label: 'WhatsApp', color: '#25d366' },
]

const OFFICES = [
  { flag: '🇰🇪', city: 'Nairobi (HQ)', address: 'Upper Hill Business Park, 4th Floor', tel: '+254 700 000 000' },
  { flag: '🇺🇬', city: 'Kampala', address: 'Nakasero Business Hub', tel: '+256 700 000 000' },
  { flag: '🇹🇿', city: 'Dar es Salaam', address: 'Msasani Tech Park', tel: '+255 700 000 000' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState(null)
  const year = new Date().getFullYear()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    // In production, wire to your email API / Mailchimp
    setSubStatus('success')
    setEmail('')
    setTimeout(() => setSubStatus(null), 4000)
  }

  return (
    <footer className="footer" role="contentinfo">

      {/* ── Newsletter Banner ───────────────────────────── */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="footer-newsletter__inner">
            <div className="footer-newsletter__text">
              <i className="bi bi-envelope-paper-fill footer-newsletter__icon" aria-hidden="true" />
              <div>
                <h4>Stay Ahead of the Curve</h4>
                <p>Monthly tech insights, product updates, and digital transformation tips for East African businesses.</p>
              </div>
            </div>
            <form className="footer-newsletter__form" onSubmit={handleSubscribe}>
              {subStatus === 'success' ? (
                <div className="footer-newsletter__success">
                  <i className="bi bi-check-circle-fill" /> Subscribed! Check your inbox.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="Email for newsletter"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe <i className="bi bi-arrow-right" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ────────────────────────────── */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            {/* Brand column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo" aria-label="NexaCore Technologies">
                <div className="logo-icon" aria-hidden="true"><i className="bi bi-cpu-fill" /></div>
                <div className="logo-text">Nexa<span>Core</span><em>Technologies</em></div>
              </Link>
              <p className="footer-brand__bio">
                East Africa's premier full-service IT company. We build the digital infrastructure that powers businesses, governments, and institutions across the continent.
              </p>

              {/* Certifications */}
              <div className="footer-certs">
                {['ISO 27001', 'Google Partner', 'Microsoft Partner', 'AWS Partner'].map(c => (
                  <span key={c} className="footer-cert">
                    <i className="bi bi-patch-check-fill" aria-hidden="true" /> {c}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="footer-social" role="list" aria-label="Social media links">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="footer-social__btn"
                    role="listitem"
                  >
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h5 className="footer-col__heading">Services</h5>
              <ul className="footer-col__list" role="list">
                {SERVICE_LINKS.map(l => (
                  <li key={l.href}>
                    <Link to={l.href}>
                      <i className="bi bi-chevron-right" aria-hidden="true" /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer-col">
              <h5 className="footer-col__heading">Company</h5>
              <ul className="footer-col__list" role="list">
                {COMPANY_LINKS.map(l => (
                  <li key={l.href}>
                    <Link to={l.href}>
                      <i className="bi bi-chevron-right" aria-hidden="true" /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h5 className="footer-col__heading" style={{ marginTop: 32 }}>Resources</h5>
              <ul className="footer-col__list" role="list">
                <li><a href="/sitemap.xml" target="_blank" rel="noreferrer"><i className="bi bi-chevron-right" /> Sitemap</a></li>
                <li><Link to="/privacy-policy"><i className="bi bi-chevron-right" /> Privacy Policy</Link></li>
                <li><Link to="/terms-of-service"><i className="bi bi-chevron-right" /> Terms of Service</Link></li>
              </ul>
            </div>

            {/* Offices & Contact */}
            <div className="footer-col">
              <h5 className="footer-col__heading">Our Offices</h5>
              <div className="footer-offices">
                {OFFICES.map(o => (
                  <div key={o.city} className="footer-office">
                    <span className="footer-office__flag" aria-hidden="true">{o.flag}</span>
                    <div>
                      <div className="footer-office__city">{o.city}</div>
                      <div className="footer-office__addr">{o.address}</div>
                      <a href={`tel:${o.tel.replace(/\s/g, '')}`} className="footer-office__tel">
                        <i className="bi bi-telephone" aria-hidden="true" /> {o.tel}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="footer-contact-quick" style={{ marginTop: 24 }}>
                <a href="mailto:info@nexacore.co.ke" className="footer-contact-item">
                  <i className="bi bi-envelope-fill" aria-hidden="true" />
                  <span>info@nexacore.co.ke</span>
                </a>
                <a href="mailto:support@nexacore.co.ke" className="footer-contact-item">
                  <i className="bi bi-headset" aria-hidden="true" />
                  <span>support@nexacore.co.ke</span>
                </a>
                <div className="footer-contact-item footer-hours">
                  <i className="bi bi-clock" aria-hidden="true" />
                  <span>Mon–Fri: 8 AM – 6 PM EAT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer Bottom ───────────────────────────────── */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom__inner">
            <p className="footer-bottom__copy">
              © {year} <strong>NexaCore Technologies Ltd.</strong> All rights reserved.
              Registered in Kenya · BN: NCT/2013/001
            </p>
            <div className="footer-bottom__links">
              <Link to="/privacy-policy">Privacy</Link>
              <Link to="/terms-of-service">Terms</Link>
              <Link to="/sitemap">Sitemap</Link>
              <a href="mailto:info@nexacore.co.ke">Email Us</a>
            </div>
            <div className="footer-bottom__badge">
              <i className="bi bi-shield-fill-check" aria-hidden="true" />
              <span>SSL Secured · ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}