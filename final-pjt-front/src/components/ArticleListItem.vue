<template>
  <div>
    <h1>ArticleListItem</h1>
    <p>{{item.title}}</p>
  </div>
</template>

<script>
export default {
    name : 'ArticleListItem',
    props : {
      item : Object
    }
}
</script>

<style>

</style>