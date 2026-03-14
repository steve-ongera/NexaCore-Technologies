import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const SERVICES_GROUPS = [
  {
    category: 'Software & Apps',
    items: [
      { label: 'Custom Software Dev', icon: 'bi-code-slash', href: '/services/software-development', desc: 'Web apps, APIs, desktop systems' },
      { label: 'ERP & Management Systems', icon: 'bi-diagram-3', href: '/services/erp-management-systems', desc: 'Procurement, HR, Finance' },
      { label: 'eCommerce Development', icon: 'bi-cart4', href: '/services/ecommerce-development', desc: 'Online stores built for scale' },
      { label: 'Bulk SMS & API Gateway', icon: 'bi-chat-dots', href: '/services/bulk-sms-api', desc: 'High-delivery SMS platform' },
      { label: 'Android App Development', icon: 'bi-phone', href: '/services/android-development', desc: 'Native & cross-platform apps' },
    ],
  },
  {
    category: 'Portals & Systems',
    items: [
      { label: 'School & University Portals', icon: 'bi-mortarboard', href: '/services/school-portals', desc: 'Student, staff & parent portals' },
      { label: 'SACCO Management System', icon: 'bi-bank', href: '/services/sacco-systems', desc: 'Loans, deposits, mobile banking' },
      { label: 'Government Portals', icon: 'bi-building', href: '/services/government-websites', desc: 'Accessible, bilingual portals' },
      { label: 'Hospital & Health Systems', icon: 'bi-heart-pulse', href: '/services/hospital-systems', desc: 'Patient records, billing' },
      { label: 'Personal & Corporate Sites', icon: 'bi-person-badge', href: '/services/personal-websites', desc: 'High-impact digital presence' },
    ],
  },
  {
    category: 'IT Infrastructure',
    items: [
      { label: 'Networking & CCTV', icon: 'bi-router', href: '/services/networking-cctv', desc: 'Cabling, Wi-Fi, IP cameras' },
      { label: 'Server Import & Setup', icon: 'bi-server', href: '/services/server-import-setup', desc: 'Rack, power, cooling builds' },
      { label: 'Computer Setup & Repair', icon: 'bi-pc-display', href: '/services/computer-setup-maintenance', desc: 'Procurement, imaging, cleaning' },
      { label: 'Elevator Coding', icon: 'bi-arrow-up-square', href: '/services/elevator-coding', desc: 'Controller programming & service' },
    ],
  },
  {
    category: 'Security & Growth',
    items: [
      { label: 'Cybersecurity Services', icon: 'bi-shield-lock', href: '/cybersecurity', desc: 'Pentesting, SIEM, ISO 27001' },
      { label: 'Digital Marketing & SEO', icon: 'bi-megaphone', href: '/digital-marketing', desc: 'SEO, Google Ads, social media' },
    ],
  },
]

