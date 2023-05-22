<template>
  <div>
    <h5>PlayListItemView</h5>
    <p>{{ movie?.title }}</p>
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
        }
    },
    created() {
        this.getMovie()
    }
}
</script>

<style>

</style>