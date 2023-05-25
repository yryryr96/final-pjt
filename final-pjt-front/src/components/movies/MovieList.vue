<template>
  <div>
    <div>
      <v-btn @click="getGenreMovies('전체')">#전체</v-btn>
      <v-btn v-for="genre in genres" :key="genre.id" @click="getGenreMovies(genre.id)" >#{{genre.name}}</v-btn>
    </div>
    <v-carousel
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
    </v-carousel>
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
</style>