<template>
<section style="width:99.5%">
  <el-row  :gutter="15">
    <el-col :span="18">
      <el-row  :gutter="15">
        <el-col :span="8">
          <div class="home-box"></div>
        </el-col>
        <el-col :span="8">
          <div class="home-box"></div>
        </el-col>
        <el-col :span="8">
          <div class="home-box"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="home-box tab-box">
            <el-tabs v-model="tabData" @tab-click="tabClick()">
              <el-tab-pane label="表格--中央督察（19）" name="tab1">
                <table-item></table-item>
              </el-tab-pane>
              <el-tab-pane label="表格--集中督察（11）" name="tab2">
                 <table-item></table-item>
              </el-tab-pane>
              <el-tab-pane label="图表--问题整改情况" name="tab3">
                 <chart-item></chart-item>

              </el-tab-pane>
              <el-tab-pane label="图表--问题整改情况2" name="tab4">
                 <chart-item></chart-item>
                <!-- <div id="Chart11" :style="{width: '100%', height: '90%'}"></div> -->
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <el-row  :gutter="15">
        <el-col :span="12">
          <div class="home-box chart-box">
            <div id="Chart2" :style="{width: '600px', height: '90%'}"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="home-box chart-box"></div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">

      <div class="home-box log-box">
        <div class="home-box-title">更新日志</div>
      </div>
    </el-col>
  </el-row>
</section>
</template>
<script>

import TableItem from '@/views/homepage/tabTable'
import ChartItem from '@/views/homepage/tabChart'
import  {EleResize} from '@/service/zdk/esresize'//echarts图表自适应
export default {
  components: {TableItem,ChartItem},
  data () {
    return {
     tabData:"tab1",

    }
  },
  mounted(){
    this.Paimin("Chart2");
  },
  methods: {

    Paimin(DomID){
      let myChart = this.$echarts.init(document.getElementById(DomID), 'macarons');
      let ydata = [
        {
            name: '水环境',value: 18
        },
        {
            name: '土壤环境',value: 16
        },
        {
            name: '大气环境',value: 15
        },
        {
            name: '噪声环境',value: 14
        },
        {
            name: '建设项目',value: 10
        },
        {
            name: '固危废',value: 7.9
        },
        {
            name: '基础设施',value: 6.7
        },
        {
            name: '基础设施',value: 6
        },
        {
            name: '自然生态',value: 4.5
        },
        {
            name: '其它',            value: 3
        }
      ];
      let color = ["#8d7fec", "#5085f2","#e75fc3","#f87be2","#f2719a","#fca4bb","#f59a8f","#fdb301","#57e7ec","#cf9ef1"]
      let xdata = ['水环境', "土壤环境", "大气环境", "噪声环境", "建设项目", "固危废", '基础设施','自然生态','其它'];


      let option = {
          color:color, 
          legend: {
              orient: "vartical",
              x: "left",
              top: "center",
              left: "60%",
              bottom: "0%",
              data: xdata,
              itemWidth: 10,
              itemHeight: 10,
              itemGap :16,
              formatter :function(name){
                  return ''+name
                }
          },
          series: [{
              type: 'pie',
              clockwise: false, //饼图的扇区是否是顺时针排布
              minAngle: 2, //最小的扇区角度（0 ~ 360）
              radius: ["40%", "70%"],
              center: ["30%", "50%"],
              avoidLabelOverlap: false,
              itemStyle: { //图形样式
                  normal: {
                      borderColor: '#ffffff',
                      borderWidth: 5,
                  },
              },
              label: {
                  normal: {
                      show: false,
                      position: 'center',
                      formatter: '{text|{b}}\n{c} ({d}%)',
                      rich: {
                          text: {
                              color: "#666",
                              fontSize: 14,
                              align: 'center',
                              verticalAlign: 'middle',
                              padding: 8
                          },
                          value: {
                              color: "#8693F3",
                              fontSize: 24,
                              align: 'center',
                              verticalAlign: 'middle',
                          },
                      }
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: 24,
                      }
                  }
              },
              data: ydata
          }]
      };
      myChart.setOption(option);

      setTimeout(function() {
          myChart.on('mouseover', function(params) {
              if (params.name == ydata[0].name) {
                  myChart.dispatchAction({
                      type: 'highlight',
                      seriesIndex: 0,
                      dataIndex: 0
                  });
              } else {
                  myChart.dispatchAction({
                      type: 'downplay',
                      seriesIndex: 0,
                      dataIndex: 0
                  });
              }
          });

          myChart.on('mouseout', function(params) {
              myChart.dispatchAction({
                  type: 'highlight',
                  seriesIndex: 0,
                  dataIndex: 0
              });
          });
          myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
          });
      }, 1000);

      let resizeDiv = document.getElementById(DomID)
      let listener = function () {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)//echarts自适应宽度
    } ,
    tabClick(){//切换tab。如果是echarts 因为tab在切换前隐藏的tab没有宽度 所以显示错误，这里需要单独处理
      if(this.tabData=="tab3"){
        setTimeout(() => {//方法一 延时，等切换后页面dom生成后再初始化图表
          this.drawLine("Chart1");
        }, 30);

      }else if(this.tabData=="tab4"){
         setTimeout(() => {
         this.drawLine1("Chart11");
        }, 30);

      }
    }

  }
}
</script>
<style lang="scss" >
.home-box{
  background: #fff;width: 100%;min-height: 200px;margin-bottom:15px;padding:10px;height: 24vh;
  .home-box-title{line-height:25px;height:40px;font-size:16px;font-weight:500;}
.el-tabs{height: 100%;}
.el-tabs__content{height: calc(100% - 60px);overflow: scroll;}
}
.tab-box{height:calc(40vh - 60px)}
.log-box{height:calc(100vh - 90px);overflow-y:auto;;margin-bottom: 0;}
.chart-box{height:calc(36vh - 60px);margin-bottom: 0;padding:0}
</style>
