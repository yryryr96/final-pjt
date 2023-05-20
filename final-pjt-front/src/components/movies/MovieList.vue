<template>
  <div>
    <h1>MovieList</h1>
    <MovieListItem
    v-for="movie in movies" :key="movie.id" :movie="movie"
    />
  </div>
</template>

<script>
import MovieListItem from '@/components/movies/MovieListItem'
import axios from 'axios'

export default {
    name : 'MovieList',
    data(){
        return{
            movies : this.$store.state.movies
        }
    },
    components : {
        MovieListItem
    },
    methods : {
       
    },
    
} 
</script>

<style>

</style>