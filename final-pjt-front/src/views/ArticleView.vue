<template>
  <div>
    <div class="user-wrap">
      <div class="user-image1">
      <div class="user-text1">
        <p style="font-size:40px; color:white; font-weight: bold;">자유게시판</p>
      </div>
      </div>
    </div>
    <v-main style="padding:0;">
      <v-container>
        <button style="display:flex;" @click="createArticle">
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <p style="line-height:35px; font-weight: bold; font-size: 20px; color:rgba(40,40,40,0.8)">새 글 작성</p>
        </button>
      <ArticleList/>
      </v-container>
    </v-main>
  </div>
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
<style scoped>
.v-input__prepend-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
}
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
  font-weight: bold;
}
.user-image1 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,0) 40%,
    rgba(250,250,250,0.1) 50%,
    rgba(250,250,250,0.2) 60%,
    rgba(250,250,250,0.3) 65%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 75%,
    rgba(250,250,250,0.6) 80%,
    rgba(250,250,250,0.7) 85%,
    rgba(250,250,250,0.8) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pic12.jpg");
  background-size: 100% 100%;
}
</style>