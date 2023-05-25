<template>
  <div>
    
    <!-- <v-carousel
      hide-delimiters
      show-arrows>
      <v-carousel-item
        v-for="(group, index) in groupedMovies"
        :key="index"
      >
        <div class="movie-group">
          <movie-list-item
            v-for="movie in group"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </v-carousel-item>
    </v-carousel> -->
    <v-container>
    <v-row>
      <v-btn @click="getGenreMovies('전체')" style="background-color:rgba(74, 167, 162, 0.8); font-weight: bold; margin-right: 5px; margin-bottom: 10px;">#전체</v-btn>
      <v-btn v-for="genre in genres" :key="genre.id" @click="getGenreMovies(genre.id)" style="background-color:rgba(74, 167, 162, 0.3); font-weight: bold; margin-right: 5px; margin-bottom: 10px;" >#{{genre.name}}</v-btn>
    </v-row>  
    <v-row>
    <MovieListItem
    v-for="movie in movies"
    :key="movie.id"
    :movie="movie"
    /></v-row></v-container>
  </div>
</template>

<script>
import MovieListItem from '@/components/movies/MovieListItem.vue';

export default {
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  data() {
    return {
      movies: this.$store.state.movies,
      genres: this.$store.state.genres,
    };
  },
  computed: {
    groupedMovies() {
      const groupSize = 5;
      const groups = [];
      for (let i = 0; i < this.movies.length; i += groupSize) {
        groups.push(this.movies.slice(i, i + groupSize));
      }
      return groups;
    },
  },
  methods : {
    getGenreMovies(genreId){
      const items = []
      if(genreId==='전체'){
        this.movies = this.$store.state.movies
      } else {
        for(const movie of this.$store.state.movies){
          for (const genId of movie.genres){
            if (genreId === genId['id']){
              console.log(genId)
              items.push(movie)
              break
            }
          }
        }
        console.log(items)
        this.movies = items
      }
    }
  },
  created(){
    console.log(this.$store.state.genres)
  }
};
</script>

<style scoped>
.movie-group {
  display: flex;
  justify-content: space-between;
}
.colortest {
  background-color: rgb(rgb(74, 167, 162), green, blue);
}
</style>