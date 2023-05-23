<template>
  <div v-if="movie">
    <h1>DetailView</h1>
    <hr>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" class="posterColumn">
        <v-img :src="getImageUrl(movie.poster_path)" class="moviePoster"></v-img>
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="9" class="infoColumn">
        <p class="movietitle">{{ movie?.title }}
          <v-btn
            v-if="!this.$store.state.user.like_movies.includes(movie?.id)"
            color="primary"
            icon
            @click="likeMovie"
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="primary"
            icon
            @click="likeMovie"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </p>
          
       <p class="small">
          출연:
          <template v-for="(actor, index) in movie?.actors">
            <span :key="actor">{{ actor }}</span>
            <span v-if="index !== movie?.actors.length - 1">, </span>
          </template>
        </p>
        <p class="small">감독 : {{ movie?.directors }}</p>
        <p class="small">평점 : {{ movie?.vote_average }}</p>
        <h4>Overview</h4>
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
            const size = 'w400'
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
                // console.log(this.$store.state.user)
                console.log(res.data.actors)
                const actorsString = res.data.actors
                const cleanedString = actorsString.replace(/\[|\]|'/g, "");
                const actorsArray = cleanedString.split(", ");

                console.log(actorsArray[0]);
                this.movie = res.data
                this.movie.actors = actorsArray
                // this.movie.actors = JSON.parse(res.data.actors)
            })
        },
        likeMovie(){
          axios({
            method :'post',
            url : `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie.id}/like/`,
            headers : {
              Authorization : `Bearer ${this.$store.state.token}`
            }
          }).then((res)=>{
              const likeMovies = this.$store.state.user.like_movies;
              const movieIndex = likeMovies.indexOf(this.movie.id);
              console.log(this.$store.state.user);
              console.log(res)
              if (movieIndex !== -1) {
                // 이미 좋아하는 영화인 경우, 제거
                likeMovies.splice(movieIndex, 1);
              } else {
                // 좋아하는 영화가 아닌 경우, 추가
                likeMovies.push(this.movie.id);
              }
            }).catch((err)=>{
              console.log(err)
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
.movietitle {
  font-size:30px;
  font-weight : bold;
}

</style>