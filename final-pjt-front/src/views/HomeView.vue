<template>
  <div>
    <RecommendedMovieList/>
    <TopRateMovieList/>
    <PopularMovieList/>
  </div>
  
</template>

<script>
import TopRateMovieList from '@/components/movies/TopRateMovieList'
import PopularMovieList from '@/components/movies/PopularMovieList'
import RecommendedMovieList from '@/components/movies/RecommendedMovieList'
  export default {
    name: 'Home',

    components: {
      TopRateMovieList,
      PopularMovieList,
      RecommendedMovieList
    },
    
  }
  
</script>
