<template>
  <div>
    <p>{{article.title}}</p>
    <p>작성자 : <router-link :to="{name: 'ProfileView', params: {username: article.user}}">{{ article.user }}</router-link></p>
    <button @click="GoDetail">[Detail]</button>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'ArticleListItem',
    data() {
      return {
        username: null,
      }
    },
    props : {
      article : Object
    },
    methods : {
      GoDetail() {
        this.$router.push({name: 'ArticleDetailView', params: {article_id:this.article.id}})
      },
      getArticle(){
        axios({
          method : 'get',
          url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.article.id}`,
          headers : {
            Authorization : `Bearer ${this.$store.state.token}`
          }
        })
        .then((res)=>{
          // console.log(res)
          for (const user of this.$store.state.users) {
              if (user.id === this.article.user) {
                this.article.user = user.username
                break;
              }
          }
          
        })
      }
    },
    created(){
      this.getArticle()
    } 
}
</script>

<style>

</style>