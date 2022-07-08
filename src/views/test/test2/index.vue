<template>
  <div>
    <el-button type="primary" :disabled="handle('btn.Add2')">按钮2</el-button>
    <el-button type="primary"  :disabled="handle('btn.Add3')">按钮3</el-button>
  </div>
</template>

<script>
export default {
methods:{
    handle(params){
        // console.log(this.$store.state.user.buttons.indexOf('btn.Add1')!=-1);
        return !(this.$store.state.user.buttons.indexOf(params)!=-1)
    }
}
}
</script>

<style>

</style>