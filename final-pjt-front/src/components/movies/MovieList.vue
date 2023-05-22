<template>
  <div>
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
};
</script>

<style scoped>
.movie-group {
  display: flex;
  justify-content: space-between;
}
</style>