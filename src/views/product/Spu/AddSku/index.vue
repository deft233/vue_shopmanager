<template>
  <div>
    <el-form ref="formSku" label-width="80px">
      <el-form-item label="SPU名称">
        {{spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model.number="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDes"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="formPTAttr" label-width="80px">
          <el-form-item
            :label="attrInfoListItem.attrName"
            v-for="(attrInfoListItem, index) in attrInfoList"
            :key="attrInfoListItem.id"
          >
            <el-select
              v-model="
                attrInfoListItem.attrInfoListItemidAndattrValueListItemid
              "
              placeholder="请选择"
            >
              <el-option
                :label="attrValueListItem.valueName"
                :value="`${attrInfoListItem.id}:${attrValueListItem.id}`"
                v-for="(
                  attrValueListItem, index
                ) in attrInfoListItem.attrValueList"
                :key="attrValueListItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item
            :label="saleAttrItem.saleAttrName"
            v-for="(saleAttrItem, index) in spuSaleAttrList"
            :key="saleAttrItem.id"
          >
            <el-select
              v-model="saleAttrItem.saleAttrItemIdAndSaleAttrItemValueId"
              placeholder="请选择"
            >
              <el-option
                :label="item.saleAttrValueName"
                :value="`${saleAttrItem.id}:${item.id}`"
                v-for="(item, index) in saleAttrItem.spuSaleAttrValueList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          :data="skuImageList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="prop" width="40" type="selection">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="setIsDefault(row)"
                >设为默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="addSkuInfo"
            >保存</el-button
          >
          <el-button type="" size="mini" @click="handleCancel">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddSku",
  data() {
    return {
      skuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      // 需要收集的数据
      skuInfo: {
        category3Id: 0,
        id: 0,
        isSale: 0,
        price: 0,
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuDefaultImg: "string",
        skuDes: "string",
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "url",
          //   isDefault: "string",
          // },
        ],
        skuName: "string",
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          // },
        ],
        spuId: 0,
        tmId: 0,
        weight: "string",
      },
      selectedImgList: [],
      spuName:''
    };
  },
  methods: {
    // addSkuInfo 点击保存发送请求添加skuInfo
    async addSkuInfo() {
      // 对数据进行处理
      const { skuInfo, attrInfoList, spuSaleAttrList, selectedImgList } = this;
      // 对平台属性进行处理
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrInfoListItemidAndattrValueListItemid) {
          const [attrId, valueId] =
            item.attrInfoListItemidAndattrValueListItemid.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      // 对销售属性进行处理
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.saleAttrItemIdAndSaleAttrItemValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.saleAttrItemIdAndSaleAttrItemValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      // 对选中图片进行处理
      skuInfo.skuImageList = selectedImgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
        };
      });
      // 发送请求
      let result = await this.$api.sku.reqAddSkuInfo(skuInfo);
      if (result.code == 200) {
        this.$message("添加sku属性成功");
        // 跳回主页面
        this.$emit("switchShowForm", { str: "spuShow" });
        // 表单初始化
        Object.assign(this._data,this.$options.data())
      } else {
        this.$message("添加失败");
        this.$emit("switchShowForm", { str: "spuShow" });
        Object.assign(this._data,this.$options.data())
      }
    },
    // handleCancel 点击取消跳转回主页面
    handleCancel() {
      // console.log('111');
      this.$emit("switchShowForm", { str: "spuShow" });
      Object.assign(this._data,this.$options.data())
    },
    // @selection-change="handleSelectionChange"
    handleSelectionChange(val) {
      console.log(val);
      this.selectedImgList = val;
    },

    // setIsDefault
    setIsDefault(row) {
      // 排他操作
      this.skuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    getInfoInit(category1Id, category2Id, row) {
      this.spuName = row.spuName
      let resultImageList = this.$api.sku.reqGetSpuImageList(row.id);
      //  if(resultImageList.code == 200){
      //   this.skuImageList = resultImageList.data;
      //  }
      let resultSpuSaleAttrList = this.$api.sku.reqGetSpuSaleAttrList(row.id);
      //   if(resultSpuSaleAttrList.code == 200){
      //   this.spuSaleAttrList = resultSpuSaleAttrList.data;
      //  }
      let resultattrInfoList = this.$api.sku.reqGetattrInfoList(
        category1Id,
        category2Id,
        row.category3Id
      );
      //   if(resultattrInfoList.code == 200){
      //   this.attrInfoList = resultattrInfoList.data;
      //  }
      Promise.all([resultImageList, resultSpuSaleAttrList, resultattrInfoList])
        .then((results) => {
          console.log(results);
          results[0].data.forEach((item) => {
            item.isDefault = 0;
          });
          this.skuImageList = results[0].data;
          this.spuSaleAttrList = results[1].data;
          this.attrInfoList = results[2].data;
        })
        .catch((reason) => {
          console.log(reason);
        });
    },
  },
};
</script>

<style>
</style>