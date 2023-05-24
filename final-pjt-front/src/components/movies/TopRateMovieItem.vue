<template>
    <div>
        <img :src="getImageUrl(movie.poster_path)" class="moviePoster movie-item movie-item-style" @click="goDetail">
        <!-- <p>{{movie.title}}</p> -->
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
.movie-item-style {
    width:200px;
    height:300px;
    border:2px solid rgba(126, 119, 119, 0.5); 
    border-radius: 10px 10px 10px 10px;
}
</style>