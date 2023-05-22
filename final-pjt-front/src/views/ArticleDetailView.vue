<template>
    <div>
        <h1>ArticleDetailView</h1>
        <p>글 번호 : {{ article?.id }}</p>
        <p>작성자 : {{ article?.user }}</p>
        <p>제목 : {{ article?.title }}</p>
        <p>내용 : {{ article?.content }}</p>
        <p>작성시간 : {{ article?.created_at }}</p>
        <p>수정시간 : {{ article?.updated_at }}</p>
        <hr>
        <br>
        <button @click="likeArticle">[Like]</button>
        <p>좋아요 수 : {{ article?.like_users_count }}</p>
        <router-link :to="{name: 'ArticleUpdateView', params: {article_id: article?.id}}">[Update]</router-link>
        <br><button @click="deleteArticle">[Delete]</button>
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
        }
    },
    components: {
        ArticleComment
    },
    methods: {
        likeArticle() {
            axios({
                method: 'post',
                url: `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.$route.params.article_id}/like/`,
                headers: {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                this.getArticleDetail()
            })
        },
        getArticleDetail(){
            console.log('s')
            axios({
                method : 'get',
                url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.$route.params.article_id}/`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                console.log('hi')
                this.article = res.data
                this.article_id = res.data.id
                this.article.like_users = res.data.like_users
                this.article.like_users_count = res.data.like_users_count
                
            }).catch((err)=>{
                console.log(err)
            })
        },
        deleteArticle(){
            axios({
                method: 'delete',
                url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.article.id}`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                console.log(res)
                if(res.status === 200){
                    alert('권한이 없습니다.')
                }
                else if(res.status === 204){
                    this.$router.push({name:'ArticleView'})
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getArticleDetail()
    }
}
</script>

<style>

</style>