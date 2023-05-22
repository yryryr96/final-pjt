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
            articles : this.$store.state.articles
        }
    },
    components : {
        ArticleListItem
    },
    methods : {

    },
}
</script>

<style>

</style>