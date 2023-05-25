from django.urls import path
from . import views

urlpatterns = [
    # 기본 데이터 추출
    path('get_top_rated/', views.get_top_rated, name='get_top_rated'),
    path('genres/', views.get_genres, name='get_genres'),
    path('signupgenres/', views.signup_genres, name='signup_genres'),
    path('top_rated/',views.top_rated),
    path('popular_rated',views.popular_rated),
    # 이동할 url
    # 영화
    path('', views.movie_list, name='movie_list'), # get - 영화 전체 조회
    path('<int:movie_id>/', views.movie_detail, name='movie_detail'), # get - 영화 상세 조회
    # 영화 리뷰
    path('<int:movie_id>/review/', views.create_review, name='create_review'), # get - 리뷰 전체 조회 / post - 리뷰 생성
    path('review/<int:review_id>/', views.review_detail, name='review_detail'), # delete - 리뷰 삭제 / put - 리뷰 수정
    # 게시글
    path('articles/', views.article_list, name='article_list'), # get - 게시글 전체 조회 / post - 게시글 생성
    path('articles/<int:article_id>/', views.article_detail, name='article_detail'), # get - 게시글 상세 조회 / delete - 게시글 삭제 / put - 게시글 수정
    # 댓글
    path('articles/<int:article_id>/comments/', views.create_comment, name='create_comment'), # post - 게시글 댓글 생성
    path('comments/<int:comment_id>/', views.comment_delete, name='comment_delete'), # delete - 게시글 댓글 삭제
    # 좋아요
    path('<int:movie_id>/like/', views.movie_detail_like, name='movie_detail_like'),
    path('review/<int:review_id>/like/', views.review_detail_like, name='review_detail_like'),
    path('articles/<int:article_id>/like/', views.article_datail_like, name='article_datail_like'),
    
    path('search/',views.search_movies),
    path('search_trailers/', views.search_trailers),
]
