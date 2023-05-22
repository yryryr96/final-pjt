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
            url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.article_id}/`,
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