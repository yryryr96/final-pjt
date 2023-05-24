<template>
  <div>
    <!-- <h1>평점순</h1> -->
    <v-carousel
      hide-delimiters
      show-arrows
      v-model="currentCarouselIndex"
      height="350"
    >
      <v-carousel-item
        v-for="(group, index) in groupedTopMovies"
        :key="index"
        style="text-align:center"
      >
        <div class="movie-group">
          <top-rate-movie-item
            v-for="(movie,movieIndex) in groupWithRepeatedItems(group, 8)"
            :key="movieIndex"
            :movie="movie"
          />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import TopRateMovieItem from '@/components/movies/TopRateMovieItem.vue'

export default {
  name: 'TopRateMovieList',
  data() {
    return {
      movies: this.$store.state.top_rated_movies,
      currentCarouselIndex: 0
    };
  },
  components: {
    TopRateMovieItem
  },
  computed: {
    groupedTopMovies() {
      const groupSize = 8;
      const groups = [];
      for (let i = 0; i < this.movies.length; i += groupSize) {
        groups.push(this.movies.slice(i, i + groupSize));
      }
      return groups;
    },
  },
  created() {
    this.$store.dispatch('getTopRatedMovies');
  },
  mounted() {
    const savedCarouselIndex = sessionStorage.getItem('carouselIndex');
    if (savedCarouselIndex !== null) {
      this.currentCarouselIndex = parseInt(savedCarouselIndex);
    }
  },
  beforeDestroy() {
    sessionStorage.setItem('carouselIndex', this.currentCarouselIndex.toString());
  },
  methods: {
    groupWithRepeatedItems(group, size) {
      const repeatedGroup = [...group];
      while (repeatedGroup.length < size) {
        repeatedGroup.push(...group.slice(0, size - repeatedGroup.length));
      }
      return repeatedGroup;
    },
  }
};
</script>
<style scoped>

.movie-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>