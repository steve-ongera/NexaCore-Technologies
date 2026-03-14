import React from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const SERVICES = [
  { icon: 'bi-shield-lock', title: 'Penetration Testing', desc: 'Certified ethical hackers simulate real-world attacks against your web apps, APIs, networks, and physical premises to uncover exploitable vulnerabilities before attackers do.' },
  { icon: 'bi-search', title: 'Vulnerability Assessment', desc: 'Automated and manual scans of your entire attack surface, scored by severity with a prioritised remediation roadmap.' },
  { icon: 'bi-eye', title: 'SIEM & Monitoring', desc: '24/7 Security Information and Event Management — real-time alerting, log aggregation, and threat correlation using Elastic, Splunk or Wazuh.' },
  { icon: 'bi-people', title: 'Security Awareness Training', desc: 'Engaging phishing simulations and security workshops that turn your staff from the weakest link into your strongest defence.' },
  { icon: 'bi-file-earmark-check', title: 'ISO 27001 Consulting', desc: 'Gap analysis, policy writing, risk register, and audit preparation to achieve ISO/IEC 27001 certification.' },
  { icon: 'bi-fire', title: 'Incident Response', desc: '24/7 emergency response to active breaches — containment, forensics, eradication, recovery, and post-incident reporting.' },
  { icon: 'bi-cloud-check', title: 'Cloud Security Review', desc: 'AWS, Azure, and GCP security posture review — misconfiguration detection, IAM audits, and hardening recommendations.' },
  { icon: 'bi-phone-vibrate', title: 'Mobile App Security', desc: 'OWASP Mobile Top 10 assessment for your Android or iOS applications, with a detailed findings report.' },
]

const STATS = [
  { value: '300+', label: 'Security Audits Completed', icon: 'bi-shield-check' },
  { value: '0', label: 'Breaches Post-Engagement', icon: 'bi-lock' },
  { value: '48h', label: 'Average Report Turnaround', icon: 'bi-clock' },
  { value: 'ISO', label: '27001 Certified', icon: 'bi-patch-check' },
]

const PROCESS = [
  { step: '01', title: 'Scoping', desc: 'We define the engagement boundaries, target systems, rules of engagement, and deliverables.' },
  { step: '02', title: 'Reconnaissance', desc: 'Passive and active information gathering about your attack surface.' },
  { step: '03', title: 'Exploitation', desc: 'Controlled, non-destructive exploitation of discovered vulnerabilities.' },
  { step: '04', title: 'Reporting', desc: 'Executive summary + full technical report with CVSS scores and remediation steps.' },
  { step: '05', title: 'Remediation Support', desc: 'Free follow-up call to guide your team through fixing identified issues.' },
]

export default function CybersecurityPage() {
  return (
    <>
      <SEOHead
        title="Cybersecurity Services"
        description="NexaCore Technologies offers enterprise cybersecurity: penetration testing, SIEM, ISO 27001 consulting, incident response, and security training across East Africa."
        keywords="cybersecurity Kenya, penetration testing Nairobi, ISO 27001 Kenya, SIEM setup, ethical hacker Kenya, security audit"
      />

      <PageHero
        title="Cybersecurity Services"
        subtitle="Protect your organisation before attackers find their way in. Our certified security team has your back — 24/7."
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Cybersecurity' }]}
      />

      {/* Urgency Banner */}
      <div style={{ background: 'linear-gradient(90deg, #ef4444, #dc2626)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', textAlign: 'center' }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ color: '#fff', fontSize: '1.1rem' }} />
          <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
            60% of Kenyan SMEs experienced a cyberattack in 2024. Is your organisation protected?
          </p>
          <Link to="/contact" className="btn" style={{ background: '#fff', color: '#dc2626', padding: '6px 18px', fontSize: '0.85rem', fontWeight: 700 }}>
            Get a Free Assessment
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-shield', text: 'What We Offer' }}
            title="Full-Spectrum Cybersecurity"
            subtitle="From proactive testing to real-time monitoring — we protect every layer of your digital infrastructure."
          />
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon"><i className={`bi ${s.icon}`} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/contact" className="read-more">
                  Get a Quote <i className="bi bi-arrow-right" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-dark section-sm">
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon"><i className={`bi ${s.icon}`} /></div>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pentest Process */}
      <section className="section">
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-diagram-3', text: 'Our Process' }}
            title="How a Penetration Test Works"
            subtitle="Our structured, transparent engagement process from kick-off to final report."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 700, margin: '0 auto' }}>
            {PROCESS.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, paddingBottom: 32, position: 'relative' }}>
                {i < PROCESS.length - 1 && (
                  <div style={{ position: 'absolute', left: 22, top: 48, bottom: 0, width: 2, background: 'var(--gray-200)' }} />
                )}
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                  {p.step}
                </div>
                <div>
                  <h4 style={{ marginBottom: 6 }}>{p.title}</h4>
                  <p style={{ fontSize: '0.9rem' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-sm" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <SectionHeader center tag={{ icon: 'bi-patch-check', text: 'Compliance' }} title="Standards & Frameworks We Work With" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {['ISO/IEC 27001', 'OWASP Top 10', 'NIST CSF', 'PCI-DSS', 'GDPR / DPA Kenya', 'CIS Controls', 'PTES', 'MITRE ATT&CK'].map((f, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', padding: '12px 24px', fontWeight: 600, fontSize: '0.875rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--blue)' }} />{f}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't Wait for a Breach to Act"
        subtitle="Book a free 30-minute security consultation with our certified experts."
        primaryLabel="Book Free Consultation"
        secondaryLabel="Download Security Guide"
        secondaryHref="/contact"
      />
    </>
  )
}