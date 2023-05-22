<template>
  <div>
    <img :src="getImageUrl(movie.poster_path)" class="moviePoster movie-item" @click="goDetail">
    <p>{{movie.title}}</p>
  </div>
</template>

<script>
export default {
    name : 'TopRateMovieItem',
    props : {
        movie : Object
    },
    methods :{
        getImageUrl(posterPath){
            const size = 'w200'
            return `https://image.tmdb.org/t/p/${size}/${posterPath}`
        },
        goDetail(){
            this.$router.push({name:'MovieDetailView',params : {movie_id : this.movie.id}})
        }
    },

}
</script>

<style scope>

</style>