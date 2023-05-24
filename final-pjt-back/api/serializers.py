from rest_framework import serializers
from .models import *
from accounts.serializers import UserOnlyIdSerializer

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieReviewSerializer(serializers.ModelSerializer):
    like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)
    class Meta:
        model = MovieReview
        fields = ('id', 'content', 'like_users_count', 'like_users','user')
        read_only_fields = ('user','like_users',)

class MovieSerializer(serializers.ModelSerializer):
    reviews = MovieReviewSerializer(many=True, read_only=True)
    genres = GenreSerializer(many = True)
    class Meta:
        model = Movie
        fields = '__all__'


class MovieDetailSerializer(serializers.ModelSerializer):
    reviews = MovieReviewSerializer(many=True, read_only=True)
    genres = GenreSerializer(many = True)
    actors = serializers.CharField(max_length=30)
    directors = serializers.CharField(max_length=30)
    like_users = UserOnlyIdSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta :
        model = ArticleComment
        fields = '__all__'
        read_only_fields = ('user', 'article',)

class ArticleSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = ('id','title', 'content','user','created_at')
        read_only_fields = ('user',)

class ArticleDetailSerializer(serializers.ModelSerializer):
    articlecomment_set = CommentSerializer(many=True)
    like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)
    class Meta :
        model = Article
        fields = '__all__'