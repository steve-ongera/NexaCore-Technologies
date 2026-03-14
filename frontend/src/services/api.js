import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// ─── Response interceptor for error handling ───
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

// ─────────────────────────────────
// HOME
// ─────────────────────────────────
export const fetchHomeData = () => api.get('/home/')

// ─────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────
export const fetchSiteSettings = () => api.get('/settings/current/')

// ─────────────────────────────────
// SERVICES
// ─────────────────────────────────
export const fetchServices = (params = {}) => api.get('/services/', { params })
export const fetchFeaturedServices = () => api.get('/services/featured/')
export const fetchServiceBySlug = (slug) => api.get(`/services/${slug}/`)
export const fetchServiceCategories = () => api.get('/service-categories/')
export const fetchCategoryServices = (slug) => api.get(`/service-categories/${slug}/services/`)

// ─────────────────────────────────
// PROJECTS
// ─────────────────────────────────
export const fetchProjects = (params = {}) => api.get('/projects/', { params })
export const fetchFeaturedProjects = () => api.get('/projects/featured/')
export const fetchProjectBySlug = (slug) => api.get(`/projects/${slug}/`)

// ─────────────────────────────────
// TEAM
// ─────────────────────────────────
export const fetchTeam = (params = {}) => api.get('/team/', { params })
export const fetchLeadership = () => api.get('/team/leadership/')
export const fetchTeamMemberBySlug = (slug) => api.get(`/team/${slug}/`)

// ─────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────
export const fetchTestimonials = (params = {}) => api.get('/testimonials/', { params })
export const fetchFeaturedTestimonials = () => api.get('/testimonials/featured/')

// ─────────────────────────────────
// BLOG
// ─────────────────────────────────
export const fetchBlogPosts = (params = {}) => api.get('/blog/', { params })
export const fetchFeaturedPosts = () => api.get('/blog/featured/')
export const fetchBlogPostBySlug = (slug) => api.get(`/blog/${slug}/`)

// ─────────────────────────────────
// FAQs
// ─────────────────────────────────
export const fetchFAQs = (params = {}) => api.get('/faqs/', { params })

// ─────────────────────────────────
// CAREERS
// ─────────────────────────────────
export const fetchJobs = (params = {}) => api.get('/jobs/', { params })
export const fetchJobBySlug = (slug) => api.get(`/jobs/${slug}/`)
export const submitApplication = (data) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, val]) => { if (val) formData.append(key, val) })
  return api.post('/applications/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// ─────────────────────────────────
// CONTACT
// ─────────────────────────────────
export const submitContactForm = (data) => api.post('/contact/', data)

// ─────────────────────────────────
// CLIENTS & STATS
// ─────────────────────────────────
export const fetchClients = (params = {}) => api.get('/clients/', { params })
export const fetchStats = () => api.get('/stats/')

export default api