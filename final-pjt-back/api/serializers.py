from rest_framework import serializers
from .models import Movie, Genre, MovieReview

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