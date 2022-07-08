<template>
  <div>
    <el-card style="margin-top: 20px">
      <!-- 三级联动组件 -->
      <CategorySelect
        :show="isShow"
        @getCategoryId="getCategoryId"
      ></CategorySelect>
    </el-card>
    <!-- 商品属性展示 -->
    <el-card style="margin-top: 20px">
      <div v-show="isShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="isShow = false"
          >添加属性</el-button
        >
        <el-table :data="data" style="width: 100%; margin-top: 20px" border>
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            header-align="center"
          >
            <template v-slot="{ row }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="150"
            header-align="center"
            align="center"
          >
            <template v-slot="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShow">
        <el-form :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="clearForm">取消</el-button>
        <el-table border style="margin: 20px 0" :data="attrInfo.attrValueList">
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column
            label="属性值名称"
            width="width"
            prop="attrInfo.attrValueList"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-show="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <div>
                <span
                  style="display: block"
                  @click="toEdit(row, $index)"
                  v-show="!row.flag"
                  >{{ row.valueName }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteValueName($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >确定</el-button
        >
        <el-button @click="clearForm">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import deepClone from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      data: [], //所选3级分类所有的属性
      category1Id: "",
      category2Id: "",
      category3Id: "",
      isShow: true,
      // 当前新增或者修改的属性和属性值
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 保存
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName.trim() !== "") {
            delete item.flag;
            return true;
          }
        }
      );

      let isOk = this.attrInfo.attrValueList.forEach((item) => {
        if (item.flag) {
          return false;
        }
      });
      console.log(isOk);
      if (isOk === false) {
        this.$message("请检查输入内容");
      } else {
        let result = await this.$api.attr.reqAddAttr(this.attrInfo);
        if (result.code == 200) {
          //  console.log(result);
          this.$message("成功");
          this.isShow = true;
          this.getCategoryId({
            c1: this.category1Id,
            c2: this.category2Id,
            c3: this.category3Id,
          });
        }
      }
    },
    // 删除属性值
    deleteValueName(index) {
      // console.log(111);
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 点击span切换成编辑模式
    toEdit(row, index) {
      row.flag = true;
      console.log(index);
      console.log(this.$refs[index]);
      //先执行函数体内容 才重新渲染模板 因此先聚焦了 再input框出现
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 失去焦点转换成查看模式
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      let count = 0;
      this.attrInfo.attrValueList.forEach((item) => {
        if (item.valueName == row.valueName) {
          count++;
        }
      });
      if (count > 1) {
        this.$message("属性不能重复");
        return;
      }
      row.flag = false;
    },
    // 修改属性值
    updateAttr(row) {
      this.isShow = false;
      console.log(row);
      // 当结构有多层引用类型 需要深拷贝
      this.attrInfo = deepClone(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // clearForm 取消时清除表单记录
    clearForm() {
      this.attrInfo.attrName = "";
      this.attrInfo.attrValueList = [];
      this.isShow = true;
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus(); //input框打了标志ref 分别为0 1 2 3 添加输入框 该输入框ref为数组长度-1
      });
    },
    async getCategoryId(allId) {
      console.log(allId);
      // 发送请求
      let result = await this.$api.attr.reqGetAttrInfoList({
        category1Id: allId.c1,
        category2Id: allId.c2,
        category3Id: allId.c3,
      });
      if (result.code == 200) {
        this.data = result.data;
        this.category1Id = allId.c1;
        this.category2Id = allId.c2;
        this.category3Id = allId.c3;
        this.attrInfo.categoryId = allId.c3;
      }
    },
  },
};
</script>

<style>
</style>