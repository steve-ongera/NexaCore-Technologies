import React from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const SERVICES = [
  { icon: 'bi-search', title: 'Search Engine Optimisation (SEO)', desc: 'On-page, off-page, and technical SEO strategies that rank your website on page one of Google for high-intent keywords in your market.' },
  { icon: 'bi-google', title: 'Google Ads (SEM)', desc: 'Data-driven PPC campaigns on Google Search, Display, and YouTube — maximum ROI on every shilling spent.' },
  { icon: 'bi-instagram', title: 'Social Media Marketing', desc: 'Content creation, community management, and paid ads on Facebook, Instagram, LinkedIn, TikTok, and X (Twitter).' },
  { icon: 'bi-envelope-open', title: 'Email Marketing', desc: 'Automated drip campaigns, newsletters, and transactional emails built on Mailchimp, Klaviyo, or our NexaSMS™ platform.' },
  { icon: 'bi-bar-chart-line', title: 'Analytics & Reporting', desc: 'GA4, Google Search Console, Meta Pixel, and custom dashboards — real data, clear insights, actionable decisions.' },
  { icon: 'bi-pencil-square', title: 'Content Marketing', desc: 'SEO-optimised blog articles, whitepapers, case studies, and social content that builds authority and drives organic traffic.' },
  { icon: 'bi-camera-video', title: 'Video Production & Ads', desc: 'Corporate videos, product demos, explainers, and short-form social content shot and edited by our in-house creatives.' },
  { icon: 'bi-megaphone', title: 'Influencer Marketing', desc: 'Authentic partnerships with East African creators and micro-influencers matched to your brand and target audience.' },
]

const PACKAGES = [
  {
    name: 'Starter',
    price: 'KES 25,000',
    period: '/month',
    desc: 'Perfect for SMEs taking their first digital steps.',
    features: ['SEO Audit & Optimisation', 'Google My Business Setup', '2× Social Media Platforms', '8× Posts per Month', 'Monthly Performance Report'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: 'KES 65,000',
    period: '/month',
    desc: 'For growing businesses that need serious online presence.',
    features: ['Full SEO Campaign', 'Google Ads Management (up to KES 50k budget)', '4× Social Media Platforms', '20× Posts + Stories', 'Email Marketing (2× monthly)', 'Bi-weekly Report + Strategy Call'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Full-service marketing for large organisations.',
    features: ['All Growth features', 'Dedicated Account Manager', 'Video Content Production', 'Influencer Campaigns', 'Advanced Analytics Dashboard', 'Priority Support'],
    cta: 'Contact Us',
    featured: false,
  },
]

const METRICS = [
  { icon: 'bi-graph-up-arrow', value: '3.5×', label: 'Average ROAS on Google Ads' },
  { icon: 'bi-search', value: 'Top 3', label: 'Average Google Ranking After 6 Months' },
  { icon: 'bi-people', value: '250%', label: 'Average Social Following Growth (YoY)' },
  { icon: 'bi-envelope-check', value: '42%', label: 'Average Email Open Rate' },
]

export default function DigitalMarketingPage() {
  return (
    <>
      <SEOHead
        title="Digital Marketing Services"
        description="NexaCore Technologies delivers results-driven digital marketing: SEO, Google Ads, social media, email marketing, and content creation for East African businesses."
        keywords="digital marketing Kenya, SEO Nairobi, Google Ads Kenya, social media marketing, content marketing East Africa"
      />

      <PageHero
        title="Digital Marketing Services"
        subtitle="Grow your audience, generate more leads, and dominate your market online — backed by data, not guesswork."
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Digital Marketing' }]}
      />

      {/* Services */}
      <section className="section">
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-megaphone', text: 'Our Services' }}
            title="Full-Funnel Digital Marketing"
            subtitle="From awareness to conversion — we cover every stage of your customer journey."
          />
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon"><i className={`bi ${s.icon}`} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/contact" className="read-more">Get a Quote <i className="bi bi-arrow-right" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section-dark section-sm">
        <div className="container">
          <div className="stats-row">
            {METRICS.map((m, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon"><i className={`bi ${m.icon}`} /></div>
                <div className="stat-number">{m.value}</div>
                <div className="stat-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <SectionHeader
            center
            tag={{ icon: 'bi-tag', text: 'Packages' }}
            title="Transparent Monthly Packages"
            subtitle="No long contracts. Cancel any time. Just consistent results."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 960, margin: '0 auto' }}>
            {PACKAGES.map((pkg, i) => (
              <div key={i} style={{
                background: pkg.featured ? 'var(--navy)' : 'var(--white)',
                border: pkg.featured ? '2px solid var(--blue)' : '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-xl)',
                padding: 36,
                position: 'relative',
                transform: pkg.featured ? 'scale(1.03)' : 'none',
                boxShadow: pkg.featured ? 'var(--shadow-blue)' : 'none',
              }}>
                {pkg.featured && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--blue)', color: '#fff', padding: '4px 20px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ color: pkg.featured ? 'var(--white)' : 'var(--navy)', marginBottom: 8 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: 20, color: pkg.featured ? 'var(--gray-400)' : 'var(--gray-600)' }}>{pkg.desc}</p>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 800, color: pkg.featured ? 'var(--white)' : 'var(--navy)' }}>{pkg.price}</span>
                  <span style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>{pkg.period}</span>
                </div>
                <ul style={{ marginBottom: 32 }}>
                  {pkg.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, color: pkg.featured ? 'rgba(255,255,255,.8)' : 'var(--gray-600)', fontSize: '0.875rem' }}>
                      <i className="bi bi-check2-circle" style={{ color: 'var(--blue-light)', flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn ${pkg.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {pkg.cta} <i className="bi bi-arrow-right" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="label-tag"><i className="bi bi-lightbulb" /> Our Approach</div>
              <h2 style={{ marginBottom: 20 }}>Data-Driven Marketing That Actually Works</h2>
              <p style={{ marginBottom: 16 }}>We don't post random content and hope for the best. Every piece of content, every ad, every campaign is backed by keyword research, audience data, and competitor analysis.</p>
              <p style={{ marginBottom: 16 }}>Our dedicated team of certified Google Ads specialists, social media managers, and SEO experts collaborate to build integrated marketing strategies tailored to the East African market.</p>
              <p style={{ marginBottom: 28 }}>Monthly reports include real KPIs — traffic, leads, conversions, ROAS — not vanity metrics like "impressions" and "reach".</p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <i className="bi bi-rocket-takeoff" /> Start Growing Today
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: 'bi-check2-all', title: 'Certified Google Partners', text: 'Our ads team is Google Ads and Analytics certified.' },
                { icon: 'bi-bar-chart', title: 'Monthly Strategy Reviews', text: 'We adjust campaigns monthly based on live performance data.' },
                { icon: 'bi-globe', title: 'Local Market Expertise', text: 'We know Kenyan consumers, search behaviour, and seasonal trends.' },
                { icon: 'bi-headset', title: 'Dedicated Account Manager', text: 'One point of contact who knows your business inside out.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--gray-100)', borderRadius: 'var(--radius)', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, var(--blue), var(--cyan))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner title="Ready to Grow Your Business Online?" subtitle="Get a free digital marketing audit — we'll show you exactly what's holding your online presence back." primaryLabel="Get Free Audit" />
    </>
  )
}