<template>
  <div>
    <h3>MovieReview</h3>
    <MovieReviewItem
      v-for="review in reviews"
      :key="review.id"
      :review="review"
      :movie_id="movie_id"
    />

    <v-form @submit.prevent="addReview">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="newReviewContent"
              label="리뷰 내용 입력"
              outlined
              placeholder="리뷰 내용을 입력하세요"
              required
              class="review-input"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn color="primary" @click="addReview" class="review-button">등록</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import MovieReviewItem from '@/components/movies/MovieReviewItem';

export default {
  name: 'MovieReview',
  data() {
    return {
      reviews: [],
      newReviewContent: '',
    };
  },
  components: {
    MovieReviewItem,
  },
  methods: {
    getReviews() {
        axios({
            method : 'get',
            url : `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie_id}/review/`,
            headers : {
                Authorization : `Bearer ${this.$store.state.token}`
            }
        }).then((res)=>{
            console.log('review')
            console.log(res)
            this.reviews = res.data
        }).catch((err)=>{
            console.log(err)
        })
    },
    addReview() {
        axios({
            method: 'post',
            url: `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie_id}/review/`,
            headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
            },
            data: {
                content: this.newReviewContent,
            },
        })
        .then((res) => {
          console.log('Review added');
          // 새로운 리뷰를 화면에 추가
          this.reviews.push(res.data);
          // 입력 창 초기화
          this.newReviewContent = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  props: {
    movie_id: Number,
  },
  created() {
    this.getReviews();
  },
};
</script>

<style scoped>
.review-input .v-input__control {
  height: 40px; /* 원하는 높이로 설정 */
}

.review-button {
  height: 40px; /* 원하는 높이로 설정 */
}
</style>
