<template>
  <div>
    <p>ArticleCommentItem</p>
    <p>{{ comment.content }} - <router-link :to="{name: 'ProfileView', params: {username: username}}">{{ username }}</router-link></p>
    <button @click="deleteComment">[Delete]</button>
    <hr>
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