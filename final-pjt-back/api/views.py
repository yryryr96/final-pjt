from django.shortcuts import render
import requests
import json

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