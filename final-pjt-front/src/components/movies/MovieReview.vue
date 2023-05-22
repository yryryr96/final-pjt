cdf <template>
  <div>
    <h3>MovieReview</h3>
    <hr>
    <MovieReviewItem
      v-for="review in displayedReviews"
      :key="review.id"
      :review="review"
      :movie_id="movie_id"
    />

    <v-pagination
      v-model="currentPage"
      :total-visible="5" 
      :length="totalPages" 
      :disabled="loading" 
      @input="fetchReviews" 
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
              ref="reviewInput"
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
      displayedReviews: [],
      newReviewContent : '',
      currentPage: 1,
      itemsPerPage: 4,
      loading: false,
      totalReviews: 0,
    };
  },
  components: {
    MovieReviewItem,
  },
  methods: {
    getReviews() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie_id}/review/`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        console.log(res)
        this.reviews = res.data;
        this.totalReviews = this.reviews.length;
        this.fetchReviews();
      })
      .catch((err) => {
        console.log(err);
      });
    },
    fetchReviews() {
      this.loading = true;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedReviews = this.reviews.slice(startIndex, endIndex);
      this.loading = false;
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
        this.reviews.push(res.data);
        this.totalReviews = this.reviews.length;
        this.currentPage = Math.ceil(this.totalReviews / this.itemsPerPage);
        this.fetchReviews();
        this.newReviewContent = '';
        this.$nextTick(() => {
        // 다음 렌더링 사이클까지 기다린 후에 입력 필드를 업데이트
          this.$refs.reviewInput.reset(); // 입력 필드의 내용을 리셋
        });
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
  watch: {
    reviews: {
      handler() {
        this.totalReviews = this.reviews.length;
        this.fetchReviews();
      },
      deep: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalReviews / this.itemsPerPage);
    },
  },
};
</script>

<style scoped>
.review-input .v-input__control {
  height: 40px;
}

.review-button {
  height: 40px;
}
</style>
