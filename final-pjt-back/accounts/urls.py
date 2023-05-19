from django.urls import path
from .views import *
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'accounts'
urlpatterns = [
    path('register/', RegisterAPIView.as_view()), # post - 회원가입
    path('auth/', AuthAPIView.as_view()), # post - 로그인 / delete - 로그아웃
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('profile/<int:user_pk>/', views.profile, name='profile'), # get - 유저 프로필 조회
    path('<int:user_pk>/follow/', views.follow, name='follow'), # post - 유저 팔로우
]