<template>
  <div>
    <v-carousel
      hide-delimiters
      show-arrows
      v-model="currentCarouselIndex"
      height="350"
    >
      <v-carousel-item
        v-for="(group, index) in groupedRecommendedMovies"
        :key="index"
        style="text-align:center"
      >
        <div class="movie-group">
          <recommended-movie-item
            v-for="(movie, movieIndex) in groupWithRepeatedItems(group, 8)"
            :key="movieIndex"
            :movie="movie"
            style="margin-right:10px;"
          />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import RecommendedMovieItem from '@/components/movies/RecommendedMovieItem'

export default {
  name: 'RecommendedMovieList',
  data() {
    return {
      movies: this.$store.state.recommended_movies,
      currentCarouselIndex: 0
    }
  },
  components: {
    RecommendedMovieItem
  },
  computed: {
    groupedRecommendedMovies() {
      const groupSize = 8;
      const groups = [];
      const totalItems = this.movies.length;

      for (let i = 0; i < totalItems; i += groupSize) {
        const group = this.movies.slice(i, i + groupSize);
        if (group.length < groupSize) {
          const remainingItems = groupSize - group.length;
          group.push(...this.movies.slice(0, remainingItems));
        }
        groups.push(group);
      }

      return groups;
    },
  },
  created() {
    this.$store.dispatch('getRecommendedMovies');
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
}
</script>

<style scoped>
.movie-group {
  display: flex;
  justify-content: center;
}

.custom-carousel .v-carousel-item {
  display: flex;
  justify-content: center;
}

.carousel-item {
  display: inline-block;
  width: 200px; /* 아이템의 너비 조정 */
  margin: 0 10px; /* 아이템들간의 간격 조정 */
}
</style>