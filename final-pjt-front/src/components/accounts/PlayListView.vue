<template>
  <div>
    <h4>{{username}}'s PlayListView</h4>
    <PlayListItemView
    v-for="list in lists"
    :key="list.id"
    :list="list"
    />
  </div>
</template>

<script>
import axios from 'axios'
import PlayListItemView from '@/components/accounts/PlayListItemView.vue'

export default {
    name: 'PlayListView',
    components: {
        PlayListItemView
    },
    data() {
        return {
            lists: [],
        }
    },
    props: {
        username: String,
        user: Object,
    },
    methods: {
        getLists() {
            axios({
                method: 'get',
                url: `${this.$store.state.VUE_APP_SERVER_URL}/accounts/profile/${this.user.id}/`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            })
            .then((res)=>{
                console.log(res)
                this.lists = res.data.like_movies
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getLists()
    }
}
</script>

<style>

</style>