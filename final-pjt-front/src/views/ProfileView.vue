<template>
  <div>
    <div class="user-wrap">
      <div class="user-image1">
      <div class="user-text1">
        <p style="font-size:40px; color:white; font-weight: bold;">{{user.username}}님의 플레이리스트</p>
        <p style="font-weight: 700; color:rgba(40,40,40,0.8)">팔로잉 : {{ user.followings?.length }} / 팔로워 : {{ user.followers_count }}</p>
        <v-btn v-if="this.$store.state.user.id!==user.id && loginUser.followings.includes(user.id)" @click="follow" color="rgba(250,250,250,0.7)" style="font-weight: 700; margin-right: 20px;">Unfollow</v-btn>
        <v-btn v-if="this.$store.state.user.id!==user.id && !loginUser.followings.includes(user.id)" @click="follow" color="rgba(250,250,250,0.7)" style="font-weight: 700; margin-right: 20px;">Follow</v-btn>
        <v-btn
        color="rgba(250,250,250,0.7)"
        style="font-weight: 700;"
        @click="dialog = true"
        v-if="user.id===this.$store.state.user.id"
        >팔로잉 목록보기</v-btn>
      </div>
      </div>
    </div>
    
        <div class="text-center">
        <v-dialog v-model="dialog" width="auto">
        <v-card>
            <v-card-title>
            <h2>팔로잉 목록</h2>
            </v-card-title>
            <hr>
            <v-card-text>
            <div v-if="followings && followings?.length > 0">
                
                <FollowingListItemView
                v-for="following in followings"
                :key="following.id"
                :following="following"
                @goToProfile="goToProfile2(following)"
                style="margin:15px 0; cursor:pointer;"
                />    
  
            </div>
            <div v-else>
                <h3 style="margin-top:12px;">팔로잉한 사람이 없습니다.</h3>
            </div>
            </v-card-text>
            <v-btn
                
                block
                @click="dialog = false"
                style="font-weight: 700;"
            >
                닫기
            </v-btn>
        </v-card>
        </v-dialog>
    </div>

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
            loginUser : this.$store.state.user
        }
    },
    methods: {
        getUser() {
            console.log(this.$store.state.users)
            for (const user of this.$store.state.users) {
                if (this.$route.params.username == user.username) {
                    this.user = user
                }
            }
            console.log('that')
            console.log(this.user)
        },
        follow() {
            console.log(this.$store.state.user.followings.includes(this.user.id))
            axios({
                method: 'post',
                url: `${process.env.VUE_APP_SERVER_URL}/accounts/${this.user.id}/follow/`,
                headers: {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                console.log(this.$store.state.user)
                this.getUserDetail()
                this.getLoginUser()
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
                // console.log(this.user)
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
        },
        getLoginUser(){
            axios({
                method : 'get',
                url : `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.$store.state.user.id}/`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                this.loginUser = res.data
                // this.$store.dispatch('setUser',res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getLoginUser()
        this.getUser()
        this.getUserDetail()
        this.getFollowings()
    }
}
</script>

<style>
.user-wrap {
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.user-text1 {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.user-image1 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,0) 50%,
    rgba(250,250,250,0.1) 55%,
    rgba(250,250,250,0.2) 60%,
    rgba(250,250,250,0.3) 65%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 75%,
    rgba(250,250,250,0.6) 80%,
    rgba(250,250,250,0.7) 85%,
    rgba(250,250,250,0.8) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pic08.jpg");
  background-size: cover;
}
</style>