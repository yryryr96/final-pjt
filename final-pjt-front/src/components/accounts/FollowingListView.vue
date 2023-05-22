<template>
  <div>
    <h3>FollowingList</h3>
    <FollowingListItemView
    v-for="following in followings"
    :key="following.id"
    :following="following"
    />
  </div>
</template>

<script>
import axios from 'axios'
import FollowingListItemView from '@/components/accounts/FollowingListItemView.vue'

export default {
    name: 'FollowingList',
    components: {
      FollowingListItemView,
    },
    data() {
      return {
        followings: [],
      }
    },
    props: {
        userId: Number,
    },
    methods: {
      getFollowings() {
        axios({
          method: 'get',
          url: `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.userId}/`,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        }).then((res)=>{
          this.followings = res.data.followings
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    created() {
      this.getFollowings()
    }
}
</script>

<style>

</style>