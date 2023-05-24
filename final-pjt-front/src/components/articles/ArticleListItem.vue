<template>
  <div>
    <v-row>
      <v-col cols="2" class="text">{{article.id}}</v-col>
      <v-col cols="6" @click="GoDetail" class="article-title text">{{article.title}}</v-col>
      <v-col cols="2" class="text">{{article.created_at}}</v-col>
      <v-col cols="2" class="text" @click="goProfile" style="cursor:pointer">{{ article.user }}</v-col>
    </v-row>    
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
      goProfile(){
        this.$router.push({name: 'ProfileView', params: {username: this.article.user}})
      },
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
          const dateString = this.article.created_at
          const date = new Date(dateString)
          this.article.created_at = date.toISOString().split("T")[0]
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

<style scope>
.article-title {
  cursor : pointer;
}
.text {
  display : flex;
  justify-content: center;
  align-items: center;
  text-align : center;
  height : 70px;

}
div {
  /* display : flex; */
}
</style>