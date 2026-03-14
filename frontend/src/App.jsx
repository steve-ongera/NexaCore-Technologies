import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import PortfolioPage from './pages/PortfolioPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import CareersPage from './pages/CareersPage'
import JobDetailPage from './pages/JobDetailPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import DigitalMarketingPage from './pages/DigitalMarketingPage'
import CybersecurityPage from './pages/CybersecurityPage'
import TeamPage from './pages/TeamPage'
import NotFoundPage from './pages/NotFoundPage'

// Scroll restoration
function ScrollRestoration() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <ScrollRestoration />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/cybersecurity" element={<CybersecurityPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}