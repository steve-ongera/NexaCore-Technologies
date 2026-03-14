import React, { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchServices, fetchServiceCategories } from '../services/api'

const STATIC_SERVICES = [
  { id: 1, slug: 'software-development', title: 'Custom Software Development', tagline: 'Web apps, desktop systems, APIs built to spec', icon: 'bi-code-slash', category_slug: 'software' },
  { id: 2, slug: 'erp-management-systems', title: 'ERP & Management Systems', tagline: 'Procurement MIS, HR, Finance, Inventory', icon: 'bi-diagram-3', category_slug: 'software' },
  { id: 3, slug: 'ecommerce-development', title: 'eCommerce Development', tagline: 'Online stores built for conversion and scale', icon: 'bi-cart', category_slug: 'software' },
  { id: 4, slug: 'bulk-sms-api', title: 'Bulk SMS & API Gateway', tagline: 'High-delivery SMS platform with REST API', icon: 'bi-chat-dots', category_slug: 'software' },
  { id: 5, slug: 'android-development', title: 'Android App Development', tagline: 'Native Android & cross-platform solutions', icon: 'bi-phone', category_slug: 'mobile' },
  { id: 6, slug: 'school-portals', title: 'School & University Portals', tagline: 'Student, staff, parent portals — full LMS', icon: 'bi-mortarboard', category_slug: 'portals' },
  { id: 7, slug: 'sacco-systems', title: 'SACCO Management System', tagline: 'Loans, deposits, members, dividends', icon: 'bi-bank', category_slug: 'fintech' },
  { id: 8, slug: 'government-websites', title: 'Government & Institutional Websites', tagline: 'Accessible, bilingual, WCAG-compliant portals', icon: 'bi-building', category_slug: 'portals' },
  { id: 9, slug: 'personal-websites', title: 'Personal & Corporate Websites', tagline: 'High-impact digital presence for individuals', icon: 'bi-person-badge', category_slug: 'software' },
  { id: 10, slug: 'hospital-systems', title: 'Hospital & Health Systems', tagline: 'Patient records, appointments, billing', icon: 'bi-heart-pulse', category_slug: 'portals' },
  { id: 11, slug: 'networking-cctv', title: 'Networking & CCTV Installation', tagline: 'Structured cabling, Wi-Fi, IP cameras', icon: 'bi-router', category_slug: 'infra' },
  { id: 12, slug: 'server-import-setup', title: 'Server Import & Data Centre Setup', tagline: 'Rack, power, cooling — complete data room builds', icon: 'bi-server', category_slug: 'infra' },
  { id: 13, slug: 'computer-setup-maintenance', title: 'Computer Setup & Maintenance', tagline: 'Procurement, imaging, cleaning, repair', icon: 'bi-pc-display', category_slug: 'infra' },
  { id: 14, slug: 'elevator-coding', title: 'Elevator Coding & Maintenance', tagline: 'Controller programming and scheduled servicing', icon: 'bi-arrow-up-square', category_slug: 'infra' },
  { id: 15, slug: 'cybersecurity', title: 'Cybersecurity Consultation', tagline: 'Penetration testing, audits, SIEM, training', icon: 'bi-shield-lock', category_slug: 'security' },
  { id: 16, slug: 'digital-marketing', title: 'Digital Marketing & SEO', tagline: 'SEO, SEM, social media, email campaigns', icon: 'bi-megaphone', category_slug: 'marketing' },
]

const STATIC_CATEGORIES = [
  { id: 0, slug: 'all', name: 'All Services', icon: 'bi-grid' },
  { id: 1, slug: 'software', name: 'Software', icon: 'bi-code-slash' },
  { id: 2, slug: 'mobile', name: 'Mobile', icon: 'bi-phone' },
  { id: 3, slug: 'portals', name: 'Portals & Systems', icon: 'bi-window' },
  { id: 4, slug: 'fintech', name: 'FinTech', icon: 'bi-bank' },
  { id: 5, slug: 'infra', name: 'IT Infrastructure', icon: 'bi-router' },
  { id: 6, slug: 'security', name: 'Cybersecurity', icon: 'bi-shield-lock' },
  { id: 7, slug: 'marketing', name: 'Digital Marketing', icon: 'bi-megaphone' },
]

