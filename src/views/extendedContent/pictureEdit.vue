<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          轮播图集合名称：{{ DetailForm.bannerName }}
        </div>
        <el-button
          type="primary"
          class="cardBtn"
          @click="toAdd()"
        >去添加当前轮播图集合下轮播图图片信息</el-button>
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
            <el-table-column
              label="操作"
              align="center"
              width="200"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="color: #23b3ff"
                  @click="handleEditView(scope.row)"
                >
                  修改
                </el-button>
                <el-button
                  type="text"
                  style="color: #ff5050"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            :show-close="false"
            :close-on-click-modal="false"
            title="编辑轮播图片信息"
            width="650px"
            :visible.sync="dialogbannerInfoVisible"
          >
            <el-form
              ref="bannerInfo"
              :model="bannerInfo"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="标签名" prop="title">
                <el-input
                  v-model.trim="bannerInfo.title"
                  placeholder="请输入标签名"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="标签名" prop="subtitle">
                <el-input
                  v-model.trim="bannerInfo.subtitle"
                  placeholder="请输入标签名"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="标签名" prop="redirectUrl">
                <el-input
                  v-model.trim="bannerInfo.redirectUrl"
                  placeholder="请输入标签名"
                  autocomplete="off"
                />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelForm('bannerInfo')">取 消</el-button>
              <el-button
                type="primary"
                @click="handleSubmit('bannerInfo')"
              >确定修改</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getBannerById, deleteBannerItem, editbannerDetail } from '@/api/website'

export default {
  data() {
    return {
      loading: true,
      bannerId: '',
      dialogVisible: false,
      DetailForm: {},
      bannerInfo: {},
      UrlList: [],
      dialogbannerInfoVisible: false,
      rules: {
        title: {
          required: true,
          message: '请输入轮播图图片标题',
          trigger: 'blur'
        }, subtitle: {
          required: true,
          message: '请输入轮播图图片副标题',
          trigger: 'blur'
        }, redirectUrl: {
          required: true,
          message: '请输入轮播图图片链接',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query

    if (queryParam.bannerId) {
      this.bannerId = queryParam.bannerId
      this.getBannerById(queryParam.bannerId)
    }
    this.loading = false
  },

  methods: {
    cancelForm(bannerInfo) {
      this.$refs[bannerInfo].resetFields()
      this.dialogbannerInfoVisible = false
    },
    handleSubmit(bannerInfo) {
      const that = this
      this.$refs[bannerInfo].validate((valid) => {
        if (valid) {
          editbannerDetail(this.bannerInfo).then((res) => {
            that.$message.success('标签修改成功')
            that.$refs[bannerInfo].resetFields()
            that.dialogbannerInfoVisible = false
            that.getBannerById(this.bannerId)
          })
        } else {
          return false
        }
      })
    },
    toAdd() {
      const data = {
        title: this.DetailForm.bannerName,
        bannerId: this.bannerId
      }
      this.$router.push({
        path: '/pictureAdd',
        query: data
      })
    },
    getBannerById(id) {
      getBannerById(id).then(res => {
        this.DetailForm = res.data
      })
    },
    handleEditView(data) {
      this.bannerInfo = data
      this.dialogbannerInfoVisible = true
    },
    handleDelete(data) {
      const _that = this
      _that
        .$confirm('此操作将永久删除该轮播图图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          deleteBannerItem(data.bannerDetailId).then(res => {
            _that.$message({
              type: 'success',
              message: '已删除'
            })
            _that.getBannerById(this.bannerId)
          })
        })
        .catch(() => {
          _that.$message({
            type: 'info',
            message: '已取消删除'
          })
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

