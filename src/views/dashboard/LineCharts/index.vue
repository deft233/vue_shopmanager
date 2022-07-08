<template>
  <div ref="line" style="width: 100%; height: 100%"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "LineCharts",
  mounted() {
    let lineCharts = echarts.init(this.$refs.line);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      grid:{
        top:0,
        left:0,
        right:0,
        bottom:10
      },
      series: {
        type: "line",
        data: [36, 15, 1, 8, 36, 20, 48, 13],
        itemStyle: {
          opacity: 0,
        },
        smooth: true,
        
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "blue", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "white", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    });
  },
};
</script>

<style>
</style>