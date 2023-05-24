<template>
  <div>
    <v-img :src="getImageUrl(movie.poster_path)" class="moviePoster movie-item movie-item-style" @click="goDetail" />
    <!-- <p class="movieTitle text-center">{{ movie.title }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'PopularMovieItem',
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
.movie-item-style {
    width:200px;
    height:300px;
    border:2px solid rgba(126, 119, 119, 0.5); 
    border-radius: 10px 10px 10px 10px;
}
</style>
