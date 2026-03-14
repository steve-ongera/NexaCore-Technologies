import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import Loader from '../components/Loader'
import CTABanner from '../components/CTABanner'
import { fetchBlogPostBySlug } from '../services/api'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPostBySlug(slug)
      .then(r => setPost(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{ paddingTop: 'var(--nav-h)' }}><Loader /></div>
  if (!post) return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon"><i className="bi bi-file-earmark-x" /></div>
          <h3>Article Not Found</h3>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Blog</Link>
        </div>
      </div>
    </div>
  )

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        ogImage={post.cover_display}
      />
      <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--navy)', padding: '120px 0 64px' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="breadcrumb" style={{ justifyContent: 'flex-start', marginBottom: 20 }}>
            <Link to="/" style={{ color: 'var(--blue-light)' }}>Home</Link>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }} />
            <Link to="/blog" style={{ color: 'var(--blue-light)' }}>Blog</Link>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }} />
            <span style={{ color: 'var(--gray-400)' }}>{post.title}</span>
          </div>
          {post.category_name && <div className="label-tag" style={{ marginBottom: 16 }}>{post.category_name}</div>}
          <h1 style={{ color: 'var(--white)', marginBottom: 20 }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 20, color: 'var(--gray-400)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            {post.author_name && <span><i className="bi bi-person" style={{ marginRight: 6 }} />{post.author_name}</span>}
            {date && <span><i className="bi bi-calendar3" style={{ marginRight: 6 }} />{date}</span>}
            {post.category_name && <span><i className="bi bi-folder" style={{ marginRight: 6 }} />{post.category_name}</span>}
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {post.cover_display && (
            <img src={post.cover_display} alt={post.title}
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: 48, objectFit: 'cover', maxHeight: 480 }} />
          )}
          <div style={{ lineHeight: 1.85, color: 'var(--gray-600)', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
            {post.content}
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ marginTop: 40, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {post.tags.map((t, i) => <span key={i} className="tag">#{t}</span>)}
            </div>
          )}

          {/* Author */}
          {post.author_name && (
            <div style={{ marginTop: 48, padding: 28, background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.4rem', fontWeight: 700, flexShrink: 0, overflow: 'hidden' }}>
                {post.author_photo ? <img src={post.author_photo} alt={post.author_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : post.author_name[0]}
              </div>
              <div>
                <h4 style={{ marginBottom: 4 }}>{post.author_name}</h4>
                <p style={{ fontSize: '0.875rem' }}>NexaCore Technologies Team</p>
              </div>
            </div>
          )}

          {/* Share */}
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--navy)' }}>Share this article:</span>
            {[
              { icon: 'bi-twitter-x', label: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}` },
              { icon: 'bi-linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
              { icon: 'bi-whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}` },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                <i className={`bi ${s.icon}`} /> {s.label}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Link to="/blog" className="btn btn-outline">
              <i className="bi bi-arrow-left" /> Back to Blog
            </Link>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  )
}