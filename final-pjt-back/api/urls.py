from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_top_rated, name='get_top_rated'),
    path('genres/', views.get_genres, name='get_genres'),
]
