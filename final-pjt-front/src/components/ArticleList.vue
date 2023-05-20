<template>
    <div>
        <h1>ArticleList</h1>
        <ArticleListItem
        v-for="item in items" :key="item.id" :item="item"
        />
    </div>
</template>

<script>
import axios from 'axios'
import ArticleListItem from '@/components/ArticleListItem.vue'

export default {
    name : 'ArticleList',
    data(){
        return {
            items : []
        }
    },
    components : {
        ArticleListItem
    },
    methods : {
        getArticles(){
            axios({
                method : 'get',
                url :`${process.env.VUE_APP_SERVER_URL}/movies/articles/`,
                headers :{
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            })
            .then((res)=>{
                console.log(res)
                this.items = res.data
                
            })
            .catch((err)=>{
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