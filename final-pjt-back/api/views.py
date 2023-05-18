from rest_framework.response import Response
from django.shortcuts import render, get_list_or_404, get_object_or_404
import requests
import json
from rest_framework.decorators import api_view
from .models import Movie
from .serializers import MovieSerializer, MovieDetailSerializer

TMDB_API_KEY = '386ea6e619bc3b5721f33392e34505c2'

# Create your views here.
def get_top_rated(request):
    total_data = []
    
    for i in range(1, 501):
        request_url = f'https://api.themoviedb.org/3/movie/top_rated?api_key={TMDB_API_KEY}&language=ko-KR&page={i}'
        movies = requests.get(request_url).json()

        for movie in movies['results']:
            if movie.get('release_date', ''):
                fields = {
                    'id': movie['id'],
                    'title': movie['title'],
                    'original_title': movie['original_title'],
                    'overview': movie['overview'],
                    'release_date': movie['release_date'],
                    'popularity': movie['popularity'],
                    'poster_path': movie['poster_path'],
                    'genres': movie['genre_ids'],
                }

                data = {
                    'pk': movie['id'],
                    'model': 'api.movie',
                    'fields': fields
                }

                total_data.append(data)
    
    with open('top_rated_movie_data.json', 'w', encoding='utf-8') as w:
        json.dump(total_data, w, indent=2, ensure_ascii=False)



def get_genres(request):
    total_data = []
    request_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=ko-KR'
    genres = requests.get(request_url).json()

    for genre in genres['genres']:
        fields = {
            'id': genre['id'],
            'name': genre['name'],
        }

        data = {
            'pk': genre['id'],
            'model': 'api.genre',
            'fields': fields
        }

        total_data.append(data)

    with open('genre_data.json', 'w', encoding='utf-8') as w:
        json.dump(total_data, w, indent=2, ensure_ascii=False)


@api_view(['GET'])
def movie_list(request):
    if request.method == 'GET':
        movies = get_list_or_404(Movie)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    
# @api_view(['GET'])
# def movie_detail(request, movie_id):
#     if request.method == 'GET':
#         movie = get_object_or_404(Movie, id=movie_id)
#         serializer = MovieSerializer(movie)
#         return Response(serializer.data)
    
@api_view(['GET'])
def movie_detail(request, movie_id):
    if request.method == 'GET':
        moviedetail = get_object_or_404(Movie, pk=movie_id)

        request_url = f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={TMDB_API_KEY}&language=ko-KR'
        movie = requests.get(request_url).json()
        actors = []
        directors = []
        for person in movie['cast']:
            if person['known_for_department'] == 'Acting':
                actors.append([person['name'], person['popularity']])
            elif person['known_for_department'] == 'Directing':
                directors.append([person['name'], person['popularity']])
        actors.sort(key = lambda x : -x[1])
        directors.sort(key = lambda x : -x[1])

        setattr(moviedetail, 'actors', actors[:4])
        setattr(moviedetail, 'directors', directors[0])

        serializer = MovieDetailSerializer(moviedetail)

        return Response(serializer.data)