<template>
  <div>
    <h1>ArticleCreateView</h1>
    <v-form @submit.prevent="addArticle">
      <v-text-field
        v-model="newArticleTitle"
        label="게시글 제목 입력"
        outlined
        placeholder="게시글 제목을 입력하세요"
        required
        dense
      ></v-text-field>
      <v-text-field
        v-model="newArticleContent"
        label="게시글 내용 입력"
        outlined
        placeholder="게시글 내용을 입력하세요"
        required
        dense
      ></v-text-field>
      <v-btn @click="addArticle">등록</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArticleCreateView',
    data() {
      return {
        newArticleTitle: '',
        newArticleContent: '',
      }
    },
    methods: {
      addArticle() {
        axios({
            method: 'post',
            url: `${process.env.VUE_APP_SERVER_URL}/movies/articles/`,
            headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
            },
            data: {
              title: this.newArticleTitle,
              content: this.newArticleContent,
            },
        })
        .then((res) => {
          console.log('Article added');
          // @@@@@@@@@@새로고침 해야만 되네 어케 고치노
          this.$router.push({name: 'ArticleView'})
        })
        .catch((err) => {
          console.log(err);
        });
      },
    }
}
</script>

<style>

</style>