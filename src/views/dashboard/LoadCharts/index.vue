<template>
  <div ref="loadCharts" style="width: 100%; height: 100%"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "LoadCharts",
  mounted() {
    let loadCharts = echarts.init(this.$refs.loadCharts);
    loadCharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
        type: "value",
      },
      yAxis: {
        show: false,
        type: "category",
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 30,
      },
      series: {
        type: "bar",
        data: [78],
        barWidth: 20,
        itemStyle: {
          color: "yellowgreen",
          borderRadius: 20,
        },
        backgroundStyle: {
           borderRadius: 20,
        },
        label:{
          show:true,
          formatter:"|",
          fontSize:16,
          color:'#fff',
          position: 'right'
        },
        showBackground: true,
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