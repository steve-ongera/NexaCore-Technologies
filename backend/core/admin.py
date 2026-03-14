from django.contrib import admin
from .models import (
    ServiceCategory, Service, Project, TeamMember, Testimonial,
    BlogPost, FAQ, JobListing, JobApplication, ContactMessage,
    Client, CompanyStat, SiteSettings,
)

admin.site.site_header = "NexaCore Technologies Admin"
admin.site.site_title = "NexaCore Admin"
admin.site.index_title = "Welcome to NexaCore CMS"


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "icon", "order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "is_featured", "is_active", "order"]
    list_filter = ["category", "is_featured", "is_active"]
    search_fields = ["title", "tagline", "description"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "client", "status", "is_featured", "completed_at"]
    list_filter = ["status", "is_featured", "category"]
    search_fields = ["title", "client", "description"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "position", "is_leadership", "order"]
    list_filter = ["is_leadership"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["client_name", "client_company", "rating", "is_featured"]
    list_filter = ["rating", "is_featured"]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "is_published", "is_featured", "published_at"]
    list_filter = ["is_published", "is_featured", "category"]
    search_fields = ["title", "excerpt", "content"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "category", "order", "is_active"]
    list_filter = ["category", "is_active"]


@admin.register(JobListing)
class JobListingAdmin(admin.ModelAdmin):
    list_display = ["title", "department", "job_type", "location", "is_active", "deadline"]
    list_filter = ["department", "job_type", "is_active"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "job", "applied_at"]
    list_filter = ["job"]
    readonly_fields = ["applied_at"]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "subject", "is_read", "replied", "created_at"]
    list_filter = ["subject", "is_read", "replied"]
    readonly_fields = ["created_at"]


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ["name", "is_partner", "is_featured", "order"]
    list_filter = ["is_partner", "is_featured"]


@admin.register(CompanyStat)
class CompanyStatAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "icon", "order"]


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Company Info", {"fields": ("company_name", "tagline", "about_short")}),
        ("Contact", {"fields": ("email", "phone", "phone2", "address", "whatsapp")}),
        ("Social Media", {"fields": ("facebook", "twitter", "linkedin", "instagram", "youtube")}),
        ("Branding", {"fields": ("logo", "logo_url", "favicon")}),
        ("SEO", {"fields": ("meta_title", "meta_description", "google_analytics")}),
    )