<template>
  <div @click="GoDetail">
    <p> {{movie.title}} </p>
    <img :src="getImageUrl(movie.poster_path)" class="moviePoster" style="margin-bottom:30px;">
  </div>
</template>

<script>

export default {
    name : 'MovieListItem',
    props : {
        movie : Object
    },
    methods : {
        GoDetail(){
            this.$router.push({name : 'MovieDetailView', params: {movie_id: this.movie.id}})
        },
        getImageUrl(posterPath){
            const size = 'w300'
            return `https://image.tmdb.org/t/p/${size}/${posterPath}`
        },
    }
}

</script>

<style>

</style>