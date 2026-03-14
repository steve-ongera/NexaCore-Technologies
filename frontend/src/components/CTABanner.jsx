import React from 'react'
import { Link } from 'react-router-dom'

/**
 * CTABanner — full-width call-to-action section.
 *
 * Props:
 *   title           – Main heading
 *   subtitle        – Supporting paragraph
 *   primaryLabel    – Primary button text
 *   primaryHref     – Primary button URL
 *   primaryIcon     – Bootstrap icon class (default 'bi-rocket-takeoff')
 *   secondaryLabel  – Secondary button text
 *   secondaryHref   – Secondary button URL
 *   secondaryIcon   – Bootstrap icon class
 *   showWhatsApp    – Boolean — show a WhatsApp quick-contact pill
 *   variant         – 'gradient' | 'navy' | 'split'
 */
export default function CTABanner({
  title = 'Ready to Build Something Extraordinary?',
  subtitle = 'Partner with NexaCore Technologies — trusted by leading organisations across East Africa.',
  primaryLabel = 'Start a Project',
  primaryHref = '/contact',
  primaryIcon = 'bi-rocket-takeoff',
  secondaryLabel = 'View Our Portfolio',
  secondaryHref = '/portfolio',
  secondaryIcon = 'bi-collection',
  showWhatsApp = true,
  variant = 'gradient',
}) {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="container">
        <div className={`cta-banner cta-banner--${variant}`}>

          {/* Decorative circles */}
          <div className="cta-banner__deco cta-banner__deco--1" aria-hidden="true" />
          <div className="cta-banner__deco cta-banner__deco--2" aria-hidden="true" />
          <div className="cta-banner__deco cta-banner__deco--3" aria-hidden="true" />

          <div className="cta-banner__content">
            {/* Icon */}
            <div className="cta-banner__icon" aria-hidden="true">
              <i className="bi bi-stars" />
            </div>

            <h2>{title}</h2>
            <p>{subtitle}</p>

            {/* Buttons */}
            <div className="cta-banner__btns">
              <Link to={primaryHref} className="btn btn-white btn-lg">
                <i className={`bi ${primaryIcon}`} aria-hidden="true" />
                {primaryLabel}
              </Link>

              {secondaryLabel && (
                <Link to={secondaryHref} className="btn btn-outline-white btn-lg">
                  {secondaryIcon && <i className={`bi ${secondaryIcon}`} aria-hidden="true" />}
                  {secondaryLabel}
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
              )}
            </div>

            {/* WhatsApp quick pill */}
            {showWhatsApp && (
              <div className="cta-banner__whatsapp">
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Chat with us on WhatsApp"
                >
                  <i className="bi bi-whatsapp" aria-hidden="true" />
                  Prefer a quick chat? Message us on WhatsApp
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Trust signals strip */}
          <div className="cta-banner__trust" aria-label="Trust signals">
            {[
              { icon: 'bi-clock', text: 'Response within 2 hours' },
              { icon: 'bi-shield-check', text: 'Free consultation' },
              { icon: 'bi-people', text: '200+ clients served' },
              { icon: 'bi-patch-check', text: 'ISO 27001 certified' },
            ].map((item, i) => (
              <div key={i} className="cta-banner__trust-item">
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}