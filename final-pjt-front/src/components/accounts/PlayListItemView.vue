<template>
  <div>
    <h5>PlayListItemView</h5>
    <p>{{ movie?.title }}</p>
    <img :src="getImageUrl(movie?.poster_path)" class="moviePoster movie-item" style="margin-bottom:30px;">
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PlayListItemView',
    data() {
        return {
            movie: [],
        }
    },
    props: {
        list: Number,
    },
    methods: {
        getMovie() {
            axios({
                method: 'get',
                url: `${process.env.VUE_APP_SERVER_URL}/movies/${this.list}/`,
                headers: {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.movie = res.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        getImageUrl(posterPath){
            const size = 'w300'
            return `https://image.tmdb.org/t/p/${size}/${posterPath}`
        },
    },
    created() {
        this.getMovie()
    }
}
</script>

<style>

</style>