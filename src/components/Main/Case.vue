<template>
  <div>
    <el-tabs type="border-card" style="box-shadow: none" v-model="selectStatus">
      <el-tab-pane label="全部" :name="-1"></el-tab-pane>
      <el-tab-pane v-for="status in Object.keys(statusCode)" :key="status" :label="statusCode[status]" :name="status"></el-tab-pane>
    </el-tabs>

    <div style="height: 20px"></div>
    <el-table
        :data="tableData"
        v-loading="isTableLoading"
    >
      <el-table-column
          label="走失者姓名"
          prop="lostName"
      >
      </el-table-column>
      <el-table-column
          label="年龄"
          prop="lostAge"
      >

      </el-table-column>
      <el-table-column label="走失地" prop="lostAddress">

      </el-table-column>
      <el-table-column label="案件发布时间">
        <template #default="scope">
          {{new Date(scope.row.gmtCreate).Format('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column label="参与搜救、寻找人数" prop="rescueNum">

      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
      >
        <template #default="scope">
          <el-popover
              placement="left"
              :width="600"
              trigger="click"

          >
            <el-image style="height: 350px" :src="detailDialog.photo"/>

            <!--            <el-carousel height="500px">-->
<!--              <el-carousel-item v-for="item in 1" :key="item">-->
<!--                <el-image :src="detailDialog.imageUrl"/>-->
<!--              </el-carousel-item>-->

<!--            </el-carousel>-->
            <br>
            <span style="font-weight: bold">备注</span><br>
            <span>{{ detailDialog.info }}</span>
            <template #reference>
              <el-button
                  type="text"
                  size="small"
                  @click="onDetailButtonClick(scope.$index)"
              >
                详情
              </el-button>
            </template>
          </el-popover>




        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/compose/api";

export default {
  name: "Case",
  setup() {
    const {getTasks, getTask} = api()

    return {
      getTasks,
      getTask
    }
  },
  data() {
    return {
      isPopoverVisible: false,
      isTableLoading: false,
      detailDialog: {
        info: '',
        imageUrl: ''
      },
      selectStatus: -1,
      tableData: [],
      statusCode: {
        0: '未受理',
        1: '进行中',
        2: '已完成'
      }
    }
  },
  mounted() {
    this.getAllTask({})
  },
  methods: {
    onDetailButtonClick: async function(index) {
      await this.getTask(this.$store.Authorization, this.tableData[index].requestId)
          .then(res => {
            console.log(res.data)
            this.detailDialog.photo = res.data.data.photo
            this.detailDialog.info = res.data.data.detail

          })
    },

    getAllTask: async function (params) {
      this.isTableLoading = true
      await this.getTasks(this.$store.Authorization, params)
          .then(res => {
            console.log(res.data)
            if(res.data.code === 0) {
              this.tableData = res.data.data
            }
          })

      this.isTableLoading = false
    }
  },
  watch: {
    selectStatus(newVal) {
      if(newVal === -1) {
        this.getAllTask({})
      }
      else {
        this.getAllTask({status: newVal})
      }
    }
  }
}
</script>

<style scoped>

</style>
