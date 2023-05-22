<template>
  <div>
    <h5>FollowingListItemView</h5>
    <router-link :to="profileLink">{{ followingInfo?.username }}</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FollowingListItemView',
  props: {
    following: Number,
  },
  data() {
    return {
      followingInfo: [],
      username: null,
    }
  },
  computed: {
    profileLink() {
      return {
        name: 'ProfileView',
        params: { username: this.followingInfo?.username },
      }
    },
  },
  methods: {
    getFollowing() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.following}/`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res.data)
          this.followingInfo = res.data
          this.followingInfo.username = res.data.username
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    this.getFollowing()
  },
}
</script>

<style>

</style>