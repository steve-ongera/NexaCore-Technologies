import React, { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchFAQs } from '../services/api'

const STATIC_FAQS = [
  { id: 1, question: 'What types of software does NexaCore develop?', answer: 'We build custom web applications, mobile (Android) apps, ERP systems, eCommerce platforms, school portals, SACCO management systems, government portals, hospital systems, and any bespoke software your organisation needs. If you can imagine it, we can build it.', category_name: 'Software' },
  { id: 2, question: 'How long does a typical software project take?', answer: 'Timelines vary by complexity. A basic website takes 2–4 weeks. A full ERP or management system typically takes 3–6 months. We provide a detailed project plan with milestones at the start of every engagement so you always know what to expect.', category_name: 'Software' },
  { id: 3, question: 'Do you offer post-launch support and maintenance?', answer: 'Yes. All our projects come with a 3-month free support period after go-live. We also offer monthly and annual maintenance packages covering bug fixes, security patches, performance tuning, and feature updates.', category_name: 'Support' },
  { id: 4, question: 'How does your Bulk SMS gateway work?', answer: 'Our NexaSMS™ platform provides a REST API you integrate into your application. You upload contacts or call the API directly, set your sender ID, and messages are delivered with real-time delivery reports. We support scheduled sending, personalised messages, and sub-account billing for resellers.', category_name: 'Bulk SMS' },
  { id: 5, question: 'Can you set up our office network and CCTV?', answer: 'Absolutely. Our infrastructure team handles structured cabling, Wi-Fi access point installation, firewall configuration, IP CCTV cameras, NVR/DVR setup, and remote monitoring configuration. We also supply and import servers.', category_name: 'Infrastructure' },
  { id: 6, question: 'What cybersecurity services do you provide?', answer: 'Our certified security team offers penetration testing, vulnerability assessments, SIEM setup and monitoring, security awareness training for staff, ISO 27001 readiness consulting, and incident response services.', category_name: 'Cybersecurity' },
  { id: 7, question: 'Do you work with government institutions?', answer: 'Yes. We have successfully delivered county government websites, national ministry portals, public institution MIS, and e-procurement systems. We understand public procurement processes and can engage via tenders.', category_name: 'Government' },
  { id: 8, question: 'How do you price your projects?', answer: 'We use a combination of fixed-price (for well-defined projects) and time-and-materials (for ongoing development) pricing models. We always provide a detailed written quotation before any work begins, with no hidden fees.', category_name: 'Pricing' },
  { id: 9, question: 'Can you develop a SACCO management system?', answer: 'Yes. Our NexaSACCO™ platform covers member registration, share contributions, loan applications and approval workflows, dividend calculations, SMS notifications, mobile money integration, and full financial reporting.', category_name: 'Software' },
  { id: 10, question: 'Do you train staff on the systems you build?', answer: 'Yes. Every project includes comprehensive user training delivered in-person or via video call. We also provide detailed user manuals and video tutorials for ongoing staff onboarding.', category_name: 'Support' },
  { id: 11, question: 'What technologies do you use?', answer: 'Our stack includes Django, FastAPI, Node.js, React, Next.js, Vue.js for web; Android (Kotlin/Java) and Flutter for mobile; PostgreSQL, MySQL, MongoDB for databases; AWS, Azure, and DigitalOcean for cloud; and Cisco/Ubiquiti for networking.', category_name: 'Software' },
  { id: 12, question: 'Do you handle elevator/lift coding and maintenance?', answer: 'Yes. Our certified engineers program elevator controllers, integrate access control, implement floor-restriction logic, and carry out scheduled preventive maintenance on lifts and escalators.', category_name: 'Infrastructure' },
]

export default function FAQPage() {
  const [faqs, setFaqs] = useState(STATIC_FAQS)
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchFAQs()
      .then(r => {
        const data = r.data.results || r.data
        if (data.length) setFaqs(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(faqs.map(f => f.category_name).filter(Boolean))]

  const filtered = faqs.filter(f => {
    const matchSearch = search
      ? f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
      : true
    const matchCat = activeCategory === 'All' || f.category_name === activeCategory
    return matchSearch && matchCat
  })

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id))

  return (
    <>
      <SEOHead
        title="FAQs — Frequently Asked Questions"
        description="Find answers to common questions about NexaCore Technologies' services, pricing, timelines, bulk SMS, cybersecurity, networking, and software development."
        keywords="NexaCore FAQ, IT questions Kenya, software development FAQ, bulk SMS help"
      />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Answers to the most common questions about our services, process, pricing, and support."
        breadcrumbs={[{ label: 'FAQs' }]}
      />

      <section className="section">
        <div className="container">

          {/* Search */}
          <div style={{ maxWidth: 520, margin: '0 auto 36px', position: 'relative' }}>
            <i className="bi bi-search" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '13px 16px 13px 46px', border: '1.5px solid var(--gray-200)', borderRadius: 999, fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="btn"
                style={{
                  padding: '7px 18px',
                  fontSize: '0.85rem',
                  background: activeCategory === cat ? 'var(--blue)' : 'var(--gray-100)',
                  color: activeCategory === cat ? 'var(--white)' : 'var(--gray-600)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--gray-200)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? <Loader /> : filtered.length ? (
            <div className="faq-list">
              {filtered.map(faq => (
                <div key={faq.id} className={`faq-item ${openId === faq.id ? 'open' : ''}`}>
                  <div className="faq-question" onClick={() => toggle(faq.id)}>
                    <h4>{faq.question}</h4>
                    <i className="bi bi-chevron-down" />
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><i className="bi bi-question-circle" /></div>
              <h3>No questions found</h3>
              <p>Try a different search term or category.</p>
            </div>
          )}

          {/* Still have questions */}
          <div style={{ textAlign: 'center', marginTop: 64, padding: '48px 32px', background: 'var(--gray-100)', borderRadius: 'var(--radius-xl)' }}>
            <i className="bi bi-chat-dots-fill" style={{ fontSize: '2rem', color: 'var(--blue)', marginBottom: 16, display: 'block' }} />
            <h3 style={{ marginBottom: 12 }}>Still Have Questions?</h3>
            <p style={{ marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
              Our team is available Monday–Friday, 8 AM–6 PM EAT. We typically respond within 2 hours.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-primary btn-lg">
                <i className="bi bi-envelope" /> Send a Message
              </a>
              <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">
                <i className="bi bi-whatsapp" style={{ color: '#25d366' }} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}