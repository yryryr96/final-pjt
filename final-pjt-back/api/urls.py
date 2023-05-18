from django.urls import path
from . import views

urlpatterns = [
    # 기본 데이터 추출
    path('get_top_rated/', views.get_top_rated, name='get_top_rated'),
    path('genres/', views.get_genres, name='get_genres'),

    # 이동할 url
    path('', views.movie_list, name='movie_list'),
    path('<int:movie_id>/', views.movie_detail, name='movie_detail'),
]