const COMPANY_LINKS = [
  { label: 'About NexaCore', icon: 'bi-info-circle', href: '/about', desc: 'Our story, mission & values' },
  { label: 'Our Team', icon: 'bi-people', href: '/team', desc: 'Meet the people behind the work' },
  { label: 'Portfolio', icon: 'bi-collection', href: '/portfolio', desc: '500+ projects delivered' },
  { label: 'Blog & Insights', icon: 'bi-newspaper', href: '/blog', desc: 'Tech articles & guides' },
  { label: 'Careers', icon: 'bi-briefcase', href: '/careers', desc: 'Join our growing team' },
  { label: 'FAQs', icon: 'bi-question-circle', href: '/faqs', desc: 'Quick answers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'services' | 'company' | null
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [showBar, setShowBar] = useState(true)
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggle = (name) => setActiveDropdown(prev => prev === name ? null : name)

  return (
    <>
      {/* ── Announcement Bar ────────────────────────────── */}
      {showBar && (
        <div className="announcement-bar">
          <div className="announcement-bar__inner">
            <i className="bi bi-stars" aria-hidden="true" />
            <span>
              🇰🇪 Kenya's Most Trusted IT Partner — Now serving Uganda &amp; Tanzania.{' '}
              <Link to="/contact">Get a free consultation →</Link>
            </span>
            <button className="announcement-bar__close" onClick={() => setShowBar(false)} aria-label="Dismiss">
              <i className="bi bi-x-lg" />
            </button>
          </div>
        </div>
      )}

      {/* ── Navbar ────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="NexaCore Technologies home">
            <div className="logo-icon" aria-hidden="true">
              <i className="bi bi-cpu-fill" />
            </div>
            <div className="logo-text">
              Nexa<span>Core</span>
              <em>Technologies</em>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links" role="menubar">

            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
              Home
            </NavLink>

            {/* Company dropdown */}
            <div className={`nav-dropdown ${activeDropdown === 'company' ? 'nav-dropdown--open' : ''}`}>
              <button
                className="nav-dropdown__trigger"
                onClick={() => toggle('company')}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                Company <i className="bi bi-chevron-down" />
              </button>
              {activeDropdown === 'company' && (
                <div className="dropdown-panel company-panel" role="menu">
                  {COMPANY_LINKS.map(l => (
                    <Link key={l.href} to={l.href} className="dropdown-panel__item" role="menuitem">
                      <div className="dropdown-panel__icon"><i className={`bi ${l.icon}`} /></div>
                      <div>
                        <div className="dropdown-panel__label">{l.label}</div>
                        <div className="dropdown-panel__desc">{l.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services mega-menu */}
            <div className={`nav-dropdown ${activeDropdown === 'services' ? 'nav-dropdown--open' : ''}`}>
              <button
                className="nav-dropdown__trigger"
                onClick={() => toggle('services')}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                Services <i className="bi bi-chevron-down" />
              </button>
              {activeDropdown === 'services' && (
                <div className="mega-menu" role="menu">
                  <div className="mega-menu__grid">
                    {SERVICES_GROUPS.map(group => (
                      <div key={group.category} className="mega-menu__col">
                        <div className="mega-menu__heading">{group.category}</div>
                        {group.items.map(item => (
                          <Link key={item.href} to={item.href} className="mega-menu__item" role="menuitem">
                            <div className="mega-menu__item-icon"><i className={`bi ${item.icon}`} /></div>
                            <div>
                              <div className="mega-menu__item-label">{item.label}</div>
                              <div className="mega-menu__item-desc">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mega-menu__footer">
                    <Link to="/services" className="mega-menu__all-link">
                      <i className="bi bi-grid-3x3-gap" /> View All Services
                    </Link>
                    <Link to="/contact" className="mega-menu__cta">
                      <i className="bi bi-lightning-charge-fill" /> Get a Free Quote
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/portfolio" className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
              Portfolio
            </NavLink>

            <NavLink to="/blog" className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
              Blog
            </NavLink>

            <NavLink to="/careers" className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
              Careers
            </NavLink>

          </div>

          {/* Right actions */}
          <div className="nav-actions">
            <a href="tel:+254700000000" className="nav-phone" aria-label="Call NexaCore">
              <i className="bi bi-telephone-fill" />
              <span>+254 700 000 000</span>
            </a>
            <Link to="/contact" className="btn btn-primary nav-cta">
              <i className="bi bi-rocket-takeoff" aria-hidden="true" />
              Get Started
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${mobileOpen ? 'nav-hamburger--open' : ''}`}
            onClick={() => setMobileOpen(p => !p)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* ── Mobile Nav ───────────────────────────────────── */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        {/* Quick contact strip */}
        <div className="mobile-nav__strip">
          <a href="tel:+254700000000"><i className="bi bi-telephone-fill" /> +254 700 000 000</a>
          <a href="mailto:info@nexacore.co.ke"><i className="bi bi-envelope-fill" /> Email Us</a>
          <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" style={{ color: '#25d366' }}>
            <i className="bi bi-whatsapp" /> WhatsApp
          </a>
        </div>

        <div className="mobile-nav__links">
          <NavLink to="/" end><i className="bi bi-house" /> Home</NavLink>
          <NavLink to="/about"><i className="bi bi-info-circle" /> About Us</NavLink>
          <NavLink to="/team"><i className="bi bi-people" /> Our Team</NavLink>

          {/* Collapsible services */}
          <button
            className={`mobile-nav__toggle ${mobileServicesOpen ? 'mobile-nav__toggle--open' : ''}`}
            onClick={() => setMobileServicesOpen(p => !p)}
            aria-expanded={mobileServicesOpen}
          >
            <span><i className="bi bi-grid" /> Services</span>
            <i className="bi bi-chevron-down" />
          </button>
          <div className={`mobile-nav__sub ${mobileServicesOpen ? 'mobile-nav__sub--open' : ''}`}>
            {SERVICES_GROUPS.flatMap(g => g.items).map(item => (
              <Link key={item.href} to={item.href} className="mobile-nav__sub-item">
                <i className={`bi ${item.icon}`} /> {item.label}
              </Link>
            ))}
            <Link to="/services" className="mobile-nav__sub-all">
              <i className="bi bi-grid-3x3-gap" /> All Services
            </Link>
          </div>

          <NavLink to="/portfolio"><i className="bi bi-collection" /> Portfolio</NavLink>
          <NavLink to="/blog"><i className="bi bi-newspaper" /> Blog & Insights</NavLink>
          <NavLink to="/careers"><i className="bi bi-briefcase" /> Careers</NavLink>
          <NavLink to="/faqs"><i className="bi bi-question-circle" /> FAQs</NavLink>
          <NavLink to="/contact"><i className="bi bi-envelope" /> Contact Us</NavLink>
        </div>

        <div className="mobile-nav__footer">
          <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <i className="bi bi-rocket-takeoff" /> Get a Free Quote
          </Link>
          <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer"
            className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 10, border: '1px solid #25d366', color: '#25d366', borderRadius: 'var(--radius)' }}>
            <i className="bi bi-whatsapp" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Backdrop overlay */}
      {(mobileOpen || activeDropdown) && (
        <div
          className="nav-backdrop"
          onClick={() => { setMobileOpen(false); setActiveDropdown(null) }}
          aria-hidden="true"
        />
      )}
    </>
  )
}