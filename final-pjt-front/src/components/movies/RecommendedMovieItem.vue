<template>
  <div>
    <v-img :src="getImageUrl(movie.poster_path)" class="moviePoster movie-item" @click="goDetail" />
    <p class="movieTitle text-center">{{ movie.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'RecommendedMovieItem',
  props: {
    movie: Object
  },
  methods: {
    getImageUrl(posterPath) {
      const size = 'w200';
      return `https://image.tmdb.org/t/p/${size}/${posterPath}`;
    },
    goDetail() {
      this.$router.push({ name: 'MovieDetailView', params: { movie_id: this.movie.id } });
    }
  }
};
</script>

<style>
/* .moviePoster {
  height: 300px;
} */

.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
