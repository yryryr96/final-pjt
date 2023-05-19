<template>
  <div v-if='movie'>
        <h1>DetailView</h1>
        <hr>
        <p style="font-size:1.5rem">{{movie?.title}}</p>
        <p>{{movie?.actors}}</p>
        <img :src="getImageUrl(movie.poster_path)" class="moviePoster" style="margin-bottom:30px;">
        <p sytle="">{{movie?.overview}}</p> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'MovieDetailView',
    data() {
        return{
            title : null,
            movie : null,
        }
    },
    computed : {
       
    },
    methods: {
        getImageUrl(posterPath){
            const size = 'w300'
            return `https://image.tmdb.org/t/p/${size}/${posterPath}`
        },
        getMovie(){
            axios({
                method : 'get',
                url : `https://api.themoviedb.org/3/movie/${this.$route.params.movie_id}?language=ko-KR&api_key=06759a474c7f00b5c90ae7dda8a70176`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.movie = res.data
            })
        } 
    },
    created(){
        this.getMovie()
    }
}
</script>

<style>

</style>