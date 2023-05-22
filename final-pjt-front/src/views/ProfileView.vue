<template>
  <div>
    <h1>{{user.username}}'s Profile</h1>
    <p>팔로잉 : {{ user.followings.length }}</p>
    <p>팔로워 : {{ user.followers_count }}</p>
    <hr>
    <!-- <h3>{{this.$route.params.username}}'s MoviePlaylist</h3> -->
    <PlayListView :username="user.username" :user="user" />
  </div>
</template>

<script>
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
        
    },
    created() {
        this.getUser()
    }
}
</script>

<style>

</style>