<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div>销售额类别占比</div>
        <div>
          <el-radio-group  size="small">
            <el-radio-button label="top">全部渠道</el-radio-button>
            <el-radio-button label="right">线上</el-radio-button>
            <el-radio-button label="bottom">门店</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 饼图 -->
      <div
        class="pieCharts"
        ref="piecharts"
        style="width: 100%; height: 300px"
      ></div>
    </el-card>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "Category",
  data() {
    return {
      myCharts: "",
      name: "",
      value: "",
    };
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.piecharts);
    this.myCharts.setOption({
      tooltip: {
        trigger: "item",
      },
      title: {
        top: "center",
        left: "center",
        
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            // position: "center",
          },

          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "联盟广告" },
            { value: 735, name: "视频广告" },
            { value: 580, name: "搜索引擎" },
            { value: 484, name: "直接访问" },
            { value: 300, name: "邮件营销" },
          ],
        },
      ],
    });
    this.myCharts.on("mouseover", (params) => {
      console.log(params);
      this.name = params.name;
      this.value = params.value;
      this.myCharts.setOption({
        title: {
          text: this.name,
          subtext: this.value,
         
        },
      });
    });
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