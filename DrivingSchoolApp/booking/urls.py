from django.urls import path
from .views import search_driving_schools, book_lesson, manage_profile, learning_resources, community_reviews

urlpatterns = [
    path('search/', search_driving_schools, name='search_driving_schools'),
    path('book/<int:instructor_id>/', book_lesson, name='book_lesson'),
    path('profile/', manage_profile, name='manage_profile'),
    path('resources/', learning_resources, name='learning_resources'),
    path('community/', community_reviews, name='community_reviews'),
]
