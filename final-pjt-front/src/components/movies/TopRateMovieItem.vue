<template>
    <div>
        <img :src="getImageUrl(movie.poster_path)" class="moviePoster movie-item movie-item-style" @click="goDetail" @mouseover="zoomInImage" @mouseout="zoomOutImage">
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
        },
        zoomInImage(event){
            event.target.style.transform = 'scale(1.1)';
        },
        zoomOutImage(event){
            event.target.style.transform = 'scale(1)';
        },
    },

}
</script>

<style scope>
.movie-item-style {
    width:200px;
    height:300px;
    border:2px solid rgba(126, 119, 119, 0.5); 
    border-radius: 10px 10px 10px 10px;
    cursor : pointer;
    transition: transform 0.3s;
}
.movie-item-style:hover {
    transform: scale(1.1); 
}
</style>