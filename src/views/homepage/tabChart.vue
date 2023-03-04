<template>
    <div>

     <div id="Chart1" :style="{width: '100%',}"></div>
    </div>

</template>

<script>
export default {
data () {
    return {
     tabData:"tab1",

    }
  },
  created:{

  },
  methods:{
     drawLine(DomID){
        let myChart = this.$echarts.init(document.getElementById(DomID),'macarons')
        myChart.setOption({
            tooltip: {},
            gird:{
              top:1,
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: [
              {
                  type: 'value',
                  name: '问题数',
              },
              {
                  type: 'value',
                  name: '整改率',
                  position: 'right',
                  axisLabel: {
                      formatter: '{value} %'
                  }
              },
            ],
            series: [
              {
                name: '整改问题数',
                type: 'bar',
                barWidth:30,
                data: [5, 30, 36, 40, 50, 66, 69, 176, 280, 188, 296,228]
              },
              {
                name: '整改率(%)',
                type: 'line',
                yAxisIndex: 1,
                data: [5, 20, 36, 40, 50, 66, 69, 76, 80, 88, 96,98]
              },
            ]
        });
        let resizeDiv = document.getElementById(DomID)
        let listener = function () {
          myChart.resize()
        }
        EleResize.on(resizeDiv, listener)//echarts自适应宽度
    },
    drawLine1(DomID){
        let myChart = this.$echarts.init(document.getElementById(DomID),'macarons')
        myChart.setOption({
            tooltip: {},
            gird:{
              top:1,
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: [
              {
                  type: 'value',
                  name: '问题数',
              },
              {
                  type: 'value',
                  name: '整改率',
                  position: 'right',
                  axisLabel: {
                      formatter: '{value} %'
                  }
              },
            ],
            series: [
              {
                name: '整改问题数',
                type: 'bar',
                barWidth:30,
                data: [52, 310, 36, 440, 520, 626, 619, 176, 280, 188, 296,228]
              },
              {
                name: '整改率(%)',
                type: 'line',
                yAxisIndex: 1,
                data: [6, 22, 32, 40, 57, 66, 69, 76, 80, 88, 96,99]
              },
            ]
        });
        let resizeDiv = document.getElementById(DomID)
        let listener = function () {
          myChart.resize()
        }
        EleResize.on(resizeDiv, listener)//echarts自适应宽度
    },
  }
}
</script>
<style scoped lang="scss">
  .title{
    margin:0 0 20px 20px;
    font-weight: bold;
  }
  p{padding-left:20px;}


</style>
