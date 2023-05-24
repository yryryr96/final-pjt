<template>
  <div>
    <div class="user-wrap">
      <div class="user-image1">
      <div class="user-text1">
        <p style="font-size:40px; color:white; font-weight: bold;">새 글 작성</p>
      </div>
      </div>
    </div>

    <v-container>
    <v-form @submit.prevent="addArticle">
      <v-text-field
        v-model="newArticleTitle"
        label="게시글 제목 입력"
        outlined
        required
        dense
      ></v-text-field>
      <v-text-field
        v-model="newArticleContent"
        label="게시글 내용 입력"
        outlined
        required
        dense
      ></v-text-field>
      <v-btn @click="addArticle" color="rgba(204, 105, 146, 0.8)" style="color:white; font-weight:bold;">등록</v-btn>
    </v-form>
    </v-container>
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

<style scoped>
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
.focused .v-input__control {
  border-color: red !important;
}
</style>