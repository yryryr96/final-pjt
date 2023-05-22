<template>
  <div>
    <h1>{{user.username}}'s Profile</h1>
    <p>팔로잉 : {{ user.followings.length }}</p>
    <p>팔로워 : {{ user.followers_count }}</p>
    <button @click="follow">[Follow]</button>
    <hr>
    <!-- <h3>{{this.$route.params.username}}'s MoviePlaylist</h3> -->
    <PlayListView :username="user.username" :user="user" />
  </div>
</template>

<script>
import axios from 'axios'
import PlayListView from '@/components/accounts/PlayListView.vue'

export default {
    name: 'ProfileView',
    components: {
        PlayListView,
    },
    data() {
        return {
            user: [],
        }
    },
    methods: {
        getUser() {
            for (const user of this.$store.state.users) {
                if (this.$route.params.username == user.username) {
                    this.user = user
                }
            }
            console.log('that')
            console.log(this.user)
        },
        follow() {
            axios({
                method: 'post',
                url: `${process.env.VUE_APP_SERVER_URL}/accounts/${this.user.id}/follow/`,
                headers: {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.getUserDetail()
            }).catch((res)=>{
                console.log(res)
            })
        },
        getUserDetail() {
            axios({
                method: 'get',
                url: `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.user.id}/`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log('getUserDetail')
                this.user = res.data
                this.user.followers_count = res.data.followers_count
                this.user.followings = res.data.followings
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getUser()
        this.getUserDetail()
    }
}
</script>

<style>

</style>