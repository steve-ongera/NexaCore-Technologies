import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchTeam, fetchStats } from '../services/api'

const VALUES = [
  { icon: 'bi-integrity', label: 'Integrity', text: 'We deliver on every promise, maintain transparency in every contract, and stand behind every line of code we write.' },
  { icon: 'bi-lightbulb', label: 'Innovation', text: 'We continuously explore emerging technologies to give our clients a competitive edge.' },
  { icon: 'bi-award', label: 'Excellence', text: 'From UI design to backend architecture, quality is non-negotiable at every level.' },
  { icon: 'bi-people', label: 'Collaboration', text: 'We work as an extension of your team — your vision drives every decision we make.' },
  { icon: 'bi-globe2', label: 'Pan-African Focus', text: 'Our solutions are built for African infrastructure realities and designed for global standards.' },
  { icon: 'bi-heart', label: 'Community Impact', text: 'We invest in digital literacy initiatives, mentorship, and affordable tech for SMEs.' },
]

const TIMELINE = [
  { year: '2013', title: 'NexaCore Founded', desc: 'Started as a 3-person web development studio in Nairobi.' },
  { year: '2015', title: 'First Government Contract', desc: 'Delivered a county government website and MIS — marking our entry into public sector.' },
  { year: '2017', title: 'ERP Division Launched', desc: 'Introduced our flagship Enterprise Resource Planning product line.' },
  { year: '2019', title: 'Bulk SMS Gateway', desc: 'Launched Kenya\'s most reliable bulk SMS & API platform, now serving 500+ businesses.' },
  { year: '2021', title: 'Cybersecurity Unit', desc: 'Established a dedicated cybersecurity division with certified ethical hackers.' },
  { year: '2022', title: 'Regional Expansion', desc: 'Opened offices in Uganda and Tanzania. Team grew to 60+ professionals.' },
  { year: '2024', title: 'AI & Cloud Integration', desc: 'Launched AI-powered analytics modules and cloud migration services.' },
  { year: '2025', title: 'ISO Certification', desc: 'Achieved ISO 27001 certification, reinforcing our cybersecurity commitment.' },
]

const STATIC_STATS = [
  { id: 1, value: '500+', label: 'Projects Delivered', icon: 'bi-check2-circle' },
  { id: 2, value: '200+', label: 'Happy Clients', icon: 'bi-people' },
  { id: 3, value: '10+', label: 'Years Experience', icon: 'bi-award' },
  { id: 4, value: '3', label: 'Country Offices', icon: 'bi-geo-alt' },
]

