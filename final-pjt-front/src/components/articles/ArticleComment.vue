<template>
  <div>
    <h3>ArticleComment</h3>
    <ArticleCommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :article_id="article_id"
    />
    <h3>Create ArticleComment</h3>
    <v-form @submit.prevent="addComment">
        <v-text-field
        v-model="newCommentContent"
        outlined
        placeholder="댓글 내용을 입력하세요"
        required
        dense
        ></v-text-field>
        <v-btn @click="addComment">등록</v-btn>
    </v-form>
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
    addComment() {
        axios({
            method: 'post',
            url: `${process.env.VUE_APP_SERVER_URL}/movies/articles/${this.article_id}/comments/`,
            headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
            },
            data: {
                content: this.newCommentContent,
            },
        })
        .then((res) => {
            this.comments.push(res.data);
            this.newCommentContent = '';
        })
        .catch((err) => {
            console.log(err);
        });
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