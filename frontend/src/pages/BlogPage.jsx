import React, { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import PageHero from '../components/PageHero'
import BlogCard from '../components/BlogCard'
import CTABanner from '../components/CTABanner'
import Loader from '../components/Loader'
import { fetchBlogPosts } from '../services/api'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBlogPosts()
      .then(r => setPosts(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = search
    ? posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase()))
    : posts

  return (
    <>
      <SEOHead
        title="Blog & Insights"
        description="Expert articles, technology guides, and digital transformation insights from the NexaCore Technologies team."
        keywords="tech blog Kenya, software insights, IT articles Nairobi, NexaCore blog"
      />
      <PageHero
        title="Blog & Insights"
        subtitle="Stay ahead with expert articles on technology, digital transformation, and African business."
        breadcrumbs={[{ label: 'Blog' }]}
      />
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 480, margin: '0 auto 48px', position: 'relative' }}>
            <i className="bi bi-search" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '13px 16px 13px 44px', border: '1.5px solid var(--gray-200)', borderRadius: 999, fontSize: '0.95rem', outline: 'none' }}
            />
          </div>
          {loading ? <Loader /> : filtered.length ? (
            <div className="blog-grid">
              {filtered.map(p => <BlogCard key={p.id} post={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><i className="bi bi-newspaper" /></div>
              <h3>{search ? 'No articles found' : 'No posts yet'}</h3>
              <p>{search ? 'Try a different search term.' : 'Blog posts will appear here once published.'}</p>
            </div>
          )}
        </div>
      </section>
      <CTABanner title="Want Tech Insights in Your Inbox?" primaryLabel="Subscribe to Newsletter" primaryHref="/contact" />
    </>
  )
}