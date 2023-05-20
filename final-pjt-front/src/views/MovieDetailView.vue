<template>
  <div v-if="movie">
    <h1>DetailView</h1>
    <hr>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" class="posterColumn">
        <v-img :src="getImageUrl(movie.poster_path)" class="moviePoster"></v-img>
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="9" class="infoColumn">
        <p class="title">{{ movie?.title }}</p>
        <p class="small">{{ movie?.actors }}</p>
        <p class="small">{{ movie?.directors }}</p>
        <p>{{ movie?.overview }}</p>
        <MovieReview :movie_id="parseInt($route.params.movie_id)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import MovieReview from '@/components/movies/MovieReview'
export default {
    name : 'MovieDetailView',
    data() {
        return{
            // title : null,
            movie : null,
        }
    },
    components : {
        MovieReview
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
                // url : `https://api.themoviedb.org/3/movie/${this.$route.params.movie_id}?language=ko-KR&api_key=${process.env.VUE_APP_API_KEY}`,
                url : `${process.env.VUE_APP_SERVER_URL}/movies/${this.$route.params.movie_id}/`,
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
.title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.small {
  font-size: 0.8rem;
}

.moviePoster {
  margin-right: 20px;
}

</style>