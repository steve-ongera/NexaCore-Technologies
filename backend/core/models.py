from django.db import models
from django.utils.text import slugify
from django.utils import timezone


# ─────────────────────────────────────────────
# SERVICE CATEGORY
# ─────────────────────────────────────────────
class ServiceCategory(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)
    icon = models.CharField(max_length=80, help_text="Bootstrap Icon class e.g. bi-code-slash")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Service Categories"
        ordering = ["order"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# ─────────────────────────────────────────────
# SERVICE
# ─────────────────────────────────────────────
class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, related_name="services")
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    tagline = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    icon = models.CharField(max_length=80, help_text="Bootstrap Icon class")
    image = models.ImageField(upload_to="services/", null=True, blank=True)
    image_url = models.URLField(blank=True, help_text="External image URL fallback")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=320, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_title:
            self.meta_title = self.title
        if not self.meta_description:
            self.meta_description = self.tagline or self.description[:160]
        super().save(*args, **kwargs)

    def get_image(self):
        if self.image:
            return self.image.url
        return self.image_url


# ─────────────────────────────────────────────
# PROJECT / PORTFOLIO
# ─────────────────────────────────────────────
class Project(models.Model):
    STATUS_CHOICES = [("completed", "Completed"), ("ongoing", "Ongoing"), ("upcoming", "Upcoming")]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    client = models.CharField(max_length=200, blank=True)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    technologies = models.JSONField(default=list, blank=True, help_text='["Django","React","PostgreSQL"]')
    image = models.ImageField(upload_to="projects/", null=True, blank=True)
    image_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="completed")
    is_featured = models.BooleanField(default=False)
    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=320, blank=True)
    completed_at = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-completed_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_image(self):
        if self.image:
            return self.image.url
        return self.image_url


# ─────────────────────────────────────────────
# TEAM MEMBER
# ─────────────────────────────────────────────
class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    position = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="team/", null=True, blank=True)
    photo_url = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    github = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    is_leadership = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.name} — {self.position}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_photo(self):
        if self.photo:
            return self.photo.url
        return self.photo_url


# ─────────────────────────────────────────────
# TESTIMONIAL
# ─────────────────────────────────────────────
class Testimonial(models.Model):
    client_name = models.CharField(max_length=150)
    client_position = models.CharField(max_length=150, blank=True)
    client_company = models.CharField(max_length=150, blank=True)
    client_photo = models.ImageField(upload_to="testimonials/", null=True, blank=True)
    client_photo_url = models.URLField(blank=True)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.client_name} @ {self.client_company}"

    def get_photo(self):
        if self.client_photo:
            return self.client_photo.url
        return self.client_photo_url


# ─────────────────────────────────────────────
# BLOG / NEWS
# ─────────────────────────────────────────────
class BlogPost(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(unique=True, blank=True)
    author = models.ForeignKey(TeamMember, on_delete=models.SET_NULL, null=True, blank=True)
    cover_image = models.ImageField(upload_to="blog/", null=True, blank=True)
    cover_image_url = models.URLField(blank=True)
    excerpt = models.CharField(max_length=300, blank=True)
    content = models.TextField()
    tags = models.JSONField(default=list, blank=True)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=320, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def get_cover(self):
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url


# ─────────────────────────────────────────────
# FAQ
# ─────────────────────────────────────────────
class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


# ─────────────────────────────────────────────
# CAREER / JOB LISTING
# ─────────────────────────────────────────────
class JobListing(models.Model):
    TYPE_CHOICES = [
        ("full_time", "Full Time"), ("part_time", "Part Time"),
        ("contract", "Contract"), ("internship", "Internship"), ("remote", "Remote"),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=150, default="Nairobi, Kenya")
    job_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="full_time")
    description = models.TextField()
    requirements = models.TextField()
    responsibilities = models.TextField(blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.department})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.department}")
        super().save(*args, **kwargs)


# ─────────────────────────────────────────────
# JOB APPLICATION
# ─────────────────────────────────────────────
class JobApplication(models.Model):
    job = models.ForeignKey(JobListing, on_delete=models.CASCADE, related_name="applications")
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    cover_letter = models.TextField()
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)
    linkedin_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} → {self.job.title}"


# ─────────────────────────────────────────────
# CONTACT MESSAGE
# ─────────────────────────────────────────────
class ContactMessage(models.Model):
    SUBJECT_CHOICES = [
        ("general", "General Inquiry"),
        ("software", "Software Development"),
        ("erp", "ERP / System"),
        ("bulk_sms", "Bulk SMS / API"),
        ("networking", "Networking / CCTV"),
        ("cybersecurity", "Cybersecurity"),
        ("support", "Technical Support"),
        ("quote", "Request a Quote"),
        ("career", "Career"),
        ("other", "Other"),
    ]
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    subject = models.CharField(max_length=30, choices=SUBJECT_CHOICES, default="general")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    replied = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} — {self.get_subject_display()}"


# ─────────────────────────────────────────────
# CLIENT / PARTNER LOGOS
# ─────────────────────────────────────────────
class Client(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="clients/", null=True, blank=True)
    logo_url = models.URLField(blank=True)
    website = models.URLField(blank=True)
    is_partner = models.BooleanField(default=False, help_text="Show in Partners section")
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def get_logo(self):
        if self.logo:
            return self.logo.url
        return self.logo_url


# ─────────────────────────────────────────────
# STAT / COUNTER
# ─────────────────────────────────────────────
class CompanyStat(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50, help_text='e.g. "500+" or "98%"')
    icon = models.CharField(max_length=80, help_text="Bootstrap Icon class")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.value} {self.label}"


# ─────────────────────────────────────────────
# SITE SETTINGS (singleton)
# ─────────────────────────────────────────────
class SiteSettings(models.Model):
    company_name = models.CharField(max_length=200, default="NexaCore Technologies")
    tagline = models.CharField(max_length=300, blank=True)
    about_short = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    phone2 = models.CharField(max_length=30, blank=True)
    address = models.TextField(blank=True)
    whatsapp = models.CharField(max_length=30, blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    youtube = models.URLField(blank=True)
    logo = models.ImageField(upload_to="site/", null=True, blank=True)
    logo_url = models.URLField(blank=True)
    favicon = models.ImageField(upload_to="site/", null=True, blank=True)
    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=320, blank=True)
    google_analytics = models.CharField(max_length=30, blank=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.company_name

    def get_logo(self):
        if self.logo:
            return self.logo.url
        return self.logo_url