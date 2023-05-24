<template>
    <div>
        <div class="user-wrap">
            <div class="user-image1">
            <div class="user-text1">
            <p style="font-size:40px; color:white; font-weight: bold;">게시글 상세</p>
            </div>
            </div>
        </div>


        <v-container>
        <v-row>
        <div style="margin:20px 0px;">
        <div style="display:flex; align-items:center;">
        <span style="font-size: 35px; font-weight: bold; color:rgba(40,40,40,0.8)">{{ article?.title }}</span>
        <v-btn
            v-if="!article?.like_users.includes(this.$store.state.user.id)"
            color="rgba(255, 0, 98, 0.7)"
            icon
            @click="likeArticle"
            style="margin-left: 13px;"
        >
            <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn
            v-else
            color="rgba(255, 0, 98, 0.7)"
            icon
            @click="likeArticle"
            style="margin-left: 13px;"
        >
            <v-icon>mdi-heart</v-icon>
        </v-btn>
        <span>{{ article?.like_users_count }}</span>
        <v-btn
          color="dark-gray"
          icon
          style="margin-left: 13px;"
          @click="deleteArticle"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
            color="dark-gray"
            icon
            style="margin-left: 13px;"
            @click="goToUpdate"
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        </div>
        </div>
        <br>
        </v-row>
        <v-row>
        <v-col cols="6" style="border-right: 2.5px solid rgba(40,40,40,0.5);">
        <div style="margin-right:10px;">
        <h3>내용</h3><br>
        <p style="font-size: 25px;">{{ article?.content }}</p>
        <hr><br>
        <h3>추가 정보</h3><br>
        <p>글 번호 : {{ article?.id }}</p>
        <p>작성자 : {{ article?.user }}</p>
        <p>작성시간 : {{ article?.created_at.slice(0, 10) }} / {{article?.created_at.slice(11, 19)}}</p>
        <p>수정시간 : {{ article?.updated_at.slice(0, 10) }} / {{article?.created_at.slice(11, 19)}}</p>
        <hr>
        <br>
        </div>
        </v-col>
        <v-col cols="6">
        <ArticleComment :article_id="parseInt($route.params.article_id)"/>
        </v-col>
        </v-row>
        </v-container>
        </div>

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
        },
        goToUpdate() {
            this.$router.push({name: 'ArticleUpdateView', params: {article_id: this.article?.id}})
        },
    },
    created() {
        this.getArticleDetail()
    }
}
</script>

<style scoped>
.user-wrap {
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.user-text1 {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
}
.user-image1 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,0) 40%,
    rgba(250,250,250,0.1) 50%,
    rgba(250,250,250,0.2) 60%,
    rgba(250,250,250,0.3) 65%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 75%,
    rgba(250,250,250,0.6) 80%,
    rgba(250,250,250,0.7) 85%,
    rgba(250,250,250,0.8) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pic13.jpg");
  background-size: cover;
}
</style>