import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import BlogCard from '../components/BlogCard'
import TestimonialCard from '../components/TestimonialCard'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchHomeData } from '../services/api'

// Static fallback data (shown when API is offline)
const STATIC_SERVICES = [
  { id: 1, slug: 'software-development', title: 'Custom Software Development', tagline: 'Scalable web & desktop apps tailored to your business', icon: 'bi-code-slash', is_featured: true },
  { id: 2, slug: 'erp-management-systems', title: 'ERP & Management Systems', tagline: 'Procurement, HR, Finance & more — all in one platform', icon: 'bi-diagram-3', is_featured: true },
  { id: 3, slug: 'bulk-sms-api', title: 'Bulk SMS & API Integration', tagline: 'Reach thousands instantly with our reliable SMS gateway', icon: 'bi-chat-dots', is_featured: true },
  { id: 4, slug: 'android-development', title: 'Android App Development', tagline: 'Native & cross-platform mobile solutions for your audience', icon: 'bi-phone', is_featured: true },
  { id: 5, slug: 'school-portals', title: 'School & University Portals', tagline: 'Complete student management from KTMC to national universities', icon: 'bi-mortarboard', is_featured: true },
  { id: 6, slug: 'sacco-systems', title: 'SACCO & Finance Systems', tagline: 'Loans, deposits, reports — robust fintech for cooperatives', icon: 'bi-bank', is_featured: true },
  { id: 7, slug: 'government-websites', title: 'Government & Public Sector', tagline: 'Secure, accessible websites for public institutions', icon: 'bi-building', is_featured: true },
  { id: 8, slug: 'networking-cctv', title: 'Networking, CCTV & Infrastructure', tagline: 'Server imports, structured cabling, surveillance installation', icon: 'bi-router', is_featured: true },
]
const STATIC_STATS = [
  { id: 1, value: '500+', label: 'Projects Delivered', icon: 'bi-check2-circle' },
  { id: 2, value: '200+', label: 'Clients Served', icon: 'bi-people' },
  { id: 3, value: '10+', label: 'Years Experience', icon: 'bi-award' },
  { id: 4, value: '98%', label: 'Client Satisfaction', icon: 'bi-star' },
]
const STATIC_FEATURES = [
  { icon: 'bi-shield-check', title: 'Enterprise-Grade Security', text: 'Every solution is built with cybersecurity baked in — not bolted on.' },
  { icon: 'bi-lightning-charge', title: 'Rapid Delivery', text: 'Agile sprints and experienced teams mean faster time-to-market.' },
  { icon: 'bi-headset', title: '24/7 Support', text: 'Dedicated support engineers available around the clock.' },
  { icon: 'bi-globe2', title: 'Pan-African Reach', text: 'Serving clients across Kenya, Uganda, Tanzania, Rwanda and beyond.' },
  { icon: 'bi-puzzle', title: 'Custom-Fit Solutions', text: 'No templates. Everything is architected around your exact needs.' },
  { icon: 'bi-graph-up-arrow', title: 'Scalable Architecture', text: 'Systems that grow with you — from startup to enterprise.' },
  { icon: 'bi-people-fill', title: 'Expert Team', text: '60+ certified engineers, designers, and consultants on your side.' },
  { icon: 'bi-currency-dollar', title: 'Transparent Pricing', text: 'Clear contracts, no hidden fees, real ROI from day one.' },
]

