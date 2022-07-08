<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      style="margin-top: 10px"
      icon="el-icon-plus"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 商品表格 -->
    <el-table :data="list" style="width: 100%; margin-top: 20px" border>
      <el-table-column label="序号" width="80px" type="index">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="updateGoods(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      style="margin-top: 10px; textalign: center"
    >
    </el-pagination>
    <!-- 添加/修改商品的对话框 -->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" style="width: 80%" :rules="rules" ref="tmForm">
        <el-form-item label="商品名称" label-width="80px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加图片" label-width="80px" prop="logoUrl">
          <!-- action 将点击的图片发请求上传到这里 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleQuitAddOrUpdate">取 消</el-button>
        <el-button type="primary" @click="handleAddOrUpdateGoodsInfo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",

  data() {
    return {
      list: [],
      page: 1, //当前页面
      limit: 3, //每页的记录数
      total: 0, //总共的记录数
      dialogFormVisible: false, //对话框是否打开
      imageUrl: "", //图片的url地址
      tmForm: {
        logoUrl: "", //上传图片
        tmName: "", //商品名称
      },
      rules: {
        tmName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          { required: true, message: "请选择商品图片", trigger: "blur" },
        ],
      }, //表单验证规则
    };
  },
  methods: {
    // 删除商品
    deleteTradeMark(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$api.trademark.reqDeleteTradeMarkById(row.id);
          if (result.code == 200) {
            console.log(result);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageInfo()
          }else{
            console.log(result);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改商品信息
    updateGoods(row) {
      this.dialogFormVisible = true;
      console.log(row);
      // 不能直接引用 this.tmForm = row 因为row使用的服务器返回表格的数据 这样改tmForm会直接修改表格 所以要拷贝一层数据给tmForm
      this.tmForm = { ...row };
    },
    showDialog() {
      this.dialogFormVisible = true;
    },
    handleCurrentChange(page) {
      // console.log(page);
      this.page = page;
      this.getPageInfo();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageInfo();
    },
    async getPageInfo() {
      let { page, limit } = this;
      // console.log(page,limit,this.$api.trademark.reqGetPagenations);
      let result = await this.$api.trademark.reqGetPagenations(page, limit);
      if (result.code == 200) {
        this.list = result.data.records;
        this.page = result.data.current;
        this.total = result.data.total;
        this.limit = result.data.size;
      }
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      // 图片上传成功会返回参数 其中包含图片上传到服务器的地址
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击取消 清空表单内容
    handleQuitAddOrUpdate() {
      this.dialogFormVisible = false;
      this.tmForm = { logoUrl: "", tmName: "" };
    },
    // 点击确定 添加商品信息或者修改商品信息
    handleAddOrUpdateGoodsInfo() {
      this.$refs.tmForm.validate(async (value) => {
        if (value) {
          this.dialogFormVisible = false;
          let result = await this.$api.trademark.addOrUpdateGoodsInfo(
            this.tmForm
          );
          if (result.code == 200) {
            this.$message({
              message: this.tmForm.id ? "修改商品信息成功" : "添加商品信息成功",
              type: "success",
            });
          }
          this.getPageInfo();
          this.tmForm = { logoUrl: "", tmName: "" };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getPageInfo();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>