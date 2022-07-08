<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div>线上热门搜索</div>
        <div>
          <el-dropdown>
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!-- 折线图 -->
      <div class="lineCharts">
        <el-row :gutter="10">
          <el-col :span="12">
            <LineChartsFir></LineChartsFir>
          </el-col>
          <el-col :span="12">
            <LineChartsFir></LineChartsFir>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table :data="data" style="width: 100%" border>
        <el-table-column type="index" label="排名" width="80">
        </el-table-column>
        <el-table-column prop="prop" label="搜索关键字" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="用户数" width="width" sortable>
        </el-table-column>
        <el-table-column prop="prop" label="周涨幅" width="width" sortable>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" :total="1000" style="textAlign:right"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import LineChartsFir from "./lineChartsFir";
export default {
  name: "Search",
  data() {
    return {
      data: [{}],
    };
  },
  components: {
    LineChartsFir,
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>