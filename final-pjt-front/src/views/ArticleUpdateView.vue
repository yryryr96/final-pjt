<template>
    <div>
        <h1>ArticleUpdateView</h1>
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
            <v-btn @click="updateArticle">수정</v-btn>
        </v-form>
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

<style>

</style>