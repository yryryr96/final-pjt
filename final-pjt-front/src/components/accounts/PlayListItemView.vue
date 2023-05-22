<template>
  <div>
    <h1>{{ movie?.title }}</h1>
    <v-card>
      <v-img :src="getImageUrl(movie?.poster_path)" class="moviePoster" height="300" @click="goDetail"></v-img>
      <v-card-text>
        <p>{{ movie?.title }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PlayListItemView',
  data() {
    return {
      movie: null,
    }
  },
  props: {
    list: Number,
  },
  methods: {
    goDetail(){
        this.$router.push({name:'MovieDetailView',params : {movie_id : this.movie.id}})
    },
    getMovie() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/movies/${this.list}/`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        console.log(res)
        this.movie = res.data
      }).catch((err) => {
        console.log(err)
      })
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
.moviePoster {
  margin-bottom: 30px;
  cursor : pointer;
}
</style>