export default function AboutPage() {
  const [team, setTeam] = useState([])
  const [stats, setStats] = useState(STATIC_STATS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchTeam({ is_leadership: true }), fetchStats()])
      .then(([teamRes, statsRes]) => {
        if (teamRes.data.results?.length || teamRes.data.length) setTeam(teamRes.data.results || teamRes.data)
        if (statsRes.data.length) setStats(statsRes.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEOHead
        title="About NexaCore Technologies"
        description="Learn about NexaCore Technologies — our story, mission, values, and the team driving digital transformation across East Africa since 2013."
        keywords="about NexaCore, IT company Kenya history, software company Nairobi team"
      />

      <PageHero
        title="About NexaCore Technologies"
        subtitle="A decade of building the digital backbone of East African enterprises, institutions, and governments."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="label-tag"><i className="bi bi-flag" /> Our Story</div>
              <h2 style={{ marginBottom: 20 }}>Built in Kenya, Serving the World</h2>
              <p style={{ marginBottom: 18 }}>
                NexaCore Technologies was founded in 2013 with a single conviction: African businesses deserve world-class software built by people who truly understand the local context.
              </p>
              <p style={{ marginBottom: 18 }}>
                What began as a small web agency in Nairobi has grown into a 60-person full-service IT powerhouse trusted by universities, SACCOs, county governments, hospitals, and Fortune-class enterprises across East Africa.
              </p>
              <p style={{ marginBottom: 28 }}>
                We do not just write code — we architect digital ecosystems. From importing and racking servers to deploying machine-learning analytics, from installing CCTV cameras to building custom ERP platforms, NexaCore is the only technology partner you will ever need.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Partner With Us <i className="bi bi-arrow-right" />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { icon: 'bi-flag', color: 'var(--blue)', title: 'Our Mission', text: 'To democratize enterprise-grade technology for every organisation in Africa — regardless of size or budget.' },
                { icon: 'bi-eye', color: 'var(--cyan)', title: 'Our Vision', text: 'To be the most trusted technology company on the African continent by 2030.' },
                { icon: 'bi-shield-check', color: 'var(--green)', title: 'Our Promise', text: 'On-time delivery, transparent communication, and solutions that actually solve your problems.' },
                { icon: 'bi-graph-up-arrow', color: 'var(--orange)', title: 'Our Ambition', text: 'Continuously raising the bar on quality, speed, and impact — one project at a time.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius)', padding: 24 }}>
                  <i className={`bi ${item.icon}`} style={{ fontSize: '1.5rem', color: item.color, marginBottom: 12, display: 'block' }} />
                  <h4 style={{ marginBottom: 8, fontSize: '1rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Values */}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-heart', text: 'Our Values' }}
            title="What Drives Us Every Day"
            subtitle="Our culture is defined by six core values that guide every decision, every line of code, every client interaction."
          />
          <div className="features-grid" style={{ '--features-bg': 'var(--white)' }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', padding: 28, display: 'flex', gap: 16, transition: 'var(--transition)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="feature-icon"><i className={`bi ${v.icon}`} /></div>
                <div>
                  <h4 style={{ marginBottom: 6 }}>{v.label}</h4>
                  <p style={{ fontSize: '0.875rem' }}>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeader
            center
            light
            tag={{ icon: 'bi-clock-history', text: 'Our Journey' }}
            title="A Decade of Growth & Impact"
          />
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(37,99,235,.3)', transform: 'translateX(-50%)' }} />
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', paddingRight: i % 2 === 0 ? 'calc(50% + 32px)' : 0, paddingLeft: i % 2 !== 0 ? 'calc(50% + 32px)' : 0, marginBottom: 40, position: 'relative' }}>
                <div style={{ background: 'var(--navy-light)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 'var(--radius)', padding: '20px 24px', maxWidth: 320 }}>
                  <span style={{ color: 'var(--blue-light)', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.85rem' }}>{item.year}</span>
                  <h4 style={{ color: 'var(--white)', margin: '6px 0 8px', fontSize: '1rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem' }}>{item.desc}</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: 20, width: 14, height: 14, background: 'var(--blue)', borderRadius: '50%', transform: 'translateX(-50%)', border: '2px solid var(--navy)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section">
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-people', text: 'Leadership' }}
            title="Meet Our Leadership Team"
            subtitle="Experienced professionals united by a passion for technology and African development."
          />
          {loading ? <Loader /> : team.length > 0 ? (
            <div className="team-grid">
              {team.map(m => (
                <div key={m.id} className="team-card">
                  <div className="team-photo">
                    {m.photo_display
                      ? <img src={m.photo_display} alt={m.name} />
                      : <div className="team-photo-placeholder"><i className="bi bi-person-fill" /></div>
                    }
                  </div>
                  <div className="team-body">
                    <h4>{m.name}</h4>
                    <p className="position">{m.position}</p>
                    <p>{m.bio?.slice(0, 100)}…</p>
                    <div className="team-socials">
                      {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer"><i className="bi bi-linkedin" /></a>}
                      {m.twitter && <a href={m.twitter} target="_blank" rel="noreferrer"><i className="bi bi-twitter-x" /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Link to="/team" className="btn btn-outline btn-lg">Meet the Full Team <i className="bi bi-arrow-right" /></Link>
            </div>
          )}
          {team.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/team" className="btn btn-outline btn-lg">View Full Team <i className="bi bi-arrow-right" /></Link>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="section-sm" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-patch-check', text: 'Certifications' }}
            title="Globally Recognised Standards"
          />
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
            {['ISO 27001', 'Microsoft Partner', 'Google Partner', 'AWS Partner', 'Cisco Certified', 'ISACA Member'].map((cert, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', padding: '16px 28px', textAlign: 'center', fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>
                <i className="bi bi-patch-check-fill" style={{ color: 'var(--blue)', marginRight: 8 }} />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}