"""
Management command: seed_data
Usage: python manage.py seed_data

Place this file at:
    core/management/commands/seed_data.py

Make sure the following __init__.py files exist:
    core/management/__init__.py
    core/management/commands/__init__.py
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.text import slugify
from datetime import date, timedelta


class Command(BaseCommand):
    help = "Seeds the database with sample data for NexaCore Technologies"

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete all existing data before seeding",
        )

    def handle(self, *args, **options):
        if options["flush"]:
            self.stdout.write(self.style.WARNING("Flushing existing data..."))
            self._flush_data()

        self.stdout.write(self.style.MIGRATE_HEADING("Seeding NexaCore database..."))

        self._seed_site_settings()
        self._seed_service_categories()
        self._seed_services()
        self._seed_projects()
        self._seed_team()
        self._seed_testimonials()
        self._seed_blog()
        self._seed_faqs()
        self._seed_jobs()
        self._seed_clients()
        self._seed_stats()

        self.stdout.write(self.style.SUCCESS("✅  Database seeded successfully!"))

    # ─────────────────────────────────────────────
    # FLUSH
    # ─────────────────────────────────────────────
    def _flush_data(self):
        from core.models import (
            SiteSettings, ServiceCategory, Service, Project, TeamMember,
            Testimonial, BlogPost, FAQ, JobListing, JobApplication,
            ContactMessage, Client, CompanyStat,
        )
        for Model in [
            JobApplication, ContactMessage, BlogPost, FAQ, JobListing,
            Testimonial, Project, Service, ServiceCategory, TeamMember,
            Client, CompanyStat, SiteSettings,
        ]:
            count, _ = Model.objects.all().delete()
            self.stdout.write(f"  Deleted {count} {Model.__name__} records")

    # ─────────────────────────────────────────────
    # SITE SETTINGS
    # ─────────────────────────────────────────────
    def _seed_site_settings(self):
        from core.models import SiteSettings
        obj, created = SiteSettings.objects.get_or_create(id=1, defaults={
            "company_name": "NexaCore Technologies",
            "tagline": "Building the Digital Future of East Africa",
            "about_short": (
                "NexaCore Technologies is a leading IT solutions provider based in Nairobi, Kenya. "
                "We specialise in custom software development, ERP systems, networking, cybersecurity, "
                "and digital transformation for businesses across East Africa."
            ),
            "email": "info@nexacore.co.ke",
            "phone": "+254 700 000 000",
            "phone2": "+254 733 000 000",
            "address": "Upper Hill Business Park, Nairobi, Kenya",
            "whatsapp": "+254700000000",
            "facebook": "https://facebook.com/nexacoretech",
            "twitter": "https://twitter.com/nexacoretech",
            "linkedin": "https://linkedin.com/company/nexacore-technologies",
            "instagram": "https://instagram.com/nexacoretech",
            "youtube": "https://youtube.com/@nexacoretech",
            "logo_url": "https://placehold.co/180x50?text=NexaCore",
            "meta_title": "NexaCore Technologies — IT Solutions & Digital Transformation",
            "meta_description": (
                "NexaCore Technologies delivers enterprise software, ERP, networking, "
                "cybersecurity, and digital marketing solutions across East Africa."
            ),
            "google_analytics": "G-XXXXXXXXXX",
        })
        self._log("SiteSettings", created)

    # ─────────────────────────────────────────────
    # SERVICE CATEGORIES
    # ─────────────────────────────────────────────
    def _seed_service_categories(self):
        from core.models import ServiceCategory
        categories = [
            {"name": "Software Development",   "icon": "bi-code-slash",        "order": 1,
             "description": "Custom web and mobile applications tailored to your business needs."},
            {"name": "ERP & Business Systems",  "icon": "bi-diagram-3",         "order": 2,
             "description": "End-to-end ERP implementations and business process automation."},
            {"name": "Networking & Infrastructure", "icon": "bi-hdd-network",   "order": 3,
             "description": "Structured cabling, CCTV, VoIP, and enterprise network design."},
            {"name": "Cybersecurity",            "icon": "bi-shield-lock",       "order": 4,
             "description": "Penetration testing, threat monitoring, and security audits."},
            {"name": "Cloud & DevOps",           "icon": "bi-cloud-upload",      "order": 5,
             "description": "Cloud migration, CI/CD pipelines, and managed infrastructure."},
            {"name": "Digital Marketing",        "icon": "bi-megaphone",         "order": 6,
             "description": "SEO, social media management, PPC, and brand strategy."},
            {"name": "Bulk SMS & Communication", "icon": "bi-chat-dots",         "order": 7,
             "description": "High-throughput bulk SMS, USSD, and API messaging solutions."},
        ]
        for data in categories:
            obj, created = ServiceCategory.objects.get_or_create(
                slug=slugify(data["name"]), defaults=data
            )
            self._log(f"ServiceCategory: {data['name']}", created)

    # ─────────────────────────────────────────────
    # SERVICES
    # ─────────────────────────────────────────────
    def _seed_services(self):
        from core.models import Service, ServiceCategory

        cat = {c.slug: c for c in ServiceCategory.objects.all()}

        services = [
            # Software Development
            {
                "category_slug": "software-development",
                "title": "Custom Web Application Development",
                "tagline": "Scalable web apps built for performance and growth",
                "description": (
                    "We design and develop enterprise-grade web applications using modern frameworks "
                    "such as Django, React, and Node.js. From MVPs to full-scale platforms, "
                    "our agile team delivers solutions that are fast, secure, and maintainable."
                ),
                "icon": "bi-browser-chrome",
                "is_featured": True,
                "order": 1,
            },
            {
                "category_slug": "software-development",
                "title": "Mobile App Development",
                "tagline": "Native and cross-platform apps for iOS & Android",
                "description": (
                    "Our mobile team builds intuitive apps with React Native and Flutter, "
                    "connecting your customers with your brand wherever they are."
                ),
                "icon": "bi-phone",
                "is_featured": True,
                "order": 2,
            },
            {
                "category_slug": "software-development",
                "title": "API Development & Integration",
                "tagline": "Connect your systems with robust REST & GraphQL APIs",
                "description": (
                    "We build and integrate APIs to streamline data flow between your applications, "
                    "third-party services, payment gateways, and government platforms like eCitizen."
                ),
                "icon": "bi-plug",
                "is_featured": False,
                "order": 3,
            },
            # ERP
            {
                "category_slug": "erp-business-systems",
                "title": "ERP Implementation",
                "tagline": "Odoo, ERPNext, and custom ERP solutions",
                "description": (
                    "We implement and customise ERP systems to unify your finance, HR, inventory, "
                    "and operations — giving management real-time visibility across the business."
                ),
                "icon": "bi-diagram-3",
                "is_featured": True,
                "order": 4,
            },
            {
                "category_slug": "erp-business-systems",
                "title": "School Management System",
                "tagline": "End-to-end school administration platform",
                "description": (
                    "Our flagship SMAS platform covers student admissions, fee collection, academics, "
                    "timetabling, parent portals, and M-Pesa integration for Kenyan institutions."
                ),
                "icon": "bi-mortarboard",
                "is_featured": True,
                "order": 5,
            },
            # Networking
            {
                "category_slug": "networking-infrastructure",
                "title": "Network Design & Installation",
                "tagline": "LAN, WAN, and wireless network deployments",
                "description": (
                    "From office LANs to wide-area corporate networks, we design, install, "
                    "and maintain structured cabling and wireless infrastructure."
                ),
                "icon": "bi-hdd-network",
                "is_featured": False,
                "order": 6,
            },
            {
                "category_slug": "networking-infrastructure",
                "title": "CCTV & Surveillance",
                "tagline": "IP camera systems for homes, offices, and enterprises",
                "description": (
                    "We supply and install Hikvision, Dahua, and Axis IP camera systems with "
                    "remote monitoring, NVR storage, and access control integration."
                ),
                "icon": "bi-camera-video",
                "is_featured": False,
                "order": 7,
            },
            # Cybersecurity
            {
                "category_slug": "cybersecurity",
                "title": "Penetration Testing",
                "tagline": "Identify vulnerabilities before attackers do",
                "description": (
                    "Our certified ethical hackers conduct thorough black-box, white-box, "
                    "and grey-box penetration tests on web apps, APIs, and network infrastructure."
                ),
                "icon": "bi-shield-lock",
                "is_featured": True,
                "order": 8,
            },
            {
                "category_slug": "cybersecurity",
                "title": "Security Awareness Training",
                "tagline": "Turn your staff into your strongest security layer",
                "description": (
                    "We deliver customised cybersecurity training programmes, phishing simulations, "
                    "and compliance workshops aligned with ISO 27001 and Kenya's Data Protection Act."
                ),
                "icon": "bi-person-check",
                "is_featured": False,
                "order": 9,
            },
            # Cloud
            {
                "category_slug": "cloud-devops",
                "title": "Cloud Migration & Management",
                "tagline": "Move to AWS, Azure, or GCP with confidence",
                "description": (
                    "We assess, plan, and execute cloud migration projects — ensuring minimal "
                    "downtime, cost optimisation, and ongoing managed infrastructure support."
                ),
                "icon": "bi-cloud-arrow-up",
                "is_featured": False,
                "order": 10,
            },
            # Digital Marketing
            {
                "category_slug": "digital-marketing",
                "title": "Search Engine Optimisation (SEO)",
                "tagline": "Rank higher, drive organic traffic, grow revenue",
                "description": (
                    "Our SEO team combines technical audits, content strategy, and link-building "
                    "to improve your visibility on Google and grow qualified traffic."
                ),
                "icon": "bi-graph-up-arrow",
                "is_featured": False,
                "order": 11,
            },
            # Bulk SMS
            {
                "category_slug": "bulk-sms-communication",
                "title": "Bulk SMS Platform",
                "tagline": "Reach thousands of customers instantly",
                "description": (
                    "Our bulk SMS gateway supports personalised campaigns, OTP delivery, "
                    "transactional alerts, and a developer-friendly REST API with 99.9% uptime."
                ),
                "icon": "bi-chat-dots",
                "is_featured": True,
                "order": 12,
            },
        ]

        for data in services:
            cat_slug = data.pop("category_slug")
            category = cat.get(cat_slug)
            obj, created = Service.objects.get_or_create(
                slug=slugify(data["title"]),
                defaults={"category": category, **data},
            )
            self._log(f"Service: {data['title']}", created)

    # ─────────────────────────────────────────────
    # PROJECTS
    # ─────────────────────────────────────────────
    def _seed_projects(self):
        from core.models import Project, ServiceCategory

        cat = {c.slug: c for c in ServiceCategory.objects.all()}

        projects = [
            {
                "title": "Kenya National Hospital ERP",
                "client": "Kenya National Hospital",
                "category_slug": "erp-business-systems",
                "description": (
                    "Implemented a full Odoo ERP covering patient management, pharmacy, finance, "
                    "HR, and procurement for a 400-bed referral hospital in Nairobi."
                ),
                "technologies": ["Odoo 16", "Python", "PostgreSQL", "Nginx", "Ubuntu"],
                "image_url": "https://placehold.co/800x500?text=Hospital+ERP",
                "live_url": "",
                "status": "completed",
                "is_featured": True,
                "completed_at": date(2024, 6, 30),
            },
            {
                "title": "SaccoConnect Mobile App",
                "client": "KeCo Sacco Society",
                "category_slug": "software-development",
                "description": (
                    "A React Native mobile app for a Kenyan Sacco enabling members to check balances, "
                    "apply for loans, make deposits via M-Pesa, and receive SMS notifications."
                ),
                "technologies": ["React Native", "Django REST", "M-Pesa API", "Redis", "PostgreSQL"],
                "image_url": "https://placehold.co/800x500?text=SaccoConnect+App",
                "live_url": "https://play.google.com",
                "status": "completed",
                "is_featured": True,
                "completed_at": date(2024, 3, 15),
            },
            {
                "title": "Westgate Mall CCTV & Access Control",
                "client": "Westgate Properties Ltd",
                "category_slug": "networking-infrastructure",
                "description": (
                    "Designed and installed a 120-camera IP surveillance system with biometric "
                    "access control, centralised NVR, and remote monitoring for a Nairobi shopping mall."
                ),
                "technologies": ["Hikvision", "Dahua NVR", "ZKTeco", "Fiber Cabling"],
                "image_url": "https://placehold.co/800x500?text=CCTV+Project",
                "live_url": "",
                "status": "completed",
                "is_featured": False,
                "completed_at": date(2023, 11, 1),
            },
            {
                "title": "NexaSchool — Multi-tenant SaaS",
                "client": "NexaCore (Internal Product)",
                "category_slug": "software-development",
                "description": (
                    "A multi-tenant school management SaaS built with Django and React, serving 50+ "
                    "Kenyan schools with admissions, fee collection, academics, and M-Pesa STK push."
                ),
                "technologies": ["Django", "React", "PostgreSQL", "Celery", "Redis", "M-Pesa", "AWS S3"],
                "image_url": "https://placehold.co/800x500?text=NexaSchool+SaaS",
                "live_url": "https://nexaschool.co.ke",
                "status": "ongoing",
                "is_featured": True,
                "completed_at": None,
            },
            {
                "title": "East Africa Logistics Portal",
                "client": "TransAfrica Freight",
                "category_slug": "software-development",
                "description": (
                    "A web portal for tracking freight shipments across Kenya, Uganda, and Tanzania, "
                    "integrating with customs APIs and providing real-time GPS tracking."
                ),
                "technologies": ["Django", "Vue.js", "PostgreSQL", "Google Maps API", "Docker"],
                "image_url": "https://placehold.co/800x500?text=Logistics+Portal",
                "live_url": "",
                "status": "completed",
                "is_featured": True,
                "completed_at": date(2024, 9, 20),
            },
            {
                "title": "Corporate Network Overhaul — Equity Bank Branch",
                "client": "Equity Bank Kenya",
                "category_slug": "networking-infrastructure",
                "description": (
                    "Redesigned and upgraded the structured LAN/WAN cabling and wireless network "
                    "for a 3-floor commercial bank branch, increasing throughput by 400%."
                ),
                "technologies": ["Cisco", "Ubiquiti UniFi", "Cat6A Cabling", "VLAN", "FortiGate"],
                "image_url": "https://placehold.co/800x500?text=Network+Project",
                "live_url": "",
                "status": "completed",
                "is_featured": False,
                "completed_at": date(2023, 8, 14),
            },
        ]

        for data in projects:
            cat_slug = data.pop("category_slug")
            category = cat.get(cat_slug)
            obj, created = Project.objects.get_or_create(
                slug=slugify(data["title"]),
                defaults={"category": category, **data},
            )
            self._log(f"Project: {data['title']}", created)

    # ─────────────────────────────────────────────
    # TEAM
    # ─────────────────────────────────────────────
    def _seed_team(self):
        from core.models import TeamMember

        members = [
            {
                "name": "Brian Kamau",
                "position": "Chief Executive Officer",
                "bio": (
                    "Brian founded NexaCore in 2016 with a vision to accelerate digital transformation "
                    "across East Africa. He holds an MSc in Computer Science from the University of Nairobi "
                    "and has led over 200 enterprise technology projects."
                ),
                "photo_url": "https://placehold.co/400x400?text=Brian+K",
                "linkedin": "https://linkedin.com/in/briankamau",
                "twitter": "https://twitter.com/briankamau",
                "github": "",
                "email": "brian@nexacore.co.ke",
                "is_leadership": True,
                "order": 1,
            },
            {
                "name": "Amina Hassan",
                "position": "Chief Technology Officer",
                "bio": (
                    "Amina oversees all engineering and architecture decisions. With 12 years in enterprise "
                    "software, she has a passion for clean, scalable systems and mentoring junior developers."
                ),
                "photo_url": "https://placehold.co/400x400?text=Amina+H",
                "linkedin": "https://linkedin.com/in/aminahassan",
                "twitter": "",
                "github": "https://github.com/aminahassan",
                "email": "amina@nexacore.co.ke",
                "is_leadership": True,
                "order": 2,
            },
            {
                "name": "David Ochieng",
                "position": "Head of Infrastructure & Networking",
                "bio": (
                    "David is a Cisco CCNP certified engineer specialising in enterprise networking, "
                    "CCTV systems, and data centre deployments across Kenya and Uganda."
                ),
                "photo_url": "https://placehold.co/400x400?text=David+O",
                "linkedin": "https://linkedin.com/in/davidochieng",
                "twitter": "",
                "github": "",
                "email": "david@nexacore.co.ke",
                "is_leadership": True,
                "order": 3,
            },
            {
                "name": "Grace Wanjiku",
                "position": "Lead Full-Stack Developer",
                "bio": (
                    "Grace leads the web development team, specialising in Django and React. "
                    "She is the primary architect of the NexaSchool SaaS platform."
                ),
                "photo_url": "https://placehold.co/400x400?text=Grace+W",
                "linkedin": "https://linkedin.com/in/gracewanjiku",
                "twitter": "",
                "github": "https://github.com/gracewanjiku",
                "email": "grace@nexacore.co.ke",
                "is_leadership": False,
                "order": 4,
            },
            {
                "name": "Samuel Mwangi",
                "position": "Cybersecurity Analyst",
                "bio": (
                    "Samuel is a certified ethical hacker (CEH) and OSCP holder who leads our "
                    "penetration testing engagements and red team exercises."
                ),
                "photo_url": "https://placehold.co/400x400?text=Samuel+M",
                "linkedin": "https://linkedin.com/in/samuelmwangi",
                "twitter": "",
                "github": "https://github.com/samuelmwangi",
                "email": "samuel@nexacore.co.ke",
                "is_leadership": False,
                "order": 5,
            },
            {
                "name": "Fatuma Ali",
                "position": "Digital Marketing Manager",
                "bio": (
                    "Fatuma drives NexaCore's own growth and manages digital campaigns for clients. "
                    "She specialises in SEO, Google Ads, and social media strategy."
                ),
                "photo_url": "https://placehold.co/400x400?text=Fatuma+A",
                "linkedin": "https://linkedin.com/in/fatumaali",
                "twitter": "https://twitter.com/fatumaali",
                "github": "",
                "email": "fatuma@nexacore.co.ke",
                "is_leadership": False,
                "order": 6,
            },
        ]

        for data in members:
            obj, created = TeamMember.objects.get_or_create(
                slug=slugify(data["name"]), defaults=data
            )
            self._log(f"TeamMember: {data['name']}", created)

    # ─────────────────────────────────────────────
    # TESTIMONIALS
    # ─────────────────────────────────────────────
    def _seed_testimonials(self):
        from core.models import Testimonial, Service

        services = {s.slug: s for s in Service.objects.all()}

        testimonials = [
            {
                "client_name": "Peter Njoroge",
                "client_position": "ICT Director",
                "client_company": "Kenya National Hospital",
                "client_photo_url": "https://placehold.co/100x100?text=PN",
                "content": (
                    "NexaCore delivered our hospital ERP on time and within budget. "
                    "The system transformed how we manage patients and finances. "
                    "Their post-go-live support has been exceptional."
                ),
                "rating": 5,
                "service_slug": "erp-implementation",
                "is_featured": True,
            },
            {
                "client_name": "Jane Achieng",
                "client_position": "General Manager",
                "client_company": "KeCo Sacco Society",
                "client_photo_url": "https://placehold.co/100x100?text=JA",
                "content": (
                    "The SaccoConnect app exceeded our expectations. Our members love the M-Pesa "
                    "integration and the loan application process is now fully digital. "
                    "NexaCore truly understood our business."
                ),
                "rating": 5,
                "service_slug": "custom-web-application-development",
                "is_featured": True,
            },
            {
                "client_name": "Tom Kariuki",
                "client_position": "Operations Manager",
                "client_company": "TransAfrica Freight",
                "client_photo_url": "https://placehold.co/100x100?text=TK",
                "content": (
                    "The logistics portal NexaCore built for us has cut our manual tracking workload "
                    "by 70%. Real-time visibility across three countries — it's a game changer."
                ),
                "rating": 5,
                "service_slug": "custom-web-application-development",
                "is_featured": True,
            },
            {
                "client_name": "Susan Mutua",
                "client_position": "Head of Security",
                "client_company": "Westgate Properties Ltd",
                "client_photo_url": "https://placehold.co/100x100?text=SM",
                "content": (
                    "Professional installation, quality cameras, and remote monitoring that actually works. "
                    "NexaCore's networking team was thorough and completed the job two days ahead of schedule."
                ),
                "rating": 4,
                "service_slug": "cctv-surveillance",
                "is_featured": False,
            },
            {
                "client_name": "Ibrahim Yusuf",
                "client_position": "CTO",
                "client_company": "Savannah Fintech",
                "client_photo_url": "https://placehold.co/100x100?text=IY",
                "content": (
                    "NexaCore's penetration testing uncovered critical API vulnerabilities before "
                    "our product launch. Their detailed report and remediation guidance saved us "
                    "from what could have been a serious breach."
                ),
                "rating": 5,
                "service_slug": "penetration-testing",
                "is_featured": True,
            },
        ]

        for data in testimonials:
            service_slug = data.pop("service_slug")
            service = services.get(service_slug)
            obj, created = Testimonial.objects.get_or_create(
                client_name=data["client_name"],
                client_company=data["client_company"],
                defaults={"service": service, **data},
            )
            self._log(f"Testimonial: {data['client_name']}", created)

    # ─────────────────────────────────────────────
    # BLOG POSTS
    # ─────────────────────────────────────────────
    def _seed_blog(self):
        from core.models import BlogPost, TeamMember, ServiceCategory

        authors = {m.slug: m for m in TeamMember.objects.all()}
        cats = {c.slug: c for c in ServiceCategory.objects.all()}

        posts = [
            {
                "title": "Why Every Kenyan SME Needs an ERP System in 2025",
                "author_slug": "brian-kamau",
                "category_slug": "erp-business-systems",
                "cover_image_url": "https://placehold.co/1200x630?text=ERP+Blog",
                "excerpt": "Manual spreadsheets are killing productivity. Here's how ERP transforms Kenyan SMEs.",
                "content": (
                    "## The Problem with Spreadsheets\n\n"
                    "Thousands of Kenyan SMEs still run their entire operations on Excel spreadsheets. "
                    "While spreadsheets are flexible, they do not scale. Data lives in silos, "
                    "version conflicts are common, and real-time visibility is impossible.\n\n"
                    "## What ERP Solves\n\n"
                    "An ERP (Enterprise Resource Planning) system unifies your finance, inventory, HR, "
                    "and customer data in a single platform. Managers get a live dashboard. "
                    "Accountants close books faster. Operations run smoother.\n\n"
                    "## Why Now?\n\n"
                    "Cloud ERP has made enterprise software accessible to businesses of all sizes. "
                    "Odoo and ERPNext can be deployed for a fraction of the cost of legacy systems, "
                    "with Kenyan localisation including M-Pesa integration and KRA eTIMS compliance.\n\n"
                    "## Getting Started\n\n"
                    "Contact NexaCore for a free ERP readiness assessment and discover how we can "
                    "automate your business in 90 days."
                ),
                "tags": ["ERP", "SME", "Kenya", "Odoo", "Business"],
                "is_published": True,
                "is_featured": True,
            },
            {
                "title": "Top 5 Cybersecurity Threats Facing East African Businesses in 2025",
                "author_slug": "samuel-mwangi",
                "category_slug": "cybersecurity",
                "cover_image_url": "https://placehold.co/1200x630?text=Cybersecurity+Blog",
                "excerpt": "From ransomware to SIM-swap fraud — here are the threats keeping Kenyan CISOs up at night.",
                "content": (
                    "## 1. Ransomware Attacks\n\n"
                    "Ransomware incidents in East Africa surged by 300% in 2024. "
                    "Healthcare and financial institutions are prime targets.\n\n"
                    "## 2. SIM Swap Fraud\n\n"
                    "Attackers bribe telecom agents to port victim numbers, gaining access to "
                    "M-Pesa and banking OTPs. Multi-factor authentication is essential.\n\n"
                    "## 3. Phishing via WhatsApp\n\n"
                    "Kenyan employees are increasingly targeted through WhatsApp impersonation attacks "
                    "pretending to be HR or finance departments.\n\n"
                    "## 4. Unpatched Software\n\n"
                    "Many organisations run outdated CMS and ERP versions. Regular patching cycles "
                    "and vulnerability scanning are non-negotiable.\n\n"
                    "## 5. Insider Threats\n\n"
                    "Disgruntled employees remain one of the most dangerous threat vectors. "
                    "Role-based access control and audit logging are your first line of defence.\n\n"
                    "## Stay Protected\n\n"
                    "Book a free initial security assessment with NexaCore's cybersecurity team today."
                ),
                "tags": ["Cybersecurity", "Ransomware", "Kenya", "Threats", "Security"],
                "is_published": True,
                "is_featured": True,
            },
            {
                "title": "Building Scalable APIs with Django REST Framework",
                "author_slug": "grace-wanjiku",
                "category_slug": "software-development",
                "cover_image_url": "https://placehold.co/1200x630?text=Django+API+Blog",
                "excerpt": "Best practices for building production-ready APIs with DRF, from versioning to rate limiting.",
                "content": (
                    "## Why Django REST Framework?\n\n"
                    "DRF is the gold standard for building APIs in Python. Its generic views, "
                    "serialisers, and authentication classes dramatically reduce boilerplate.\n\n"
                    "## API Versioning\n\n"
                    "Always version your APIs from day one. Use URL versioning (`/api/v1/`) "
                    "to avoid breaking client integrations when you ship improvements.\n\n"
                    "## Serialiser Best Practices\n\n"
                    "Keep serialisers thin. Move business logic into model methods or service classes. "
                    "Use `SerializerMethodField` sparingly — it bypasses DRF's validation pipeline.\n\n"
                    "## Rate Limiting\n\n"
                    "Enable `DEFAULT_THROTTLE_CLASSES` in DRF settings and use Redis as the throttle "
                    "backend for distributed deployments.\n\n"
                    "## Pagination\n\n"
                    "Always paginate list endpoints. `PageNumberPagination` with `page_size=20` is a "
                    "safe default for most use cases.\n\n"
                    "## Conclusion\n\n"
                    "A well-designed API is a competitive advantage. Follow these practices and your "
                    "integrations will be a pleasure to work with."
                ),
                "tags": ["Django", "DRF", "API", "Python", "Backend"],
                "is_published": True,
                "is_featured": False,
            },
            {
                "title": "How NexaSchool Transformed Fee Collection for 50 Kenyan Schools",
                "author_slug": "brian-kamau",
                "category_slug": "erp-business-systems",
                "cover_image_url": "https://placehold.co/1200x630?text=NexaSchool+Blog",
                "excerpt": "From bank slips to instant M-Pesa confirmation — the NexaSchool fee collection story.",
                "content": (
                    "## The Challenge\n\n"
                    "Kenyan school bursars were drowning in bank deposit slips, manual fee registers, "
                    "and parents calling to confirm payments. The process was slow and error-prone.\n\n"
                    "## The Solution\n\n"
                    "NexaSchool's M-Pesa STK Push integration allows parents to pay directly from "
                    "their phone. The system automatically reconciles payments, updates student balances, "
                    "and sends SMS receipts within seconds.\n\n"
                    "## The Results\n\n"
                    "- Fee collection time reduced by 85%\n"
                    "- Zero manual bank reconciliation errors\n"
                    "- Parent satisfaction scores increased significantly\n"
                    "- Bursars now manage reminders and reports from a single dashboard\n\n"
                    "## Want the Same for Your School?\n\n"
                    "Book a free NexaSchool demo at nexaschool.co.ke."
                ),
                "tags": ["NexaSchool", "M-Pesa", "Schools", "Kenya", "EdTech"],
                "is_published": True,
                "is_featured": False,
            },
        ]

        for data in posts:
            author_slug = data.pop("author_slug")
            cat_slug = data.pop("category_slug")
            author = authors.get(author_slug)
            category = cats.get(cat_slug)
            obj, created = BlogPost.objects.get_or_create(
                slug=slugify(data["title"]),
                defaults={"author": author, "category": category, **data},
            )
            self._log(f"BlogPost: {data['title']}", created)

    # ─────────────────────────────────────────────
    # FAQs
    # ─────────────────────────────────────────────
    def _seed_faqs(self):
        from core.models import FAQ, ServiceCategory

        cats = {c.slug: c for c in ServiceCategory.objects.all()}

        faqs = [
            # General
            {"question": "Where is NexaCore Technologies located?",
             "answer": "Our headquarters is at Upper Hill Business Park, Nairobi, Kenya. We serve clients across East Africa.",
             "category_slug": None, "order": 1},
            {"question": "Do you offer support after project delivery?",
             "answer": "Yes. All projects include a 3-month warranty period, and we offer flexible SLA-based support contracts.",
             "category_slug": None, "order": 2},
            # Software
            {"question": "How long does a custom web application take to build?",
             "answer": "Timelines depend on scope. A typical MVP takes 6–10 weeks, while enterprise systems may take 3–6 months.",
             "category_slug": "software-development", "order": 3},
            {"question": "Do you integrate with M-Pesa?",
             "answer": "Absolutely. We have extensive experience with the Safaricom Daraja API including STK Push, C2B, and B2C integrations.",
             "category_slug": "software-development", "order": 4},
            # ERP
            {"question": "Which ERP platforms do you implement?",
             "answer": "We specialise in Odoo 16/17 and ERPNext. We also build custom ERP systems for highly specific business requirements.",
             "category_slug": "erp-business-systems", "order": 5},
            {"question": "Can you migrate data from our existing system?",
             "answer": "Yes. Our ERP team handles data migration from spreadsheets, legacy systems, and QuickBooks into your new ERP.",
             "category_slug": "erp-business-systems", "order": 6},
            # Networking
            {"question": "What networking brands do you work with?",
             "answer": "We are certified partners for Cisco, Ubiquiti, MikroTik, Hikvision, and Dahua.",
             "category_slug": "networking-infrastructure", "order": 7},
            # Cybersecurity
            {"question": "Is penetration testing legal?",
             "answer": "Yes, when conducted with a signed scope-of-work agreement from the asset owner. We always operate within legal and ethical boundaries.",
             "category_slug": "cybersecurity", "order": 8},
            {"question": "What certifications do your security team hold?",
             "answer": "Our security engineers hold CEH, OSCP, CompTIA Security+, and ISO 27001 Lead Implementer certifications.",
             "category_slug": "cybersecurity", "order": 9},
            # Bulk SMS
            {"question": "What is your bulk SMS pricing?",
             "answer": "Pricing starts at KES 0.45 per SMS for volumes above 10,000 messages. Contact us for a custom enterprise quote.",
             "category_slug": "bulk-sms-communication", "order": 10},
            {"question": "Do you provide an SMS API?",
             "answer": "Yes. Our REST API supports JSON payloads, delivery reports, OTP templates, and sandbox testing.",
             "category_slug": "bulk-sms-communication", "order": 11},
        ]

        for data in faqs:
            cat_slug = data.pop("category_slug")
            category = cats.get(cat_slug) if cat_slug else None
            obj, created = FAQ.objects.get_or_create(
                question=data["question"],
                defaults={"category": category, **data},
            )
            self._log(f"FAQ: {data['question'][:60]}", created)

    # ─────────────────────────────────────────────
    # JOB LISTINGS
    # ─────────────────────────────────────────────
    def _seed_jobs(self):
        from core.models import JobListing

        jobs = [
            {
                "title": "Senior Django Developer",
                "department": "Engineering",
                "location": "Nairobi, Kenya",
                "job_type": "full_time",
                "description": (
                    "We are looking for a Senior Django Developer to join our growing engineering team. "
                    "You will architect and build scalable web applications and REST APIs for our clients "
                    "across East Africa."
                ),
                "requirements": (
                    "- 4+ years of Django/Python experience\n"
                    "- Strong knowledge of PostgreSQL and Redis\n"
                    "- Experience with REST API design (DRF)\n"
                    "- Familiarity with Docker and CI/CD pipelines\n"
                    "- Understanding of M-Pesa Daraja API is a plus\n"
                    "- BSc in Computer Science or equivalent"
                ),
                "responsibilities": (
                    "- Design and implement scalable backend APIs\n"
                    "- Conduct code reviews and mentor junior developers\n"
                    "- Collaborate with frontend team on API contracts\n"
                    "- Contribute to architectural decisions"
                ),
                "salary_range": "KES 150,000 – 220,000",
                "is_active": True,
                "deadline": date.today() + timedelta(days=45),
            },
            {
                "title": "React Frontend Developer",
                "department": "Engineering",
                "location": "Nairobi, Kenya",
                "job_type": "full_time",
                "description": (
                    "Join our frontend team to build beautiful, high-performance React applications "
                    "for enterprise clients. You will work closely with designers and backend engineers."
                ),
                "requirements": (
                    "- 3+ years of React experience\n"
                    "- Strong CSS/Tailwind skills\n"
                    "- Experience with Vite or similar build tools\n"
                    "- Familiarity with REST APIs and Axios\n"
                    "- Knowledge of performance optimisation techniques"
                ),
                "responsibilities": (
                    "- Build and maintain React component libraries\n"
                    "- Implement responsive, accessible UI designs\n"
                    "- Optimise frontend performance\n"
                    "- Write unit and integration tests"
                ),
                "salary_range": "KES 120,000 – 180,000",
                "is_active": True,
                "deadline": date.today() + timedelta(days=45),
            },
            {
                "title": "Network Engineer",
                "department": "Infrastructure",
                "location": "Nairobi, Kenya",
                "job_type": "full_time",
                "description": (
                    "We are seeking a certified Network Engineer to design and deploy enterprise "
                    "networking solutions, CCTV systems, and structured cabling for our clients."
                ),
                "requirements": (
                    "- CCNA/CCNP certification required\n"
                    "- 3+ years of enterprise networking experience\n"
                    "- Experience with Cisco, Ubiquiti, and MikroTik\n"
                    "- Hands-on CCTV and access control installation experience\n"
                    "- Valid driving licence"
                ),
                "responsibilities": (
                    "- Design and implement LAN/WAN networks\n"
                    "- Install and configure CCTV and access control systems\n"
                    "- Provide tier-2/3 network support\n"
                    "- Produce network documentation and topology diagrams"
                ),
                "salary_range": "KES 100,000 – 160,000",
                "is_active": True,
                "deadline": date.today() + timedelta(days=30),
            },
            {
                "title": "Digital Marketing Intern",
                "department": "Marketing",
                "location": "Nairobi, Kenya",
                "job_type": "internship",
                "description": (
                    "A 6-month paid internship for a passionate digital marketer to learn SEO, "
                    "Google Ads, social media management, and content creation under expert guidance."
                ),
                "requirements": (
                    "- Pursuing or recently completed a degree in Marketing or related field\n"
                    "- Familiarity with Google Analytics and Search Console\n"
                    "- Good written and verbal communication in English and Swahili\n"
                    "- Creative mindset with attention to detail"
                ),
                "responsibilities": (
                    "- Assist with social media content scheduling\n"
                    "- Conduct keyword research and on-page SEO audits\n"
                    "- Create blog posts and marketing copy\n"
                    "- Compile weekly analytics reports"
                ),
                "salary_range": "KES 25,000 – 35,000",
                "is_active": True,
                "deadline": date.today() + timedelta(days=20),
            },
        ]

        for data in jobs:
            obj, created = JobListing.objects.get_or_create(
                slug=slugify(f"{data['title']}-{data['department']}"),
                defaults=data,
            )
            self._log(f"JobListing: {data['title']}", created)

    # ─────────────────────────────────────────────
    # CLIENTS / PARTNERS
    # ─────────────────────────────────────────────
    def _seed_clients(self):
        from core.models import Client

        clients = [
            {"name": "Kenya National Hospital",     "logo_url": "https://placehold.co/200x80?text=KNH",        "is_partner": False, "is_featured": True,  "order": 1},
            {"name": "Equity Bank Kenya",            "logo_url": "https://placehold.co/200x80?text=Equity",     "is_partner": False, "is_featured": True,  "order": 2},
            {"name": "Safaricom PLC",                "logo_url": "https://placehold.co/200x80?text=Safaricom",  "is_partner": True,  "is_featured": True,  "order": 3},
            {"name": "TransAfrica Freight",          "logo_url": "https://placehold.co/200x80?text=TransAfrica","is_partner": False, "is_featured": True,  "order": 4},
            {"name": "KeCo Sacco Society",           "logo_url": "https://placehold.co/200x80?text=KeCo",       "is_partner": False, "is_featured": True,  "order": 5},
            {"name": "Westgate Properties",          "logo_url": "https://placehold.co/200x80?text=Westgate",   "is_partner": False, "is_featured": True,  "order": 6},
            {"name": "Cisco Systems (Partner)",      "logo_url": "https://placehold.co/200x80?text=Cisco",      "is_partner": True,  "is_featured": True,  "order": 7},
            {"name": "Odoo (Partner)",               "logo_url": "https://placehold.co/200x80?text=Odoo",       "is_partner": True,  "is_featured": True,  "order": 8},
            {"name": "Amazon Web Services",          "logo_url": "https://placehold.co/200x80?text=AWS",        "is_partner": True,  "is_featured": True,  "order": 9},
            {"name": "Hikvision (Reseller)",         "logo_url": "https://placehold.co/200x80?text=Hikvision",  "is_partner": True,  "is_featured": False, "order": 10},
        ]

        for data in clients:
            obj, created = Client.objects.get_or_create(
                name=data["name"], defaults=data
            )
            self._log(f"Client: {data['name']}", created)

    # ─────────────────────────────────────────────
    # STATS / COUNTERS
    # ─────────────────────────────────────────────
    def _seed_stats(self):
        from core.models import CompanyStat

        stats = [
            {"label": "Projects Delivered",   "value": "500+",  "icon": "bi-check-circle",   "order": 1},
            {"label": "Happy Clients",         "value": "200+",  "icon": "bi-emoji-smile",    "order": 2},
            {"label": "Team Members",          "value": "40+",   "icon": "bi-people",         "order": 3},
            {"label": "Years of Experience",   "value": "8+",    "icon": "bi-calendar2-check","order": 4},
            {"label": "Countries Served",      "value": "6",     "icon": "bi-globe-africa",   "order": 5},
            {"label": "Client Retention Rate", "value": "94%",   "icon": "bi-graph-up",       "order": 6},
        ]

        for data in stats:
            obj, created = CompanyStat.objects.get_or_create(
                label=data["label"], defaults=data
            )
            self._log(f"CompanyStat: {data['label']}", created)

    # ─────────────────────────────────────────────
    # HELPER
    # ─────────────────────────────────────────────
    def _log(self, label, created):
        if created:
            self.stdout.write(f"  {self.style.SUCCESS('Created')} {label}")
        else:
            self.stdout.write(f"  {self.style.WARNING('Skipped')} {label} (already exists)")