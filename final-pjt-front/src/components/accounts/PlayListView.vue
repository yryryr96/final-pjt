<template>
  <div>
    <h1>{{ username }}'s PlayList</h1>
    <v-carousel
      class="carousel-container"
      hide-delimiters
      show-arrows
      :items-per-page="8"
    >
      <v-carousel-item>
        <v-row>
          <v-col
            v-for="list in lists"
            :key="list.id"
            cols="2" 
          >
            <PlayListItemView :list="list" />
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
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
      lists: null
    }
  },
  props: {
    username: String,
    user: Object
  },
  computed: {
    groupedMovies() {
      const groupSize = 5;
      const groups = [];
      for (let i = 0; i < this.lists.length; i += groupSize) {
        groups.push(this.lists.slice(i, i + groupSize));
      }
      return groups;
    },
  },
  methods: {
    getLists() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.user.id}/`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.lists = res.data.like_movies
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    this.getLists()
  }
}
</script>

<style scoped>
.movie-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
