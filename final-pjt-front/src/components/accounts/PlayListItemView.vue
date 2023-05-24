<template>
  <div>
        <img :src="getImageUrl(movie?.poster_path)" class="moviePoster movie-item movie-item-style" @click="goDetail">
        <!-- <p>{{movie.title}}</p> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PlayListItemView',
  data(){
    return{
      movie : null
    }
  },
  props: {
    movie_id:Number
  },
  methods: {
    goDetail(){
        this.$router.push({name:'MovieDetailView',params : {movie_id : this.movie_id}})
    },
    getMovie() {
      if(this.movie_id !== null){
        axios({
          method: 'get',
          url: `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie_id}/`,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
        }
        }).then((res) => {
          this.movie = res.data
        }).catch((err) => {
          console.log(err)
        })
      }
      
    },
    getImageUrl(posterPath) {
      const size = 'w200'
      return `https://image.tmdb.org/t/p/${size}/${posterPath}`
    },
  },
  created() {
    this.getMovie()
  }
}
</script>

<style scoped>
.movie-item-style {
    width:200px;
    height:300px;
    border:2px solid rgba(126, 119, 119, 0.5); 
    border-radius: 10px 10px 10px 10px;
}
</style>
