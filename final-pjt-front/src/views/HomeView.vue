<template>
  <div>
    <TopRateMovieList/>
    <PopularMovieList/>
  </div>
  
</template>

<script>
import TopRateMovieList from '@/components/movies/TopRateMovieList'
import PopularMovieList from '@/components/movies/PopularMovieList'
  export default {
    name: 'Home',

    components: {
      TopRateMovieList,
      PopularMovieList
    },
    
  }
  
</script>
