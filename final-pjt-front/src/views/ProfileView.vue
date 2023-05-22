<template>
  <div>
    <h1>{{user.username}}'s Profile</h1>
    <p>팔로잉 : {{ user.followings.length }}</p>
    <p>팔로워 : {{ user.followers_count }}</p>
    
    <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      팔로잉 목록보기
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <div v-if="followings && followings.length > 0">
            <FollowingListItemView
            v-for="following in followings"
            :key="following.id"
            :following="following"
            @goToProfile="goToProfile2(following)"
            />    
        </div>
        <div v-else>
            <p>팔로잉한 사람이 없습니다.</p>
        </div>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">목록 닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>

    <button @click="follow">[Follow]</button>
    <hr>
    <!-- <h3>{{this.$route.params.username}}'s MoviePlaylist</h3> -->
    <PlayListView :username="user.username" :user="user" />
  </div>
</template>

<script>
import axios from 'axios'
import PlayListView from '@/components/accounts/PlayListView.vue'
import FollowingListItemView from '@/components/accounts/FollowingListItemView.vue'

export default {
    name: 'ProfileView',
    components: {
        PlayListView,
        FollowingListItemView
    },
    data() {
        return {
            user: [],
            dialog: false,
            followings: [],
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
        },
        getFollowings() {
            axios({
            method: 'get',
            url: `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.user.id}/`,
            headers: {
                Authorization: `Bearer ${this.$store.state.token}`
            }
            }).then((res)=>{
            console.log('getFollowings')
            console.log(res.data.followings)
            this.followings = res.data.followings
            }).catch((err)=>{
            console.log(err)
            })
        },
        goToProfile2(following) {
            this.dialog = false
            let username1 = null
            for (const user of this.$store.state.users) {
                if (following === user.id) {
                    username1 = user.username
                }
            }
            this.$router.push({name: 'ProfileView', params: {username: username1}})
            location.reload();
        }
    },
    created() {
        this.getUser()
        this.getUserDetail()
        this.getFollowings()
    }
}
</script>

<style>

</style>