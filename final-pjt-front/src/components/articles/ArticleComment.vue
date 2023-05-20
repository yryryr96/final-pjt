<template>
  <div>
    <h3>ArticleComment</h3>
    <ArticleCommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :article_id="article_id"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ArticleCommentItem from './ArticleCommentItem.vue'

export default {
  name: 'ArticleComment',
  data() {
    return {
      comments: [],
      newCommentContent: '',
    };
  },
  components: {
    ArticleCommentItem,
  },
  methods: {
    getComments() {
        axios({
            method : 'get',
            url : `${this.$store.state.VUE_APP_SERVER_URL}/movies/articles/${this.article_id}/`,
            headers : {
                Authorization : `Bearer ${this.$store.state.token}`
            }
        }).then((res)=>{
            console.log('comments')
            console.log(res)
            this.comments = res.data.articlecomment_set
        }).catch((err)=>{
            console.log(err)
        })
    },
    // addReview() {
    //     axios({
    //         method: 'post',
    //         url: `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie_id}/review/`,
    //         headers: {
    //             Authorization: `Bearer ${this.$store.state.token}`,
    //         },
    //         data: {
    //             content: this.newReviewContent,
    //         },
    //     })
    //     .then((res) => {
    //       console.log('Review added');
    //       // 새로운 리뷰를 화면에 추가
    //       this.reviews.push(res.data);
    //       // 입력 창 초기화
    //       this.newReviewContent = '';
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  props: {
    article_id: Number,
  },
  created() {
    this.getComments();
  },
}
</script>

<style>

</style>