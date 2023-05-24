<template>
  <div class="d-flex align-center" style="height: 36px;">
  <span>{{ username }} : {{ comment.content }}</span>
  <div class="ml-auto"> <!-- 새로운 div 추가 -->
    <v-btn
      color="dark-gray"
      icon
      @click="deleteComment"
      v-show="username == this.$store.state.user.username"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
  <hr>
  <br>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArticleCommentItem',
    props: {
        comment: Object,
        article_id: Number
    },
    data() {
        return {
            username: null,
        }
    },
    methods: {
        deleteComment() {
            axios({
                method: 'delete',
                url: `${process.env.VUE_APP_SERVER_URL}/movies/comments/${this.comment.id}/`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then((res) => {
                console.log(res.data)
                if(res.status === 200){
                    alert('권한이 없습니다.')
                }
                else if(res.status === 204){
                    const index = this.$parent.comments.indexOf(this.comment);
                    if (index !== -1) {
                        this.$parent.comments.splice(index, 1)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                alert('권한이 없습니다.')
            })
        },
    },
    created(){
        for (const user of this.$store.state.users) {
            if (this.comment.user === user.id) {
                this.username = user.username
            }
        }
    }
}
</script>

<style>

</style>