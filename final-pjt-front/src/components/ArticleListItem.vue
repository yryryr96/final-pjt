<template>
  <div>
    <p>{{item.title}}</p>
    <p>작성자 : {{item.user}}</p>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'ArticleListItem',
    data(){
      return {
      
      }
    },
    props : {
      item : Object
    },
    methods : {
      
      getArticle(){
        axios({
          method : 'get',
          url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.item.id}`,
          headers : {
            Authorization : `Bearer ${this.$store.state.token}`
          }
        })
        .then((res)=>{
          for (const user of this.$store.state.users){
            if (user.id == this.item.user){
              this.item.user = user.username
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