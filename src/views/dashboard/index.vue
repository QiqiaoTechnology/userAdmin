<template>
  <div id="dashboard" class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card cardone" shadow="hover">
          <div style="float:left">
            <p><strong>{{ total }}</strong></p>
            <small class="white-text light-blue-text">图片总数</small>
          </div>
          <div style="float:right;font-size:36px;margin-top: 20px">

            <svg-icon icon-class="tupianicon" class-name="custom-class" />
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="box-card cardtwo" shadow="hover">
          <div style="float:left">
            <p><strong>{{ totaltwo }}</strong></p>
            <small class="white-text light-blue-text">目录总数</small>
          </div>
          <div style="float:right;font-size:36px;margin-top: 20px">
            <svg-icon icon-class="muluicon" class-name="custom-class" />
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="box-card cardthree" shadow="hover">
          <div style="float:left">
            <p><strong>{{ totalfour }}</strong></p>
            <small class="white-text light-blue-text">文章总数</small>
          </div>
          <div style="float:right;font-size:36px;margin-top: 20px">
            <svg-icon icon-class="wenzhangicon" class-name="custom-class" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card cardfour" shadow="hover">
          <div style="float:left">
            <p><strong>{{ totalthree }}</strong></p>
            <small class="white-text light-blue-text">模板总数</small>
          </div>
          <div style="float:right;font-size:36px;margin-top: 20px">
            <svg-icon icon-class="zhuticon" class-name="custom-class" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getWeekDay } from '@/utils/date'
import {
  getImgCount,
  getTempCount,
  getArticleCount
} from '@/api/website'
// import { getusersummary, getusercumulate } from '@/api/wechat'
// import { getAppID } from '@/utils/auth'
import LineChart from './components/LineChart'

export default {
  name: 'Dashboard',
  components: {
    LineChart
  },
  data() {
    return {
      total: 0,
      totaltwo: 0,
      totalthree: 0,
      totalfour: 0,
      questForm: {
        media_type: 'image'
      },
      user: {},
      lineChartData: {
        expectedData: [],
        actualData: []
      }

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // this.getUserInfo()
    this.getMediaCenter()
    // this.getCategoriesList()
    this.getthemeCenter()
    this.getThematicList()
    this.getFansSummary()
  },
  methods: {
    getFansSummary() {
      const _that = this

      _that.lineChartData.expectedData = [185, 165, 108, 199, 300, 280, 299]

      _that.lineChartData.actualData = [30, 20, 50, 36, 96, 66, 10]
    },
    // getUserInfo() {
    //   const _that = this
    //   getUserInfo().then(response => {
    //     _that.user = response.data
    //     _that.user.avatar = response.data.avatar_urls[24]
    //   })
    // },
    getMediaCenter() {
      const _that = this
      getImgCount().then(response => {
        _that.total = response.data
      })
    },
    // getCategoriesList() {
    //   getCategoriesList().then(response => {
    //     if (response.data.length > 0) {
    //       this.totaltwo = response.data.length
    //     }
    //   })
    // },
    getthemeCenter() {
      getTempCount().then(
        response => {
          this.totalthree = response.data
        }
      )
    },
    getThematicList() {
      getArticleCount().then(response => {
        this.totalfour = response.data
      })
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
#dashboard{
    .el-row{
        margin-bottom: 20px;
    }
.el-card__body {
    width: 100%;
}
.box-card{
    display: flex;
    color: #fff;
    strong{
        font-size: 40px;
    }
}
.el-card.is-hover-shadow:hover {
transform: translateY(-5px);
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 26px 28px 0 rgba(0, 0, 0, 0.12);
}
 .cardone{
    background-color: #a77ffc;
    background-image: -moz-linear-gradient(left, #a77ffc 0%, #ff6eac 100%);
    background-image: -webkit-gradient(linear, left top, right top, color-stop(0%, #a77ffc), color-stop(100%, #ff6eac));
    background-image: -webkit-linear-gradient(left, #a77ffc 0%, #ff6eac 100%);
    background-image: -o-linear-gradient(left, #a77ffc 0%, #ff6eac 100%);
    background: -ms-linear-gradient(left, #a77ffc 0%, #ff6eac 100%);
    background: linear-gradient(to right, #a77ffc 0%, #ff6eac 100%);
  }
   .cardtwo{
  background-color: #7f9bff;
    background-image: -moz-linear-gradient(left, #7f9bff 0%, #2ddeff 100%);
    background-image: -webkit-gradient(linear, left top, right top, color-stop(0%, #7f9bff), color-stop(100%, #2ddeff));
    background-image: -webkit-linear-gradient(left, #7f9bff 0%, #2ddeff 100%);
    background-image: -o-linear-gradient(left, #7f9bff 0%, #2ddeff 100%);
    background: -ms-linear-gradient(left, #7f9bff 0%, #2ddeff 100%);
    background: linear-gradient(to right, #7f9bff 0%, #2ddeff 100%);
  }
   .cardthree{
   background-color: #11d7e4;
    background-image: -moz-linear-gradient(left, #11d7e4 0%, #48eaa1 100%);
    background-image: -webkit-gradient(linear, left top, right top, color-stop(0%, #11d7e4), color-stop(100%, #48eaa1));
    background-image: -webkit-linear-gradient(left, #11d7e4 0%, #48eaa1 100%);
    background-image: -o-linear-gradient(left, #11d7e4 0%, #48eaa1 100%);
    background: -ms-linear-gradient(left, #11d7e4 0%, #48eaa1 100%);
    background: linear-gradient(to right, #11d7e4 0%, #48eaa1 100%);
  }
   .cardfour{
   background-color: #fe8c81;
    background-image: -moz-linear-gradient(left, #fe8c81 0%, #fbd323 100%);
    background-image: -webkit-gradient(linear, left top, right top, color-stop(0%, #fe8c81), color-stop(100%, #fbd323));
    background-image: -webkit-linear-gradient(left, #fe8c81 0%, #fbd323 100%);
    background-image: -o-linear-gradient(left, #fe8c81 0%, #fbd323 100%);
    background: -ms-linear-gradient(left, #fe8c81 0%, #fbd323 100%);
    background: linear-gradient(to right, #fe8c81 0%, #fbd323 100%);
  }
  }
</style>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

}

.user-bio {
  margin-top: 20px;
  color: #606266;
border-top: 1px solid #ccc;
  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