export default function HomePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
      .then(r => setData(r.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  const services = data?.featured_services?.length ? data.featured_services : STATIC_SERVICES
  const stats = data?.stats?.length ? data.stats : STATIC_STATS
  const projects = data?.featured_projects || []
  const testimonials = data?.testimonials || []
  const posts = data?.latest_posts || []

  return (
    <>
      <SEOHead
        title="NexaCore Technologies — Enterprise IT & Software Solutions in Kenya"
        description="NexaCore Technologies is Kenya's leading IT company. We develop ERP systems, mobile apps, school portals, SACCO systems, bulk SMS, and provide cybersecurity, CCTV, and networking services."
        keywords="IT company Kenya, software development Nairobi, ERP Kenya, bulk SMS API, SACCO system, school portal Kenya, cybersecurity, CCTV Nairobi"
      />

      {/* ── Hero ────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">Kenya's #1 Full-Service IT Company</div>
              <h1>
                We Build the Digital Future of{' '}
                <span className="gradient-text">East Africa</span>
              </h1>
              <p className="hero-desc">
                From custom ERP systems and mobile apps to bulk SMS APIs, SACCO platforms, government websites, cybersecurity, and ICT infrastructure — NexaCore delivers end-to-end technology solutions that drive real results.
              </p>
              <div className="hero-ctas">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <i className="bi bi-rocket-takeoff" /> Start Your Project
                </Link>
                <Link to="/portfolio" className="btn btn-outline-white btn-lg">
                  <i className="bi bi-play-circle" /> View Our Work
                </Link>
              </div>
              <div className="hero-stats">
                {stats.slice(0, 4).map(s => (
                  <div key={s.id} className="hero-stat-item">
                    <h3>{s.value}</h3>
                    <p>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hero-visual">
              <div className="hero-card-stack">
                {[
                  { icon: 'bi-code-slash', title: 'Software Development', desc: 'ERP, eCommerce, Portals', cls: 'c1' },
                  { icon: 'bi-shield-lock-fill', title: 'Cybersecurity', desc: 'Audits, Penetration Testing', cls: 'c2' },
                  { icon: 'bi-phone-fill', title: 'Mobile & Android', desc: 'Play Store-ready apps', cls: 'c3' },
                  { icon: 'bi-router-fill', title: 'IT Infrastructure', desc: 'Networking, CCTV, Servers', cls: 'c4' },
                ].map(c => (
                  <div key={c.cls} className={`hero-card ${c.cls}`}>
                    <i className={`bi ${c.icon}`} />
                    <div>
                      <h4>{c.title}</h4>
                      <p>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By Marquee ───────────────────────── */}
      <section className="clients-section" style={{ background: 'var(--navy-mid)', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div className="container" style={{ marginBottom: 20 }}>
          <p style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Trusted by Leading Organisations
          </p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="clients-track">
            {['Universities', 'Government Agencies', 'SACCOs', 'Banks', 'Hospitals', 'NGOs', 'Retail Chains', 'Schools', 'Telecoms', 'Startups'].concat(
              ['Universities', 'Government Agencies', 'SACCOs', 'Banks', 'Hospitals', 'NGOs', 'Retail Chains', 'Schools', 'Telecoms', 'Startups']
            ).map((name, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', color: 'rgba(255,255,255,.35)', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-head)' }}>
                <i className="bi bi-patch-check-fill" style={{ color: 'var(--blue-light)', fontSize: '0.8rem' }} />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-grid-3x3-gap', text: 'What We Do' }}
            title="Comprehensive IT Solutions for Every Need"
            subtitle="From enterprise software to physical IT infrastructure — we are your single-source technology partner."
          />
          {loading ? <Loader /> : (
            <div className="services-grid">
              {services.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn btn-outline btn-lg">
              Explore All Services <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────── */}
      <section className="section-dark section-sm">
        <div className="container">
          <div className="stats-row">
            {stats.map(s => (
              <div key={s.id} className="stat-item">
                <div className="stat-icon"><i className={`bi ${s.icon}`} /></div>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why NexaCore ─────────────────────────────── */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeader
            center
            light
            tag={{ icon: 'bi-trophy', text: 'Why Choose Us' }}
            title="The NexaCore Advantage"
            subtitle="We combine deep technical expertise with a genuine understanding of African business realities."
          />
          <div className="features-grid">
            {STATIC_FEATURES.map((f, i) => (
              <div key={i} className="feature-card animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="feature-icon"><i className={`bi ${f.icon}`} /></div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ────────────────────────────────── */}
      {projects.length > 0 && (
        <section className="section" style={{ background: 'var(--gray-100)' }}>
          <div className="container">
            <SectionHeader
              center
              tag={{ icon: 'bi-collection', text: 'Portfolio' }}
              title="Work We're Proud Of"
              subtitle="A selection of impactful projects delivered for clients across industries and sectors."
            />
            <div className="projects-grid">
              {projects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/portfolio" className="btn btn-primary btn-lg">
                View Full Portfolio <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Process ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-gear-wide-connected', text: 'Our Process' }}
            title="How We Deliver Excellence"
            subtitle="A proven 5-step process that keeps projects on track, on budget, and beyond expectations."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24, marginTop: 8 }}>
            {[
              { step: '01', icon: 'bi-search', title: 'Discovery', text: 'We listen, research, and understand your goals deeply before writing a line of code.' },
              { step: '02', icon: 'bi-pencil-square', title: 'Design & Plan', text: 'Wireframes, architecture, timelines — every detail mapped before building starts.' },
              { step: '03', icon: 'bi-code-square', title: 'Build', text: 'Agile sprints, clean code, continuous integration, and regular client demos.' },
              { step: '04', icon: 'bi-bug', title: 'Test & QA', text: 'Rigorous testing across devices, browsers, and load conditions.' },
              { step: '05', icon: 'bi-rocket-takeoff', title: 'Launch & Support', text: 'Smooth deployment, staff training, and ongoing maintenance packages.' },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', position: 'relative' }}>
                  <i className={`bi ${p.icon}`} style={{ fontSize: '1.4rem', color: '#fff' }} />
                  <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--navy)', color: 'var(--blue-light)', fontSize: '0.7rem', fontWeight: 800, padding: '2px 7px', borderRadius: 999, border: '1px solid rgba(37,99,235,.3)' }}>{p.step}</span>
                </div>
                <h4 style={{ marginBottom: 8 }}>{p.title}</h4>
                <p style={{ fontSize: '0.875rem' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="section section-dark">
          <div className="container">
            <SectionHeader
              center
              light
              tag={{ icon: 'bi-chat-quote', text: 'Client Stories' }}
              title="What Our Clients Say"
              subtitle="Real results, real relationships — hear directly from the organisations we've served."
            />
            <div className="testimonials-grid">
              {testimonials.map(t => <TestimonialCard key={t.id} t={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Blog ─────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="section" style={{ background: 'var(--gray-100)' }}>
          <div className="container">
            <SectionHeader
              center
              tag={{ icon: 'bi-newspaper', text: 'Insights' }}
              title="From Our Blog"
              subtitle="Expert articles on technology trends, best practices, and digital transformation in Africa."
            />
            <div className="blog-grid">
              {posts.map(p => <BlogCard key={p.id} post={p} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/blog" className="btn btn-outline btn-lg">
                Read All Articles <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  )
}