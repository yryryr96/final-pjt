<template>
  <div>
    <v-row>
      <v-col class="text" cols="2">번호</v-col>
      <v-col class="text" cols="6">제목</v-col>
      <v-col class="text" cols="2">작성일</v-col>
      <v-col class="text" cols="2">작성자</v-col>
    </v-row>
    <hr>
    <div v-if="displayedArticles">
      <ArticleListItem
        v-for="article in displayedArticles"
        :key="article.id"
        :article="article"
      />
    </div>
    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(totalArticles / itemsPerPage)"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script>
import ArticleListItem from './ArticleListItem.vue'
import axios from 'axios'

export default {
  name: 'ArticleList',
  data() {
    return {
      articles: null,
      currentPage: 1,
      itemsPerPage: 15,
      totalArticles: 0,
    }
  },
  components: {
    ArticleListItem
  },
  computed: {
    displayedArticles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.articles ? this.articles.slice(startIndex, endIndex) : null
    },
  },
  methods: {
    getArticles() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/movies/articles/`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
        .then((res) => {
          console.log(res)
          this.articles = res.data.reverse()
          this.totalArticles = this.articles.length
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changePage(page) {
      this.currentPage = page
    },
  },
  created() {
    this.getArticles()
  }
}
</script>

<style scope>
.text {
  text-align: center;
}
</style>
