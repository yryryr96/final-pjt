<template>
    <div>
        <div class="user-wrap">
            <div class="user-image1">
            <div class="user-text1">
            <p style="font-size:40px; color:white; font-weight: bold;">게시글 수정</p>
            </div>
            </div>
        </div>

        <v-container>
        <v-form>
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
            <v-btn @click="updateArticle" color="rgba(255, 107, 39, 0.6)" style="font-weight:bold">수정</v-btn>
        </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArticleUpdateView',
    data() {
        return {
            article: [],
            newArticleTitle: null,
            newArticleContent: null,
        }
    },
    methods: {
        getArticle() {
            axios({
                method: 'get',
                url: `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.$route.params.article_id}/`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.article = res.data
                this.newArticleTitle = this.article.title
                this.newArticleContent = this.article.content
            })
        },
        updateArticle() {
            axios({
                method: 'put',
                url: `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.$route.params.article_id}/`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                },
                data: {
                    title: this.newArticleTitle,
                    content: this.newArticleContent,
                }
            }).then((res)=>{
                console.log(res)
                this.$store.dispatch('getArticles')
                this.$router.push({name: 'ArticleDetailView', params: {article_id:this.$route.params.article_id}})
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getArticle()
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
    url("../assets/pic13.jpg");
  background-size: cover;
}
</style>