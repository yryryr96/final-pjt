<template>
  <div>
    <!-- <h1>인기순</h1> -->
    <v-carousel
      hide-delimiters
      show-arrows
      v-model="currentCarouselIndex"
      height="350"
    >
      <v-carousel-item
        v-for="(group, index) in groupedPopularMovies"
        :key="index"
        style="text-align:center"
      >
        <div class="movie-group">
          <popular-movie-item
            v-for="(movie, movieIndex) in groupWithRepeatedItems(group, 8)"
            :key="movieIndex"
            :movie="movie"
          />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import PopularMovieItem from '@/components/movies/PopularMovieItem'

export default {
  name: 'PopularMovieList',
  data() {
    return {
      movies: this.$store.state.popular_movies,
      currentCarouselIndex: 0
    }
  },
  components: {
    PopularMovieItem
  },
  computed: {
    groupedPopularMovies() {
      const groupSize = 8;
      const groups = [];
      for (let i = 0; i < this.movies.length; i += groupSize) {
        groups.push(this.movies.slice(i, i + groupSize));
      }
      return groups;
    },
  },
  created() {
    this.$store.dispatch('getPopularMovies');
  },
  mounted() {
    console.log('mounted')
    console.log(this.$store.state.popular_movies)
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
  justify-content: space-between;
  align-items: center;
}



</style>
