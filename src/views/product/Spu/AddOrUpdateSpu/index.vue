<template>
  <div>
    {{ unSelectSaleAttr }}
    <el-form ref="form1" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="SPU名称"
          v-model="initInfo.spuInfoResult.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select
          placeholder="请选择品牌"
          v-model="initInfo.spuInfoResult.tmId"
        >
          <el-option
            v-for="(item, index) in initInfo.tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          rows="4"
          v-model="initInfo.spuInfoResult.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- action上传图片到的服务器地址 file-list 展示图片的列表 onpreview图片在展示中 onremove 图片移除后 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          :file-list="initInfo.spuImageList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="valueSale" placeholder="请选择">
          <el-option
            v-for="(item, index) in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="item.id + ':' + item.name"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!valueSale"
          @click="handleAddSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          :data="initInfo.spuInfoResult.spuSaleAttrList"
          style="width: 100%"
          border
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="inputAttrValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSpuAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <div>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDeleteRow($index)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSpuInfo">保存</el-button>
        <el-button @click="quitAddOrUpdateSpu">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddOrUpdateSpu",
  computed: {
    unSelectSaleAttr() {
      let result = this.initInfo.saleAttr.filter((item) => {
        return this.initInfo.spuInfoResult.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName !== item.name;
        });
      });
      return result;
    },
  },
  data() {
    return {
      data: [{}, {}, {}],
      dialogImageUrl: "",
      dialogVisible: false,
      initInfo: {
        spuInfoResult: {
          category3Id: 0,
          description: "",
          id: 0,
          spuImageList: [
            {
              id: 0,
              imgName: "",
              imgUrl: "",
              spuId: 0,
            },
          ],
          spuName: "",
          spuSaleAttrList: [
            
          ],
          tmId: 0,
        },
        saleAttr: [],
        spuImageList: [],
        tradeMarkList: [],
      },
      value: "",
      valueSale: "",
      inputAttrValue: "",
    };
  },
  methods: {
    // updateSpuInfo
    async updateSpuInfo() {
      this.initInfo.spuInfoResult.spuImageList = this.initInfo.spuImageList.map(
        (item) => {
          item.imgName = item.name;
          item.imgUrl = (item.response && item.response.data) || item.imgUrl;
          return item;
          // return {
          //   imgName: item.name,
          //   imgUrl: (item.response&&item.response.data) || item.imgUrl,
          // };
        }
      );
      let result = await this.$api.spu.reqAddOrUpdateSpu(
        this.initInfo.spuInfoResult
      );
      if (result.code == 200) {
        // 判断是添加还是修改
        if (this.initInfo.spuInfoResult.id) {
          this.$message("修改成功");
          //返回展示页面
          this.$emit("switchShowForm", {str:"spuShow"});
        } else {
          this.$message("添加成功");
          //返回展示页面
          this.$emit("switchShowForm", {str:"spuShow",pageNum:1});
        }
      }
    },

    // handleDeleteRow
    // 删除整行商品属性
    handleDeleteRow($index) {
      this.initInfo.spuInfoResult.spuSaleAttrList.splice($index, 1);
    },
    // 删除tag商品属性标签
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // handleAddSaleAttr 添加销售属性
    handleAddSaleAttr() {
      let [baseSaleAttrId, saleAttrName] = this.valueSale.split(":");
      let saleAttrItem = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.initInfo.spuInfoResult.spuSaleAttrList.push(saleAttrItem);
      // 选择时视图层数据流向数据层 给valueSale赋值  添加时 数据层流向视图层 数据设置为null 所选择项也清空
      this.valueSale = null;
    },
    // showInput
    addSpuAttrValue(row) {
      // 添加属性值tag
      // 给row此行数据添加inputVisible 控制input框与button的切换
      console.log(row);
      this.$set(row, "inputVisible", true);
    },
    handleInputConfirm(row) {
      let { baseSaleAttrId } = row;
      let newAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: this.inputAttrValue,
      };
      if (this.inputAttrValue.trim() == "") {
        this.$message("不能为空捏");
        return;
      } else if (
        row.spuSaleAttrValueList.every(
          (item) => item.saleAttrValueName.trim() !== this.inputAttrValue.trim()
        )
      ) {
        row.spuSaleAttrValueList.push(newAttrValue);
        console.log(newAttrValue);
        row.inputVisible = false;
      } else {
        this.$message("不能重复捏");
      }
    },
    // 图片列表移除图片
    handleRemove(file, fileList) {
      this.initInfo.spuImageList = fileList;
    },
    // 图片列表展示图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // handleSuccess 图片列表添加一张图片
    handleSuccess(response, file, fileList) {
      this.initInfo.spuImageList = fileList;
    },
    // quitAddOrUpdateSpu 点击取消
    quitAddOrUpdateSpu() {
      this.$emit("switchShowForm", {str:"spuShow"});
    },
    // 初始化表单
    async initForm(spu) {
      // console.log(spu);
      let spuInfoResult = await this.$api.spu.reqGetSpuInfoById(spu.id);
      if (spuInfoResult.code == 200) {
        this.initInfo.spuInfoResult = spuInfoResult.data;
      }
      let getSaleAttr = await this.$api.spu.reqGetSaleAttr();
      if (getSaleAttr.code == 200) {
        this.initInfo.saleAttr = getSaleAttr.data;
      }
      let spuImageList = await this.$api.spu.reqGetSpuImageById(spu.id);
      if (spuImageList.code == 200) {
        spuImageList.data.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
          // console.log(item);
        });
        console.log(spuImageList.data);
        this.initInfo.spuImageList = spuImageList.data;
      }
      // reqGetTradeMarkList;
      let tradeMarkList = await this.$api.spu.reqGetTradeMarkList();
      if (tradeMarkList.code == 200) {
        this.initInfo.tradeMarkList = tradeMarkList.data;
      }
      // console.log(tradeMarkList);
      console.log(spuImageList);
      // console.log(getSaleAttr);
    },
    // 添加或修改页面初始化
    handleInitAddOrUpdate(spu) {
      this.initForm(spu);
    },
    // 添加页面数据初始化
    async handleAddSpuInfoInit(c3Id) {
      console.log("assign");
      Object.assign(this._data, this.$options.data());
      this.initInfo.spuInfoResult.category3Id = c3Id;

      let getSaleAttr = await this.$api.spu.reqGetSaleAttr();
      if (getSaleAttr.code == 200) {
        this.initInfo.saleAttr = getSaleAttr.data;
      }
      let tradeMarkList = await this.$api.spu.reqGetTradeMarkList();
      if (tradeMarkList.code == 200) {
        this.initInfo.tradeMarkList = tradeMarkList.data;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>