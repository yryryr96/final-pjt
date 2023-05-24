<template>
  <div>
    <v-row>
      <v-col cols="10">
        <br>
        <p>{{review.user}} : {{ review.content }}</p>
        
      </v-col>
      <v-col cols="2" class="d-flex justify-end align-center">
        <v-btn
          v-if="!review.like_users.includes(this.$store.state.user.id)"
          color="rgba(255, 0, 98, 0.7)"
          icon
          @click="likeReview"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="rgba(255, 0, 98, 0.7)"
          icon
          @click="likeReview"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <span>{{ review.like_users_count }}</span>
        <v-btn
          color="dark-gray"
          icon
          style="margin-left: 13px;"
          @click="deleteReview"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <hr>
  </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'MovieReviewItem',
    props: {
        review: Object,
        movie_id: Number
    },
    methods: {
        likeReview(){
            axios({
                method : 'post',
                url : `${process.env.VUE_APP_SERVER_URL}/movies/review/${this.review.id}/like/`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                // console.log(res)
                // console.log(this.$store.state.user.id)
                this.getReviewDetail()
            }).catch((err)=>{
                console.log(err)
            })
            
        },
        deleteReview() {
            axios({
                method: 'delete',
                url: `${process.env.VUE_APP_SERVER_URL}/movies/review/${this.review.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then((res) => {
                console.log(res)
            // 삭제 요청이 성공한 후 리뷰를 화면에서 제거
                if(res.status === 200){
                    alert('권한이 없습니다.')
                }
                else if(res.status === 204){
                    const index = this.$parent.reviews.indexOf(this.review);
                    if (index !== -1) {
                        this.$parent.reviews.splice(index, 1)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                alert('권한이 없습니다.')
            })
        },
        getReviewUser(){
            for (const user of this.$store.state.users){
                if (this.review.user === user.id){
                    this.review.user = user.username
                }
            }
        },
        getReviewDetail(){
            axios({
                method : 'get',
                url : `${process.env.VUE_APP_SERVER_URL}/movies/review/${this.review.id}`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                
                this.review.like_users = res.data.like_users
                this.review.like_users_count = res.data.like_users_count
                this.$set(this.review, 'like_users', res.data.like_users);
                this.$set(this.review, 'like_users_count', res.data.like_users_count)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
        this.getReviewUser()
        this.getReviewDetail()
        // console.log(this.$store.state.user.id)
        // console.log(this.review)
    }
}
</script>

<style scoped>
.d-flex.justify-end {
  justify-content: flex-end;
}
</style>
