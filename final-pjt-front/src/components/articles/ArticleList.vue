<template>
    <div>
        <h1>ArticleList</h1>
        <ArticleListItem
        v-for="article in articles" :key="article.id" :article="article"
        />
    </div>
</template>

<script>
import ArticleListItem from './ArticleListItem.vue'
import axios from 'axios'

export default {
    name : 'ArticleList',
    data(){
        return {
            articles : null
        }
    },
    components : {
        ArticleListItem
    },
    methods : {
         getArticles(context) {
            axios({
                method: 'get',
                url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/`,
                headers: {
                Authorization : `Bearer ${this.$store.state.token}`
                }
            })
            .then((res) => {
                console.log(res)
                this.articles = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    created(){
        this.getArticles()
    }
}
</script>

<style>

</style>