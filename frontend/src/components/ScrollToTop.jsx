import React, { useState, useEffect } from 'react'

/**
 * ScrollToTop
 * - Floating "back to top" button that appears after 400px scroll
 * - Thin reading-progress bar at top of viewport
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight

      setVisible(scrollY > 400)
      setProgress(docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Reading progress bar ──────────────────── */}
      <div
        className="reading-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        style={{ width: `${progress}%` }}
      />

      {/* ── Scroll-to-top button ──────────────────── */}
      <button
        className={`scroll-top-btn ${visible ? 'scroll-top-btn--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to top"
      >
        {/* Circular progress ring */}
        <svg
          className="scroll-top-btn__ring"
          viewBox="0 0 36 36"
          aria-hidden="true"
        >
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeDasharray={`${progress} 100`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>

        <i className="bi bi-arrow-up" aria-hidden="true" />
      </button>
    </>
  )
}