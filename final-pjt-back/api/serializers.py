from rest_framework import serializers
from .models import *

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieReviewSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(source='like_MovieReview.count', read_only=True)
    class Meta:
        model = MovieReview
        fields = ('id', 'content', 'like_count',)
        read_only_fields = ('user',)

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
    class Meta:
        model = Movie
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta :
        model = ArticleComment
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = ('title', 'content',)
        read_only_fields = ('user',)

class ArticleDetailSerializer(serializers.ModelSerializer):
    articlecomment_set = CommentSerializer(many=True)
    class Meta :
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)