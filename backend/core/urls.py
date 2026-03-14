from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceCategoryViewSet, ServiceViewSet, ProjectViewSet,
    TeamMemberViewSet, TestimonialViewSet, BlogPostViewSet,
    FAQViewSet, JobListingViewSet, JobApplicationViewSet,
    ContactMessageViewSet, ClientViewSet, CompanyStatViewSet,
    SiteSettingsViewSet, HomePageView,
)

router = DefaultRouter()
router.register(r"service-categories", ServiceCategoryViewSet, basename="service-category")
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"team", TeamMemberViewSet, basename="team")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")
router.register(r"blog", BlogPostViewSet, basename="blog")
router.register(r"faqs", FAQViewSet, basename="faq")
router.register(r"jobs", JobListingViewSet, basename="job")
router.register(r"applications", JobApplicationViewSet, basename="application")
router.register(r"contact", ContactMessageViewSet, basename="contact")
router.register(r"clients", ClientViewSet, basename="client")
router.register(r"stats", CompanyStatViewSet, basename="stat")
router.register(r"settings", SiteSettingsViewSet, basename="settings")

urlpatterns = [
    path("", include(router.urls)),
    path("home/", HomePageView.as_view(), name="home-aggregate"),
]