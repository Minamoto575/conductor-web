<template>
  <div style="overflow: hidden">
    <div id="map"></div>

    <div style="height: 20px"></div>
    <el-row :gutter="20">
      <el-col :lg="8" :xl="8" :md="8" :sm="24" :xs="24">
        <div id="lost-elders"></div>
        <div style="height: 20px"></div>
      </el-col>
      <el-col :lg="8" :xl="8" :md="8" :sm="24" :xs="24">
        <div id="case"></div>
        <div style="height: 20px"></div>
      </el-col>
      <el-col :lg="8" :xl="8" :md="8" :sm="24" :xs="24">
        <div class="success-rate">
          <div style="height: 70px"></div>
          <span style="margin-left: -10px">救援成功率</span><br>
          <div style="height: 10px"></div>
          <span class="success-rate-font">{{ successRate }}%</span>
        </div>
        <div style="height: 20px"></div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {baiduMap} from '@/plugins/baidumap.js'
import api from "@/compose/api";


export default {
  name: "Statistics",
  data() {
    return {
      map: null,
      lostElderChart: null,
      caseChart: null,
      tasks: [],
      caseTypeCategory: [0, 0, 0],
      successRate: '--'
    }
  },
  setup() {
    const {getTasks} = api()

    return {
      getTasks
    }
  },
  async mounted() {
    await this.getAllTasks()
    await this.$nextTick(() => {
      baiduMap().then(() => {
        // 创建地图实例
        // eslint-disable-next-line no-undef
        this.map = new BMap.Map('map')
        let latitude = 39.915
        let longitude = 116.04
        if(this.tasks.length > 0){
          latitude = this.tasks[0].latitude
          longitude = this.tasks[0].longitude
        }

        // eslint-disable-next-line no-undef
        this.map.centerAndZoom(new BMap.Point(longitude, latitude), 11);

        // eslint-disable-next-line no-undef
        this.map.addControl(new BMap.MapTypeControl({
          mapTypes:[
            // eslint-disable-next-line no-undef
            BMAP_NORMAL_MAP, BMAP_HYBRID_MAP
          ]}));

        this.map.enableScrollWheelZoom(true);


        this.tasks.forEach(task => {
          // eslint-disable-next-line no-undef
          let point = new BMap.Point(task.longitude, task.latitude)

          // eslint-disable-next-line no-undef
          let marker1 = new BMap.Marker(point);
          this.map.addOverlay(marker1);

          let opts = {
            width: 250,
            height: 100,
            title: task.lostName
          }

          // eslint-disable-next-line no-undef
          let infoWindow = new BMap.InfoWindow('地址：' + task.lostAddress, opts)

          marker1.addEventListener('click', () => {
            // eslint-disable-next-line no-undef
            this.map.openInfoWindow(infoWindow, point)
          })

        });
      })


      this.lostElderChart = this.$root.echarts.init(
          document.getElementById("lost-elders")
      )


    })





    this.initLostElderChart()

    let result = await this.getTaskCategory()



    console.log(result)
    this.caseChart = this.$root.echarts.init(
        document.getElementById("case")
    )

    this.caseChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [
            {value: result[0], name: '未受理'},
            {value: result[1], name: '进行中'},
            {value: result[2], name: '已完成'}
          ]
        }
      ]
    })

    this.successRate = Math.round((result[2] / (result[0] + result[1] + result[2]) * 100) * 100) / 100

    window.addEventListener("resize", () => {
      this.caseChart.resize()

      this.initLostElderChart()
      this.lostElderChart.resize()




    });
  },
  methods: {
    initLostElderChart: function () {
      //准备数据
      let casesTotalFromAges = [0, 0, 0, 0, 0, 0]

      for(let index in this.tasks) {
        let age = this.tasks[index].lostAge
        if(age < 60) {
          casesTotalFromAges[0]++
        }
        else if (60 <= age < 70) {
          casesTotalFromAges[1]++
        }
        else if (70 <= age < 80) {
          casesTotalFromAges[2]++
        }
        else if (80 <= age < 90) {
          casesTotalFromAges[3]++
        }
        else if (90 <= age < 100) {
          casesTotalFromAges[4]++
        }
        else if (100 <= age) {
          casesTotalFromAges[5]++
        }

      }


      this.lostElderChart.setOption( {
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 },
          data: [
            '小于60岁',
            '60~70岁',
            '70~80岁',
            '80~90岁',
            '90~100岁',
            '大于100岁'
          ]
        },
        yAxis: {},
        series: {
          type: 'bar',
          datasetIndex: 0,
          data: casesTotalFromAges
        }
      })
    },
    getAllTasks: async function () {
      await this.getTasks(this.$store.Authorization, {})
          .then(res => {
            if(res.data.code === 0) {
              this.tasks = res.data.data
            }
          })
    },
    getTaskCategory: async function () {
      let caseTypeCategory = [0, 0, 0]
      await this.getTasks(this.$store.Authorization, {status: 0})
          .then(res => {
            if(res.data.code === 0) {
              caseTypeCategory[0] = res.data.data.length
            }
          })
      await this.getTasks(this.$store.Authorization, {status: 1})
          .then(res => {
            if(res.data.code === 0) {
              caseTypeCategory[1] = res.data.data.length
            }
          })
      await this.getTasks(this.$store.Authorization, {status: 2})
          .then(res => {
            if(res.data.code === 0) {
              caseTypeCategory[2] = res.data.data.length
            }
          })
      return caseTypeCategory
    }
  }
}
</script>

<style scoped>

body, html{
  width: 100%;
  height: 100%;
}

#map {
  height: 350px;
}

#lost-elders, #case, .success-rate {
  background-color: white;
  height: 300px;
}

.success-rate {
  text-align: center;
}

.success-rate-font {
  font-size: 100px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-weight: normal;
}



</style>
