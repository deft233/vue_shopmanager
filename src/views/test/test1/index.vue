<template>
  <div>
    <el-button type="primary" :disabled="handle()">按钮1</el-button>
  </div>
</template>

<script>
export default {
methods:{
    handle(){
        // console.log(this.$store.state.user.buttons.indexOf('btn.Add1')!=-1);
        return !(this.$store.state.user.buttons.indexOf('btn.Add1')!=-1)
    }
}
}
</script>

<style>

</style>