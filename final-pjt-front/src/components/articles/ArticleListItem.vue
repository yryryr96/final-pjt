<template>
  <div @click="GoDetail">
    <p>{{article.title}}</p>
    <p>작성자 : {{ username }}</p>
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
          url : `${this.$store.state.VUE_APP_SERVER_URL}/movies/articles/${this.article.id}`,
          headers : {
            Authorization : `Bearer ${this.$store.state.token}`
          }
        })
        .then((res)=>{
          for (const user of this.$store.state.users){
            if (user.id == this.article.user){
              this.username = user.username
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