export default function ServicesPage() {
  const [services, setServices] = useState(STATIC_SERVICES)
  const [categories, setCategories] = useState(STATIC_CATEGORIES)
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchServices(), fetchServiceCategories()])
      .then(([sRes, cRes]) => {
        const s = sRes.data.results || sRes.data
        const c = cRes.data.results || cRes.data
        if (s.length) setServices(s)
        if (c.length) setCategories([{ id: 0, slug: 'all', name: 'All Services', icon: 'bi-grid' }, ...c])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.category_slug === activeCategory || s.category_name?.toLowerCase().includes(activeCategory))

  return (
    <>
      <SEOHead
        title="IT Services"
        description="Explore NexaCore's full range of IT services: software development, ERP, bulk SMS, Android apps, school portals, SACCO systems, cybersecurity, networking, CCTV, and more."
        keywords="IT services Kenya, software development, ERP, bulk SMS, cybersecurity, networking, CCTV Nairobi"
      />

      <PageHero
        title="Our Services"
        subtitle="End-to-end technology solutions for businesses, institutions, and governments across East Africa."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className="btn"
                style={{
                  padding: '8px 20px',
                  fontSize: '0.875rem',
                  background: activeCategory === cat.slug ? 'var(--blue)' : 'var(--gray-100)',
                  color: activeCategory === cat.slug ? 'var(--white)' : 'var(--gray-600)',
                  border: activeCategory === cat.slug ? 'none' : '1px solid var(--gray-200)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  transition: 'var(--transition)',
                }}
              >
                <i className={`bi ${cat.icon}`} style={{ marginRight: 6 }} />{cat.name}
              </button>
            ))}
          </div>

          {loading ? <Loader /> : (
            <div className="services-grid">
              {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>
          )}
        </div>
      </section>

      {/* Service Highlight Blocks */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeader
            center
            light
            tag={{ icon: 'bi-star', text: 'Flagship Solutions' }}
            title="Industry-Leading Platforms"
            subtitle="Our most impactful proprietary solutions, deployed across hundreds of organisations."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28 }}>
            {[
              { icon: 'bi-buildings', title: 'NexaERP™', desc: 'A fully modular ERP covering procurement, HR, payroll, finance, inventory, and reporting — customisable for any industry.', tags: ['Procurement', 'HR', 'Finance', 'Inventory'] },
              { icon: 'bi-chat-square-dots', title: 'NexaSMS™', desc: 'Our enterprise bulk SMS gateway with REST API, delivery receipts, contact management, and sub-account billing.', tags: ['REST API', 'Delivery Reports', 'Scheduling'] },
              { icon: 'bi-mortarboard', title: 'NexaEDU™', desc: 'Complete school and university management — student portal, e-learning, finance, library, and mobile app included.', tags: ['Student Portal', 'LMS', 'Finance', 'Mobile'] },
              { icon: 'bi-bank', title: 'NexaSACCO™', desc: 'Purpose-built SACCO management covering member onboarding, loan processing, dividends, and mobile banking.', tags: ['Loans', 'Members', 'Mobile Banking'] },
            ].map((p, i) => (
              <div key={i} style={{ background: 'var(--navy-light)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 'var(--radius-lg)', padding: 32, transition: 'var(--transition)' }}>
                <i className={`bi ${p.icon}`} style={{ fontSize: '2rem', color: 'var(--blue-light)', marginBottom: 16, display: 'block' }} />
                <h3 style={{ color: 'var(--white)', marginBottom: 12, fontSize: '1.3rem' }}>{p.title}</h3>
                <p style={{ marginBottom: 20, fontSize: '0.9rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Service You Need?"
        subtitle="Talk to our consultants — free of charge. We'll help you identify the right solutions for your goals."
        primaryLabel="Book Free Consultation"
        secondaryLabel="View Pricing"
        secondaryHref="/contact"
      />
    </>
  )
}