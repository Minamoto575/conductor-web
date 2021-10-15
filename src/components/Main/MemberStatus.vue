<template>
  <div>
    <el-tabs type="border-card" style="box-shadow: none;">
      <el-tab-pane label="地图">
        <div style="height: 20px"></div>
        <div id="map"></div>
      </el-tab-pane>
      <el-tab-pane label="常规">
        <div style="height: 20px"></div>
        <el-table :data="members">
          <el-table-column label="队员姓名" prop="username">

          </el-table-column>
          <el-table-column label="微信号" prop="wxId">

          </el-table-column>
          <el-table-column label="手机号" prop="phone">

          </el-table-column>
          <el-table-column label="当前位置" prop="address">

          </el-table-column>
          <el-table-column label="寻找对象">
            <template #default="scope">
              <span style="margin-right: 10px" v-for="(singleCase) in scope.row.cases" :key="singleCase.requestId">{{singleCase.lostName}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import {baiduMap} from '@/plugins/baidumap.js'
import api from "@/compose/api";

export default {
  name: "MemberStatus",
  data() {
    return {
      members: []
    }
  },
  setup() {
    const {getAllMembers} = api()

    return {
      getAllMembers
    }
  },
  async mounted() {
    await this.getAllMembers(this.$store.Authorization)
    .then(res => {
      console.log(res.data)
      if(res.data.code === 0) {
        this.members = res.data.data
      }
    })

    this.$nextTick(() => {
      baiduMap().then(() => {
        // 创建地图实例
        // eslint-disable-next-line no-undef
        this.map = new BMap.Map('map')
        let latitude = 39.915
        let longitude = 116.04
        if(this.members.length > 0){
          latitude = this.members[0].latitude
          longitude = this.members[0].longitude
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


        this.members.forEach(member => {
          console.log(member)
          // eslint-disable-next-line no-undef
          let point = new BMap.Point(member.longitude, member.latitude)

          // eslint-disable-next-line no-undef
          let marker1 = new BMap.Marker(point);
          this.map.addOverlay(marker1);

          let opts = {
            width: 250,
            height: 100,
            title: member.username
          }

          // eslint-disable-next-line no-undef
          let infoWindow = new BMap.InfoWindow('地址：' + member.address, opts)

          marker1.addEventListener('click', () => {
            // eslint-disable-next-line no-undef
            this.map.openInfoWindow(infoWindow, point)
          })

        })


      });
    })

  }
}
</script>

<style scoped>
#map {
  height: 600px;
}



</style>
