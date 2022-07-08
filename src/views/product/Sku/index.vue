<template>
  <div>
    <el-table :data="records" style="width: 100%" border>
      <el-table-column
        header-align="center"
        align="center"
        type="index"
        label="序号"
        width="80"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="skuName"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="skuDesc"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        width="110"
        label="默认图片"
      >
        <template v-slot="{ row, index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="weight"
        width="80"
        label="重量"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="price"
        width="80"
        label="价格"
      >
      </el-table-column>
      <el-table-column header-align="center" prop="prop" label="操作">
        <template v-slot="{ row, $index }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
            v-if="row.isSale == 1"
            @click="handleCancelSaleSku(row)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            v-else
            @click="handleOnSaleSku(row)"
          ></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="showSkuInfoDetail(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="40%"
    >
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">名称</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.skuName }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">描述</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.skuDesc }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">价格</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.price }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">重量</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.weight }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">平台属性</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            <el-tag
              type="success"
              size="mini"
              v-for="(item, index) in skuInfo.skuAttrValueList"
              style="margin-right: 5px"
              >{{ item.attrId }}-{{ item.skuId }}</el-tag
            >
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">默认图片</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            <el-carousel >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item"
              >
                <img :src="item.imgUrl" alt="" style="width:100%;height:100%" />
              </el-carousel-item>
            </el-carousel></div
        ></el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      records: [],
      page: 1,
      limit: 5,
      total: 0,
      skuInfo: {},
      drawer: false,
    };
  },
  methods: {
    // showSkuInfoDetail 点击打开抽屉展示sku详情
    async showSkuInfoDetail(row) {
      this.drawer = true;
      let result = await this.$api.sku.reqGetSkuInfoDetail(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    // handleCancelSaleSku 下架sku
    async handleCancelSaleSku(row) {
      // console.log(row);
      row.isSale = 0;
      let result = await this.$api.sku.reqCancelSaleSku(row.id);
      if (result.code == 200) {
        this.$message("下架成功");
      }
    },
    // handleOnSaleSku 上架sku
    async handleOnSaleSku(row) {
      row.isSale = 1;
      let result = await this.$api.sku.reqOnSaleSku(row.id);
      if (result.code == 200) {
        this.$message("上架成功");
      }
    },
    // 获取skulist
    async getSkuList() {
      let result = await this.$api.sku.reqGetSkuList(this.page, this.limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },
  },
  mounted() {
    this.getSkuList();
  },
};
</script>

<style scoped>


>>>.el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
}
.bg-purple {
  text-align: right;
  margin-right: 16px;
  margin-bottom: 16px;
  font-size: 20px;
}
.bg-purple-light {
  margin-bottom: 16px;
}
>>>.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

>>>.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>