from rest_framework import serializers
from .models import (
    ServiceCategory, Service, Project, TeamMember, Testimonial,
    BlogPost, FAQ, JobListing, JobApplication, ContactMessage,
    Client, CompanyStat, SiteSettings,
)


class ServiceCategorySerializer(serializers.ModelSerializer):
    services_count = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "slug", "icon", "description", "order", "services_count"]

    def get_services_count(self, obj):
        return obj.services.filter(is_active=True).count()


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    image_display = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id", "title", "slug", "tagline", "description", "icon",
            "image_display", "is_featured", "category_name", "category_slug",
            "meta_title", "meta_description", "order",
        ]

    def get_image_display(self, obj):
        return obj.get_image()


class ProjectSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    image_display = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "client", "category_name", "description",
            "technologies", "image_display", "live_url", "status", "is_featured",
            "meta_title", "meta_description", "completed_at",
        ]

    def get_image_display(self, obj):
        return obj.get_image()


class TeamMemberSerializer(serializers.ModelSerializer):
    photo_display = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = [
            "id", "name", "slug", "position", "bio", "photo_display",
            "linkedin", "twitter", "github", "is_leadership", "order",
        ]

    def get_photo_display(self, obj):
        return obj.get_photo()


class TestimonialSerializer(serializers.ModelSerializer):
    photo_display = serializers.SerializerMethodField()
    service_title = serializers.CharField(source="service.title", read_only=True)

    class Meta:
        model = Testimonial
        fields = [
            "id", "client_name", "client_position", "client_company",
            "photo_display", "content", "rating", "service_title", "is_featured",
        ]

    def get_photo_display(self, obj):
        return obj.get_photo()


class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    author_photo = serializers.SerializerMethodField()
    cover_display = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            "id", "title", "slug", "author_name", "author_photo",
            "cover_display", "excerpt", "content", "tags", "category_name",
            "is_featured", "meta_title", "meta_description", "published_at",
        ]

    def get_author_photo(self, obj):
        return obj.author.get_photo() if obj.author else None

    def get_cover_display(self, obj):
        return obj.get_cover()


class BlogPostListSerializer(BlogPostSerializer):
    """Lighter serializer for list views — no full content."""
    class Meta(BlogPostSerializer.Meta):
        fields = [
            "id", "title", "slug", "author_name", "author_photo",
            "cover_display", "excerpt", "tags", "category_name",
            "is_featured", "published_at",
        ]


class FAQSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "category_name", "order"]


class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = [
            "id", "title", "slug", "department", "location", "job_type",
            "description", "requirements", "responsibilities",
            "salary_range", "deadline", "created_at",
        ]


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            "id", "job", "full_name", "email", "phone",
            "cover_letter", "resume", "linkedin_url", "portfolio_url",
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id", "full_name", "email", "phone", "company",
            "subject", "message",
        ]


class ClientSerializer(serializers.ModelSerializer):
    logo_display = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = ["id", "name", "logo_display", "website", "is_partner"]

    def get_logo_display(self, obj):
        return obj.get_logo()


class CompanyStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStat
        fields = ["id", "label", "value", "icon", "order"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_display = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = [
            "id", "company_name", "tagline", "about_short",
            "email", "phone", "phone2", "address", "whatsapp",
            "facebook", "twitter", "linkedin", "instagram", "youtube",
            "logo_display", "meta_title", "meta_description", "google_analytics",
        ]

    def get_logo_display(self, obj):
        return obj.get_logo()