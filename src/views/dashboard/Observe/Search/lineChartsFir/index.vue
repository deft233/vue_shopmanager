<template>
  <div>
    <div class="top">
      <span>搜索用户数</span>
      <svg
        t="1656575372815"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2189"
        width="16"
        height="16"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="2190"
        ></path>
      </svg>
    </div>
    <div class="mid">
      <span class="number">123312</span>
      <span class="percent"
        >17.1
         <svg
          t="1656576883416"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11945"
          width="16"
          height="16"
        >
          <path
            d="M512 85.333333l249.6 298.666667H262.4z"
            fill="#3F51B5"
            p-id="11946"
          ></path>
          <path
            d="M426.666667 320h170.666666v576h-170.666666z"
            fill="#3F51B5"
            p-id="11947"
          ></path>
        </svg>
      </span>
    </div>
    <div class="footCharts" ref="charts"></div>
  </div>
</template>

<script>
const echarts =require('echarts')
export default {
  name: "LineChartsFir",
  data() {
    return {};
  },
  mounted() {
    let mycharts = echarts.init(this.$refs.charts)
    mycharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      grid:{
        top:0,
        left:-12,
        right:0,
        bottom:10
      },
      series: {
        type: "line",
        data: [26, 15, 10, 28, 36, 20, 48, 13],
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

<style lang="less" scoped>
.mid {
  margin:10px 0;
}
.number{
  font-size: 20px;
  margin-right:20px;
}
.footCharts {
  width: 100%;
  height: 100px;
}
.percent{
  color: rgb(240, 234, 234);
}
</style>