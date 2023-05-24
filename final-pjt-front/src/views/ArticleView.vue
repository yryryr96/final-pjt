<template>
  <v-container>
    <v-main>
      <div style="display:flex; justify-content:space-between">
    <h1>자유게시판</h1>
    <v-btn icon @click="createArticle">
        <v-icon>mdi-pencil</v-icon>
    </v-btn>
    </div>
    <hr>
    <ArticleList/>
    </v-main>
  </v-container>
</template>

<script>
import ArticleList from '@/components/articles/ArticleList.vue'
export default {
  name: 'ArticleView',
  components : {
    ArticleList
  },
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    createArticle(){
      this.$router.push({name : 'ArticleCreateView'})
    },
    search() {
      // 검색 기능 구현
      // 검색어: this.searchText
      // 검색 로직을 구현하세요.
    },
  },
  created() {
  }
}
</script>
<style>
.v-input__prepend-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
}
</style>