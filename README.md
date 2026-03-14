# NexaCore Technologies — Full-Stack Website

> **Company Name:** NexaCore Technologies  
> **Tagline:** *Building the Digital Future of East Africa*  
> **Stack:** Django REST Framework (backend) + React + Vite (frontend)  
> **Domain:** nexacore.co.ke

---

## 📁 Project Structure

```
nexacore/
├── backend/                    # Django REST API
│   ├── core/                   # Single core app (all models)
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py           # All database models
│   │   ├── serializers.py      # DRF serializers
│   │   ├── views.py            # ViewSets + HomePageView
│   │   └── urls.py             # Core app URLs
│   ├── nexacore_project/
│   │   ├── settings.py
│   │   ├── urls.py             # Main URL router
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/                   # React + Vite
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── SEOHead.jsx
    │   │   ├── PageHero.jsx
    │   │   ├── SectionHeader.jsx
    │   │   ├── ServiceCard.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── BlogCard.jsx
    │   │   ├── TestimonialCard.jsx
    │   │   ├── CTABanner.jsx
    │   │   ├── Loader.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── AboutPage.jsx
    │   │   ├── ServicesPage.jsx
    │   │   ├── ServiceDetailPage.jsx
    │   │   ├── PortfolioPage.jsx
    │   │   ├── ProjectDetailPage.jsx
    │   │   ├── BlogPage.jsx
    │   │   ├── BlogPostPage.jsx
    │   │   ├── CareersPage.jsx
    │   │   ├── JobDetailPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── FAQPage.jsx
    │   │   ├── DigitalMarketingPage.jsx
    │   │   ├── CybersecurityPage.jsx
    │   │   ├── TeamPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── services/
    │   │   └── api.js          # All API calls via Axios
    │   ├── styles/
    │   │   └── main.css        # All styles (CSS variables, responsive)
    │   ├── App.jsx             # Router + layout
    │   └── main.jsx            # Entry point
    ├── index.html              # SEO meta, Bootstrap Icons, Google Fonts
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

---

### Backend Setup

```bash
cd backend

# 1. Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env with your DB credentials and secret key

# 4. Create database
createdb nexacore_db             # or use pgAdmin

# 5. Run migrations
python manage.py makemigrations
python manage.py migrate

# 6. Create superuser
python manage.py createsuperuser

# 7. Start development server
python manage.py runserver
```

Django API will be live at: `http://localhost:8000`  
Admin panel: `http://localhost:8000/admin`

---

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Set VITE_API_URL=http://localhost:8000/api/v1

