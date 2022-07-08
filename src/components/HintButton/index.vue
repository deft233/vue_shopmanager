<template>
  <a href="#" :title="title">
      <el-button v-bind="$attrs"></el-button>
  </a>
</template>

<script>

export default {
name:'HintButton',
props:['title']

}
</script>

<style scope>
  a{
    margin: 0 10px;
  }
</style>