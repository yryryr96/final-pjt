<template>
    <div>
        <h1>ArticleDetailView</h1>
        <p>글 번호 : {{ article?.id }}</p>
        <p>작성자 : {{ username }}</p>
        <p>제목 : {{ article?.title }}</p>
        <p>내용 : {{ article?.content }}</p>
        <hr>
        <br>
        <button @click="likeArticle">[Like]</button>
        <p>좋아요 수 : {{ article?.like_users_count }}</p>
        <hr>
        <p>작성시간 : {{ article?.created_at }}</p>
        <p>수정시간 : {{ article?.updated_at }}</p>
        <hr>
        <br>
        <ArticleComment :article_id="parseInt($route.params.article_id)"/>
    </div>
</template>

<script>
import axios from 'axios'
import ArticleComment from '@/components/articles/ArticleComment.vue'
export default {
    name: 'ArticleDetailView',
    data() {
        return {
            article: null,
            username: null,
        }
    },
    components: {
        ArticleComment
    },
    methods: {
        getArticle() {
            axios({
                method: 'get',
                url: `${this.$store.state.VUE_APP_SERVER_URL}/movies/articles/${this.$route.params.article_id}/`,
                headers: {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.article = res.data
                for (const user of this.$store.state.users){
                    if (user.id == this.article.user){
                    this.username = user.username
                }
          }
            })
        },
        likeArticle() {
            axios({
                method: 'post',
                url: `http://127.0.0.1:8000/movies/articles/${this.$route.params.article_id}/like/`,
                headers: {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.getArticleDetail()
            })
        },
        getArticleDetail(){
            axios({
                method : 'get',
                url : `http://127.0.0.1:8000/movies/articles/${this.article.id}`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.article.like_users = res.data.like_users
                this.article.like_users_count = res.data.like_users_count
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