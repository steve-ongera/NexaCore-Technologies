from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import (
    ServiceCategory, Service, Project, TeamMember, Testimonial,
    BlogPost, FAQ, JobListing, JobApplication, ContactMessage,
    Client, CompanyStat, SiteSettings,
)
from .serializers import (
    ServiceCategorySerializer, ServiceSerializer, ProjectSerializer,
    TeamMemberSerializer, TestimonialSerializer, BlogPostSerializer,
    BlogPostListSerializer, FAQSerializer, JobListingSerializer,
    JobApplicationSerializer, ContactMessageSerializer, ClientSerializer,
    CompanyStatSerializer, SiteSettingsSerializer,
)


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]

    @action(detail=True, methods=["get"])
    def services(self, request, slug=None):
        category = self.get_object()
        services = Service.objects.filter(category=category, is_active=True)
        serializer = ServiceSerializer(services, many=True, context={"request": request})
        return Response(serializer.data)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category__slug", "is_featured"]
    search_fields = ["title", "tagline", "description"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status", "is_featured", "category__slug"]
    search_fields = ["title", "client", "description"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["is_leadership"]

    @action(detail=False, methods=["get"])
    def leadership(self, request):
        qs = self.get_queryset().filter(is_leadership=True)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["is_featured", "service__slug"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    lookup_field = "slug"
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["is_featured", "category__slug"]
    search_fields = ["title", "excerpt", "content", "tags"]

    def get_serializer_class(self):
        if self.action == "list":
            return BlogPostListSerializer
        return BlogPostSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True)[:3]
        serializer = BlogPostListSerializer(qs, many=True, context={"request": request})
        return Response(serializer.data)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category__slug"]


class JobListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobListing.objects.filter(is_active=True)
    serializer_class = JobListingSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["department", "job_type", "location"]
    search_fields = ["title", "department", "description"]


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "Application submitted successfully. We'll be in touch!"},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "Message received! We'll respond within 24 hours."},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Client.objects.filter(is_featured=True)
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["is_partner"]


class CompanyStatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyStat.objects.all()
    serializer_class = CompanyStatSerializer
    permission_classes = [AllowAny]


class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def current(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            return Response({"detail": "No settings configured."}, status=404)
        serializer = self.get_serializer(settings)
        return Response(serializer.data)


# ──────────────────────────────────────────────
# HOME PAGE AGGREGATE ENDPOINT
# ──────────────────────────────────────────────
from rest_framework.views import APIView

class HomePageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data = {
            "settings": SiteSettingsSerializer(
                SiteSettings.objects.first(), context={"request": request}
            ).data if SiteSettings.objects.exists() else {},
            "featured_services": ServiceSerializer(
                Service.objects.filter(is_active=True, is_featured=True)[:8],
                many=True, context={"request": request},
            ).data,
            "service_categories": ServiceCategorySerializer(
                ServiceCategory.objects.all(), many=True, context={"request": request},
            ).data,
            "featured_projects": ProjectSerializer(
                Project.objects.filter(is_featured=True)[:6],
                many=True, context={"request": request},
            ).data,
            "stats": CompanyStatSerializer(
                CompanyStat.objects.all(), many=True,
            ).data,
            "testimonials": TestimonialSerializer(
                Testimonial.objects.filter(is_featured=True)[:6],
                many=True, context={"request": request},
            ).data,
            "latest_posts": BlogPostListSerializer(
                BlogPost.objects.filter(is_published=True, is_featured=True)[:3],
                many=True, context={"request": request},
            ).data,
            "clients": ClientSerializer(
                Client.objects.filter(is_featured=True)[:16],
                many=True, context={"request": request},
            ).data,
            "leadership": TeamMemberSerializer(
                TeamMember.objects.filter(is_leadership=True)[:4],
                many=True, context={"request": request},
            ).data,
        }
        return Response(data)