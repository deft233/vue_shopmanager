<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="checkedCategory.c1"
          @change="handle1"
          :disabled="!show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
            
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="checkedCategory.c2"
          @change="handle2"
          :disabled="!show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
            
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="checkedCategory.c3"
          @change="handle3"
          :disabled="!show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
            
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [], //一级分类的列表
      list2: [], //一级分类的列表
      list3: [], //一级分类的列表
      checkedCategory: {
        c1: "", //选中的一级分类
        c2: "", //选中的二级分类
        c3: "", //选中的三级分类
      },
    };
  },
  methods: {
    async getCategory1() {
      let result = await this.$api.attr.reqGetCategory1();
      console.log(result);
      if (result.code == 200) {
        this.list1 = result.data.slice(0,10);
      }
    },
    // 当一级菜单改变
    async handle1() {
      // 获取二级菜单内容

      let { c1 } = this.checkedCategory;
      this.list2 = [];
      this.list3 = [];
      let result = await this.$api.attr.reqGetCategory2(c1);
      if (result.code == 200) {
        this.list2 = result.data;
      }
      this.checkedCategory.c2 = "";
      this.checkedCategory.c3 = "";
    },
    // 当二级菜单改变
    async handle2() {
      // 获取三级菜单内容
      let { c2 } = this.checkedCategory;
      // console.log(c1);
      let result = await this.$api.attr.reqGetCategory3(c2);
      if (result.code == 200) {
        this.list3 = result.data;
      }
      this.checkedCategory.c3 = "";
    },
    // 当三级菜单改变 把数据给父组件
    async handle3() {
        this.$emit('getCategoryId',this.checkedCategory)
    },
  },
  mounted() {
    this.getCategory1();
  },
  props:['show']
};
</script>

<style>
</style>