<template>
  <div>
    <p>ArticleCommentItem</p>
    <p>{{ comment.content }} - {{ username }}</p>
  </div>
</template>

<script>
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