<template>
  <div class="dashboard-container">
    <!-- 头部区域 -->
    <div class="topCard">
      <el-row :gutter="10">
        <el-col :span="6"
          ><Card title="总销售额" number="￥123606">
            <template slot="charts">
              <div>
                <span
                  >周同比56.67%
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
                    ></path></svg
                ></span>
                <span
                  >日同比13.26%
                  <svg
                    t="1656576905093"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="13766"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512 938.666667L262.4 640h499.2z"
                      fill="#3F51B5"
                      p-id="13767"
                    ></path>
                    <path
                      d="M426.666667 128h170.666666v576h-170.666666z"
                      fill="#3F51B5"
                      p-id="13768"
                    ></path></svg
                ></span>
              </div>
            </template>
            <template slot="foot">
              <div>
                <span>日销售额：￥3700</span>
              </div>
            </template>
          </Card></el-col
        >
        <el-col :span="6"
          ><Card title="访问量" number="12306">
            <template slot="charts">
              <LineCharts></LineCharts>
            </template>
            <template slot="foot">
              <div>
                <span>日访问量：3700</span>
              </div>
            </template></Card
          ></el-col
        >
        <el-col :span="6"
          ><Card title="支付笔数" number="88460"
            ><template slot="charts">
              <div>
                <BarCharts></BarCharts>
              </div>
            </template>
            <template slot="foot">
              <div>
                <span>转化率64%</span>
              </div>
            </template></Card
          ></el-col
        >
        <el-col :span="6"
          ><Card title="运营活动效果" number="78%">
            <template slot="charts">
              <div>
                <LoadCharts></LoadCharts>
              </div>
            </template>
            <template slot="foot">
              <div>
                <span
                  >周同比56.67%
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
                    ></path></svg
                ></span>
                <span
                  >日同比13.26%
                  <svg
                    t="1656576905093"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="13766"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512 938.666667L262.4 640h499.2z"
                      fill="#3F51B5"
                      p-id="13767"
                    ></path>
                    <path
                      d="M426.666667 128h170.666666v576h-170.666666z"
                      fill="#3F51B5"
                      p-id="13768"
                    ></path></svg
                ></span>
              </div> </template></Card
        ></el-col>
      </el-row>
    </div>
    <!-- 中间区域 -->
    <div class="saleCard">
      <el-card>
        <!-- 头部区域 -->
        <div class="saleCardTopContent">
          <div class="saleCardTopContentLeft">
            <el-tabs v-model="activeName" @tab-click="handleClickTab">
              <el-tab-pane label="销售额" name="first"></el-tab-pane>
              <el-tab-pane label="访问量" name="second"></el-tab-pane>
            </el-tabs>
            <div class="rightContent" @click="handleSetDate">
              <span>今日</span>
              <span>本周</span>
              <span>本月</span>
              <span>本年</span>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                class="date1"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <!-- 下方柱状图和排行榜区域 -->
        <div class="saleCardMidContent">
          <el-row :gutter="10">
            <el-col :span="18">
              <div ref="barCharts" style="width: 100%; height: 300px"></div>
            </el-col>
            <el-col :span="6">
              <div class="saleCardMidContent_left">
                <div>门店{{ title }}</div>
                <div>
                  <ul>
                    <li>
                      <span class="rIndex">1</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                    <li>
                      <span class="rIndex">2</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                    <li>
                      <span class="rIndex">3</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                    <li>
                      <span class="normalIndex">4</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                    <li>
                      <span class="normalIndex">5</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                    <li>
                      <span class="normalIndex">6</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                    <li>
                      <span class="normalIndex">7</span>
                      <span class="rankName">肯德基</span>
                      <span>123456</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <!-- 底部区域 -->
    <div class="observe">
      <Observe></Observe>
    </div>
  </div>
</template>

<script>
import Observe from './Observe'
import { mapGetters } from "vuex";
import Card from "@/views/dashboard/Card";
import LineCharts from "@/views/dashboard/LineCharts";
import BarCharts from "@/views/dashboard/BarCharts";
import LoadCharts from "@/views/dashboard/LoadCharts";
const echarts = require("echarts");
import moment from "moment";
import {mapState} from 'vuex'
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      activeName: "first",
      date: [],
      barEcharts: "",
    };
  },
  computed: {
    title() {
      return this.activeName == "first" ? "销售额" : "访问量";
    },
    ...mapState('home',['list']),
  },
  watch:{
    list(){
      this.barEcharts.setOption({
        series:[{
          data:this.list.orderFullYear
        }]
      })
    },
    title(newvalue){
      console.log(newvalue);
      this.barEcharts.setOption({
        xAxis:[
          {
            data:newvalue==="销售额"?this.list.orderFullYearAxis:this.list.userFullYearAxis
          }
        ],
        series:[{
          data:newvalue==="销售额"?this.list.orderFullYear:this.list.userFullYear
        }]
      })
    }
  },
  components: {
    Card,
    LineCharts,
    BarCharts,
    LoadCharts,
    Observe
  },
  methods: {
    handleClickTab(tab, event) {
      if (tab.name == "first") {
        this.barEcharts.setOption({
          title: {
            text: "今年销售额",
          },
        });
      } else {
        this.barEcharts.setOption({
          title: {
            text: "今年访问量",
          },
        });
      }
    },
    handleSetDate(event) {
      if (event.target.innerText === "今日") {
        let newDate = [
          moment().format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD"),
        ];
        this.date = newDate;
      }else if(event.target.innerText === "本周"){
        let weekStart = moment().startOf('week').add(1,'day').format('YYYY-MM-DD')
        let weekEnd = moment().startOf('week').add(8,'day').format('YYYY-MM-DD')
        // console.log(week);
        this.date= [weekStart,weekEnd]
      }else if(event.target.innerText === "本月"){
        let weekStart = moment().startOf('month').format('YYYY-MM-DD')
        let weekEnd = moment().startOf('month').add(1,'month').subtract(1,'day').format('YYYY-MM-DD')
        // console.log(week);
        this.date= [weekStart,weekEnd]
      }else if(event.target.innerText === "本年"){
        let weekStart = moment().startOf('year').format('YYYY-MM-DD')
        let weekEnd = moment().startOf('year').add(1,'year').subtract(1,'day').format('YYYY-MM-DD')
        // console.log(week);
        this.date= [weekStart,weekEnd]
      }

      // this.date[0] = moment().format("YYYY-MM-DD");
      // this.date[1] = moment().format("YYYY-MM-DD")
    },
  },
  mounted() {
    this.$store.dispatch('home/getData')
    this.barEcharts = echarts.init(this.$refs.barCharts);
    this.barEcharts.setOption({
      title: {
        text: "今年销售额",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "April",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec.",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          // data: [10, 52, 200, 334, 390, 330, 220, 110, 520, 339, 320, 15],
        },
      ],
    });
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.saleCardTopContentLeft {
  position: relative;
}
.rightContent {
  position: absolute;
  top: 0;
  right: 0;
}
.date1 {
  width: 320px;
}
.rightContent span {
  margin-right: 20px;
}
ul {
  padding: 0;
}
ul li {
  list-style: none;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.normalIndex {
  width: 16px;
  height: 16px;
  text-align: center;
}
.rIndex {
  width: 16px;
  height: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: black;
  color: #fff;
}
.rankName {
  margin-right: 100px;
}
.observe{
  margin-top: 10px;
}
</style>
