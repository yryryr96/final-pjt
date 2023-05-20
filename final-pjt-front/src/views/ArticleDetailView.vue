<template>
    <div>
        <h1>ArticleDetailView</h1>
        <p>글 번호 : {{ article?.id }}</p>
        <p>작성자 : {{ username }}</p>
        <p>제목 : {{ article?.title }}</p>
        <p>내용 : {{ article?.content }}</p>
        <p>작성시간 : {{ article?.created_at }}</p>
        <p>수정시간 : {{ article?.updated_at }}</p>

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
        }
    },
    created() {
        this.getArticle()
    }
}
</script>

<style>

</style>