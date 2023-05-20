<template>
    <div>
        <v-row>
        <v-col cols="10">
            <p>{{ review.content }}</p>
            <p>작성자 : {{review.user}}</p>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
            <v-btn color="error" icon @click="deleteReview">
                삭제
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
        }
    },
    created(){
        this.getReviewUser()
    }
}
</script>

<style scoped>
.d-flex.justify-end {
  justify-content: flex-end;
}
</style>
