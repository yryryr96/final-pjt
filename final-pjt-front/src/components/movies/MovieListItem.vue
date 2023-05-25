<template>
  <v-col @click="GoDetail" cols="2">
    <img :src="getImageUrl(movie.poster_path)" class="moviePoster movie-item movie-item-style"
    style="margin-bottom:10px; width: 100%; height:90%;"
    @mouseover="zoomInImage"
    @mouseout="zoomOutImage"
    >
    <br>
    <div class="center-align">
        <v-icon color="rgb(74, 167, 162)">mdi-star</v-icon>
        <span>{{movie.vote_average}}</span>
    </div>
  </v-col>
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
            const size = 'w200'
            return `https://image.tmdb.org/t/p/${size}/${posterPath}`
        },
        zoomInImage(event) {
            event.target.style.transform = 'scale(1.1)'; // 이미지를 1.1배 확대
        },
        zoomOutImage(event) {
            event.target.style.transform = 'scale(1)'; // 이미지 크기를 원래대로 복원
        }
    }
}

</script>

<style scoped>
.movie-item {
    cursor : pointer;
    transition: transform 0.3s;
}
.movie-item:hover {
    transform: scale(1.1);
}
.movie-item-style {
    width:200px;
    height:300px;
    border:2px solid rgba(126, 119, 119, 0.5); 
    border-radius: 10px 10px 10px 10px;
}
.center-align {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>