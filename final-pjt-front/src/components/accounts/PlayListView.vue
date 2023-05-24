<template>
  <div>
    <!-- <h1>평점순</h1> -->
    <v-carousel
      hide-delimiters
      show-arrows
      v-model="currentCarouselIndex"
      height="350"
    >
      <v-carousel-item
        v-for="(group, index) in groupedMovie"
        :key="index"
        style="text-align: center;"
      >
        <div class="movie-group">
          <play-list-item-view
            v-for="(movie_id, movieIndex) in group"
            :key="movieIndex"
            :movie_id="movie_id"
            v-if="movieIndex < 8"
            style="margin-right: 10px;"
          />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import axios from 'axios';
import PlayListItemView from '@/components/accounts/PlayListItemView.vue';

export default {
  name: 'PlayListView',
  components: {
    PlayListItemView,
  },
  data() {
    return {
      lists: null,
      groupedMovie: null,
      currentCarouselIndex: 0,
    };
  },
  props: {
    username: String,
    user: Object,
  },
  methods: {
    getLists() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/profile/${this.user.id}/`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.lists = res.data.like_movies;
          this.groupedMovie = this.groupedMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    groupWithRepeatedItems(group, size) {
      const repeatedGroup = [...group];
      while (repeatedGroup.length < size) {
        repeatedGroup.push(...group.slice(0, size - repeatedGroup.length));
      }
      return repeatedGroup;
    },
    groupedMovies() {
      const groupSize = 8;
      const groups = [];
      for (let i = 0; i < this.lists.length; i += groupSize) {
        groups.push(this.lists.slice(i, i + groupSize));
      }
      return groups;
    },
  },
  created() {
    this.getLists();
  },
  mounted() {
    const savedCarouselIndex = sessionStorage.getItem('carouselIndex');
    if (savedCarouselIndex !== null) {
      this.currentCarouselIndex = parseInt(savedCarouselIndex);
    }
  },
  beforeDestroy() {
    sessionStorage.setItem('carouselIndex', this.currentCarouselIndex.toString());
  },
};
</script>

<style scoped>
.movie-group {
  display: flex;
  justify-content: center;
}
</style>
