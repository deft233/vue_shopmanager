<template>
  <div ref="Bar" style="width: 100%; height: 100%"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "BarCharts",
  mounted() {
    let barCharts = echarts.init(this.$refs.Bar);
    barCharts.setOption({
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
        bottom:30,
      },
      series: {
        type: "bar",
        data: [36, 15, 1, 8, 36, 20, 48, 13,20,60,75,13,66],
        // g
        // smooth: true,
        // areaStyle: {
        //   color: {
        //     type: "linear",
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: "blue", // 0% 处的颜色
        //       },
        //       {
        //         offset: 1,
        //         color: "white", // 100% 处的颜色
        //       },
        //     ],
        //     global: false, // 缺省为 false
        //   },
        // },
      },
    });
  },
};
</script>

<style>
</style>