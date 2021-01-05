<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章详情</span>
      </div>
      <div v-loading="loading" class="user-message">
        <div v-if="DetailForm.coverAttachmentUrl" class="userInfo_main">
          <el-image :src="DetailForm.coverAttachmentUrl" />
        </div>
        <el-divider
          v-if="DetailForm.coverAttachmentUrl"
          content-position="left"
        >基本信息</el-divider>
        <div class="userInfo_main">
          <el-row :gutter="20">
            <el-col
              :xs="10"
              :sm="10"
              :md="10"
              :lg="10"
              class="el_col userInfo_label"
            >
              <label>文章标题: {{ DetailForm.articleTitle || "无" }} </label>
            </el-col>
            <el-col
              :xs="10"
              :sm="10"
              :md="10"
              :lg="10"
              class="el_col userInfo_label"
            >
              <label>文章摘要: {{ DetailForm.articleDescription || "无" }}
              </label>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :xs="10"
              :sm="10"
              :md="10"
              :lg="10"
              class="el_col userInfo_label"
            >
              <label>文章标签: {{ columnName || "无" }} </label>
            </el-col>
            <el-col
              :xs="10"
              :sm="10"
              :md="10"
              :lg="10"
              class="el_col userInfo_label"
            >
              <label>文章作者:{{ DetailForm.articleAuthor || "无" }} </label>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :xs="10"
              :sm="10"
              :md="10"
              :lg="10"
              class="el_col userInfo_label"
            >
              <label>发布时间: {{ DetailForm.createTime || "无" }} </label>
            </el-col>
          </el-row>
        </div>
        <el-divider
          v-if="DetailForm.count"
          content-position="left"
        >主体内容</el-divider>
        <div v-if="DetailForm.articleDescription" class="userInfo_main">
          <div v-html="DetailForm.articleDescription" />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getArticleInfo } from '@/api/website.js'
// import { Yearformat } from '@/utils/index'
export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      columnName: '',
      DetailForm: {}
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query
    if (queryParam.articleId) {
      this.getArticleInfo(queryParam.articleId)
      this.columnName = queryParam.columnName
    }
    this.loading = false
  },

  methods: {
    getArticleInfo(vid) {
      getArticleInfo(vid).then((res) => {
        this.DetailForm = res.data
      })
    }
  }
}
</script>

<style scoped >
/* userinfo */

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

