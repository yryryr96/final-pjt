<template>
  <div style="margin-left:10px;">
    <h3>댓글</h3>
    <br>
    <ArticleCommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :article_id="article_id"
    />
    <br>

    <h3>새 댓글 작성</h3><br>
    <v-form @submit.prevent="addComment">
      <v-container>
        <v-row>
          <v-col cols="12" lg="10">
          <v-text-field
          v-model="newCommentContent"
          outlined
          label="댓글 내용"
          placeholder="댓글 내용을 입력하세요"
          required
          dense
          ></v-text-field></v-col>
          <v-col cols="12" lg="2">
          <v-btn @click="addComment" color="rgba(255, 107, 39, 0.6)" style="font-weight:bold">등록</v-btn>
          </v-col>
        </v-row>
      </v-container>
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
.color{
  background-color: rgb(rgb(255, 107, 39), green, blue);
}
</style>