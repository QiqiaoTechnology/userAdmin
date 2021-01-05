<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>轮播图集合名称：{{ DetailForm.bannerName }}</span>
      </div>
      <div v-loading="loading" class="user-message">
        <div class="userInfo_main">
          <el-carousel trigger="click" height="550px">
            <el-carousel-item
              v-for="(item, index) in DetailForm.bannerDetailList"
              :key="index"
            >
              <el-image :src="item.attachmentUrl" fit="contain" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="userInfo_main">
          <el-table
            :data="DetailForm.bannerDetailList"
            border
            style="width: 100%"
          >
            <el-table-column label="轮播图片" align="center" width="180">
              <template slot-scope="scope">
                <div class="center-image">
                  <el-image
                    style="width: 150px; height: 70px"
                    :src="scope.row.attachmentUrl"
                    fit="contain"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="轮播图图片标题" width="180" />
            <el-table-column
              prop="subtitle"
              label="轮播图图片副标题"
              width="180"
            />
            <el-table-column prop="redirectUrl" label="轮播图图片点击跳转链接" />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getBannerById } from '@/api/website'

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      DetailForm: {},
      UrlList: []
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query

    if (queryParam.bannerId) {
      this.getBannerById(queryParam.bannerId)
    }
    this.loading = false
  },

  methods: {

    getBannerById(id) {
      getBannerById(id).then(res => {
        this.DetailForm = res.data
      })
    }
  }
}
</script>

<style scoped >
.user-message {
  font-size: 14px;
  color: #666666;
  text-align: left;
  line-height: 14px;
}

.userInfo_main {
  font-size: 14px;
  color: #666666;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 20px;
  margin-bottom: 10px;
}

.userInfo_main .userInfo_label {
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

