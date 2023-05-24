<template>
  <div>
    <h3 @click="goToProfile">{{ this.followingInfo?.username}}</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FollowingListItemView',
  props: {
    following: Number,
  },
  data() {
    return {
      followingInfo: null,
    };
  },
  methods: {
    getFollowing() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.following}/`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.followingInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToProfile() {
        this.$emit('goToProfile')
    }
  },
  created() {
    this.getFollowing();
  },
};
</script>

<style>

</style>