# 3. Start dev server
npm run dev
```

React app will be live at: `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/home/` | Aggregate home page data |
| GET | `/api/v1/services/` | List all services |
| GET | `/api/v1/services/{slug}/` | Service detail |
| GET | `/api/v1/services/featured/` | Featured services |
| GET | `/api/v1/service-categories/` | All categories |
| GET | `/api/v1/service-categories/{slug}/services/` | Services by category |
| GET | `/api/v1/projects/` | All portfolio projects |
| GET | `/api/v1/projects/{slug}/` | Project detail |
| GET | `/api/v1/projects/featured/` | Featured projects |
| GET | `/api/v1/team/` | All team members |
| GET | `/api/v1/team/leadership/` | Leadership only |
| GET | `/api/v1/testimonials/` | All testimonials |
| GET | `/api/v1/blog/` | Blog post list |
| GET | `/api/v1/blog/{slug}/` | Blog post detail |
| GET | `/api/v1/faqs/` | All FAQs |
| GET | `/api/v1/jobs/` | All active job listings |
| GET | `/api/v1/jobs/{slug}/` | Job detail |
| POST | `/api/v1/applications/` | Submit job application |
| POST | `/api/v1/contact/` | Submit contact form |
| GET | `/api/v1/clients/` | Client/partner logos |
| GET | `/api/v1/stats/` | Company statistics |
| GET | `/api/v1/settings/current/` | Site settings (singleton) |

---

## 📊 Django Models

| Model | Purpose |
|-------|---------|
| `ServiceCategory` | Groups services (Software, Infrastructure, etc.) |
| `Service` | Individual service with slug, SEO fields, icon |
| `Project` | Portfolio items with technologies, status |
| `TeamMember` | Staff profiles with social links |
| `Testimonial` | Client reviews with ratings |
| `BlogPost` | News/insights with tags, author |
| `FAQ` | Categorised Q&A |
| `JobListing` | Careers with department, type, requirements |
| `JobApplication` | Applications linked to jobs |
| `ContactMessage` | Contact form submissions |
| `Client` | Partner/client logos |
| `CompanyStat` | Counter stats (500+ projects, etc.) |
| `SiteSettings` | Singleton for company info, social links, SEO |

---

## 🎨 Frontend Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero, services, stats, portfolio, testimonials, blog |
| `/about` | AboutPage | Story, mission, values, timeline, certifications |
| `/services` | ServicesPage | Filterable service listing + flagship products |
| `/services/:slug` | ServiceDetailPage | Individual service with sidebar CTA |
| `/portfolio` | PortfolioPage | Filterable project grid |
| `/portfolio/:slug` | ProjectDetailPage | Full project case study |
| `/blog` | BlogPage | Searchable blog listing |
| `/blog/:slug` | BlogPostPage | Full article with share buttons |
| `/careers` | CareersPage | Perks + filterable job listings |
| `/careers/:slug` | JobDetailPage | Job details + application form |
| `/contact` | ContactPage | Form + contact info + regional offices |
| `/faqs` | FAQPage | Searchable, categorised accordion FAQs |
| `/digital-marketing` | DigitalMarketingPage | Services + pricing packages |
| `/cybersecurity` | CybersecurityPage | Security services + pentest process |
| `/team` | TeamPage | Filterable team directory |
| `*` | NotFoundPage | Custom 404 |

---

## 🎨 Design System

- **Primary Font:** Syne (headings) — bold and distinctive
- **Body Font:** DM Sans — clean and readable
- **Primary Color:** `#2563eb` (Electric Blue)
- **Accent:** `#06b6d4` (Cyan)
- **Background:** `#0a0f1e` (Deep Navy) on dark sections
- **Icons:** Bootstrap Icons v1.11.3 (via CDN)

---

## 🌐 SEO Features

- Dynamic `<title>` and `<meta>` tags per page via `SEOHead` component
- Open Graph + Twitter Card meta tags
- Schema.org Organization structured data in `index.html`
- Slug-based URLs for all content (services, projects, blog, jobs)
- Canonical URL support
- Semantic HTML (h1–h4 hierarchy, `<main>`, `<nav>`, `<footer>`)

---

## 📦 Production Deployment

### Backend (Gunicorn + Nginx)
```bash
# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn nexacore_project.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

### Frontend (Vite Build)
```bash
npm run build
# Serve the dist/ folder via Nginx or a CDN
```

### Recommended Stack
- **Server:** Ubuntu 22.04 LTS (AWS EC2 / DigitalOcean Droplet)
- **Web Server:** Nginx as reverse proxy
- **Process Manager:** Supervisor or systemd
- **Database:** PostgreSQL 16
- **SSL:** Let's Encrypt (Certbot)
- **Media Storage:** AWS S3 or DigitalOcean Spaces
- **CDN:** Cloudflare

---

## 📝 Content Management

All site content is managed through the Django Admin panel at `/admin/`:

1. Add **SiteSettings** (company name, contact, social links)
2. Create **ServiceCategories** first, then **Services**
3. Add **Projects** to portfolio
4. Add **TeamMembers** for the about/team pages
5. Publish **BlogPosts** to populate the blog
6. Add **FAQs** grouped by category
7. Create **JobListings** for the careers page
8. Add **CompanyStats** (counters on homepage)
9. Add **Clients/Partners** for the trust marquee
10. Add **Testimonials** from happy clients

---

## 🔒 Security Notes

- Set `DEBUG=False` in production
- Use strong `SECRET_KEY` in production
- Configure `ALLOWED_HOSTS` with your actual domain
- Enable HTTPS via SSL certificate
- Set up proper CORS origins for your frontend domain
- Use environment variables for all sensitive values

---

## 📞 Company Information

**NexaCore Technologies Ltd.**  
Upper Hill Business Park, Nairobi, Kenya  
📞 +254 700 000 000  
📧 info@nexacore.co.ke  
🌐 www.nexacore.co.ke

---

*Built with ❤️ by NexaCore Technologies*