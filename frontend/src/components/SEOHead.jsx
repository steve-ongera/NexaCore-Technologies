import { useEffect } from 'react'

const SITE_NAME = 'NexaCore Technologies'
const SITE_URL = 'https://www.nexacore.co.ke'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
const DEFAULT_DESCRIPTION =
  'NexaCore Technologies — Kenyas leading full-service IT company. Custom software, ERP, bulk SMS, cybersecurity, networking, CCTV and more across East Africa.'

/**
 * SEOHead — dynamically updates <head> meta tags per page.
 *
 * Props:
 *   title         – Page title (appended with " | NexaCore Technologies")
 *   description   – Meta description (max ~160 chars recommended)
 *   keywords      – Comma-separated keywords
 *   canonical     – Canonical URL (defaults to window.location.href)
 *   ogImage       – Open Graph image URL
 *   ogType        – OG type (default 'website'; use 'article' for blog posts)
 *   noIndex       – Set true to add noindex meta (drafts, private pages)
 *   structuredData – JSON-LD object or array for page-specific schema
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData = null,
}) {
  useEffect(() => {
    /* ── Helpers ──────────────────────────────────── */
    const setTitle = (t) => { document.title = t }

    const setMeta = (nameOrProp, content, isProp = false) => {
      if (!content) return
      const attr = isProp ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, nameOrProp)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    const setScript = (id, jsonData) => {
      let el = document.getElementById(id)
      if (!el) {
        el = document.createElement('script')
        el.id = id
        el.type = 'application/ld+json'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(jsonData)
    }

    const removeScript = (id) => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }

    /* ── Title ──────────────────────────────────────── */
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Enterprise IT & Software Solutions`
    setTitle(fullTitle)

    /* ── Basic Meta ─────────────────────────────────── */
    setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)
    setMeta('author', SITE_NAME)
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    setMeta('theme-color', '#0a0f1e')

    /* ── Canonical ──────────────────────────────────── */
    const canonicalHref = canonical || window.location.href
    setLink('canonical', canonicalHref)

    /* ── Open Graph ─────────────────────────────────── */
    setMeta('og:type', ogType, true)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canonicalHref, true)
    setMeta('og:image', ogImage, true)
    setMeta('og:image:width', '1200', true)
    setMeta('og:image:height', '630', true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('og:locale', 'en_KE', true)

    /* ── Twitter Card ───────────────────────────────── */
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:site', '@nexacoretech')
    setMeta('twitter:creator', '@nexacoretech')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)

    /* ── Structured Data (JSON-LD) ──────────────────── */
    if (structuredData) {
      const schemas = Array.isArray(structuredData) ? structuredData : [structuredData]
      schemas.forEach((schema, i) => setScript(`nexacore-schema-${i}`, schema))
    } else {
      // Remove any stale per-page schema on unmount
      [0, 1, 2].forEach(i => removeScript(`nexacore-schema-${i}`))
    }

    /* ── Cleanup: restore defaults on unmount ───────── */
    return () => {
      document.title = `${SITE_NAME} — Enterprise IT & Software Solutions`
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, structuredData])

  return null
}