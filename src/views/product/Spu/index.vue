<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 三级联动组件 -->
      <CategorySelect
        :show="isShow"
        @getCategoryId="getCategoryId"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="switchWhat == 'spuShow'">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <!-- :data="data"  -->
        <el-table :data="records" style="width: 100%; margin-top: 20px" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton
                title="添加"
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click.native="addSku(row)"
              ></HintButton>
              <HintButton
                title="编辑"
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click.native="updateSpu(row)"
              ></HintButton>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="handleDeleteSpu(row)"
              >
                <HintButton
                  title="删除"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></HintButton>
              </el-popconfirm>

              <HintButton
                title="查看"
                type="success"
                size="mini"
                icon="el-icon-search"
                @click.native="handleDialogShow(row)"
              ></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          align="center"
          :current-page="pageNum"
          :page-sizes="[3, 5, 10]"
          :page-size="pageSize"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="totalCount"
        >
        </el-pagination>
      </div>
      <!-- 添加修改spu属性 -->
      <AddOrUpdateSpu
        v-show="switchWhat == 'spuAddOrUpdate'"
        ref="addOrUpdate"
        @switchShowForm="switchShowForm"
      ></AddOrUpdateSpu>
      <!-- 修改sku属性 -->
      <AddSku
        v-show="switchWhat == 'skuUpdate'"
        ref="addSku"
        @switchShowForm="switchShowForm"
      ></AddSku>
    </el-card>
    <!-- 弹出表格对话框 -->
    <el-dialog
      :title="spu.spuName + ' 的列表'"
      :visible.sync="dialogTableVisible"
      @close="handleClose"
    >
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column  label="默认图片" width="width" >
        <template v-slot="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
        </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import AddOrUpdateSpu from "@/views/product/Spu/AddOrUpdateSpu/index.vue";
import AddSku from "@/views/product/Spu/AddSku/index.vue";
export default {
  name: "Spu",
  components: {
    AddOrUpdateSpu,
    AddSku,
  },
  data() {
    return {
      switchWhat: "spuShow",
      // isShow: true,
      records: [],
      category1Id: "",
      category2Id: "",
      category3Id: "",
      pageNum: 1,
      pageSize: 3,
      totalCount: 0,
      allId: {},
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading:true
    };
  },
  computed: {
    isShow() {
      return this.switchWhat == "spuShow";
    },
  },
  methods: {
    // handleClose
    handleClose(){
      this.skuList = []
      this.loading = true
    },
    // handleDialogShow
    async handleDialogShow(row) {
      this.spu = row;
      this.dialogTableVisible = true;
      let result = await this.$api.sku.reqSearchSkuBySpuId(row.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false
      }
      
    },
    // handleDeleteSpu
    async handleDeleteSpu(row) {
      console.log("111");
      let result = await this.$api.spu.reqDeleteSpuById(row.id);
      if (result.code == 200) {
        this.$message("删除spu成功");
        this.getCategoryId(this.allId);
      }
    },
    switchShowForm(value) {
      this.switchWhat = value.str;
      this.getCategoryId(this.allId, value.pageNum);
    },
    // addSku 添加sku
    addSku(row) {
      this.switchWhat = "skuUpdate";
      this.$refs.addSku.getInfoInit(this.allId.c1, this.allId.c2, row);
    },
    // addSpu 添加Spu
    addSpu() {
      this.switchWhat = "spuAddOrUpdate";
      this.$refs.addOrUpdate.handleAddSpuInfoInit(this.category3Id);
    },
    updateSpu(row) {
      this.switchWhat = "spuAddOrUpdate";
      this.$refs.addOrUpdate.handleInitAddOrUpdate(row);
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getCategoryId({ c3: this.category3Id });
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getCategoryId({ c3: this.category3Id });
    },
    async getCategoryId(allId, pageNum = this.pageNum) {
      this.allId = allId;
      let { c3: category3Id } = allId;
      this.category3Id = category3Id;
      let result = await this.$api.spu.reqGetSpuInfo(
        pageNum,
        this.pageSize,
        category3Id
      );
      if (result.code == 200) {
        this.totalCount = result.data.total;
        this.pageSize = result.data.size;
        this.pageNum = result.data.current;
        this.records = result.data.records;
      }
    },
  },
};
</script>

<style>
</style>